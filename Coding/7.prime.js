function isPrime(n){
    if(n<=1) return false;
    for(let i=2;i<=Math.sqrt(n);i++){
        if(n%i===0){
            return false;
        }
    }
    return true;
}

console.log(isPrime(77));
console.log(isPrime(2));
console.log(isPrime(93));
