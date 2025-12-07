const book = '{"title":"Space X"}'

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.

@param text — A valid JSON string.

@param reviver
A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is.

@throws — {SyntaxError} If text is not valid JSON.
 */
const jsObject= JSON.parse(book);

//{ title: 'Space X' }
console.log(jsObject);
console.log(typeof jsObject);
console.log(typeof book);


const jsonStringFromServer = '{"name":"Jane Doe", "birthDate":"1990-05-20T10:00:00.000Z", "city":"New York"}';

function dateReviver(key, value) {
    // Check if the property name indicates a date or if the value matches a date string pattern
    if (key.endsWith('Date') && typeof value === 'string') {
        // Attempt to create a Date object
        const dateMatch = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*Z/.exec(value);
        if (dateMatch) {
            return new Date(value); // Return the actual Date object
        }
    }
    // For all other keys and values, return the value as-is
    return value; 
}

const userObject = JSON.parse(jsonStringFromServer, dateReviver);

console.log(userObject.birthDate); // Output: A proper JavaScript Date object, e.g., Mon May 20 1990 ...
console.log(userObject.birthDate.getFullYear()); // You can now use Date methods
