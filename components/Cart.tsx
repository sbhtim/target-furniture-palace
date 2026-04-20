'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from './CartProvider'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'

export default function Cart() {
  const [open, setOpen] = useState(false)
  const { items, removeFromCart, updateQty, clearCart, total, count } = useCart()
  const pathname = usePathname()
  if (pathname === '/admin') return null

  const sendToWhatsApp = () => {
    if (items.length === 0) return
    const lines = items.map(i => i.quantity + 'x ' + i.product.name + ' @ KES ' + i.product.price.toLocaleString()).join('%0A')
    const totalLine = '%0A%0ATotal: KES ' + total.toLocaleString()
    const msg = 'Hi, I would like to order the following:%0A%0A' + lines + totalLine + '%0A%0APlease confirm availability.'
    window.open('https://wa.me/254718187545?text=' + msg, '_blank')
  }

  return (
    <div>
      <button onClick={() => setOpen(true)} className="fixed bottom-40 right-5 z-50 bg-[#c9933a] text-[#0a1628] w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="View Cart">
        <ShoppingCart size={20} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{count}</span>
        )}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-[#0a1628] text-xl flex items-center gap-2">
                <ShoppingCart size={22} className="text-[#c9933a]" /> My Cart ({count})
              </h2>
              <button onClick={() => setOpen(false)} className="bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center">
                <X size={18} />
              </button>
            </div>
            {items.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">Your cart is empty</p>
                <p className="text-sm mt-1">Add products to get started</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-3 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="bg-[#fdf8f2] rounded-2xl p-4 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#0a1628] text-sm truncate">{item.product.name}</div>
                        <div className="text-[#c9933a] text-xs font-semibold">KES {item.product.price.toLocaleString()} each</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-[#0a1628] w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Plus size={14} />
                        </button>
                        <button onClick={() => removeFromCart(item.product.id)} className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center ml-1">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0a1628]">Total</span>
                    <span className="font-black text-[#c9933a] text-xl">KES {total.toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={sendToWhatsApp} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mb-3">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Order via WhatsApp
                </button>
                <button onClick={clearCart} className="w-full bg-gray-100 text-gray-500 font-semibold py-3 rounded-2xl text-sm">Clear Cart</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
