import Classes.Cliente;
import Classes.Usuarios;
import com.google.gson.Gson;

import java.io.*;
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
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {}

        try (
                BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                PrintWriter salida = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()))
            ) {
            String nuevo = br.readLine();
            System.out.println("Cliente " + socket.getInetAddress() + ": " + nuevo);

            /*String [] nuevoLista = nuevo.split(",");
            Classes.Cliente c = new Classes.Cliente(Double.parseDouble(nuevoLista[0].split(":")[1]), Double.parseDouble(nuevoLista[1].split(":")[1]), Integer.parseInt((nuevoLista[2].split(":")[1]).replace("}","")));
            */
            if (nuevo.split(",").length == 2) {
                Gson gson = new Gson();
                Usuarios u = gson.fromJson(nuevo, Usuarios.class);
                salida.println((new BBDD()).comprobarCredenciales(u));
            }
            else if (nuevo.split(",").length == 3) {
                Gson gson = new Gson();
                Cliente c = gson.fromJson(nuevo, Cliente.class);
                salida.println((new BBDD()).insertarCliente(c));
            }
            else {
                //mejorar esto
                System.out.println("Entrada nula");
            }
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