import java.awt.Color;
import java.awt.Graphics;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JPanel;

public class BouncingBallPanel extends JPanel implements Runnable {

  private int x = 0;
  private int y = 0;

  private int deltaX = 10;
  private int deltaY = 10;

  private final int SIZE = 20;

  public BouncingBallPanel() {
    new Thread(this).start();
  }

  @Override
  protected void paintComponent(Graphics g) {
    super.paintComponent(g);
    g.setColor(Color.RED);
    g.fillOval(x, y, SIZE, SIZE);
  }

  private void updatePosition() {
    x += deltaX;
    y += deltaY;

    if (x >= getWidth() - SIZE || x <= 0)
      deltaX = -deltaX;

    if (y >= getHeight() - SIZE || y <= 0)
      deltaY = -deltaY;
  }

  @Override
  public void run() {
    while (true) {
      try {
        updatePosition();
        repaint();
        Thread.sleep(50);
      } catch (InterruptedException ex) {
        Logger.getLogger(BouncingBallPanel.class.getName())
            .log(Level.SEVERE, null, ex);
      }
    }
  }
}
