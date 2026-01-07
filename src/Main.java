import java.util.*;
import BBDD.BBDD;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Bienvenido al programa \n***********************************************************");

        BBDD polola = new BBDD();
        polola.conectarBBDD();
    }
}