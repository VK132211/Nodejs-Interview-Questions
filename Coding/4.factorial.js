let dp;
function f(n) {
  if (n == 0 || n == 1) return n;
  if (dp[n] != -1) return dp[n];
  return (dp[n] = n * f(n - 1));
}
dp = Array(100005).fill(-1);
console.log(f(5));
console.log(f(4));
