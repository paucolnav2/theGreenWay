import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useServidor } from './useServidor';
import { usePermissionStore } from '@/presentation/store/usePermissionsStore';
import { PermissionStatus } from '@/infrastructure/interfaces/location';

export function useRastreador(idUsuario: any) {
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState("apagado");
  const { enviarCoordenadas } = useServidor();

  // https://stackoverflow.com/questions/76083826/how-do-i-get-the-current-location-in-react-native-expo
 //estructura pdf movileslocation parte 1
 const { locationStatus, requestLocationPermission } = usePermissionStore();

  const capturarYEnviar = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      
      setMensaje(`Rastreando... \nLat: ${lat.toFixed(4)}\nLon: ${lon.toFixed(4)}`);
      enviarCoordenadas(lat, lon, idUsuario);
    } catch (error) {
      console.log("Error GPS:", error);
      setMensaje("Error obteniendo ubicación");
    }
  };
  useEffect(() => {
    let intervalo: any;
    if (activo && locationStatus === PermissionStatus.GRANTED) {
      capturarYEnviar();
      intervalo = setInterval(capturarYEnviar, 10000);
    } else if (locationStatus !== PermissionStatus.GRANTED && activo) {
      setActivo(false);
      setMensaje("Permiso perdido/denegado");
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [activo, locationStatus]);

  const alternar = async () => {
    if (activo) {
      setActivo(false);
      setMensaje("Apagado");
    } else {
      if (locationStatus === PermissionStatus.GRANTED) {
        setActivo(true);
        setMensaje("Iniciando...");
      } else {
        const status = await requestLocationPermission();
        if (status === PermissionStatus.GRANTED) {
          setActivo(true);
          setMensaje("Iniciando...");
        } else {
          setMensaje("Permiso necesario");
        }
      }
    }
  };

  return {
    activo,
    mensaje,
    alternar
  };
}