import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.*;
import BBDD.BBDD;

public class Main {
    public static void main(String[] args) throws IOException {
        Credenciales cre = new Credenciales();
        cre.inicializar();
        //llamada función credenciales
        int puerto = cre.getPORT_SERVER(); //temporal
        Scanner sc = new Scanner(System.in);
        System.out.println("Bienvenido al programa \n***********************************************************");

        try (ServerSocket serverSocket = new ServerSocket(puerto)) {
            System.out.println("Servidor iniciado en el puerto " + puerto+".");

            while (true) {
                Socket socketCliente = serverSocket.accept();
                System.out.println("Cliente conectado: " + socketCliente.getInetAddress().getHostAddress());

                Thread hilo = new Thread(new GestorCliente(socketCliente));
                hilo.start();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
