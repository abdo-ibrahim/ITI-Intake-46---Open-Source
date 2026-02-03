public class App {
    public static void main(String[] args) {
        String str = "the quick brown fox jumps over the lazy dog the";
        String word = "the";

        Occurences occ = new Occurences(str, word);

        System.out.println("count with split: " + occ.countWithSplit());

        System.out.println("count with indexOf: " + occ.countWithIndexOf());
    }
}
