import React, { createContext, useContext, useMemo } from 'react';
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
    refetchInterval: 1000,
  });

  const projectMutation = useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const response = await axios.patch(`/projects/${projectId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });

  const completeProject = (project: any) => {
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
      completedProjectCount,
      projectsColor: getCompletionColor,
    }),
    [data, isLoading, refetch, projectMutation],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext(ProjectContext);