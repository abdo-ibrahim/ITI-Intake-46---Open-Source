public class ArrayAlgorithms {
  int[] arr;

  public ArrayAlgorithms(int[] arr) {
    this.arr = arr;
  }

  public int max(int[] arr) {
    long startTime = System.currentTimeMillis();
    int mx = arr[0];
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] > mx) {
        mx = arr[i];
      }
    }
    long endTime = System.currentTimeMillis();
    System.out.println("Time taken for max: " + (endTime - startTime) + "ms");
    return mx;
  }

  public int min(int[] arr) {
    long startTime = System.currentTimeMillis();
    int mn = arr[0];
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] < mn) {
        mn = arr[i];
      }
    }
    long endTime = System.currentTimeMillis();
    System.out.println("Time taken for min: " + (endTime - startTime) + "ms");
    return mn;
  }

  private int[] sort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      int minIdx = i;
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      int temp = arr[minIdx];
      arr[minIdx] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  public int binarySearch(int[] arr, int target) {
    long startTime = System.currentTimeMillis();
    arr = sort(arr);
    int l = 0, r = arr.length - 1;
    while (l <= r) {
      int mid = l + (r - l) / 2;
      if (arr[mid] == target) {
        long endTime = System.currentTimeMillis();
        System.out.println("Time taken for BS: " + (endTime - startTime) + "ms");
        return mid;
      }
      if (arr[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    long endTime = System.currentTimeMillis();
    System.out.println("Time taken for BS: " + (endTime - startTime) + "ms");
    return -1;
  }
}