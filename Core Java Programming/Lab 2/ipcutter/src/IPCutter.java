import java.util.StringTokenizer;

public class IPCutter {
  String cmdLine;

  public IPCutter(String cmdLine) {
    this.cmdLine = cmdLine;
  }

  int[] doIPSplit() {
    String[] parts = cmdLine.split("\\.");
    int[] ipParts = new int[parts.length];
    for (int i = 0; i < parts.length; i++) {
      ipParts[i] = Integer.parseInt(parts[i]);
    }
    return ipParts;
  }

  int[] doIPTokenizer() {
    StringTokenizer st = new StringTokenizer(cmdLine, ".");
    int[] ipParts = new int[st.countTokens()];
    int i = 0;
    while (st.hasMoreTokens()) {
      ipParts[i++] = Integer.parseInt(st.nextToken());
    }
    return ipParts;
  }

}
