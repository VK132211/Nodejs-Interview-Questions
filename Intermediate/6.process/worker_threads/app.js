const express = require("express");
const { Worker, workerData } = require("worker_threads");

const app = express();

app.get("/heavy",(req,res)=>{



    let worker= new Worker("./worker.js",{workerData:"hello"});
    worker.on("message",(data)=>{
        console.log(data);
        console.log(worker.threadId);
        res.json({data});
        
    })

    worker.on("error",(err)=>{
        res.send("something went wrong!");
        throw err;
    })
})

app.get("/light",(req,res)=>{
    res.send("From light");
})

app.listen(6000,()=>{
    console.log("Listening to port 6000");
    
})
