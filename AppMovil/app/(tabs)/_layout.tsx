import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '../../components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#32CD32', 
        headerShown: true,
        headerStyle: {
            backgroundColor: '#32CD32',
            shadowOpacity: 0, 
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
        },
        headerTitleAlign: 'center',

        tabBarButton: HapticTab,
        tabBarStyle: { 
            height: 60,
            paddingBottom: 10
        }, 
      }}>
      
      {/* tracker */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'The Green Way',
          tabBarIcon: ({ color }) => <Ionicons name="map" size={28} color={color} />,
        }}
      />
      {/* perfil */}
      <Tabs.Screen
        name="perfil" 
        options={{
          title: 'Mi Perfil',
       
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
        }}
      />
      
      
    </Tabs>
  );
}