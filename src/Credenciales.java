import java.io.*;

public class Credenciales {
    private String URL_DATABASE;
    private String USER_DATABASE;
    private String PASS_DATABASE;
    private int PORT_SERVER;

    public Credenciales() {
    }

    public void inicializar() throws IOException {
        BufferedReader br = new BufferedReader(new FileReader("server.properties"));
        String linea;
        while ((linea = br.readLine()) != null) {
            System.out.println(linea);
        }
    }

    public String getURL_DATABASE() {
        return URL_DATABASE;
    }

    public String getUSER_DATABASE() {
        return USER_DATABASE;
    }

    public String getPASS_DATABASE() {
        return PASS_DATABASE;
    }

    public int getPORT_SERVER() {
        return PORT_SERVER;
    }
}
