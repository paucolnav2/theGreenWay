import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface BotonTurnoProps {
  activo: boolean;
  mensaje: string;
  alternar: () => void;
}

export default function BotonTurno({ activo, mensaje, alternar }: BotonTurnoProps) {


  return (
    <View className="w-full flex-1 items-center">
      
      {/* Boton ubi*/}
      <TouchableOpacity
        className={`w-80 h-80  mt-6 justify-center items-center rounded-full border-8 shadow-xl ${activo ? 'bg-red-500 border-red-100' : 'bg-[#32CD32] border-gray-100'
          }`}
        onPress={alternar}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activo ? "stop" : "bicycle"}
          size={70}
          color="white"
          style={{ marginBottom: 10 }}
        />

        <Text className="text-white text-4xl font-bold text-center leading-8">
          {activo ? "PEDIDO\nENTREGADO" : "INICIAR\nRUTA"}
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