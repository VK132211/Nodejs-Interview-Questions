# MongoDB Concepts

This document summarizes core MongoDB concepts: BSON vs JSON, database structure, CRUD, indexes, aggregation, data modeling, and a brief Mongoose overview.

## BSON vs JSON

BSON (Binary JSON) and JSON are formats used to store and exchange data. MongoDB uses BSON internally (a binary-encoded representation of JSON) which supports additional types (e.g., ObjectId, Date, binary data) and is optimized for storage and traversal.

| Feature | BSON | JSON |
|---|---|---|
| Format | Binary, machine-readable | Text, human-readable |
| Efficiency | More efficient for storage and traversal | Less efficient for DB storage |
| Data types | Richer types (ObjectId, Date, binary, etc.) | Core JSON types (string, number, boolean, array, object) |
| Typical use | Storage in MongoDB | Data exchange between clients/servers |

## Database, Collection, Document

- **Database**: A logical container for collections.
- **Collection**: A grouping of related documents (analogous to a table).
- **Document**: A BSON record that maps closely to JSON (analogous to a row).

## ` _id ` (ObjectId internals)

Every document requires a unique `_id` field. By default MongoDB creates an `ObjectId` (12 bytes):

- Timestamp: 4 bytes (seconds since Unix epoch)
- Machine ID: 3 bytes (hash of host/MAC)
- Process ID: 2 bytes
- Counter: 3 bytes (incrementing)

## Schema-less vs Schema-validated

- **Schema-less**: Collections can contain documents with different shapes — flexible for evolving data.
- **Schema-validated**: You can enforce rules (required fields, types, ranges) using validation; invalid documents are rejected on insert/update.

---

## CRUD Operations

### Create

Shell examples:

| Operation | Description | Example |
|---|---|---|
| `insertOne` | Insert a single document | `db.users.insertOne({ name: "Alice", age: 30 })` |
| `insertMany` | Insert multiple documents | `db.users.insertMany([{ name: "Bob" }, { name: "Charlie" }])` |

Node.js (native driver) example:

```javascript
// insertOne
await collection.insertOne({ name: 'Alice', age: 30 });

// insertMany
await collection.insertMany([{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]);
```

### Read

| Operation | Description | Example |
|---|---|---|
| `find` | Returns a cursor for matching documents | `db.users.find({ age: { $gt: 25 } })` |
| `findOne` | Returns first matching document | `db.users.findOne({ name: 'Bob' })` |

Node.js examples:

```javascript
const usersOlderThan25 = await collection.find({ age: { $gt: 25 } }).toArray();
const bob = await collection.findOne({ name: 'Bob' });
```

### Update

Common operators include `$set`, `$inc`.

```javascript
await collection.updateOne({ name: 'Alice' }, { $set: { age: 31 } });
await collection.updateMany({ age: { $lt: 30 } }, { $set: { status: 'young' } });
```

### Delete

```javascript
await collection.deleteOne({ name: 'Bob' });
await collection.deleteMany({ status: 'inactive' });
// To remove all documents:
await collection.deleteMany({});
```

---

## Query Operators

### Comparison

`$eq`, `$gt`, `$lt`, `$in`, etc.

```javascript
// Example: age > 25 and name in ["Alice","Charlie"]
const results = await collection.find({
  age: { $gt: 25 },
  name: { $in: ['Alice', 'Charlie'] }
}).toArray();
```

### Logical

`$and`, `$or`, `$not` (note: top-level multiple fields imply AND)

```javascript
const results = await collection.find({
  $or: [{ age: 30 }, { status: 'pending' }]
}).toArray();
```

### Array

`$elemMatch`, `$size`, etc.

```javascript
// Example documents:
// [{ _id: 1, scores: [{type: 'quiz', score: 92}, {type: 'exam', score: 88}] }, ...]

const highAchievers = await db.collection('students').find({
  scores: { $elemMatch: { type: 'quiz', score: { $gt: 90 } } }
}).toArray();

const usersWithTwoEmails = await collection.find({ emails: { $size: 2 } }).toArray();
```

---

## Indexes

Indexes speed up queries by avoiding collection scans. Common types:

1. **Single-field** (MongoDB creates an index on `_id` automatically)

```javascript
db.users.createIndex({ age: 1 }); // ascending
```

2. **Compound** (order matters)

```javascript
db.inventory.createIndex({ item: 1, quantity: -1 });
```

3. **Multikey** (for array fields)

```javascript
db.products.createIndex({ tags: 1 });
```

4. **Text** (full-text search)

```javascript
db.articles.createIndex({ subject: 'text', description: 'text' });
db.articles.find({ $text: { $search: 'MongoDB tutorial' } });
```

5. **TTL** (time-to-live)

```javascript
db.log_events.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });
```

---

## Aggregation Framework

Data flows through pipeline stages. Common stages:

- `$match` — filter (like SQL WHERE)
- `$group` — group and aggregate (like SQL GROUP BY)
- `$project` — reshape/select fields
- `$sort` — order
- `$limit` / `$skip` — pagination

Example:

```javascript
db.orders.aggregate([
  { $match: { status: 'pending' } },
  { $group: { _id: '$productName', totalQuantity: { $sum: '$quantity' } } },
  { $sort: { totalQuantity: -1 } },
  { $limit: 5 }
]);
```

Advanced stages: `$lookup` (left outer join), `$unwind` (deconstruct arrays), etc.

```javascript
db.orders.aggregate([
  { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'productInfo' } },
  { $unwind: '$productInfo' }
]);
```

---

## Data Modeling

Two main strategies:

- **Embedding (denormalization)**: store related data inside a single document — good for reads when parent+child are fetched together.
- **Referencing (normalization)**: store related data in separate collections and link via `_id` — good for large or unbounded related data and when independent updates are frequent.

Consider access patterns, document size (16MB limit), update frequency, and read performance when choosing a model.

---

## Mongoose (brief)

Mongoose is an ODM for Node.js that provides schema definitions, validation, middleware, virtuals, and convenience methods.

```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  age: { type: Number, min: 18 }
});

// virtual
userSchema.virtual('fullName').get(function () { return this.firstName + ' ' + this.lastName; });

// lean queries for better read performance when you don't need Mongoose documents
const users = await User.find({}).lean();
```

Keep schema and indexing appropriate for production workloads (validation, indexes, and careful schema design).

```javascript
// Returns plain JS objects (faster)
const usersPlain = await User.find({}).lean();

// Returns Mongoose documents (slower, but allows .save() later)
const usersMongoose = await User.find({});
```

### Middleware (Hooks)

Mongoose middleware (hooks) run at lifecycle stages (e.g., `save`, `validate`, `remove`, `update`). Common types:

- **pre**: runs before the event (e.g., hash password before save)
- **post**: runs after the event (e.g., cleanup after remove)

Example — hashing a password before saving:

```javascript
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

### Populate vs `$lookup`

- **Mongoose `populate`**: client-side convenience that replaces ObjectId references with actual documents (works with Mongoose models).

```javascript
// Post has comments: [ObjectId('a'), ObjectId('b')]
const post = await Post.findById(1).populate('comments');
```

- **Aggregation `$lookup`**: server-side left outer join inside the aggregation pipeline — better for large joins, more efficient, and works with `.lean()` results.

```javascript
db.orders.aggregate([
  { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'productInfo' } }
]);
```

## 6. MongoDB Atlas & Production Management

MongoDB Atlas is the managed cloud service for MongoDB with features for clusters, backups, security, monitoring, and auto-scaling.

### 6.1 Atlas Core Features

- **Clusters (M0–M10+)**: tiers from free/shared (M0, M2/M5) to dedicated (M10+).
- **Backups**: continuous point-in-time recovery and scheduled snapshots.
- **Network**: IP allowlists and VPC peering for secure connectivity.
- **Users & Roles**: RBAC with predefined and custom roles.

### 6.2 Atlas Search

Atlas Search (Lucene-based) enables full-text search features via a `$search` aggregation stage — fuzzy matching, synonyms, scoring, and filters.

### 6.3 Monitoring & Scaling

- **Metrics**: CPU, active connections, page faults — use these to diagnose issues.
- **Vertical scaling**: increase instance size (tier).
- **Horizontal scaling**: sharding distributes data across shards.
- **Auto-scaling**: storage and (on some tiers) cluster tier autoscaling.

## 7. Transactions & Consistency

MongoDB supports multi-document ACID transactions (4.0+ for replica sets, 4.2+ for sharded clusters).

```javascript
// Example (Mongoose driver):
const session = await mongoose.startSession();
session.startTransaction();
try {
  await User.updateOne({ _id: userId }, { $inc: { balance: -100 } }, { session });
  await User.updateOne({ _id: recipientId }, { $inc: { balance: 100 } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

### Read & Write Concerns

- **Write Concern**: `w: 1` (default) vs `w: "majority"` for durability.
- **Read Concern**: `local`, `majority`, `snapshot` (used inside transactions).

Recommended for strong consistency: `writeConcern: { w: 'majority' }` and `readConcern: 'majority'` (or `snapshot` inside transactions).

## 8. Security & Best Practices

- Use schema validation to prevent malformed data.
- Implement RBAC and least-privilege users.
- Enable TLS/SSL for encrypted connections (Atlas enforces this by default).

## 9. Testing & Optimization

- Use `.lean()` for read-heavy APIs to return plain objects.

```javascript
const products = await Product.find({ isActive: true }).lean();
```

- Avoid N+1 queries by using `$lookup` or `populate` wisely.
- Use `explain()` and Atlas Performance Advisor to find slow queries and create appropriate indexes.
- Load test with realistic datasets and tools like k6 or JMeter.

## Advanced Topics and Best Practices

### Replication

Replica sets use a primary for writes and secondaries replicate from the primary's oplog. Heartbeats and elections provide automatic failover.

### WiredTiger vs MMAPv1

| Feature | WiredTiger (default) | MMAPv1 (deprecated) |
|---|---:|---|
| Concurrency | Document-level locking | Collection-level locking |
| Compression | Supports compression (Snappy) | No compression |
| Memory | Manages internal cache | Uses OS memory-mapped files |
| Performance | Better in high-write, multi-core systems | Suited for older, specific workloads |

### Sharding (Range vs Hashed)

- **Range sharding**: stores contiguous ranges; good for range queries.
- **Hashed sharding**: hashes the shard key for even distribution; good for avoiding hot shards with monotonically increasing keys.

Use zoned sharding, hashed keys, or a better shard key to avoid the "hot shard" problem; the balancer redistributes chunks automatically.

### Schema Migration

- **Code migration**: support old and new schemas during transition.
- **Batch migration**: run background jobs (`updateOne`/`updateMany`) to migrate documents.

### TTL Indexes

TTL indexes use a background thread to remove expired documents based on a date field and `expireAfterSeconds`.

### When to Avoid MongoDB

- Very complex, frequent multi-document transactions (RDBMS may be simpler).
- Highly relational data with many complex joins.
- When you need RDBMS-specific features like stored procedures or triggers.

### MongoDB vs DynamoDB

| Feature | MongoDB | AWS DynamoDB |
|---|---|---|
| Model | Document store | Key-value / Document store |
| Hosting | Self-managed or Atlas (multi-cloud) | AWS managed service only |
| Scaling | Replication & sharding | Fully managed auto-scaling |
| Queries | Rich queries, aggregation, Atlas Search | Limited queries; primary key and GSIs/LSIs |
| Pricing | Cluster tier / resource based | Provisioned throughput (RCU/WCU) or on-demand |

