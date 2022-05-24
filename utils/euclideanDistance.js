export function euclideanDistance(arr1, arr2) {
  var desc1 = Array.from(arr1);
  var desc2 = Array.from(arr2);
  return Math.sqrt(
    desc1
      .map(function (val, i) {
        return val - desc2[i];
      })
      .reduce(function (res, diff) {
        return res + Math.pow(diff, 2);
      }, 0)
  );
}
