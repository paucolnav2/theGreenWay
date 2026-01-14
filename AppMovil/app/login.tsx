import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [idInput, setIdInput] = useState("");

  const entrar = () => {
    if (idInput === "") {
      Alert.alert("Error", "error id");
      return;
    }
    router.replace({
      pathname: "/(tabs)",
      params: { idUsuario: idInput } 
    });
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Text className="text-4xl font-bold text-[#32CD32] mb-10">
        GreenDelivery 
      </Text>

      <Text className="self-start ml-2 text-gray-400 mb-1">ID dirver:</Text>
      <TextInput
        className="w-full h-16 bg-gray-100 rounded-xl px-5 text-2xl font-bold text-center mb-5 border-2 border-gray-200"
        placeholder="Ej: 42"
        keyboardType="numeric"
        value={idInput}
        onChangeText={setIdInput}
      />

      <TouchableOpacity 
        className="w-full h-16 bg-black rounded-xl justify-center items-center shadow-lg"
        onPress={entrar}
      >
        <Text className="text-white text-xl font-bold">
          ENTRAR
        </Text>
      </TouchableOpacity>
    </View>
  );
}