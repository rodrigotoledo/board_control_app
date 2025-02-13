import React, { createContext, useContext, useMemo } from 'react';
import {Alert} from 'react-native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axiosConfig';

const ProjectContext = createContext(null);
const getProjects = () => {
  return axios.get('/projects').then(response => response.data);
};

export const ProjectProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    retry: 5
  });

  const projectMutation = useMutation({
    mutationFn: async ({projectId}) => {
      const response = await axios.patch(`/projects/${projectId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });

  const destroyMutation = useMutation({
    mutationFn: ({projectId}) => {
      return new Promise((resolve, reject) => {
        Alert.alert(
          'Are you sure?',
          'This action cannot be undone.',
          [
            {
              text: 'Cancel',
              onPress: () => reject('Canceled'),
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                axios
                  .delete(`/projects/${projectId}`)
                  .then(response => resolve(response.data))
                  .catch(error => reject(error));
              },
              style: 'destructive',
            },
          ],
          {cancelable: true},
        );
      });
    },
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });

  const destroyProject = project => {
    destroyMutation.mutate({projectId: project.id});
  };

  const completeProject = (project) => {
    projectMutation.mutate({ projectId: project.id });
  };

  const completedProjectCount = () => {
    return !isLoading && data?.filter(project => project.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'gray';
    }

    const count = completedProjectCount();
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
      projects: data,
      isLoadingProjects: isLoading,
      refetchProjects: refetch,
      completeProject,
      destroyProject,
      completedProjectCount,
      projectsColor: getCompletionColor,
    }),
    [data, isLoading, refetch, projectMutation, destroyMutation],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext(ProjectContext);