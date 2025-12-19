import React from 'react';
import { View, Text } from 'react-native';
import BotonTurno from '@/components/BotonTurno';

export default function HomeScreen() {
  return (

    <View className="flex-1 justify-center items-center bg-white p-5">
      
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-gray-800">
          GreenDelivery sprint1
        </Text>
      </View>

      <View className="w-full items-center">
        <BotonTurno />
      </View>

    </View>
  );
}