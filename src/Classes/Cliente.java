package Classes;

public class Cliente {
    private double lat;
    private double lon;
    private String userName;

    public Cliente(double lat, double lon, String userName) {
        this.lat = lat;
        this.lon = lon;
        this.userName = userName;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    public String getUserName() {
        return userName;
    }
}