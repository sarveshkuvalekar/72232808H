export function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function stddev(arr) {
  const avg = mean(arr);
  const sqDiffs = arr.map(x => (x - avg) ** 2);
  return Math.sqrt(mean(sqDiffs));
}

export function correlation(x, y) {
  const avgX = mean(x);
  const avgY = mean(y);
  const numerator = x.reduce((sum, xi, i) => sum + ((xi - avgX) * (y[i] - avgY)), 0);
  const denominator = stddev(x) * stddev(y) * x.length;
  return numerator / denominator;
}

export function calculateCorrelationMatrix(priceLists) {
  const n = priceLists.length;
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = correlation(priceLists[i], priceLists[j]);
    }
  }
  return matrix;
}
