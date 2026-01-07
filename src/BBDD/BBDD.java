package BBDD;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class BBDD {
    public void conectarBBDD () {
        String user = "root";
        String password = "1234";

        String url = "jdbc:mysql://localhost:3307/theGreenWay";

        try (Connection conexion = DriverManager.getConnection(url, user, password)) {
            System.out.println(conexion);
            Statement statement = conexion.createStatement();
            {
                String script1 = "INSERT INTO usuarios VALUES ('Prueba');";
                String script2 = "INSERT INTO logs VALUES (34.5, 23.5, 0);";
                statement.execute(script1);
                statement.execute(script2);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
