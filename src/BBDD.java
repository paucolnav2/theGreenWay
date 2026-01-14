import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BBDD {
    private static final Logger logger = Logger.getLogger(BBDD.class.getName());
    public void conectarBBDD () {
        Credenciales cre = new Credenciales();
        try {
            cre.inicializar();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in main: "+e.getMessage()+".", e);
        }
        String user = cre.getUSER_DATABASE();
        String password = cre.getPASS_DATABASE();

        String url = cre.getURL_DATABASE();

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
            logger.log(Level.SEVERE, "Exception in thread "+Thread.currentThread().getName()+": "+e.getMessage()+".", e);
        }
    }
}
