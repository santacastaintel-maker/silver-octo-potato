import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/AdminDashboard.css';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { success, error } = await signIn(email, password);

        if (success) {
            navigate('/admin/dashboard');
        } else {
            setErrorMsg(error || 'Error en las credenciales');
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="texture-overlay" style={{ opacity: 0.03 }}></div>
            <div className="login-box fade-in">
                <h1 className="login-title">LOGIN<br /><span>ESTACIÓN</span></h1>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>IDENTIDAD_DIGITAL (EMAIL)</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@wachamonos.art"
                        />
                    </div>

                    <div className="form-group">
                        <label>CÓDIGO_ACCESO (PASSWORD)</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>

                    {errorMsg && (
                        <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                            [ ! ] {errorMsg}
                        </p>
                    )}

                    <button type="submit" className="btn-admin btn-admin--primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} disabled={loading}>
                        {loading ? 'AUTENTICANDO...' : 'INICIAR SESIÓN'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.7rem', color: '#444' }}>
                    ARCHIVOS CLASIFICADOS // PORTAFOLIO_WACHAMONOS © 2026
                </p>
            </div>
        </div>
    );
}
