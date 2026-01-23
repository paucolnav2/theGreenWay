import TcpSocket from 'react-native-tcp-socket';

export function useServidor() {
  
  const IP_SERVIDOR = "10.0.2.2"; 
  const PUERTO = 8080;

  const enviarCoordenadas = (latitud: any, longitud: any, idUsuario: any) => {
    const datos = {
      lat: latitud,
      lon: longitud,
      userId: parseInt(idUsuario)
    };

    const jsonEnviar = JSON.stringify(datos);
    console.log("enviando por tcp...", jsonEnviar);
    const client = TcpSocket.createConnection({
      port: PUERTO,
      host: IP_SERVIDOR,
    }, () => {
      client.write(jsonEnviar, 'utf8', () => {
        
        client.end();
      });
    });

    client.on('error', (error) => {
      console.log("fallo algo en el socket", error);
    });

    client.on('close', () => {
      console.log("conexion cerrada");
    });
  };

  return {
    enviarCoordenadas
  };
}