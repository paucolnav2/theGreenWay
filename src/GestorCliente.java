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
            String nuevo = br.readLine();
            System.out.println("Cliente " + socket.getInetAddress() + ": " + nuevo);

            Gson gson = new Gson();
            Cliente c = gson.fromJson(nuevo, Cliente.class);

            /*String [] nuevoLista = nuevo.split(",");
            Cliente c = new Cliente(Double.parseDouble(nuevoLista[0].split(":")[1]), Double.parseDouble(nuevoLista[1].split(":")[1]), Integer.parseInt((nuevoLista[2].split(":")[1]).replace("}","")));*/
            (new BBDD()).inicializarBBDD(c);
            System.out.println("Entrada añadida.");
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