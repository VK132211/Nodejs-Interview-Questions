Q: Why does MongoDB use BSON instead of JSON?

A: BSON supports binary data, dates, ObjectIds, and is faster to parse than plain JSON.

Q: Difference between updateOne and replaceOne?

A: updateOne modifies fields; replaceOne replaces the entire document except _id.

Q: When should $elemMatch be used?

A: When multiple conditions must match the same array element.

Q: Why can indexes slow down writes?

A: Every insert/update must also update index structures.

Q: Difference between $match and find?

A: $match is used inside aggregation pipelines and can leverage indexes if placed early.

Q: When is $lookup a bad idea?

A: High-cardinality joins or large datasets—prefer data denormalization.

Q: How do you design MongoDB schemas?

A: Based on query patterns, not normalization rules.

Q: Difference between pre('save') and pre('updateOne')?

A: save runs only on .save(), not on update queries.

Q: Is populate a JOIN?

A: No. It runs multiple queries and merges results in memory.

Q: Atlas Search vs Text Index?

A: Atlas Search uses Lucene, supports scoring, fuzzy search, and synonyms.

Q: Does MongoDB support ACID?

A: Yes, at document level by default; multi-document via transactions.