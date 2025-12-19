import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export function useRastreador() {
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState("sin activar");
  const encenderGPS = () => {
    setMensaje("pidiendo permiso...");

    Location.requestForegroundPermissionsAsync()
      .then((resultado) => {
        if (resultado.status !== 'granted') {
          Alert.alert("error", "falta permiso de gps");
          return;
        }

        setActivo(true);
        setMensaje("buscando satelites...");

        Location.getCurrentPositionAsync({})
          .then((ubicacion) => {
            const lat = ubicacion.coords.latitude;
            const lon = ubicacion.coords.longitude;
            setMensaje("lat: " + lat + " lon: " + lon);
          })
          .catch((error) => {
            setMensaje("error buscando: " + error.message);
          });
      })
      .catch((error) => {
        Alert.alert("error grave", error.message);
      });
  };

  // funcion interruptor
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