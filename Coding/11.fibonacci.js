let dp;
dp = Array(100005).fill(-1);
function f(n) {
  if (n == 0 || n == 1) return n;
  if (dp[n] != -1) return dp[n];
  return (dp[n] = f(n - 1) + f(n - 2));
}
console.log(f(3));
console.log(dp);
