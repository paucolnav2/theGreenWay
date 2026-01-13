import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRastreador } from '../hooks/useRastreador';
import { Ionicons } from '@expo/vector-icons';

export default function BotonTurno({ idUsuario }: any) {
  // trabaja o no
  const { activo, mensaje, alternar } = useRastreador(idUsuario);

  return (
    <View className="w-full flex-1 items-center  ">


      {/* Boton ubi*/}
      <TouchableOpacity
        className={`w-64 h-64 justify-center items-center rounded-full border-8 shadow-xl ${activo ? 'bg-red-500 border-red-100' : 'bg-[#32CD32] border-gray-100'
          }`}
        onPress={alternar}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activo ? "stop" : "bicycle"}
          size={50}
          color="white"
          style={{ marginBottom: 10 }}
        />

        <Text className="text-white text-3xl font-bold text-center leading-8">
          {activo ? "TERMINAR\nTURNO" : "INICIAR\nRUTA"}
        </Text>
      </TouchableOpacity>





      {/* coords */}
      {activo && (
        <View className="absolute bottom-8 w-[90%] bg-white rounded-2xl p-6 border-2 border-gray-300 shadow-lg">
          <Text className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
            Ubicación en tiempo real
          </Text>
          <Text className="text-center text-lg font-mono font-bold text-gray-800">
            {mensaje}
          </Text>
        </View>
      )}

    </View>
  );
}