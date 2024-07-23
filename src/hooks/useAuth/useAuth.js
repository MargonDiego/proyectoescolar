// src/hooks/useAuth/useAuth.js
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const useAuth = () => {
    const { login } = useContext(AuthContext);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rut: '',
        emailOrRut: '',
        securityAnswer: ''
    });

    const { firstName, lastName, email, password, rut, emailOrRut, securityAnswer } = formData;

    // Datos simulados de usuarios
    const users = [
        {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: 'password',
            rut: '12345678-9',
            role: 'admin',
            position: 'Administrator',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Regular',
            lastName: 'User',
            email: 'user@example.com',
            password: 'password',
            rut: '98765432-1',
            role: 'user',
            position: 'User',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'View',
            lastName: 'Only',
            email: 'view@example.com',
            password: 'password',
            rut: '11223344-5',
            role: 'viewer',
            position: 'Viewer',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Estudiante',
            lastName: 'Uno',
            email: 'estudiante1@example.com',
            password: 'password',
            rut: '66778899-1',
            role: 'student',
            position: 'Estudiante',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Estudiante',
            lastName: 'Dos',
            email: 'estudiante2@example.com',
            password: 'password',
            rut: '77889900-2',
            role: 'student',
            position: 'Estudiante',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Estudiante',
            lastName: 'Tres',
            email: 'estudiante3@example.com',
            password: 'password',
            rut: '88990011-3',
            role: 'student',
            position: 'Estudiante',
            avatar: 'https://via.placeholder.com/150'
        }
    ];

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e, navigate) => {
        e.preventDefault();
        if (isRegistering) {
            // Lógica de registro
            // Aquí debes conectar con el backend para registrar al usuario
            // Ejemplo:
            // const response = await fetch('/api/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ firstName, lastName, email, password, rut }),
            // });
            // const result = await response.json();
            // if (result.success) {
            //     alert('User registered successfully');
            //     setIsRegistering(false);
            // } else {
            //     alert('Email or RUT already exists');
            // }

            const userExists = users.find(user => user.email === email || user.rut === rut);
            if (userExists) {
                alert('Email or RUT already exists');
            } else {
                users.push({ firstName, lastName, email, password, rut, role: 'user', position: 'User', avatar: 'https://via.placeholder.com/150' });
                alert('User registered successfully');
                setIsRegistering(false);
            }
        } else if (isRecovering) {
            // Lógica de recuperación de contraseña
            // Aquí debes conectar con el backend para recuperar la contraseña
            // Ejemplo:
            // const response = await fetch('/api/recover', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ emailOrRut, securityAnswer }),
            // });
            // const result = await response.json();
            // if (result.success) {
            //     alert('Recovery email sent');
            // } else {
            //     alert('Invalid credentials');
            // }

            const user = users.find(user => user.email === emailOrRut || user.rut === emailOrRut);
            if (!user) {
                alert('Invalid credentials');
            } else {
                alert('Recovery email sent (simulated)');
            }
        } else {
            // Lógica de inicio de sesión
            // Aquí debes conectar con el backend para iniciar sesión
            // Ejemplo:
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ emailOrRut, password }),
            // });
            // const result = await response.json();
            // if (result.success) {
            //     login(result.user, navigate);
            // } else {
            //     alert('Invalid credentials');
            // }

            const user = users.find(user => (user.email === emailOrRut || user.rut === emailOrRut) && user.password === password);
            if (!user) {
                alert('Invalid credentials');
            } else {
                alert('Login successful');
                login(user, navigate);
            }
        }
    };

    return {
        isRegistering,
        isRecovering,
        formData,
        firstName,
        lastName,
        email,
        password,
        rut,
        emailOrRut,
        securityAnswer,
        setIsRegistering,
        setIsRecovering,
        onChange,
        onSubmit
    };
};

export default useAuth;
