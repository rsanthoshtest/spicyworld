import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import adminApi from '../services/adminApi';

const CATEGORIES = ['Biryani', 'Dosa', 'Idli', 'Rice', 'Curries', 'Street Food', 'Snacks', 'Drinks', 'Desserts'];
const SPICY_LABELS = { 1: 'Very Mild', 2: 'Mild', 3: 'Medium', 4: 'Spicy', 5: 'Very Spicy' };

const EMPTY_FORM = {
    name: '', category: 'Biryani', price: '', image: '',
    description: '', isVeg: true, spicyLevel: 3,
    isBestseller: false, isChefSpecial: false,
    ingredients: '', rating: 4.5, isAvailable: true,
};

const AdminFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editFood, setEditFood] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchFoods = () => {
        setLoading(true);
        adminApi.get('/api/admin/foods')
            .then(res => setFoods(res.data))
            .catch(() => setError('Failed to load foods.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchFoods(); }, []);

    const openAdd = () => {
        setEditFood(null);
        setForm(EMPTY_FORM);
        setError('');
        setShowModal(true);
    };

    const openEdit = (food) => {
        setEditFood(food);
        setForm({
            name: food.name, category: food.category, price: food.price,
            image: food.image, description: food.description, isVeg: food.isVeg,
            spicyLevel: food.spicyLevel, isBestseller: food.isBestseller,
            isChefSpecial: food.isChefSpecial,
            ingredients: Array.isArray(food.ingredients) ? food.ingredients.join(', ') : '',
            rating: food.rating || 4.5, isAvailable: food.isAvailable !== false,
        });
        setError('');
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            const payload = {
                ...form,
                price: Number(form.price),
                spicyLevel: Number(form.spicyLevel),
                rating: Number(form.rating),
                ingredients: form.ingredients.split(',').map(s => s.trim()).filter(Boolean),
            };
            if (editFood) {
                await adminApi.put(`/api/admin/foods/${editFood._id}`, payload);
            } else {
                await adminApi.post('/api/admin/foods', payload);
            }
            setShowModal(false);
            fetchFoods();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save food item.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminApi.delete(`/api/admin/foods/${id}`);
            setDeleteConfirm(null);
            fetchFoods();
        } catch { setError('Failed to delete food.'); }
    };

    const filtered = foods.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout title="Food Management" subtitle={`${foods.length} total items`}>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name or category..."
                    className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500/50 placeholder:text-slate-600"
                />
                <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-2.5 rounded-xl text-sm tracking-widest uppercase transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap">
                    + Add Food
                </button>
            </div>

            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">{error}</div>}

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800">
                            {['Image', 'Name', 'Category', 'Price', 'Veg', 'Spice', 'Status', 'Actions'].map(h => (
                                <th key={h} className="text-left px-5 py-4 text-[10px] font-black text-slate-500 tracking-widest uppercase">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="border-b border-slate-800/50">
                                    {Array(8).fill(0).map((_, j) => (
                                        <td key={j} className="px-5 py-4"><div className="h-4 bg-slate-800 rounded animate-pulse w-20" /></td>
                                    ))}
                                </tr>
                            ))
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={8} className="text-center py-16 text-slate-500">No food items found.</td></tr>
                        ) : (
                            filtered.map(food => (
                                <tr key={food._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-5 py-3">
                                        <img src={food.image} alt={food.name} className="w-12 h-12 object-cover rounded-xl"
                                            onError={e => { e.target.src = 'https://placehold.co/100x100/1e293b/94a3b8?text=Broken+Link'; }} />
                                    </td>
                                    <td className="px-5 py-3">
                                        <p className="text-white font-bold">{food.name}</p>
                                        {food.isBestseller && <span className="text-[10px] text-orange-400 font-black">🔥 BESTSELLER</span>}
                                    </td>
                                    <td className="px-5 py-3 text-slate-400">{food.category}</td>
                                    <td className="px-5 py-3 text-orange-400 font-black">₹{food.price}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${food.isVeg ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                            {food.isVeg ? 'VEG' : 'NON-VEG'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-slate-400 text-xs">{SPICY_LABELS[food.spicyLevel] || food.spicyLevel}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${food.isAvailable !== false ? 'bg-green-500/10 text-green-400' : 'bg-slate-700 text-slate-500'}`}>
                                            {food.isAvailable !== false ? 'Available' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(food)} className="text-slate-400 hover:text-orange-400 transition-colors p-1.5 hover:bg-orange-500/10 rounded-lg">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => setDeleteConfirm(food)} className="text-slate-400 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10 rounded-t-3xl">
                            <h2 className="text-white font-black text-lg">{editFood ? 'Edit Food Item' : 'Add New Food Item'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="px-8 py-6 space-y-5">
                            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</div>}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="admin-label">Food Name *</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="admin-input" placeholder="e.g. Chicken Biryani" />
                                </div>
                                <div>
                                    <label className="admin-label">Category *</label>
                                    <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="admin-input">
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="admin-label">Price (₹) *</label>
                                    <input required type="number" min="1" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="admin-input" placeholder="299" />
                                </div>
                                <div className="col-span-2">
                                    <label className="admin-label">Image URL *</label>
                                    <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="admin-input" placeholder="https://..." />
                                    {form.image && <img src={form.image} alt="preview" className="mt-2 w-20 h-20 object-cover rounded-xl border border-slate-700" onError={e => { e.target.src = 'https://placehold.co/200x200/1e293b/ef4444?text=Invalid+URL'; }} />}
                                </div>
                                <div className="col-span-2">
                                    <label className="admin-label">Description *</label>
                                    <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="admin-input h-20 resize-none" placeholder="Describe this dish..." />
                                </div>
                                <div className="col-span-2">
                                    <label className="admin-label">Ingredients (comma-separated)</label>
                                    <input value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} className="admin-input" placeholder="Rice, Chicken, Spices, Saffron" />
                                </div>
                                <div>
                                    <label className="admin-label">Spice Level *</label>
                                    <select value={form.spicyLevel} onChange={e => setForm({ ...form, spicyLevel: Number(e.target.value) })} className="admin-input">
                                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{SPICY_LABELS[n]}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="admin-label">Rating</label>
                                    <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="admin-input" />
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                {[
                                    { key: 'isVeg', label: 'Vegetarian' },
                                    { key: 'isBestseller', label: 'Mark as Bestseller' },
                                    { key: 'isChefSpecial', label: "Chef's Special" },
                                    { key: 'isAvailable', label: 'Available on Menu' },
                                ].map(({ key, label }) => (
                                    <label key={key} className="flex items-center gap-3 cursor-pointer bg-slate-800 px-4 py-3 rounded-xl">
                                        <div className={`relative w-10 h-5 rounded-full transition-colors ${form[key] ? 'bg-orange-500' : 'bg-slate-600'}`} onClick={() => setForm({ ...form, [key]: !form[key] })}>
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form[key] ? 'translate-x-5' : ''}`} />
                                        </div>
                                        <span className="text-slate-300 text-xs font-bold">{label}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all">Cancel</button>
                                <button type="submit" disabled={saving} className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-sm transition-all disabled:opacity-60">
                                    {saving ? 'Saving...' : editFood ? 'Update Food' : 'Add Food'}
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
                        <div className="text-4xl mb-4">🗑️</div>
                        <h3 className="text-white font-black text-lg mb-2">Delete Food Item?</h3>
                        <p className="text-slate-400 text-sm mb-6">Are you sure you want to delete <strong className="text-white">"{deleteConfirm.name}"</strong>? This action cannot be undone.</p>
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

export default AdminFoods;
