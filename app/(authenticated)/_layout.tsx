import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TaskProvider } from '@/components/context/TaskContext';
import { ProjectProvider } from '@/components/context/ProjectContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Layout() {

  return (
    <GestureHandlerRootView>
      <TaskProvider>
        <ProjectProvider>
          <Tabs
            initialRouteName='projects'
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
              name="projects"
              options={{
                title: 'Projects',
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={24} name="folder" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="tasks"
              options={{
                title: 'Tasks',
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={24} name="check-circle" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="sign_out"
              options={{
                title: 'Sign Out',
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={24} name="sign-out" color={color} />
                ),
              }}
            />
          </Tabs>
        </ProjectProvider>
      </TaskProvider>
    </GestureHandlerRootView>
  );
}
