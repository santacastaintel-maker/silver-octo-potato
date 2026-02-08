import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Hook para manejar el formulario de contacto
 * Incluye validación y envío a Supabase
 */
export function useContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: null, message: null });

    const submitContactForm = async (formData) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: null });

        // Validación básica
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus({
                type: 'error',
                message: 'Por favor completa todos los campos requeridos'
            });
            setIsSubmitting(false);
            return false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitStatus({
                type: 'error',
                message: 'Por favor ingresa un email válido'
            });
            setIsSubmitting(false);
            return false;
        }

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name.trim(),
                        email: formData.email.trim().toLowerCase(),
                        subject: formData.subject?.trim() || null,
                        message: formData.message.trim(),
                    },
                ]);

            if (error) throw error;

            setSubmitStatus({
                type: 'success',
                message: '¡Mensaje enviado con éxito! Te contactaré pronto.'
            });
            setIsSubmitting(false);
            return true;
        } catch (err) {
            console.error('Error al enviar mensaje:', err);
            setSubmitStatus({
                type: 'error',
                message: 'Hubo un error al enviar tu mensaje. Intenta nuevamente.'
            });
            setIsSubmitting(false);
            return false;
        }
    };

    const resetStatus = () => {
        setSubmitStatus({ type: null, message: null });
    };

    return {
        isSubmitting,
        submitStatus,
        submitContactForm,
        resetStatus,
    };
}
