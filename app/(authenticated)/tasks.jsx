import React, { useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useTaskContext} from '../../components/context/TaskContext';
import HeaderTasks from '../../components/shared/HeaderTasks';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import { SafeAreaView } from 'react-native-safe-area-context';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const Tasks = () => {
  const {tasks, completeTask, isLoadingTasks, refetchTasks, destroyTask} = useTaskContext();
  const keyId = `CrudTaskScreen-${Date.now()}`;
  useRefreshOnFocus(refetchTasks);

  return (
    <SafeAreaView className='bg-gray-800 h-full'>
      <HeaderTasks title="List of Tasks" />
      <ScrollView className="container my-2 bg-gray-900">
        <View className="mx-4 my-10">
          {!isLoadingTasks &&
            tasks?.map((task, index) => <TaskItem key={task.id} task={task} index={index} completeTask={completeTask} destroyTask={destroyTask} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TaskItem = ({ task, index, completeTask, destroyTask }) => {
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
        {task.title}
      </Text>
      <View className="flex flex-row my-4 justify-center">
        <TouchableOpacity
          className="bg-pink-500 px-2 py-1 rounded mr-4"
          onPress={() =>
            navigation.navigate('CrudTaskScreen', {
              id: task.id,
              keyId: keyId,
            })
          }>
          <Text className="font-bold text-white text-center">
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-800 px-2 py-1 rounded"
          onPress={() => destroyTask(task)}>
          <Text className="font-bold text-white text-center">
            Destroy
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="border-b border-gray-300 px-4 py-2 text-left">
        {task.completed_at ? (
          <Text className="text-pink-400 font-bold">Completed</Text>
        ) : (
          <Text className="text-gray-500 font-bold">Pending</Text>
        )}
      </Text>

      {task.completed_at ? (
        <View className="border-b border-gray-300 px-4 py-2">
          <Text className="text-white font-bold">
            {new Date(task.completed_at).toLocaleString()}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          className="bg-pink-500 px-2 py-1"
          onPress={() => completeTask(task)}
        >
          <Text className="font-bold text-white">Mark as Completed</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Tasks;
