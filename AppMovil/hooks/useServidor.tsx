import TcpSocket from 'react-native-tcp-socket';

export function useServidor() {

  const IP_SERVIDOR = "localhost";
  const PUERTO = "8080";

  const enviarCoordenadas = (latitud: any, longitud: any, idUsuario: any) => {
    const datos = {
      lat: latitud,
      lon: longitud,
      userId: parseInt(idUsuario)
    };

      console.log("enviando a java...", datos);
      
      await fetch(`${IP_SERVIDOR}:${PUERTO}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
      
      console.log("recibido por el servidor!");

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
