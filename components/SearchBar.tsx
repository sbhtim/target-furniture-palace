'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product } from '@/lib/supabase'

export default function SearchBar({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || p.category === category
    return matchSearch && matchCat
  })

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border-2 border-transparent focus-within:border-[#c9933a] transition-colors">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent text-[#0a1628] placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap mb-6">
        {['all','sofa','bed','tv','kitchen','appliance'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              category === cat
                ? 'bg-[#c9933a] text-[#0a1628]'
                : 'bg-white text-gray-500 hover:border-[#c9933a] border border-gray-200'
            }`}
          >
            {cat === 'all' ? 'All Items' : cat}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No products found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  )
}