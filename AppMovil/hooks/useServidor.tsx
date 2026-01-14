
export function useServidor() {
  

  const IP_SERVIDOR = "172.30.77.43"; 
  const PUERTO = "8080";

  const enviarCoordenadas = async (latitud: any, longitud: any, idUsuario: any) => {
    try {
 
      const datos = {
        lat: latitud,
        lon: longitud,
        userId: parseInt(idUsuario)
      };

      console.log("enviando a java...", datos);
      
      await fetch(`http://${IP_SERVIDOR}:${PUERTO}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
      
      console.log("recibido por el servidor!");

    } catch (error) {
    
      console.log("error de conex");
    }
  };

 
  return {
    enviarCoordenadas
  };
}