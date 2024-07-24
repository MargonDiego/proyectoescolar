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
  {
    id: 3,
    firstName: 'Pedro',
    lastName: 'López',
    rut: '11223344-5',
    course: 'Tercero Medio',
    phone: '555666777',
    dob: '2003-08-10',
    medicalHistory: 'Ninguna',
    address: 'Pasaje Los Alamos 789',
    emergencyContact: 'Ana López',
    emergencyPhone: '777888999',
    bloodType: 'B-',
    medications: 'Ninguna',
    notes: 'Estudiante destacado en matemáticas'
  },
  {
    id: 4,
    firstName: 'Carolina',
    lastName: 'Martínez',
    rut: '22334455-6',
    course: 'Primero Medio',
    phone: '111222333',
    dob: '2005-11-30',
    medicalHistory: 'Migrañas',
    address: 'Calle del Sol 234',
    emergencyContact: 'Roberto Martínez',
    emergencyPhone: '444555666',
    bloodType: 'AB+',
    medications: 'Analgésicos para migrañas',
    notes: 'Necesita un ambiente tranquilo durante episodios de migraña'
  },
  {
    id: 5,
    firstName: 'Diego',
    lastName: 'Sánchez',
    rut: '33445566-7',
    course: 'Segundo Medio',
    phone: '666777888',
    dob: '2004-02-25',
    medicalHistory: 'Fractura de brazo en 2022',
    address: 'Avenida Central 567',
    emergencyContact: 'Laura Sánchez',
    emergencyPhone: '999000111',
    bloodType: 'O-',
    medications: 'Ninguna',
    notes: 'Talentoso en artes visuales'
  },
  {
    id: 6,
    firstName: 'Valentina',
    lastName: 'Rodríguez',
    rut: '44556677-8',
    course: 'Tercero Medio',
    phone: '222333444',
    dob: '2003-07-05',
    medicalHistory: 'Ninguna',
    address: 'Calle de la Luna 890',
    emergencyContact: 'Carlos Rodríguez',
    emergencyPhone: '555666777',
    bloodType: 'A-',
    medications: 'Ninguna',
    notes: 'Excelente en matemáticas, tímida en situaciones sociales'
  },
  {
    id: 7,
    firstName: 'Mateo',
    lastName: 'Fernández',
    rut: '55667788-9',
    course: 'Primero Medio',
    phone: '777888999',
    dob: '2005-09-15',
    medicalHistory: 'TDAH',
    address: 'Pasaje Las Flores 123',
    emergencyContact: 'Isabel Fernández',
    emergencyPhone: '333444555',
    bloodType: 'B+',
    medications: 'Medicamento para TDAH',
    notes: 'Requiere apoyo adicional para concentrarse en clase'
  }
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

  const { data: students = [], isLoading, error } = useQuery('students', fetchStudents, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

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