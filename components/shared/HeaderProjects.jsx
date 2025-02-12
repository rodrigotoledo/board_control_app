import React from 'react';
import {View, Text} from 'react-native';
import {useProjectContext} from '../context/ProjectContext';
import { FontAwesome } from '@expo/vector-icons';

const HeaderProjects = props => {
  const {isLoadingProjects, completedProjectCount, projectsColor} = useProjectContext();

  const count = !isLoadingProjects && completedProjectCount();
  const projectsColorTheme = projectsColor();

  return (
    <View className="mx-2 mt-2 flex flex-row space-x-2 bg-pink-400 rounded-md py-2">
      <View className="flex flex-row space-x-10 w-full px-2 items-center h-10">
        <FontAwesome size={30} name="folder" color="#ffffff" />
        <Text className="text-2xl font-bold text-white mx-2">{props.title}</Text>
        <View
          className={`rounded-full ${projectsColorTheme} w-8 h-8 font-bold items-center justify-center flex bg-pink-100 `}>
          <Text className="text-pink-900">{count}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderProjects;