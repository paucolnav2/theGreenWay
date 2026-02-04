import React from 'react';
import { View, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from '@/components/CustomDrawer';

function LogoTitle() {
  return (
    <View 
      className="flex-row items-center justify-center" 
      pointerEvents="none" 
    >
       <Image
        source={require('@/assets/images/logo-greendelivery.png')}
        style={{ width: 540, height: 180 }}
        resizeMode="contain"
      />
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#32CD32',
            elevation: 0,
            shadowOpacity: 0,
            height: 100,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitle: () => <LogoTitle />,
          
          drawerActiveTintColor: '#32CD32',
          drawerInactiveTintColor: 'gray',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Mapa de Ruta',
            drawerIcon: ({ color }) => <Ionicons name="map-outline" size={22} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}