import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

public class GestorCliente implements Runnable {
    private final Socket socket;

    public GestorCliente(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
            String linea;
            String nuevo = "";

            // para debuggear
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
            Datos d = gson.fromJson(nuevo, Datos.class);
            //guardar en base de datos
        } catch (IOException e) {
            System.out.println("Cliente desconectado: "+ socket.getInetAddress());
        } finally {
            try {
                socket.close();
            } catch (IOException ignored) {}
        }
    }
}