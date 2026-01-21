import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BBDD {
    private static final Logger logger = Logger.getLogger(BBDD.class.getName());
    public void insertarCliente (Cliente cliente) throws SQLException {
        Credenciales cre = new Credenciales();
        try {
            cre.inicializar();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in credentials: "+e.getMessage()+".", e);
        }
        String user = cre.getUSER_DATABASE();
        String password = cre.getPASS_DATABASE();
        String url = cre.getURL_DATABASE();

        try (Connection conexion = DriverManager.getConnection(url, user, password)) {
            System.out.println(conexion);

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
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception in thread "+Thread.currentThread().getName()+": "+e.getMessage()+".", e);
        }
    }
}
