/**
 * A callback function is a function that is passed to another function as
 * an argument and called back from the function later on.
 */

function countDown(callback){
    setTimeout(()=>{
        callback("CountDown Finished")
    },3000)
}

countDown((val)=>console.log(val));