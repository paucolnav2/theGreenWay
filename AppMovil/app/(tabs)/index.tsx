import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { useGlobalSearchParams } from 'expo-router'; 
import BotonTurno from '@/components/BotonTurno';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function HomeScreen() {
  const { idUsuario } = useGlobalSearchParams();
  const usuario = idUsuario || "desconocido";

  const initialRegion = {
    latitude: 40.4167,
    longitude: -3.7032,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      
      <View className="w-full mb-10 mt-10">
        <Text className="text-3xl font-bold text-gray-800">
          Hola, rider {usuario} 
        </Text>
      </View>
{/*mapa timpo real https://www.npmjs.com/package/react-native-maps*/}
<View className="w-full h-48 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm mb-5 relative">
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
        </MapView>
        
        <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md border border-gray-200">
            <Text className="text-[10px] font-bold text-[#32CD32]">● EN VIVO</Text>
        </View>
      </View>


{/* boton trackear */}
      
        <BotonTurno idUsuario={usuario} />
      

    </View>
  );
}
const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});