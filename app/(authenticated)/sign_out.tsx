import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const SignOut = () => {
  const [loggingOut, setLoggingOut] = useState(false); // Estado para controlar o processo de "saindo"
  const router = useRouter();

  const handleSignOut = async () => {
    setLoggingOut(true);  // Marca que o logout está em processo

    // Exibe "Deslogando..." por 2 segundos antes de realmente redirecionar
    setTimeout(async () => {
      try {
        // Remove o token do AsyncStorage
        await AsyncStorage.removeItem('authToken');
        // Redireciona para a página de não autenticado
        router.replace('/');
      } catch (error) {
        setLoggingOut(false); // Caso ocorra erro, encerre o loading
      }
    }, 2000); // 2 segundos de delay para dar a sensação de logout
  };

  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      {loggingOut ? (
        // Exibe o indicador de carregamento durante o logout com um delay
        <View className="items-center">
          <ActivityIndicator size="large" color="#f472b6" />
          <Text className="text-white mt-4 text-xl">Logging out...</Text>
        </View>
      ) : (
        // Após o logout, exibe o texto informando que o usuário foi deslogado
        <View className="items-center">
          <FontAwesome name="sign-out" size={50} color="#f472b6" />
          <Text className="text-white text-xl mt-4">You have been logged out</Text>
        </View>
      )}
    </View>
  );
};

export default SignOut;
