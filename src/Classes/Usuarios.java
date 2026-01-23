package Classes;

public class Usuarios {
    private String userName;
    private String password;

    public Usuarios(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}