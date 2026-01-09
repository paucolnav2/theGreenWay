import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 
import BotonTurno from '@/components/BotonTurno';

export default function HomeScreen() {
  const { idUsuario } = useLocalSearchParams();
  const usuario = idUsuario || "desconocido";

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      
      <View className="w-full mb-10 mt-10">
        <Text className="text-3xl font-bold text-gray-800">
          Hola, rider {usuario} 
        </Text>
        <Text className="text-gray-400">
          a trabajar se ha dicho
        </Text>
      </View>

      <View className="w-full items-center flex-1">
        <BotonTurno idUsuario={usuario} />
      </View>

    </View>
  );
}