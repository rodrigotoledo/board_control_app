import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';


const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = () => {
    console.log('SignUp With com:', email, password);
  };

  return (
    <View className="flex justify-center items-center h-full">
      <Text className="text-4xl text-slate-700">Board Control</Text>
      <View className="w-full flex flex-row space-x-2 items-center justify-center align-middle">
        <Text className="text-2xl text-slate-700">Sign Up</Text>
      </View>
        
      <View className="w-full flex space-y-4 px-10">


        <View >
          <Text>Email:</Text>
          <TextInput
            className="border border-slate-600 rounded-md p-2"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Type your email address"
            keyboardType='email-address'
            />
        </View>

        <View>
          <Text>Password:</Text>
          <TextInput
            className="border border-slate-600 rounded-md p-2"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholder="Type your password"
            />
        </View>

        <View>
          <Text>Confirm your Password:</Text>
          <TextInput
            className="border border-slate-600 rounded-md p-2"
            value={passwordConfirmation}
            onChangeText={(text) => setPasswordConfirmation(text)}
            secureTextEntry
            placeholder="Type the same password"
            />
        </View>

        <TouchableOpacity
          className="bg-slate-600 rounded-md p-4"
          onPress={handleSignUp}
          >
          <Text className="text-center text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default Signup;
