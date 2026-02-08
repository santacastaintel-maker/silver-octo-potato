import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import '../styles/AdminDashboard.css';

export default function AdminMessages() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) navigate('/admin/login');
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setMessages(data || []);
            } catch (err) {
                console.error('Error fetching messages:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchMessages();
    }, [user]);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Borrar este mensaje permanentemente?')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setMessages(messages.filter(msg => msg.id !== id));
        } catch (err) {
            alert('Error eliminando mensaje: ' + err.message);
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__logo">ADMIN</div>
                <nav className="admin-nav">
                    <button className="admin-nav__link" onClick={() => navigate('/admin/dashboard')}>PROYECTOS</button>
                    <button className="admin-nav__link admin-nav__link--active">MENSAJES</button>
                    <button className="admin-nav__link" onClick={() => navigate('/')}>VER SITIO PÚBLICO</button>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-title">BUZÓN DE ENTRADA ({messages.length})</h2>
                </header>

                <section className="admin-card">
                    {loading ? (
                        <p>Cargando mensajes...</p>
                    ) : messages.length === 0 ? (
                        <p style={{ color: '#666' }}>No hay mensajes nuevos.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>FECHA</th>
                                    <th>REMITENTE</th>
                                    <th>ASUNTO / MENSAJE</th>
                                    <th>ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((msg) => (
                                    <tr key={msg.id}>
                                        <td style={{ minWidth: '120px' }}>
                                            {new Date(msg.created_at).toLocaleDateString()} <br />
                                            <span style={{ fontSize: '0.7rem', color: '#666' }}>
                                                {new Date(msg.created_at).toLocaleTimeString()}
                                            </span>
                                        </td>
                                        <td>
                                            <strong>{msg.name}</strong><br />
                                            <span style={{ fontSize: '0.8rem', color: '#888' }}>{msg.email}</span>
                                        </td>
                                        <td>
                                            <div style={{ maxWidth: '400px' }}>
                                                <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                                    {msg.subject || 'Sin asunto'}
                                                </p>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-admin btn-admin--danger"
                                                onClick={() => handleDelete(msg.id)}
                                            >
                                                BORRAR
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </div>
    );
}
