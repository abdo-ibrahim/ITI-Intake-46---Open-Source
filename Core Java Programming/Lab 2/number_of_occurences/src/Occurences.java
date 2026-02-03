public class Occurences {
  String sentence;
  String word;

  public Occurences(String sentence, String word) {
    this.sentence = sentence;
    this.word = word;
  }

  public int countWithSplit() {
    String[] words = this.sentence.split(" ");
    int count = 0;
    for (String w : words) {
      if (w.equals(this.word)) {
        count++;
      }
    }
    return count;
  }

  public int countWithIndexOf() {
    int count = 0;
    int i = 0;
    while (i <= this.sentence.length() - this.word.length()) {
      i = this.sentence.indexOf(this.word, i);
      if (i != -1) {
        count++;
        i += this.word.length();
      } else {
        break;
      }
    }
    return count;
  }
}
