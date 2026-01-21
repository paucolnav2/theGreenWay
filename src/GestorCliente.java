import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;

public class GestorCliente implements Runnable {
    private final Socket socket;

    public GestorCliente(Socket socket) {
        this.socket = socket;
    }
    private static final Logger logger = Logger.getLogger(GestorCliente.class.getName());

    @Override
    public void run() {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
            String linea;
            String nuevo = "";

            while ((linea = br.readLine()) != null) {
                if (linea.startsWith("GET") || linea.startsWith("POST")) {
                    System.out.println("Cliente HTTP detectado, cerrando conexión.");
                    socket.close();
                    return;
                }
                System.out.println("Cliente " + socket.getInetAddress() + ": " + linea);
                nuevo = nuevo + linea;
            }
            Gson gson = new Gson();
            Cliente c = gson.fromJson(nuevo, Cliente.class);

            (new BBDD()).insertarCliente(c);
        } catch (IOException e) {
            System.out.println("Cliente desconectado: "+ socket.getInetAddress());
        }
        catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in thread "+Thread.currentThread().getName()+": "+e.getMessage()+".", e);
        }
        finally {
            try {
                socket.close();
            } catch (IOException ignored) {}
        }
    }
}