// src/hooks/useInterventions.js
import { useQuery, useMutation, useQueryClient } from 'react-query';

const initialInterventions = [
  {
    id: 1,
    studentId: 1,
    title: 'Intervención 1',
    description: 'Descripción detallada de la Intervención 1. Esta intervención se centra en...',
    priority: 'Alta',
    status: 'Iniciado',
    createdBy: 'Juan Pérez',
    createdAt: new Date().toISOString(),
    assignedTo: 'María López',
    files: [
      { name: 'documento1.pdf', url: '#' },
      { name: 'imagen1.jpg', url: '#' }
    ],
    updatedAt: new Date().toISOString(),
    updatedBy: 'Ana Rodríguez'
  },
  {
    id: 2,
    studentId: 1,
    title: 'Intervención 2',
    description: 'Descripción detallada de la Intervención 2. Los objetivos principales son...',
    priority: 'Media',
    status: 'En Progreso',
    createdBy: 'María López',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    assignedTo: 'Juan Pérez',
    files: [],
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    updatedBy: 'Carlos Gómez'
  }
];

const fetchInterventions = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return initialInterventions;
};

const addIntervention = async (newIntervention) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...newIntervention, id: Date.now() };
};

const updateIntervention = async (updatedIntervention) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return updatedIntervention;
};

const deleteIntervention = async (interventionId) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return interventionId;
};

export const useInterventions = () => {
    const queryClient = useQueryClient();
  
    const { data: interventions, isLoading, error } = useQuery('interventions', fetchInterventions);
  
    const addInterventionMutation = useMutation(addIntervention, {
      onSuccess: (newIntervention) => {
        queryClient.setQueryData('interventions', (oldInterventions) => [...oldInterventions, newIntervention]);
      },
    });
  
    const updateInterventionMutation = useMutation(updateIntervention, {
      onSuccess: (updatedIntervention) => {
        queryClient.setQueryData('interventions', (oldInterventions) =>
          oldInterventions.map((intervention) => (intervention.id === updatedIntervention.id ? updatedIntervention : intervention))
        );
      },
    });
  
    const deleteInterventionMutation = useMutation(deleteIntervention, {
      onSuccess: (deletedInterventionId) => {
        queryClient.setQueryData('interventions', (oldInterventions) =>
          oldInterventions.filter((intervention) => intervention.id !== deletedInterventionId)
        );
      },
    });
  
    return {
      interventions,
      isLoading,
      error,
      addIntervention: addInterventionMutation.mutate,
      updateIntervention: updateInterventionMutation.mutate,
      deleteIntervention: deleteInterventionMutation.mutate,
    };
  };