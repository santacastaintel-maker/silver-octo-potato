import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProjectsGallery from './pages/ProjectsGallery';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMessages from './pages/AdminMessages';
import ProjectEditor from './pages/ProjectEditor';
import BlogPostEditor from './pages/BlogPostEditor';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import Notification from './components/Notification';

function App() {
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <>
      {/* Sistema de Notificaciones Global */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
          duration={5000}
        />
      )}

      {/* Enrutador de Páginas */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/proyectos" element={<ProjectsGallery />} />
        <Route path="/proyecto/:slug" element={<ProjectDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<PostDetail />} />

        {/* Rutas Administrativas */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/proyecto/nuevo" element={<ProjectEditor />} />
        <Route path="/admin/proyecto/editar/:id" element={<ProjectEditor />} />
        <Route path="/admin/blog/nuevo" element={<BlogPostEditor />} />
        <Route path="/admin/blog/editar/:id" element={<BlogPostEditor />} />
        <Route path="/admin/mensajes" element={<AdminMessages />} />
      </Routes>
    </>
  );
}

export default App;
