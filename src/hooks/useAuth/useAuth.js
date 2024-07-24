// src/hooks/useAuth/useAuth.js
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const useAuthForm = () => {
    const { login } = useAuth();
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

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e, navigate) => {
        e.preventDefault();
        if (isRegistering) {
            // Implementar lógica de registro
        } else if (isRecovering) {
            // Implementar lógica de recuperación de contraseña
        } else {
            try {
                await login({ emailOrRut, password });
                navigate('/dashboard');
            } catch (error) {
                alert(error.message);
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

export default useAuthForm;