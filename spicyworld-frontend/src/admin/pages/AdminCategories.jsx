import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import adminApi from '../services/adminApi';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editCat, setEditCat] = useState(null);
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchCategories = () => {
        setLoading(true);
        adminApi.get('/api/admin/categories')
            .then(res => setCategories(res.data))
            .catch(() => setError('Failed to load categories.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchCategories(); }, []);

    const openAdd = () => { setEditCat(null); setName(''); setError(''); setShowModal(true); };
    const openEdit = (cat) => { setEditCat(cat); setName(cat.name); setError(''); setShowModal(true); };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (editCat) {
                await adminApi.put(`/api/admin/categories/${editCat._id}`, { name });
            } else {
                await adminApi.post('/api/admin/categories', { name });
            }
            setShowModal(false);
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save category.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminApi.delete(`/api/admin/categories/${id}`);
            setDeleteConfirm(null);
            fetchCategories();
        } catch { setError('Failed to delete category.'); }
    };

    return (
        <AdminLayout title="Category Management" subtitle={`${categories.length} categories configured`}>
            {/* Toolbar */}
            <div className="flex justify-end mb-6">
                <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-2.5 rounded-xl text-sm tracking-widest uppercase transition-all shadow-lg shadow-orange-500/20">
                    + Add Category
                </button>
            </div>

            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">{error}</div>}

            {/* Grid of Categories */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 animate-pulse">
                            <div className="h-5 bg-slate-800 rounded w-2/3 mb-2" />
                            <div className="h-3 bg-slate-800 rounded w-1/3" />
                        </div>
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    <p className="text-4xl mb-4">🏷️</p>
                    <p>No categories yet. Add your first one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map(cat => (
                        <div key={cat._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between group hover:border-slate-700 transition-colors">
                            <div>
                                <p className="text-white font-black text-base">{cat.name}</p>
                                <p className="text-slate-500 text-xs mt-0.5 font-mono">/{cat.slug}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEdit(cat)} className="text-slate-400 hover:text-orange-400 p-1.5 hover:bg-orange-500/10 rounded-lg transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </button>
                                <button onClick={() => setDeleteConfirm(cat)} className="text-slate-400 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-white font-black text-lg">{editCat ? 'Edit Category' : 'Add New Category'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="px-8 py-6 space-y-5">
                            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</div>}
                            <div>
                                <label className="admin-label">Category Name *</label>
                                <input required value={name} onChange={e => setName(e.target.value)} className="admin-input" placeholder="e.g. North Indian" />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all">Cancel</button>
                                <button type="submit" disabled={saving} className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-sm transition-all disabled:opacity-60">
                                    {saving ? 'Saving...' : editCat ? 'Update' : 'Add Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                        <div className="text-4xl mb-4">🏷️</div>
                        <h3 className="text-white font-black text-lg mb-2">Delete Category?</h3>
                        <p className="text-slate-400 text-sm mb-6">Delete <strong className="text-white">"{deleteConfirm.name}"</strong>? This won't delete associated foods.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-slate-700 rounded-xl text-slate-400 hover:text-white font-bold text-sm transition-all">Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm._id)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-black rounded-xl text-sm transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminCategories;
