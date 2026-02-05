import java.awt.Color;
import java.awt.Graphics;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JPanel;

public class MarqueePanel extends JPanel implements Runnable {

  private int x = 0;

  public MarqueePanel() {
    new Thread(this).start();
  }

  @Override
  public void paintComponent(Graphics g) {
    super.paintComponent(g);
    g.setColor(Color.BLACK);
    g.setFont(g.getFont().deriveFont(24.0f));
    int y = getHeight() / 2;
    g.drawString("Text", x, y);
  }

  private void updatePosition() {
    x += 5;
    if (x > getWidth()) {
      x = -50;
    }
  }

  @Override
  public void run() {
    while (true) {
      try {
        repaint();
        Thread.sleep(100);

        updatePosition();

      } catch (InterruptedException ex) {
        Logger.getLogger(MarqueePanel.class.getName()).log(Level.SEVERE, null, ex);
      }
    }

  }
}
