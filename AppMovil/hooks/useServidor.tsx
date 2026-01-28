import TcpSocket from 'react-native-tcp-socket';

export function useServidor() {
  
  const IP_SERVIDOR = "10.0.2.2";
  const PUERTO = 8080;

  const enviarCoordenadas = (latitud: any, longitud: any, userName: any) => {
    
    return new Promise((resolve, reject) => {
      const datos = {
        lat: latitud,
        lon: longitud,
        userName: userName
      };

      const jsonEnviar = JSON.stringify(datos);
      console.log("enviando por tcp...", jsonEnviar);

      const cliente = TcpSocket.createConnection({
        port: PUERTO,
        host: IP_SERVIDOR,
      }, () => {
        cliente.write(jsonEnviar + '\n');
      });

      cliente.on('data', (data) => {
        const response = data.toString().trim();
        console.log("Servidor responde:", response);

        if (response.startsWith('RECIBIDO')) {
          resolve(true);
        } else if (response === '1') {
          resolve(true);
        } else {
          resolve(true);
        }

        cliente.end();
      });



      cliente.on('error', (error) => {
        console.log("fallo algo en el socket", error);
        reject(error);
      });

      cliente.on('close', () => {
        console.log("conexion cerrada");
      });
      
    });
  };


const validarCredenciales = (usuario: string, clave: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      
      
      const datos = {
        userName: usuario,  
        password: clave    
      };
      

      /* //
      const datos = {
        id: parseInt(usuario),
        pass: clave
      };
      */

      const client = TcpSocket.createConnection({ port: PUERTO, host: IP_SERVIDOR }, () => {
       client.write(JSON.stringify(datos) + '\n');
      });

      client.on('data', (data) => {
        const respuesta = data.toString().trim();
        console.log("Respuesta servidor:", respuesta);
        client.end();

        // Si devuelve '1', el login es válido
        if (respuesta === '1') {
          resolve(true);
        } else {
          resolve(false);
        }
      });

      client.on('error', (error) => {
        console.log("Error socket:", error);
        reject(error);
      });
    });
  };

  return {
    enviarCoordenadas,
    validarCredenciales
  };
}
