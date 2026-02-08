import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useBlog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async (onlyPublished = true) => {
        try {
            setLoading(true);
            let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
            if (onlyPublished) query = query.eq('is_published', true);
            const { data, error: fetchError } = await query;
            if (fetchError) throw fetchError;
            setPosts(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id) => {
        try {
            const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', id);
            if (deleteError) throw deleteError;
            setPosts(prev => prev.filter(p => p.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const createPost = async (postData) => {
        try {
            const { data, error: createError } = await supabase.from('blog_posts').insert([postData]).select().single();
            if (createError) throw createError;
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const updatePost = async (id, updates) => {
        try {
            const { data, error: updateError } = await supabase.from('blog_posts').update(updates).eq('id', id).select().single();
            if (updateError) throw updateError;
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const getPostById = async (id) => {
        const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
        return data;
    };

    useEffect(() => {
        fetchPosts(false);
    }, []);

    return { posts, loading, error, fetchPosts, deletePost, createPost, updatePost, getPostById };
}
