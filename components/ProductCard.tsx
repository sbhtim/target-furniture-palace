'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/supabase'
import { useCart } from './CartProvider'
import { ShoppingCart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ProductCard({ p }: { p: Product }) {
  const { addToCart } = useCart()
  const waMsg = encodeURIComponent('Hi, I am interested in ' + p.name + ' (KES ' + p.price.toLocaleString() + '). Is it available?')
  const tagStyle = p.tag === 'new' ? 'bg-green-500 text-white' : p.tag === 'hot' ? 'bg-red-500 text-white' : 'bg-[#c9933a] text-[#0a1628]'
  const tagLabel = p.tag === 'popular' ? '⭐ Popular' : p.tag === 'new' ? 'New' : '🔥 Hot'

  const track = async (event_type: string) => {
    await supabase.from('events').insert({ product_id: p.id, event_type })
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
      {p.tag && (
        <span className={"absolute top-2 left-2 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full " + tagStyle}>
          {tagLabel}
        </span>
      )}
      <Link href={'/products/' + p.id} className="block" onClick={() => track('view')}>
        <div className="aspect-[4/3] bg-[#fdf8f2] flex items-center justify-center overflow-hidden relative">
          {p.image_url ? (
            <Image src={p.image_url} alt={p.name} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 25vw" quality={90} />
          ) : (
            <span className="text-5xl">📦</span>
          )}
        </div>
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <Link href={'/products/' + p.id} onClick={() => track('view')}>
          <h3 className="font-bold text-[#0a1628] text-sm leading-snug mb-1 hover:text-[#c9933a] transition-colors">{p.name}</h3>
        </Link>
        <p className="text-gray-400 text-xs line-clamp-2 mb-2">{p.description}</p>
        {p.stock_count !== null && p.stock_count <= 5 && (
          <p className="text-red-500 text-[11px] font-semibold mb-2">Only {p.stock_count} left!</p>
        )}
        <div className="flex items-center justify-between mt-auto gap-2">
          <span className="text-[#c9933a] font-bold text-sm">KES {p.price.toLocaleString()}</span>
          <div className="flex gap-1.5">
            <button onClick={() => { addToCart(p); track('cart') }} className="bg-[#0a1628] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#c9933a] transition-colors flex-shrink-0" title="Add to Cart">
              <ShoppingCart size={14} />
            </button>
            <a href={"https://wa.me/254718187545?text=" + waMsg} target="_blank" onClick={() => track('whatsapp')} className="bg-[#25D366] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" title="Order via WhatsApp">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
