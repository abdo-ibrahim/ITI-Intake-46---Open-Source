import java.awt.Color;
import java.awt.Graphics;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.swing.JPanel;

public class DateTimePanel extends JPanel implements Runnable {
  public DateTimePanel() {
    new Thread(this).start();
  }

  @Override
  public void paintComponent(Graphics g) {
    super.paintComponent(g);
    Date now = new Date();
    g.setColor(Color.black);
    int y = getHeight() / 2;
    g.setFont(g.getFont().deriveFont(20.0f));
    g.drawString(now.toString(), 50, y);
  }

  @Override
  public void run() {
    while (true) {
      try {
        this.repaint();
        Thread.sleep(1000);
      } catch (InterruptedException ex) {
        Logger.getLogger(DateTimePanel.class.getName()).log(Level.SEVERE, null, ex);
      }
    }
  }
}