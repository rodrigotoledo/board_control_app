import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useProjectContext} from '../../components/context/ProjectContext';
import HeaderProjects from '../../components/shared/HeaderProjects';
import { SafeAreaView } from 'react-native-safe-area-context';



const Projects = () => {
  const {projects, completeProject, isLoadingProjects, completedProjectCount, projectsColor, refetchProjects} = useProjectContext();

  return (
    <SafeAreaView className='bg-gray-800 h-full'>
      <HeaderProjects title="List of Projects" />
      <ScrollView className="container my-2 bg-gray-900">
        <View className="mx-4 my-10">
          {!isLoadingProjects &&
            projects?.map(project => (
              <View
                key={project.id}
                className="border-b border-gray-300 mb-10 border">
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
                
                  {project.completed_at ? (
                    <View className="border-b border-gray-300 px-4 py-2">
                      <Text className="text-white font-bold">
                        {new Date(project.completed_at).toLocaleString()}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      className="bg-pink-500 px-2 py-1"
                      onPress={() => completeProject(project)}>
                      <Text className="font-bold text-white">
                        Mark as Completed
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Projects;
