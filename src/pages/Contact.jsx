import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContactForm } from '../hooks/useContactForm';
import '../styles/Contact.css';

export default function Contact() {
    const { isSubmitting, submitStatus, submitContactForm } = useContactForm();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await submitContactForm(formData);
        if (success) {
            // Limpiar formulario si el envío fue exitoso
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }
    };

    return (
        <div className="contact-page fade-in" style={{ position: 'relative', zIndex: 1 }}>
            <div className="texture-overlay" style={{ zIndex: -1 }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Navegación Mini */}
                <nav style={{ marginBottom: '3rem' }}>
                    <Link to="/" className="text-mono" style={{ textDecoration: 'none', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span className="material-icons" style={{ fontSize: '1rem' }}>arrow_back</span> VOLVER AL ESTUDIO
                    </Link>
                </nav>

                <div className="contact-layout">
                    {/* Columna Izquierda: Mensaje */}
                    <aside className="contact-info">
                        <h1 className="contact-info__title">
                            LANZA UN<br />
                            <span>MENSAJE</span>
                        </h1>

                        <p className="contact-info__description">
                            ¿Tienes una idea audaz? ¿Buscas una arquitectura digital con alma artística? Hablemos.
                        </p>

                        <ul className="contact-details">
                            <li>
                                <label>DIGITAL_STATION</label>
                                <span>hola@chacastaneda.art</span>
                            </li>
                            <li>
                                <label>PHYSICAL_LOCATION</label>
                                <span>CDMX / MÉXICO</span>
                            </li>
                            <li>
                                <label>TIMELINE</label>
                                <span>Q1 2026 — DISPONIBLE</span>
                            </li>
                        </ul>

                        <div className="halftone-pattern" style={{ height: '4rem', width: '200px', background: 'var(--color-ink)', opacity: 0.1, marginTop: 'auto' }}></div>
                    </aside>

                    {/* Columna Derecha: Formulario */}
                    <main className="contact-form-container">
                        <div className="contact-decoration"></div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">TU NOMBRE / ALIAS</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    required
                                    placeholder="EJ. KASIMIR MALEVICH"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">CORREO ELECTRÓNICO</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    required
                                    placeholder="CONTACT@STUDIO.ART"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="subject">ASUNTO</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="NUEVO PROYECTO / COLABORACIÓN"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="message">EL MANIFIESTO (TU MENSAJE)</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    required
                                    placeholder="DESCRIBE TU VISIÓN AQUÍ..."
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>ENVIANDO...</>
                                ) : (
                                    <>
                                        ENVIAR TRANSMISIÓN
                                        <span className="material-icons">send</span>
                                    </>
                                )}
                            </button>

                            {submitStatus.type && (
                                <p className={`text-mono`} style={{
                                    marginTop: '1rem',
                                    color: submitStatus.type === 'success' ? '#2e7d32' : '#d32f2f',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                    {submitStatus.message}
                                </p>
                            )}
                        </form>
                    </main>
                </div>
            </div>

            <div className="halftone-pattern" style={{ height: '10rem', marginTop: '10rem', opacity: 0.05 }}></div>
        </div>
    );
}
