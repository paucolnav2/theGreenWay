import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth'; 


export default function LoginScreen() {
    const { user, pass, error, cargando, setUser, setPass, onLoginPress } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 justify-center items-center p-5">
                        <View className="w-full max-w-sm">
                            
                            <Text className="text-3xl font-bold text-[#32CD32] mb-8 text-center">
                                GreenDelivery
                            </Text>
                            <Text className="text-gray-500 mb-2">Usuario</Text>
                            <TextInput
                                className="w-full bg-gray-100 p-4 rounded-xl mb-4 border border-gray-200"
                                placeholder="Nombre de usuario" 
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="none" 
                                value={user}
                                onChangeText={setUser}
                            />

                            <Text className="text-gray-500 mb-2">Contraseña</Text>
                            <TextInput
                                className="w-full bg-gray-100 p-4 rounded-xl mb-4 border border-gray-200"
                                placeholder="••••••"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                autoCapitalize="none"
                                value={pass}
                                onChangeText={setPass}
                            />

                            {error ? (
                                <Text className="mb-4 text-center text-red-500 font-bold">
                                    {error}
                                </Text>
                            ) : null}

                            <TouchableOpacity
                                className="w-full bg-[#32CD32] p-4 rounded-xl items-center shadow-sm mt-2"
                                onPress={onLoginPress}
                                disabled={cargando}
                            >
                                {cargando ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text className="text-white font-bold text-lg">ENTRAR</Text>
                                )}
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}