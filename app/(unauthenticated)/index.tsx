import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from '../../axiosConfig';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const SignIn = () => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');
  const [isSigned, setIsSigned] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Valores animados para os elementos
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);

  useEffect(() => {
    // Anima o título primeiro
    titleOpacity.value = withTiming(1, { duration: 500 });
    titleScale.value = withTiming(1, { duration: 500 });

    // Depois de 300ms, anima o restante do formulário
    setTimeout(() => {
      formOpacity.value = withTiming(1, { duration: 500 });
      formTranslateY.value = withTiming(0, { duration: 500 });
    }, 500);
  }, []);

  // Estilos animados
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const handleLogin = async () => {
    const data = { email, password };

    try {
      setIsSigned(true);
      const response = await axios.post('/sign_in', data);
      const token = response.data.token;
      setTimeout(async () => {
        await AsyncStorage.setItem('authToken', token);
        router.replace('/projects');
      }, 1000);
    } catch (error) {
      setIsSigned(false);
      console.log('Error sign in:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900 items-center pt-12">
      {isSigned ? (
        <View className="items-center h-full flex justify-center">
          <ActivityIndicator size="large" color="#f472b6" />
          <Text className="text-white mt-4 text-xl">Sign in, just a moment!</Text>
        </View>
      ) : (
        <View className="flex justify-center items-center h-full w-full">
          {/* Título Animado */}
          <Animated.View style={titleAnimatedStyle}>
            <Text className="text-4xl text-pink-400 font-bold">Board Control</Text>
          </Animated.View>

          {/* Ícone + Texto Animado */}
          <Animated.View className="flex flex-row space-x-10 items-center justify-center align-middle mt-4" style={titleAnimatedStyle}>
            <FontAwesome size={50} name="sign-in" color="#f472b6" />
            <Text className="text-2xl text-pink-400">Sign In</Text>
          </Animated.View>

          {/* Formulário Animado */}
          <Animated.View className="flex space-y-6 px-10 w-full mt-10" style={formAnimatedStyle}>
            {error !== '' && <Text className="text-pink-400">{error}</Text>}

            <View className="mb-4">
              <Text className="text-white">Email:</Text>
              <TextInput
                className="border border-white rounded-md p-2 text-white"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Type your email address"
                keyboardType='email-address'
              />
            </View>

            <View className="mb-4">
              <Text className="text-white">Password:</Text>
              <TextInput
                className="border border-white rounded-md p-2 text-white"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                placeholder="Type your password"
              />
            </View>

            <TouchableOpacity
              className="bg-pink-400 rounded-md p-4 flex flex-row space-x-2 justify-center items-center"
              onPress={handleLogin}
            >
              <FontAwesome size={24} name="sign-in" color="#ffffff" />
              <Text className="text-center text-white">Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignIn;
