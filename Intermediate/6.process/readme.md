# Can Node.js process heavy data that requires high CPU usage? if yes, How this is done?

1. Splitting up tasks with setImmediate
2. Spawning a child process
3. Using cluster
4. Using worker threads

### process
**A process is an instance of the program you run on a system.**

### modules used

child_process and cluster modules are used to create new processes

Spawn -> runs a command in a new process. the data gets returned after running a command will be in form of streams . there is no limit in size of resposne becaue it is sent back in chunks.

Exec -> also runs a command in a process but the response is in the form of buffer. if response size > buffer size app crashes. A shell is spawned and command is executed.

Fork -> Spawns a new Node.js process like any of the previous methods. The communication channel is established to the child proces when using fork, so we can use a function called send on the forked processes to exchange messages b/w the paret amd the forked process.

every child process has it's own V8 instance, libuv and node.js

**when process isolation is not needed, use the worker_threads module, which allows running multiple application threads with in a single Node.js instance**

worker_threads live in same memory so they use lot of less memory than a process cluster setup. utilize multiple cpu cores in a single Node.js process. (execute javascript in parallel)

worker_threads can share memory . they do so by transferring ArrayBuffer instances or sharing SharedArrayBuffer instances.

autocanon can be used to test how many concurrent requests can be made 
`npm i autocanon -g`
`autocanon -c 5 http://localhost:5000/heavy`

