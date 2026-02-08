import { useEffect } from 'react';
import './Notification.css';

/**
 * Componente de Notificación personalizado
 * Reemplaza a alert() y confirm() con feedback visual dentro del DOM
 * 
 * Props:
 * - type: 'success' | 'error' | 'warning' | 'info'
 * - message: string
 * - onClose: función callback cuando se cierra
 * - duration: tiempo en ms antes de auto-cerrar (default: 5000)
 */
export default function Notification({ type = 'info', message, onClose, duration = 5000 }) {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            default:
                return 'ℹ';
        }
    };

    return (
        <div className={`notification notification--${type}`}>
            <div className="notification__icon">{getIcon()}</div>
            <div className="notification__message">{message}</div>
            <button className="notification__close" onClick={onClose} aria-label="Cerrar notificación">
                ✕
            </button>
        </div>
    );
}
