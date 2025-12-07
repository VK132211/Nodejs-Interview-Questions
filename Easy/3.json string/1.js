const book = {
    title:"Space X"
}
/**(method) JSON.stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string (+1 overload)

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

@param value — A JavaScript value, usually an object or array, to be converted.

@param replacer — A function that transforms the results.

@param space — Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.

@throws — {TypeError} If a circular reference or a BigInt value is found.
*/

const jsonstring=JSON.stringify(book);

//{"title":"Space X"}
console.log(jsonstring);
console.log(typeof jsonstring);
console.log(typeof book);

const projectConfig = {
    projectName: "API Builder",
    version: "1.2.0",
    settings: {
        databaseUrl: "localhost:5432",
        timeoutMs: 5000,
        featureFlags: ["auth", "logging", "caching"]
    }
};

// Use the space parameter (commonly 2 or 4 spaces)
console.log("--- Formatted for Readability (Debugging/Config Files) ---");
const prettyConfig = JSON.stringify(projectConfig, null, 2); 
// We pass 'null' for the replacer because we aren't filtering properties here

console.log(prettyConfig);

// Output:
// {
//   "projectName": "API Builder",
//   "version": "1.2.0",
//   "settings": {
//     "databaseUrl": "localhost:5432",
//     "timeoutMs": 5000,
//     "featureFlags": [
//       "auth",
//       "logging",
//       "caching"
//     ]
//   }
// }

const userProfile = {
    id: 101,
    username: 'jdoe',
    email: 'jdoe@example.com',
    passwordHash: 'a1b2c3d4e5f6', // Sensitive data
    lastLogin: new Date(),
    settings: {
        theme: 'dark',
        notifications: true,
    }
};

// Define the replacer function
// The function receives the key and value of each property
function sanitizeData(key, value) {
    // Check if the key is sensitive and return undefined to exclude it
    if (key === 'passwordHash') {
        return undefined; 
    }
    return value; // Otherwise, return the original value
}

// Usage in a real-world scenario (e.g., logging)
console.log("--- Logged Data (Production Safe) ---");
const safeLog = JSON.stringify(userProfile, sanitizeData);
console.log(safeLog);

// Output:
// {"id":101,"username":"jdoe","email":"jdoe@example.com","lastLogin":"2025-12-07T06:22:52.000Z","settings":{"theme":"dark","notifications":true}}



// Only keep 'id', 'username', and 'email'
const simpleLog = JSON.stringify(userProfile, ['id', 'username', 'email']);
console.log(simpleLog);

// Output:
// {"id":101,"username":"jdoe","email":"jdoe@example.com"}
