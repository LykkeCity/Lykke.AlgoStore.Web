export default class ArrayUtils {
  static BinaryInsert(value: any, array: any, startVal?: any, endVal?: any) {
    const length = array.length;
    const start = typeof(startVal) !== 'undefined' ? startVal : 0;
    const end = typeof(endVal) !== 'undefined' ? endVal : length - 1; // !! endVal could be 0 don't use || syntax
    const m = start + Math.floor((end - start) / 2);

    if (length === 0){
      array.push(value);
      return;
    }

    if (value > array[end]) {
      array.splice(end + 1, 0, value);
      return;
    }

    if (value < array[start]) {
      array.splice(start, 0, value);
      return;
    }

    if (start >= end) {
      return;
    }

    if (value < array[m]) {
      ArrayUtils.BinaryInsert(value, array, start, m - 1);
      return;
    }

    if (value > array[m]) {
      ArrayUtils.BinaryInsert(value, array, m + 1, end);
      return;
    }
  }
}
