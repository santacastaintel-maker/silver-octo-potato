import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Hook personalizado para gestionar proyectos desde Supabase
 * Maneja: obtener todos, obtener por ID, crear, actualizar, eliminar
 */
export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todos los proyectos publicados con sus relaciones
    const fetchProjects = async (onlyPublished = true) => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('projects_full')
                .select('*')
                .order('order_index', { ascending: true })
                .order('created_at', { ascending: false });

            if (onlyPublished) {
                query = query.eq('is_published', true);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;

            setProjects(data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error al obtener proyectos:', err);
        } finally {
            setLoading(false);
        }
    };

    // Obtener un proyecto por su slug
    const getProjectBySlug = async (slug) => {
        try {
            const { data, error: fetchError } = await supabase
                .from('projects_full')
                .select('*')
                .eq('slug', slug)
                .single();

            if (fetchError) throw fetchError;

            return data;
        } catch (err) {
            console.error('Error al obtener proyecto:', err);
            return null;
        }
    };

    // Obtener proyectos destacados
    const getFeaturedProjects = async () => {
        try {
            const { data, error: fetchError } = await supabase
                .from('projects_full')
                .select('*')
                .eq('is_featured', true)
                .eq('is_published', true)
                .order('order_index', { ascending: true })
                .limit(3);

            if (fetchError) throw fetchError;

            return data || [];
        } catch (err) {
            console.error('Error al obtener proyectos destacados:', err);
            return [];
        }
    };

    // Crear un nuevo proyecto
    const createProject = async (projectData) => {
        try {
            const { data, error: createError } = await supabase
                .from('projects')
                .insert([projectData])
                .select()
                .single();

            if (createError) throw createError;

            // Forzar recarga de la lista incluyendo borradores
            await fetchProjects(false);

            return { success: true, data };
        } catch (err) {
            console.error('Error al crear proyecto:', err);
            return { success: false, error: err.message };
        }
    };

    // Actualizar un proyecto existente
    const updateProject = async (id, updates) => {
        try {
            const { data, error: updateError } = await supabase
                .from('projects')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            // Actualizar la lista local
            await fetchProjects(false);

            return { success: true, data };
        } catch (err) {
            console.error('Error al actualizar proyecto:', err);
            return { success: false, error: err.message };
        }
    };

    // Eliminar un proyecto
    const deleteProject = async (id) => {
        try {
            const { error: deleteError } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            // Actualizar la lista local
            setProjects(prev => prev.filter(p => p.id !== id));

            return { success: true };
        } catch (err) {
            console.error('Error al eliminar proyecto:', err);
            return { success: false, error: err.message };
        }
    };

    // Cargar proyectos al montar el componente
    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        loading,
        error,
        fetchProjects,
        getProjectBySlug,
        getFeaturedProjects,
        createProject,
        updateProject,
        deleteProject,
    };
}
