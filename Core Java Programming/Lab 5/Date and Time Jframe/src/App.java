import javax.swing.JFrame;

public class App {
  public static void main(String[] args) {
    JFrame f = new JFrame();
    DateTimePanel panel = new DateTimePanel();
    f.setContentPane(panel);
    f.setVisible(true);
    f.setTitle("Date and Time");
    f.setSize(400, 300);
  }
}
