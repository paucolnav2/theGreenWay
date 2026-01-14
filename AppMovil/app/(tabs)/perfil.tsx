import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen() {
  const router = useRouter();
  const { idUsuario } = useGlobalSearchParams();
  const cerrarSesion = () => {
    router.replace('/login'); 
  };

  return (
    <View className="flex-1 bg-white items-center p-5 pt-20">
      <View className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center mb-5 border-4 border-[#32CD32]">
         <Ionicons name="accessibility-outline" color="#000000ff" size={20} />
      </View>
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Rider {idUsuario || "?"}
      </Text>
      <Text className="text-gray-500 mb-10">
        Transportista
      </Text>
      <View className="w-full bg-gray-50 p-5 rounded-xl mb-10">
        <Text className="text-gray-400 mb-2">ESTADÍSTICAS</Text>
        <Text className="text-lg font-bold text-gray-800"></Text>
        <Text className="text-lg font-bold text-gray-800"></Text>
        <Text className="text-lg font-bold text-gray-800"></Text>
      </View>

      <TouchableOpacity 
        className="w-full h-14 bg-red-500 rounded-xl justify-center items-center shadow-md mt-auto mb-10"
        onPress={cerrarSesion}
      >
        <Text className="text-white text-xl font-bold">
          CERRAR SESIÓN
        </Text>
      </TouchableOpacity>
    </View>
  );
}