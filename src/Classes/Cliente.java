package Classes;

public class Cliente {
    private double lat;
    private double lon;
    private int userId;

    public Cliente(double lat, double lon, int userId) {
        this.lat = lat;
        this.lon = lon;
        this.userId = userId;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    public int getUserId() {
        return userId;
    }
}