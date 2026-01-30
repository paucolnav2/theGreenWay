import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth'; // Tu hook de autenticación
import { useGlobalSearchParams } from 'expo-router';

export default function CustomDrawerContent(props: any) {
  const { bottom } = useSafeAreaInsets();
  const { cerrarSesion } = useAuth(); 
  const { idUsuario } = useGlobalSearchParams();

 const userName = Array.isArray(idUsuario) ? idUsuario[0] : (idUsuario || "Rider");

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        

        <View className="p-5 border-b border-gray-100 items-center bg-white mb-2">
            <View className="w-20 h-20 bg-gray-200 rounded-full mb-3 justify-center items-center overflow-hidden">
                <Ionicons name="person" size={40} color="gray" />
            </View>
            <Text className="font-bold text-xl text-gray-800">{userName}</Text>
            <Text className="text-green-600 text-sm font-bold">● Conectado</Text>
        </View>

        <DrawerItemList {...props} />

      </DrawerContentScrollView>

      <View className="p-5 border-t border-gray-100" style={{ paddingBottom: 20 + bottom }}>
        <TouchableOpacity 
            onPress={cerrarSesion}
            className="flex-row items-center justify-center bg-red-50 p-3 rounded-xl"
        >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="ml-2 text-red-500 font-bold">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}