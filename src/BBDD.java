import Classes.Cliente;
import Classes.Usuarios;

import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BBDD {
    private static final Logger logger = Logger.getLogger(BBDD.class.getName());

    public String insertarCliente (Cliente cliente) {
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
            Statement statement = conexion.createStatement();
            {
                String script = "INSERT INTO logs (lat, lon, idUsuario) VALUES (?, ?, (SELECT id FROM usuarios WHERE userName = ?))";

                try (PreparedStatement psLog = conexion.prepareStatement(script)) {
                    psLog.setDouble(1, cliente.getLat());
                    psLog.setDouble(2, cliente.getLon());
                    psLog.setString(3, cliente.getUserName());

                    psLog.executeUpdate();
                    System.out.println("Datos guardados correctamente.");
                    return "RECIBIDO";
                }
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in thread "+Thread.currentThread().getName()+": "+e.getMessage()+".", e);
        }
        return "NO_RECIBIDO";
    }

    public int comprobarCredenciales(Usuarios usuario) {
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
            Statement statement = conexion.createStatement();
            {
                String script = "SELECT COUNT(*) FROM usuarios WHERE userName = ? AND password = ?;";

                try (PreparedStatement psUsuario = conexion.prepareStatement(script)) {
                    psUsuario.setString(1, usuario.getUserName());
                    psUsuario.setString(2, usuario.getPassword());

                    ResultSet rs = psUsuario.executeQuery();
                    rs.next();
                    return rs.getInt(1);
                }
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in thread "+Thread.currentThread().getName()+": "+e.getMessage()+".", e);
        }
        return 0;
    }
}
