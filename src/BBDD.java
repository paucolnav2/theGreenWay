import Classes.Cliente;
import Classes.Usuarios;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BBDD {
    private static final Logger logger = Logger.getLogger(BBDD.class.getName());
    Credenciales cre = new Credenciales();
    String user = cre.getUSER_DATABASE();
    String password = cre.getPASS_DATABASE();
    String url = cre.getURL_DATABASE();

    public void insertarCliente (Cliente cliente) {
        try {
            cre.inicializar();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in main: "+e.getMessage()+".", e);
        }

        try (Connection conexion = DriverManager.getConnection(url, user, password)) {
            Statement statement = conexion.createStatement();
            {
                String scriptUser = "INSERT INTO usuarios (id) VALUES (?)";
                String scriptLog = "INSERT INTO logs (lat, lon, idUsuario) VALUES (?, ?, ?)";

                try (PreparedStatement psUsuario = conexion.prepareStatement(scriptUser)) {
                    psUsuario.setInt(1, cliente.getUserId());
                    psUsuario.executeUpdate();

                    try (PreparedStatement psLog = conexion.prepareStatement(scriptLog)) {
                        psLog.setDouble(1, cliente.getLat());
                        psLog.setDouble(2, cliente.getLon());
                        psLog.setInt(3, cliente.getUserId());

                        psLog.executeUpdate();
                        System.out.println("Datos guardados correctamente.");
                    }
                }
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in thread "+Thread.currentThread().getName()+": "+e.getMessage()+".", e);
        }
    }

    public int comprobarCredenciales(Usuarios usuario) {
        try (Connection conexion = DriverManager.getConnection(url, user, password)) {
            Statement statement = conexion.createStatement();
            {
                String script = "INSERT INTO logs (lat, lon, idUsuario) VALUES (?, ?, ?)";

                try (PreparedStatement psUsuario = conexion.prepareStatement(script)) {
                    
                }
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in thread "+Thread.currentThread().getName()+": "+e.getMessage()+".", e);
        }
        return 0;
    }
}
