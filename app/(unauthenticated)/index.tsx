import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from '../../axiosConfig';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';



const SignIn = () => {

  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');
  const [isSigned, setIsSigned] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('/sign_in', data);
      const token = response.data.token;
      setIsSigned(true);
      setTimeout(async () => {
        await AsyncStorage.setItem('authToken', token);
        router.replace('/projects');
      }, 2000);
    } catch (error) {
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
          <Text className="text-4xl text-pink-400 font-bold">Board Control</Text>
          <View className="flex flex-row space-x-10 items-center justify-center align-middle">
            <FontAwesome size={50} name="sign-in" color="#f472b6" />
            <Text className="text-2xl text-pink-400">Sign In</Text>
          </View>
            
          <View className="flex space-y-10 px-10 w-full">
            {error !== '' && <Text className="text-pink-400">{error}</Text>}
            <View className="mb-6">
              <Text className="text-white">Email:</Text>
              <TextInput
                className="border border-white rounded-md p-2 text-white"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Type your email address"
                keyboardType='email-address'
                />
            </View>

            <View className="mb-6">
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
              className="bg-pink-400 rounded-md p-4 flex flex-row  space-x-2 justify-center items-center"
              onPress={handleLogin}
              >
              <FontAwesome size={24} name="sign-in" color="#ffffff" />
              <Text className="text-center text-white">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
};

export default SignIn;
