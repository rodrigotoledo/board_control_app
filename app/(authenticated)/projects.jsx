import React, { useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useProjectContext} from '../../components/context/ProjectContext';
import HeaderProjects from '../../components/shared/HeaderProjects';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import { SafeAreaView } from 'react-native-safe-area-context';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const Projects = () => {
  const { projects, completeProject, isLoadingProjects, refetchProjects, destroyProject } = useProjectContext();
  const keyId = `CrudProjectScreen-${Date.now()}`;
  useRefreshOnFocus(refetchProjects);

  return (
    <SafeAreaView className='bg-gray-800 h-full'>
      <HeaderProjects title="List of Projects" />
      <ScrollView className="container my-2 bg-gray-900">
        <View className="mx-4 my-10">
          {!isLoadingProjects &&
            projects?.map((project, index) => <ProjectItem key={project.id} project={project} index={index} completeProject={completeProject} destroyProject={destroyProject} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProjectItem = ({ project, index, completeProject, destroyProject }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    // Anima cada item com um pequeno atraso progressivo
    opacity.value = withDelay(index * 150, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 150, withTiming(0, { duration: 500 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle} className="border-b border-gray-300 mb-10 border">
      <Text className="border-b border-gray-300 px-4 py-2 text-left text-white text-lg font-bold">
        {project.name}
      </Text>
      
      <Text className="border-b border-gray-300 px-4 py-2 text-left">
        {project.completed_at ? (
          <Text className="text-pink-400 font-bold">Completed</Text>
        ) : (
          <Text className="text-gray-500 font-bold">Pending</Text>
        )}
      </Text>
      <View className="flex flex-row my-4 justify-center">
        <TouchableOpacity
          className="bg-pink-500 px-2 py-1 rounded mr-4"
          onPress={() =>
            navigation.navigate('CrudProjectScreen', {
              id: project.id,
              keyId: keyId,
            })
          }>
          <Text className="font-bold text-white text-center">
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-800 px-2 py-1 rounded"
          onPress={() => destroyProject(project)}>
          <Text className="font-bold text-white text-center">
            Destroy
          </Text>
        </TouchableOpacity>
      </View>
      {project.completed_at ? (
        <View className="border-b border-gray-300 px-4 py-2">
          <Text className="text-white font-bold">
            {new Date(project.completed_at).toLocaleString()}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          className="bg-pink-500 px-2 py-1"
          onPress={() => completeProject(project)}
        >
          <Text className="font-bold text-white">Mark as Completed</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Projects;