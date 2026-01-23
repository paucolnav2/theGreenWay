import Logs.LogsController;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {
    private static final Logger logger = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        Thread.setDefaultUncaughtExceptionHandler((hilo, e) -> {
            logger.log(Level.SEVERE, "Exception in thread "+hilo.getName()+": "+e.getMessage()+".", e);
        });
        LogsController.inicializar();
        Credenciales cre = new Credenciales();
        try {
            cre.inicializar();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in main: "+e.getMessage()+".", e);
        }

        int puerto = cre.getPORT_SERVER();
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
            logger.log(Level.SEVERE, "Exception in main: "+e.getMessage()+".", e);
        }
    }
}
