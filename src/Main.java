import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.*;
import BBDD.BBDD;

public class Main {
    public static void main(String[] args) throws IOException {
        int puerto = 8080; //temporal
        Scanner sc = new Scanner(System.in);
        System.out.println("Bienvenido al programa \n***********************************************************");

        BBDD polola = new BBDD();
        polola.conectarBBDD();
    }
}