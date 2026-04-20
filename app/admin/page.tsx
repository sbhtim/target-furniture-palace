'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase, Product, CATEGORIES } from '@/lib/supabase'
import Image from 'next/image'
import { BarChart2, ShoppingCart, Eye, MessageCircle, TrendingUp } from 'lucide-react'

const EMOJI: Record<string, string> = { sofa:'🛋️', bed:'🛏️', tv:'📺', kitchen:'🍳', appliance:'⚡' }

type Stats = {
  product_id: string
  name: string
  views: number
  carts: number
  whatsapps: number
  total: number
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState<Stats[]>([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [editId, setEditId] = useState<string|null>(null)
  const [uploading, setUploading] = useState(false)
  const [tab, setTab] = useState<'products'|'stats'>('products')
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '', category: 'sofa', price: '', description: '',
    tag: '', stock_count: '', in_stock: true, image_url: ''
  })

  const handleLogin = () => {
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'targetfurniture2025'
    if (pw === expected) { setAuthed(true) }
    else { setPwError('Incorrect password. Try again.') }
  }

  const load = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts((data as Product[]) ?? [])
  }

  const loadStats = async () => {
    const { data: events } = await supabase.from('events').select('product_id, event_type')
    const { data: prods } = await supabase.from('products').select('id, name')
    if (!events || !prods) return

    const map: Record<string, Stats> = {}
    prods.forEach(p => {
      map[p.id] = { product_id: p.id, name: p.name, views: 0, carts: 0, whatsapps: 0, total: 0 }
    })
    events.forEach((e: any) => {
      if (!map[e.product_id]) return
      if (e.event_type === 'view') map[e.product_id].views++
      if (e.event_type === 'cart') map[e.product_id].carts++
      if (e.event_type === 'whatsapp') map[e.product_id].whatsapps++
      map[e.product_id].total++
    })
    setStats(Object.values(map).sort((a,b) => b.total - a.total))
  }

  useEffect(() => { if (authed) { load(); loadStats() } }, [authed])

  const resetForm = () => {
    setForm({ name:'', category:'sofa', price:'', description:'', tag:'', stock_count:'', in_stock:true, image_url:'' })
    setEditId(null)
  }

  const startEdit = (p: Product) => {
    setForm({
      name: p.name, category: p.category, price: String(p.price),
      description: p.description, tag: p.tag ?? '',
      stock_count: p.stock_count !== null ? String(p.stock_count) : '',
      in_stock: p.in_stock, image_url: p.image_url ?? ''
    })
    setEditId(p.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `products/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('product-images').upload(path, file, { upsert: true })
    if (error) { alert('Upload failed: ' + error.message); setUploading(false); return }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    setForm(f => ({ ...f, image_url: data.publicUrl }))
    setUploading(false)
  }

  const save = async () => {
    if (!form.name || !form.price) { setMsg('❌ Name and price are required.'); return }
    setLoading(true)
    const payload = {
      name: form.name, category: form.category, price: Number(form.price),
      description: form.description, tag: form.tag || null,
      stock_count: form.stock_count ? Number(form.stock_count) : null,
      in_stock: form.in_stock, image_url: form.image_url || null
    }
    const { error } = editId
      ? await supabase.from('products').update(payload).eq('id', editId)
      : await supabase.from('products').insert(payload)
    setLoading(false)
    if (error) { setMsg('❌ Error: ' + error.message) }
    else { setMsg(editId ? '✅ Product updated!' : '✅ Product added!'); resetForm(); load() }
    setTimeout(() => setMsg(''), 4000)
  }

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    await supabase.from('products').delete().eq('id', id)
    load()
  }

  if (!authed) return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-[#0a1628] text-2xl font-black mb-1">Admin Panel</div>
        <div className="text-gray-400 text-sm mb-6">Target Furniture Palace</div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Password</label>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder="Enter admin password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#c9933a] mb-2" />
        {pwError && <p className="text-red-500 text-xs mb-3">{pwError}</p>}
        <button onClick={handleLogin} className="bg-[#c9933a] text-[#0a1628] font-bold w-full py-3 rounded-xl hover:bg-[#e8b55a] transition-colors">Log In</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0a1628] text-white px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-[#c9933a] font-black text-lg">Admin Dashboard</div>
          <div className="text-white/50 text-xs">Target Furniture Palace</div>
        </div>
        <a href="/" className="text-white/60 text-xs hover:text-[#c9933a] transition-colors">← View Site</a>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100">
        <button onClick={()=>setTab('products')} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${tab==='products' ? 'text-[#c9933a] border-b-2 border-[#c9933a]' : 'text-gray-400'}`}>
          <ShoppingCart size={16} /> Products
        </button>
        <button onClick={()=>{setTab('stats');loadStats()}} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${tab==='stats' ? 'text-[#c9933a] border-b-2 border-[#c9933a]' : 'text-gray-400'}`}>
          <BarChart2 size={16} /> Sales Stats
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* STATS TAB */}
        {tab === 'stats' && (
          <div>
<div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="font-black text-[#0a1628] text-lg flex items-center gap-2">
                <TrendingUp size={20} className="text-[#c9933a]" /> Product Performance
              </h2>
              <div className="flex gap-2">
                {[['total','All'],['whatsapps','WhatsApp'],['views','Views'],['carts','Cart']].map(([key,label])=>(
                  <button key={key} onClick={()=>setStats([...stats].sort((a,b)=>(b as any)[key]-(a as any)[key]))} className="bg-white border border-gray-200 text-[#0a1628] text-xs font-bold px-3 py-1.5 rounded-full hover:border-[#c9933a] hover:text-[#c9933a] transition-colors">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <Eye size={20} className="text-[#c9933a] mx-auto mb-1" />
                <div className="font-black text-[#0a1628] text-xl">{stats.reduce((s,i)=>s+i.views,0)}</div>
                <div className="text-gray-400 text-xs">Total Views</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <ShoppingCart size={20} className="text-[#c9933a] mx-auto mb-1" />
                <div className="font-black text-[#0a1628] text-xl">{stats.reduce((s,i)=>s+i.carts,0)}</div>
                <div className="text-gray-400 text-xs">Cart Adds</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <MessageCircle size={20} className="text-[#c9933a] mx-auto mb-1" />
                <div className="font-black text-[#0a1628] text-xl">{stats.reduce((s,i)=>s+i.whatsapps,0)}</div>
                <div className="text-gray-400 text-xs">WA Orders</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {stats.filter(s=>s.total>0).map(s=>(
                <div key={s.product_id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="font-bold text-[#0a1628] text-sm mb-3">{s.name}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#fdf8f2] rounded-xl p-2 text-center">
                      <Eye size={14} className="text-[#c9933a] mx-auto mb-0.5" />
                      <div className="font-black text-[#0a1628] text-lg">{s.views}</div>
                      <div className="text-gray-400 text-[10px]">Views</div>
                    </div>
                    <div className="bg-[#fdf8f2] rounded-xl p-2 text-center">
                      <ShoppingCart size={14} className="text-[#c9933a] mx-auto mb-0.5" />
                      <div className="font-black text-[#0a1628] text-lg">{s.carts}</div>
                      <div className="text-gray-400 text-[10px]">Cart</div>
                    </div>
                    <div className="bg-[#fdf8f2] rounded-xl p-2 text-center">
                      <MessageCircle size={14} className="text-[#c9933a] mx-auto mb-0.5" />
                      <div className="font-black text-[#0a1628] text-lg">{s.whatsapps}</div>
                      <div className="text-gray-400 text-[10px]">WhatsApp</div>
                    </div>
                  </div>
                </div>
              ))}
              {stats.filter(s=>s.total>0).length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">
                  <BarChart2 size={40} className="mx-auto mb-3 opacity-30" />
                  No activity yet. Stats will appear when customers interact with products.
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
              <h2 className="font-bold text-[#0a1628] text-lg mb-4">{editId ? '✏️ Edit Product' : '➕ Add New Product'}</h2>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Product Image</label>
                <div className="relative aspect-video bg-[#fdf8f2] rounded-xl overflow-hidden flex items-center justify-center mb-2 cursor-pointer" onClick={()=>fileRef.current?.click()}>
                  {form.image_url
                    ? <Image src={form.image_url} alt="preview" fill className="object-cover" sizes="640px" />
                    : <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">{EMOJI[form.category] ?? '📦'}</div>
                        <div className="text-xs">Click to upload image</div>
                      </div>
                  }
                  {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-sm font-bold text-[#0a1628]">Uploading…</div>}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <button onClick={()=>fileRef.current?.click()} className="bg-[#fdf8f2] text-[#0a1628] font-semibold text-sm px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors w-full">
                  {form.image_url ? '🔄 Change Image' : '📷 Upload Image'}
                </button>
              </div>

              {[['Product Name *','name','text','e.g. 3-Seater Sofa Set'],['Price (KES) *','price','number','e.g. 28000'],['Description','description','textarea','Short description']].map(([label,key,type,ph])=>(
                <div key={key} className="mb-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
                  {type==='textarea'
                    ? <textarea value={(form as any)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#c9933a] resize-none" />
                    : <input type={type} value={(form as any)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#c9933a]" />
                  }
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Category</label>
                  <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#c9933a] bg-white">
                    {CATEGORIES.filter(c=>c.value!=='all').map(c=>(<option key={c.value} value={c.value}>{c.label}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Badge</label>
                  <select value={form.tag} onChange={e=>setForm(f=>({...f,tag:e.target.value}))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#c9933a] bg-white">
                    <option value="">None</option>
                    <option value="popular">⭐ Popular</option>
                    <option value="new">🆕 New</option>
                    <option value="hot">🔥 Hot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Stock Count</label>
                  <input type="number" value={form.stock_count} onChange={e=>setForm(f=>({...f,stock_count:e.target.value}))} placeholder="Leave empty = unlimited" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#c9933a]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Availability</label>
                  <select value={form.in_stock ? 'true' : 'false'} onChange={e=>setForm(f=>({...f,in_stock:e.target.value==='true'}))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#c9933a] bg-white">
                    <option value="true">✅ In Stock</option>
                    <option value="false">❌ Out of Stock</option>
                  </select>
                </div>
              </div>

              {msg && <div className={`text-sm font-semibold mb-3 p-3 rounded-xl ${msg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{msg}</div>}

              <div className="flex gap-3">
                <button onClick={save} disabled={loading||uploading} className="bg-[#c9933a] text-[#0a1628] font-bold flex-1 py-3 rounded-xl hover:bg-[#e8b55a] disabled:opacity-50 transition-colors">
                  {loading ? 'Saving…' : editId ? 'Update Product' : 'Add Product'}
                </button>
                {editId && <button onClick={resetForm} className="bg-gray-100 text-gray-600 font-semibold px-5 py-3 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>}
              </div>
            </div>

            <h2 className="font-bold text-[#0a1628] text-lg mb-3">All Products ({products.length})</h2>
            <div className="flex flex-col gap-3">
              {products.map(p=>(
                <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-16 h-16 bg-[#fdf8f2] rounded-xl overflow-hidden relative flex items-center justify-center flex-shrink-0">
                    {p.image_url ? <Image src={p.image_url} alt={p.name} fill className="object-cover" sizes="64px" /> : <span className="text-2xl">{EMOJI[p.category]??'📦'}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#0a1628] text-sm truncate">{p.name}</div>
                    <div className="text-[#c9933a] text-xs font-semibold">KES {p.price.toLocaleString()}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-[#fdf8f2] text-gray-500 px-2 py-0.5 rounded-full">{p.category}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.in_stock?'bg-green-50 text-green-600':'bg-red-50 text-red-500'}`}>{p.in_stock?'In Stock':'Out of Stock'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button onClick={()=>startEdit(p)} className="bg-[#0a1628] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#0a1628]/80 transition-colors">Edit</button>
                    <button onClick={()=>remove(p.id,p.name)} className="bg-red-50 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">Delete</button>
                  </div>
                </div>
              ))}
              {products.length===0&&<div className="text-center py-10 text-gray-400 text-sm">No products yet.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}