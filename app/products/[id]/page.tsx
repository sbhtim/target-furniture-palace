import { supabase, CATEGORIES, Product } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import FloatButtons from '@/components/FloatButtons'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: p } = await supabase.from('products').select('*').eq('id', params.id).single()
  if (!p) notFound()
  const { data: related } = await supabase.from('products').select('*').eq('category', p.category).neq('id', p.id).limit(4)
  const waMsg = encodeURIComponent('Hi, I am interested in ' + p.name + ' (KES ' + p.price.toLocaleString() + '). Is it available?')
  const cat = CATEGORIES.find(c => c.value === p.category)
  return (
    <div>
      <Navbar />
      <FloatButtons />
      <div className="pt-20 min-h-screen bg-[#fdf8f2]">
        <div className="px-5 py-4 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#c9933a]">Home</Link>
          <span>›</span>
          <Link href="/#products" className="hover:text-[#c9933a]">Products</Link>
          <span>›</span>
          <span className="text-[#0a1628] font-semibold">{p.name}</span>
        </div>
        <div className="px-5 pb-10 max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">{cat?.label ?? p.category}</span>
                <h1 className="text-[#0a1628] text-2xl font-black mt-1">{p.name}</h1>
              </div>
              <div className="text-[#c9933a] text-2xl font-bold">KES {p.price.toLocaleString()}</div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
          </div>
          <a href={'https://wa.me/254718187545?text=' + waMsg} target="_blank" className="flex items-center justify-center bg-[#25D366] text-white font-bold text-base py-4 rounded-2xl w-full mb-3">
            Order via WhatsApp
          </a>
          <a href="tel:+254718187545" className="flex items-center justify-center bg-[#0a1628] text-white font-semibold text-base py-3.5 rounded-2xl w-full">
            Call to Order: 0718 187 545
          </a>
        </div>
        {related && related.length > 0 && (
          <div className="px-5 pb-16">
            <h2 className="text-[#0a1628] text-xl font-black mb-4">Related Products</h2>
            <div className="grid grid-cols-2 gap-4">
              {(related as Product[]).map(r => (<ProductCard key={r.id} p={r} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}