import { useQuery, useMutation, useQueryClient } from 'react-query';

const initialInterventions = [
    {
      id: 1,
      studentId: 1,
      title: 'Dificultades en matemáticas',
      description: 'El estudiante muestra dificultades en álgebra y geometría.',
      category: 'Académico',
      priority: 'Alta',
      status: 'En progreso',
      createdBy: 'Juan Pérez',
      createdAt: '2024-07-01T10:00:00Z',
      assignedTo: 'María López',
      dueDate: '2024-07-15T10:00:00Z',
      files: [],
      comments: []
    },
    {
      id: 2,
      studentId: 1,
      title: 'Problemas de conducta en clase',
      description: 'El estudiante ha mostrado comportamiento disruptivo durante las clases.',
      category: 'Conductual',
      priority: 'Media',
      status: 'Pendiente',
      createdBy: 'Ana Rodríguez',
      createdAt: '2024-07-03T14:30:00Z',
      assignedTo: 'Carlos Gómez',
      dueDate: '2024-07-17T14:30:00Z',
      files: [],
      comments: []
    },
    {
      id: 3,
      studentId: 2,
      title: 'Ausencias frecuentes',
      description: 'El estudiante ha faltado a clases con frecuencia en el último mes.',
      category: 'Asistencia',
      priority: 'Alta',
      status: 'En progreso',
      createdBy: 'Laura Martínez',
      createdAt: '2024-07-05T09:15:00Z',
      assignedTo: 'Pedro Sánchez',
      dueDate: '2024-07-19T09:15:00Z',
      files: [],
      comments: []
    },
    {
      id: 4,
      studentId: 2,
      title: 'Dificultades de integración',
      description: 'El estudiante muestra dificultades para integrarse con sus compañeros.',
      category: 'Social',
      priority: 'Media',
      status: 'Pendiente',
      createdBy: 'Isabel Díaz',
      createdAt: '2024-07-08T11:45:00Z',
      assignedTo: 'Roberto Fernández',
      dueDate: '2024-07-22T11:45:00Z',
      files: [],
      comments: []
    },
    {
      id: 5,
      studentId: 1,
      title: 'Mejora en rendimiento de lenguaje',
      description: 'El estudiante ha mostrado una mejora significativa en su desempeño en la clase de lenguaje.',
      category: 'Académico',
      priority: 'Baja',
      status: 'Completada',
      createdBy: 'Carmen Vega',
      createdAt: '2024-07-10T13:00:00Z',
      assignedTo: 'Juan Pérez',
      dueDate: '2024-07-24T13:00:00Z',
      files: [],
      comments: []
    },
    {
      id: 6,
      studentId: 1,
      title: 'Problemas de concentración',
      description: 'El estudiante muestra dificultades para mantener la atención durante las clases.',
      category: 'Académico',
      priority: 'Media',
      status: 'En progreso',
      createdBy: 'Miguel Soto',
      createdAt: '2024-07-12T10:30:00Z',
      assignedTo: 'Laura Martínez',
      dueDate: '2024-07-26T10:30:00Z',
      files: [],
      comments: []
    },
    {
      id: 7,
      studentId: 2,
      title: 'Mejora en habilidades sociales',
      description: 'Se ha notado una mejora en la interacción del estudiante con sus compañeros.',
      category: 'Social',
      priority: 'Baja',
      status: 'En progreso',
      createdBy: 'Carlos Gómez',
      createdAt: '2024-07-15T09:00:00Z',
      assignedTo: 'Isabel Díaz',
      dueDate: '2024-07-29T09:00:00Z',
      files: [],
      comments: []
    },
    {
      id: 8,
      studentId: 1,
      title: 'Dificultades en educación física',
      description: 'El estudiante muestra problemas de coordinación en las actividades físicas.',
      category: 'Académico',
      priority: 'Media',
      status: 'Pendiente',
      createdBy: 'Roberto Fernández',
      createdAt: '2024-07-17T11:00:00Z',
      assignedTo: 'Ana Rodríguez',
      dueDate: '2024-07-31T11:00:00Z',
      files: [],
      comments: []
    },
    {
      id: 9,
      studentId: 3,
      title: 'Problemas de lectura',
      description: 'El estudiante muestra dificultades en la comprensión lectora.',
      category: 'Académico',
      priority: 'Alta',
      status: 'En progreso',
      createdBy: 'Elena Gómez',
      createdAt: '2024-07-19T10:00:00Z',
      assignedTo: 'Miguel Soto',
      dueDate: '2024-08-02T10:00:00Z',
      files: [],
      comments: []
    },
    {
      id: 10,
      studentId: 3,
      title: 'Conflicto con compañeros',
      description: 'El estudiante ha tenido varios conflictos con sus compañeros de clase.',
      category: 'Social',
      priority: 'Alta',
      status: 'Pendiente',
      createdBy: 'Pedro Sánchez',
      createdAt: '2024-07-22T14:00:00Z',
      assignedTo: 'Carmen Vega',
      dueDate: '2024-08-05T14:00:00Z',
      files: [],
      comments: []
    },
    {
      id: 11,
      studentId: 2,
      title: 'Mejora en matemáticas',
      description: 'El estudiante ha mostrado una notable mejora en su rendimiento en matemáticas.',
      category: 'Académico',
      priority: 'Baja',
      status: 'Completada',
      createdBy: 'María López',
      createdAt: '2024-07-24T11:30:00Z',
      assignedTo: 'Juan Pérez',
      dueDate: '2024-08-07T11:30:00Z',
      files: [],
      comments: []
    },
    {
      id: 12,
      studentId: 1,
      title: 'Necesidad de apoyo emocional',
      description: 'El estudiante muestra signos de ansiedad y podría beneficiarse de apoyo emocional.',
      category: 'Emocional',
      priority: 'Alta',
      status: 'En progreso',
      createdBy: 'Isabel Díaz',
      createdAt: '2024-07-26T09:45:00Z',
      assignedTo: 'Laura Martínez',
      dueDate: '2024-08-09T09:45:00Z',
      files: [],
      comments: []
    },
    {
      id: 13,
      studentId: 3,
      title: 'Dificultades en ciencias',
      description: 'El estudiante muestra problemas para comprender conceptos básicos de ciencias.',
      category: 'Académico',
      priority: 'Media',
      status: 'Pendiente',
      createdBy: 'Carlos Gómez',
      createdAt: '2024-07-29T13:15:00Z',
      assignedTo: 'Elena Gómez',
      dueDate: '2024-08-12T13:15:00Z',
      files: [],
      comments: []
    },
    {
      id: 14,
      studentId: 2,
      title: 'Problemas familiares',
      description: 'Se han reportado problemas familiares que podrían estar afectando el rendimiento del estudiante.',
      category: 'Familiar',
      priority: 'Alta',
      status: 'En progreso',
      createdBy: 'Ana Rodríguez',
      createdAt: '2024-07-31T10:30:00Z',
      assignedTo: 'Pedro Sánchez',
      dueDate: '2024-08-14T10:30:00Z',
      files: [],
      comments: []
    }
  ];

const categories = ['Académico', 'Conductual', 'Emocional', 'Familiar', 'Social', 'Asistencia', 'Otro'];
const priorities = ['Baja', 'Media', 'Alta'];
const statuses = ['Pendiente', 'En progreso', 'Completada', 'Cancelada'];

const fetchInterventions = async (studentId = null) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (studentId) {
    return initialInterventions.filter(intervention => intervention.studentId === parseInt(studentId));
  }
  return initialInterventions;
};

const addIntervention = async (newIntervention) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...newIntervention, id: Date.now(), createdAt: new Date().toISOString() };
};

const updateIntervention = async (updatedIntervention) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return updatedIntervention;
};

const deleteIntervention = async (interventionId) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return interventionId;
};

export const useInterventions = (studentId = null) => {
  const queryClient = useQueryClient();

  const { data: interventions = [], isLoading, error } = useQuery(
    ['interventions', studentId],
    () => fetchInterventions(studentId),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const addInterventionMutation = useMutation(addIntervention, {
    onSuccess: (newIntervention) => {
      queryClient.setQueryData(['interventions', newIntervention.studentId], (oldInterventions) => 
        oldInterventions ? [...oldInterventions, newIntervention] : [newIntervention]
      );
    },
  });

  const updateInterventionMutation = useMutation(updateIntervention, {
    onSuccess: (updatedIntervention) => {
      queryClient.setQueryData(['interventions', updatedIntervention.studentId], (oldInterventions) =>
        oldInterventions.map((intervention) => 
          intervention.id === updatedIntervention.id ? updatedIntervention : intervention
        )
      );
    },
  });

  const deleteInterventionMutation = useMutation(deleteIntervention, {
    onSuccess: (deletedInterventionId, variables) => {
      queryClient.setQueryData(['interventions', variables.studentId], (oldInterventions) =>
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
    categories,
    priorities,
    statuses
  };
};