// src/hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from 'react-query';

const initialStudents = [
  {
    id: 1,
    firstName: 'Juan',
    lastName: 'Pérez',
    rut: '12345678-9',
    course: 'Primero Medio',
    phone: '123456789',
    dob: '2005-05-20',
    medicalHistory: 'Asma, Diabetes',
    address: 'Calle Falsa 123',
    emergencyContact: 'María Pérez',
    emergencyPhone: '987654321',
    bloodType: 'O+',
    medications: 'Inhalador de Asma',
    notes: 'Paciente requiere chequeo cada 6 meses'
  },
  {
    id: 2,
    firstName: 'María',
    lastName: 'García',
    rut: '98765432-1',
    course: 'Segundo Medio',
    phone: '987654321',
    dob: '2004-04-15',
    medicalHistory: 'Alergias a Polen',
    address: 'Avenida Principal 456',
    emergencyContact: 'Juan García',
    emergencyPhone: '123456789',
    bloodType: 'A+',
    medications: 'Antihistamínicos',
    notes: 'Requiere atención especial durante primavera'
  },
];

const fetchStudents = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return initialStudents;
};

const addStudent = async (newStudent) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...newStudent, id: Date.now() };
};

const updateStudent = async (updatedStudent) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return updatedStudent;
};

const deleteStudent = async (studentId) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return studentId;
};

export const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students, isLoading, error } = useQuery('students', fetchStudents);

  const addStudentMutation = useMutation(addStudent, {
    onSuccess: (newStudent) => {
      queryClient.setQueryData('students', (oldStudents) => [...oldStudents, newStudent]);
    },
  });

  const updateStudentMutation = useMutation(updateStudent, {
    onSuccess: (updatedStudent) => {
      queryClient.setQueryData('students', (oldStudents) =>
        oldStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
      );
    },
  });

  const deleteStudentMutation = useMutation(deleteStudent, {
    onSuccess: (deletedStudentId) => {
      queryClient.setQueryData('students', (oldStudents) =>
        oldStudents.filter((student) => student.id !== deletedStudentId)
      );
    },
  });

  return {
    students,
    isLoading,
    error,
    addStudent: addStudentMutation.mutate,
    updateStudent: updateStudentMutation.mutate,
    deleteStudent: deleteStudentMutation.mutate,
  };
};