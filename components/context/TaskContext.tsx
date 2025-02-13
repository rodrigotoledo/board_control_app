import React, { createContext, useContext, useMemo } from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axiosConfig';

const TaskContext = createContext(null);
const getTasks = () => {
  return axios.get('/tasks').then(response => response.data);
};

export const TaskProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    retry: 5
  });

  const taskMutation = useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) => {
      const response = await axios.patch(`/tasks/${taskId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks']});
    },
  });

  const completeTask = (task: any) => {
    taskMutation.mutate({ taskId: task.id });
  };

  const completedTaskCount = () => {
    return !isLoading && data?.filter(task => task.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'gray';
    }

    const count = completedTaskCount();
    const completionPercentage = (count / (data?.length || 1)) * 100;

    if (completionPercentage < 30) {
      return 'slate';
    } else if (completionPercentage < 60) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const value = useMemo(
    () => ({
      tasks: data,
      isLoadingTasks: isLoading,
      refetchTasks: refetch,
      completeTask,
      completedTaskCount,
      tasksColor: getCompletionColor,
    }),
    [data, isLoading, refetch, taskMutation],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);