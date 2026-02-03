public class App {
  public static void main(String[] args) {

    int[] arr = new int[1000];
    for (int i = 0; i < arr.length; i++) {
      arr[i] = (int) (Math.random() * 10000);
    }

    ArrayAlgorithms m = new ArrayAlgorithms(arr);

    System.out.println("mx: " + m.max(arr));
    System.out.println("mn: " + m.min(arr));

    int target = arr[(int) (Math.random() * arr.length)];
    System.out.println("target: " + target);
    int bsIdx = m.binarySearch(arr, target);
    System.out.println("BS result: " + bsIdx + " | value: " + arr[bsIdx]);
  }
}
