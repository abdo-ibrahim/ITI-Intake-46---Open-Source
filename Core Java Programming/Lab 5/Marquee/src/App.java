import javax.swing.JFrame;

public class App {
  public static void main(String[] args) throws Exception {
    JFrame frame = new JFrame("Marquee");
    MarqueePanel marqueePanel = new MarqueePanel();
    frame.setContentPane(marqueePanel);
    frame.setSize(400, 200);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
