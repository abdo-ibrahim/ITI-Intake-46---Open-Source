import javax.swing.JFrame;

public class App {
  public static void main(String[] args) throws Exception {
    JFrame frame = new JFrame("Bouncing Ball");
    BouncingBallPanel panel = new BouncingBallPanel();
    frame.setContentPane(panel);
    frame.setSize(400, 300);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
