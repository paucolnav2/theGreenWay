package BBDD;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class BBDD {
    public void conectarBBDD () {
        String user = "root";
        String password = "1234";

        String url = "jdbc:mysql://localhost:3307/roguelitee";

        try (Connection conexion = DriverManager.getConnection(url, user, password)) {
            Statement statement = conexion.createStatement();
            {

            }
        } catch (Exception e) {

        }
    }
}