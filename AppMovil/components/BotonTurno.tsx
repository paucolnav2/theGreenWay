import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRastreador } from '../hooks/useRastreador'; 

export default function BotonTurno() {
  // trabaja o no
  const { activo, mensaje, alternar } = useRastreador();


  if (!activo) {
    return (
      <View className="w-full items-center">
  

        {/* Boton ubi*/}
        <TouchableOpacity 
          className="w-full h-[200px] bg-[#32CD32] justify-center items-center rounded-2xl shadow-lg"
          onPress={alternar}
        >
          <Text className="text-white text-3xl font-bold">
            INICIAR RUTA
          </Text>
        </TouchableOpacity>
        
      </View>
    );
  }

  return (
    <View className="w-full items-center">

      {/* Estado trabajador */}
      <TouchableOpacity 
        className="w-full h-[200px] bg-[#32CD32] justify-center items-center rounded-2xl shadow-lg"
        onPress={alternar}
      >
        <Text className="text-white text-2xl font-bold">
          TERMINAR TURNO
        </Text>
      </TouchableOpacity>

      {/* coords */}
      <View className="mt-8 p-4 bg-gray-100 rounded-lg w-full">
        <Text className="text-center text-xs text-gray-500 mb-1">
          DATOS gps:
          {mensaje}
        </Text>

      </View>

    </View>
  );
}