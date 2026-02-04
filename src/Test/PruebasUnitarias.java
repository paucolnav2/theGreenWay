package Test;

import Classes.Cliente;
import Classes.Usuarios;
import com.google.gson.Gson;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class PruebasUnitarias {
    public String comprobarCredenciales(Usuarios u, Usuarios clave) {
        if (u.getUserName().equals(clave.getUserName()) && u.getPassword().equals(clave.getPassword())) {
            return "1";
        }
        return "0";
    }

    public String insertarCliente(Cliente c) {
        if (c.getUserName().equals("USUARIO_REPETIDO")) {
            return "NO_RECIBIDO";
        }
        return "RECIBIDO";
    }

    public class GestorCliente {
        private String salida;
        private String entrada = null;
        private Usuarios clave;

        public GestorCliente (String entrada, Usuarios clave) {
            this.entrada = entrada;
            this.clave = clave;
        }

        public GestorCliente (String entrada) {
            this.entrada = entrada;
        }

        public GestorCliente () {

        }

        public String ejecutar() {
            try {
                String nuevo = entrada;

                if (nuevo == null) {
                    return "Entrada nula";
                }
                if (nuevo.isEmpty()) {
                    return "Entrada longitud 0";
                }
                if (nuevo.split(",").length == 2) {
                    Usuarios u = new Gson().fromJson(nuevo, Usuarios.class);
                    salida = comprobarCredenciales(u, clave);
                } else if (nuevo.split(",").length == 3) {
                    Cliente c = new Gson().fromJson(nuevo, Cliente.class);
                    salida = insertarCliente(c);
                }
                else {
                    salida = "Entrada de longitud distinta";
                }
            } catch (Exception e) {
                salida = "Error fatal";
            }
            return salida;
        }
    }

    @Test
    public void PruebasNulo () {
        GestorCliente g = new GestorCliente();
        assertEquals("Entrada nula", g.ejecutar());
    }

    @Test
    public void PruebasCredencialesOk () {
        GestorCliente g = new GestorCliente("{'userName':'Pablo','password':'1234'}", new Usuarios("Pablo", "1234"));
        assertEquals("1", g.ejecutar());
    }

    @Test
    public void PruebasCredencialesMal () {
        GestorCliente g = new GestorCliente("{'userName':'Pablo','password':'1234'}", new Usuarios("Juan", "1234"));
        assertEquals("0", g.ejecutar());
    }

    @Test
    public void PruebasEntradaLen0 () {
        GestorCliente g = new GestorCliente("", new Usuarios("Pablo", "1234"));
        assertEquals("Entrada longitud 0", g.ejecutar());
    }

    @Test
    public void PruebasEntradaLen0Coma5 () {
        GestorCliente g = new GestorCliente("Entrada jeje", new Usuarios("Pablo", "1234"));
        assertEquals("Entrada de longitud distinta", g.ejecutar());
    }

    @Test
    public void PruebasEntradaLenMasDe3 () {
        GestorCliente g = new GestorCliente("{'userName':'Pablo','password':'1234','jeje':'parámetro extra','yotromas':'hola'}", new Usuarios("Pablo", "1234"));
        assertEquals("Entrada de longitud distinta", g.ejecutar());
    }

    @Test
    public void PruebasEntradaNula () {
        GestorCliente g = new GestorCliente(null, new Usuarios("Pablo", "1234"));
        assertEquals("Entrada nula", g.ejecutar());
    }

    @Test
    public void PruebasEntradaNula2 () {
        GestorCliente g = new GestorCliente("{'userName':'Pablo','password':'1234'}", null);
        assertEquals("Error fatal", g.ejecutar());
    }

    @Test
    public void PruebasInsertarOk () {
        GestorCliente g = new GestorCliente("{'lat':34.5667,'lon':-23.4566, 'userName': 'Juan'}");
        assertEquals("RECIBIDO", g.ejecutar());
    }

    @Test
    public void PruebasInsertarMal () {
        GestorCliente g = new GestorCliente("{'lat':34.5667,'lon':-23.4566, 'userName': 'USUARIO_REPETIDO'}");
        assertEquals("NO_RECIBIDO", g.ejecutar());
    }

    @Test
    public void PruebasValoresErroneos () {
        GestorCliente g = new GestorCliente("{'lat':'jeje','lon':'jeje', 'userName': 1234}");
        assertEquals("Error fatal", g.ejecutar());
    }
}