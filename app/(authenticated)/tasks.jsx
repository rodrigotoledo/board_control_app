import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useTaskContext} from '../../components/context/TaskContext';
import HeaderTasks from '../../components/shared/HeaderTasks';
import { SafeAreaView } from 'react-native-safe-area-context';



const Tasks = () => {
  const {tasks, completeTask, isLoadingTasks, completedTaskCount, tasksColor, refetchTasks} = useTaskContext();

  return (
    <SafeAreaView className='bg-gray-800 h-full'>
      <HeaderTasks title="List of Tasks" />
      <ScrollView className="container my-2 bg-gray-900">
        <View className="mx-4 my-10">
          {!isLoadingTasks &&
            tasks?.map(task => (
              <View
                key={task.id}
                className="border-b border-gray-300 mb-10 border">
                <Text className="border-b border-gray-300 px-4 py-2 text-left text-white text-lg font-bold">
                  {task.title}
                </Text>
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
                      onPress={() => completeTask(task)}>
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

export default Tasks;
