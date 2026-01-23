import { useState, useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';
import { useServidor } from './useServidor';
import { usePermissionStore } from '@/presentation/store/usePermissionsStore';
import { PermissionStatus } from '@/infrastructure/interfaces/location';

export function useRastreador(idUsuario: any) {
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState("apagado");

  const timerRef = useRef<NodeJS.Timeout | number>(null);
  const { enviarCoordenadas } = useServidor();

  // https://stackoverflow.com/questions/76083826/how-do-i-get-the-current-location-in-react-native-expo
 //estructura pdf movileslocation parte 1
 const { locationStatus, requestLocationPermission } = usePermissionStore();

  const capturarYEnviar = useCallback(async () => {
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
  }, [idUsuario]);
  useEffect(() => {
  
    const cicloRastreo = async () => {
      if (!activo || locationStatus !== PermissionStatus.GRANTED) return;

      await capturarYEnviar();

      timerRef.current = setTimeout(cicloRastreo, 5000);
    };

    if (activo && locationStatus === PermissionStatus.GRANTED) {
      cicloRastreo(); 
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activo, locationStatus, capturarYEnviar]);

  const alternar = async () => {
    if (activo) {
      setActivo(false);
      setMensaje("Apagado");
      
      if (timerRef.current) clearTimeout(timerRef.current);
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