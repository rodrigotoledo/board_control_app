import React from 'react';
import {View, Text} from 'react-native';
import {useTaskContext} from '../context/TaskContext';
import { FontAwesome } from '@expo/vector-icons';

const HeaderTasks = props => {
  const {isLoadingTasks, completedTaskCount, tasksColor} = useTaskContext();

  const count = !isLoadingTasks && completedTaskCount();
  const tasksColorTheme = tasksColor();

  return (
    <View className="mx-2 mt-2 flex flex-row space-x-2 bg-pink-400 rounded-md py-2">
      <View className="flex flex-row space-x-10 w-full px-2 items-center h-10">
        <FontAwesome size={30} name="check-circle" color="#ffffff" />
        <Text className="text-2xl font-bold text-white mx-2">{props.title}</Text>
      
        <View
          className={`rounded-full ${tasksColorTheme} w-8 h-8 font-bold items-center justify-center flex bg-pink-100 `}>
          <Text className="text-pink-900">{count}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderTasks;