const crypto = require("crypto");
const excecTime = require("execution-time")();

function callCrypto() {
  excecTime.start();
  crypto.pbkdf2("someSecret", "salt", 500000, 512, "sha512", (err, key) => {
    console.log(key);
    console.log(excecTime.stop());
    console.log("___________________");
  });
}
callCrypto();
callCrypto();
callCrypto();
callCrypto();
callCrypto();
callCrypto();

/**
Default Size: The libuv thread pool has a default size of 4 threads.
Purpose: This pool is used to offload synchronous, potentially blocking operations, primarily I/O tasks like file system operations (fs module functions) and DNS lookups, so they do not block the main Node.js event loop.
Configuration: You can change this default size in any Node.js version (up to a maximum of 1024) by setting the UV_THREADPOOL_SIZE environment variable before starting your application
 */
