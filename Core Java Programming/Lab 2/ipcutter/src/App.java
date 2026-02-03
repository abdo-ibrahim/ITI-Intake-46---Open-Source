public class App {
    public static void main(String[] args) {

        String ipAddress = "192.168.1.1";

        System.out.println("The IP using split:");
        
        IPCutter cut = new IPCutter(ipAddress);
        int[] out = cut.doIPSplit();
        for (int part : out) {
            System.out.println(part);
        }

        System.out.println("The IP using StringTokenizer:");

        int[] out2 = cut.doIPTokenizer();
        for (int part : out2) {
            System.out.println(part);
        }
    }
}
