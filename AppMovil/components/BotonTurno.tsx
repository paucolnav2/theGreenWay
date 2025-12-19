import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRastreador } from '../hooks/useRastreador'; 

export default function BotonTurno() {
  const { activo, mensaje, alternar } = useRastreador();

  return (

    <View className="items-center mt-5 w-full">
  
      <Text className="text-lg font-bold mb-3">
        Estado: {activo ? "TRABAJANDO" : "DESCANSANDO"}
      </Text>
      
      <Text className="text-blue-600 mb-5 text-center px-5">
        {mensaje}
      </Text>
      <View className="w-[200px]">
        <Button 
          title={activo ? "TERMINAR" : "EMPEZAR"}
          onPress={alternar}
          color={activo ? "red" : "green"} 
        />
      </View>
    </View>
  );
}