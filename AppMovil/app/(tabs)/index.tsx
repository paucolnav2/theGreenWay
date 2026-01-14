import React from 'react';
import { View, Text } from 'react-native';
import { useGlobalSearchParams } from 'expo-router'; 
import BotonTurno from '@/components/BotonTurno';
import MapView from 'react-native-maps';

export default function HomeScreen() {
  const { idUsuario } = useGlobalSearchParams();
  const usuario = idUsuario || "desconocido";

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
            style={{ width: '100%', height: '100%' }}
            showsUserLocation={true}
            followsUserLocation={true}
            loadingEnabled={true}
        />
        
        <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md border border-gray-200">
            <Text className="text-[10px] font-bold text-[#32CD32]">● EN VIVO</Text>
        </View>
      </View>


{/* boton trackear */}
      
        <BotonTurno idUsuario={usuario} />
      

    </View>
  );
}