import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export function useRastreador() {
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState("sin activar");

  // https://stackoverflow.com/questions/76083826/how-do-i-get-the-current-location-in-react-native-expo

  const encenderGPS = async () => {
    try {
      setMensaje("pidiendo permiso...");

 
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Error", "Permiso de ubicación denegado");
        setMensaje("Falta permiso");
        return;
      }

      setActivo(true);
      setMensaje("buscando satelites...");

     
      let location = await Location.getCurrentPositionAsync({});
      
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      
      setMensaje("lat: " + lat + " lon: " + lon);

    } catch (error) {
      console.error("Error en GPS:", error); 
      //setMensaje("Error: " + error.message);
    }
  };

  const alternar = () => {
    if (activo) {
      setActivo(false);
      setMensaje("apagado");
    } else {
      encenderGPS();
    }
  };

  return {
    activo,
    mensaje,
    alternar
  };
}