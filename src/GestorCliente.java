import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class GestorCliente implements Runnable {
    private Socket socket;
    private final int port;

    public GestorCliente(Socket socket, int port) {
        this.socket = socket;
        this.port = port;
    }

    @Override
    public void run() {
        //conexion BBDD
        try (ServerSocket ss = new ServerSocket(port)){
            socket = ss.accept();
            BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String linea;

            while ((linea = br.readLine()) != null) {
                System.out.println(linea);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}