import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import BotonTurno from '@/components/BotonTurno';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { useRastreador } from '@/hooks/useRastreador';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useModoOscuro } from '@/presentation/store/useModoOscuro';

export default function HomeScreen() {
  const { idUsuario } = useGlobalSearchParams();
  const usuario = Array.isArray(idUsuario) ? idUsuario[0] : (idUsuario || "desconocido");
  const { ruta, activo, mensaje, alternar } = useRastreador(usuario);
  const { modoNoche } = useModoOscuro();

  const initialRegion = {
    latitude: 40.4167,
    longitude: -3.7032,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} className={`flex-1 justify-start items-center p-5 ${modoNoche ? 'bg-[#121212]' : 'bg-white'}`}>

      
      {/*mapa timpo real https://www.npmjs.com/package/react-native-maps*/}
      <View className={`w-full h-80 rounded-2xl overflow-hidden border-2 shadow-sm mb-5 relative ${modoNoche ? 'border-gray-700' : 'border-gray-100'}`}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{ latitude: 40.4167, longitude: -3.7032 }}
            title={"Tu Ubicación"}
            description={"Rider conectado"}
          />
          <Polyline
            coordinates={ruta}
            strokeColor={modoNoche ? "#32CD32" : "#32cd4cff"}
            strokeWidth={6}       
            lineCap="round"       
            lineJoin="round"   
            geodesic={true}
          />
        </MapView>


      </View>
    

      {/* boton trackear */}
      
      <BotonTurno 
        activo={activo} 
        mensaje={mensaje} 
        alternar={alternar} 
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});