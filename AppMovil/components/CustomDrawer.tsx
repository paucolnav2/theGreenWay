import React from 'react';
import { View, Text, TouchableOpacity, Linking, Switch } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useGlobalSearchParams } from 'expo-router';
import { useModoOscuro } from '@/presentation/store/useModoOscuro';

export default function CustomDrawerContent(props: any) {
  const { bottom } = useSafeAreaInsets();
  const { cerrarSesion } = useAuth(); 
  const { idUsuario } = useGlobalSearchParams();
  const { modoNoche, toggleModoNoche } = useModoOscuro();

  const userName = Array.isArray(idUsuario) ? idUsuario[0] : (idUsuario || "Rider");

  const llamarCentralita = () => {
    Linking.openURL('tel:635559142');
  };

  return (
    <View style={{ flex: 1, backgroundColor: modoNoche ? '#121212' : 'white' }}>
      <DrawerContentScrollView {...props}>
        
        <View className={`p-5 border-b mb-6 items-center ${modoNoche ? 'border-gray-800' : 'border-gray-100'}`}>
            <View className={`w-24 h-24 rounded-full mb-4 justify-center items-center overflow-hidden ${modoNoche ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <Ionicons name="person" size={50} color={modoNoche ? 'white' : 'gray'} />
            </View>
            <Text className={`font-bold text-2xl mb-1 ${modoNoche ? 'text-white' : 'text-gray-800'}`}>{userName}</Text>
            <Text className="text-green-600 text-base font-bold">● Conectado</Text>
        </View>

        <View className="px-5 mb-6">
             <View className={`flex-row justify-between items-center p-4 rounded-2xl ${modoNoche ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <View className="flex-row items-center">
                    <Ionicons name="moon" size={22} color={modoNoche ? 'white' : 'black'} />
                    <Text className={`ml-3 font-bold text-lg ${modoNoche ? 'text-white' : 'text-gray-800'}`}>Modo Oscuro</Text>
                </View>
                <Switch
                    trackColor={{ false: "#e5e7eb", true: "#32CD32" }}
                    thumbColor={"#ffffff"}
                    onValueChange={toggleModoNoche}
                    value={modoNoche}
                />
             </View>
        </View>

        <View className="px-5">
            <Text className={`font-bold mb-3 ml-1 text-xs uppercase tracking-widest ${modoNoche ? 'text-gray-500' : 'text-gray-400'}`}>
                Soporte en Ruta
            </Text>
            
            <TouchableOpacity 
                onPress={llamarCentralita}
                className={`flex-row items-center p-4 rounded-2xl mb-4 border shadow-sm ${modoNoche ? 'bg-gray-900 border-gray-800' : 'bg-blue-50 border-blue-100'}`}
                activeOpacity={0.7}
            >
                <View className="bg-blue-500 p-3 rounded-full mr-4">
                    <Ionicons name="call" size={24} color="white" />
                </View>
                <View className="flex-1">
                    <Text className={`font-bold text-lg ${modoNoche ? 'text-white' : 'text-blue-900'}`}>Centralita</Text>
                    <Text className="text-blue-500 text-xs">Reportar accidente o incidencia</Text>
                </View>
            </TouchableOpacity>
        </View>

      </DrawerContentScrollView>

      <View className="p-5" style={{ paddingBottom: 30 + bottom }}>
        <TouchableOpacity 
            onPress={cerrarSesion}
            className={`flex-row items-center justify-center p-5 rounded-3xl border ${modoNoche ? 'bg-gray-900 border-gray-800' : 'bg-red-50 border-red-100'}`}
            activeOpacity={0.7}
        >
            <Ionicons name="log-out-outline" size={28} color="#EF4444" />
            <Text className="ml-3 text-red-500 font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}