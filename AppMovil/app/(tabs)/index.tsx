import BotonTurno from '@/components/BotonTurno';
import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (

    <View className="flex-1 bg-white pt-">
      <View className="flex-1 justify-center items-center">
        
        <Text className="text-3xl font-bold text-green-700 mb-10">
          GreenDelivery s1
        </Text>
        
        <BotonTurno />
        
      </View>
    </View>
  );
}