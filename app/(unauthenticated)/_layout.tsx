import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#111827',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2d3748',
          borderTopWidth: 0
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="sign-in" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sign_up"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user-plus" color={color} />
          ),
        }}
      />
    </Tabs>

  );
}
