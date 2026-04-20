import { supabase, Product } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import FloatButtons from '@/components/FloatButtons'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import WAIcon from '@/components/WAIcon'
import { Phone, MessageCircle, MapPin, Clock, Truck, DollarSign, Package, Globe, LayoutGrid, Sofa, BedDouble, Tv, UtensilsCrossed, Zap } from 'lucide-react'

export const revalidate = 0

async function getProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false })
  return (data as Product[]) ?? []
}

export default async function Home() {
  const products = await getProducts()
  return (
    <div>
      <Navbar />
      <FloatButtons />

      <section className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#162544] to-[#0d1f3c] flex flex-col justify-center px-5 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#c9933a]/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#c9933a]/5 blur-3xl translate-y-1/3 pointer-events-none" />
        <div className="relative max-w-2xl">
          <h1 className="text-white font-black text-4xl sm:text-6xl leading-[1.1] mb-5">
            Quality Furniture and<br /><span className="text-[#c9933a]">Appliances</span> in Mwingi
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-lg mb-8">
            Discover beautiful furniture, TVs, kitchen appliances and more at affordable prices.
            Visit us on Bus Park Road or order instantly via WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#products" className="flex items-center gap-2 bg-[#c9933a] text-[#0a1628] font-bold px-7 py-3.5 rounded-full hover:bg-[#e8b55a] transition-all">
              <Package size={18} /> Browse Products
            </a>
            <a href="https://wa.me/254718187545" target="_blank" className="flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:border-[#c9933a] hover:text-[#c9933a] transition-all">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
          <div className="flex gap-8 mt-14">
            {[['4.9 ★','Google Rating'],['10k+','Happy Customers'],['Countrywide','Delivery']].map(([v,l])=>(
              <div key={l}>
                <strong className="block text-[#c9933a] text-2xl font-bold">{v}</strong>
                <span className="text-white/50 text-xs tracking-wide">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#c9933a] flex gap-6 px-5 py-3.5 overflow-x-auto items-center justify-center flex-wrap">
{['Affordable Prices','Same-Day Delivery within Mwingi','Quality Guaranteed','Easy WhatsApp Orders','Countrywide Delivery'].map(t=>(
          <span key={t} className="flex items-center gap-1.5 text-[#0a1628] font-semibold text-sm whitespace-nowrap">
            <span className="w-4 h-4 bg-[#0a1628] rounded-full flex items-center justify-center">
              <span className="text-[#c9933a] text-[10px] font-black">✓</span>
            </span>
            {t}
          </span>
        ))}
      </div>

      <section className="bg-white px-5 py-14">
        <p className="text-[#c9933a] text-xs font-bold tracking-widest uppercase mb-2">Shop by Category</p>
        <h2 className="text-[#0a1628] text-3xl font-black mb-6">What Are You Looking For?</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <a href="#products" className="bg-[#fdf8f2] rounded-2xl p-4 text-center hover:bg-white border-2 border-transparent hover:border-[#c9933a] hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-[#c9933a]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <LayoutGrid size={22} className="text-[#c9933a]" />
            </div>
            <div className="font-semibold text-[#0a1628] text-xs">All Items</div>
          </a>
          <a href="#products" className="bg-[#fdf8f2] rounded-2xl p-4 text-center hover:bg-white border-2 border-transparent hover:border-[#c9933a] hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-[#c9933a]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Sofa size={22} className="text-[#c9933a]" />
            </div>
            <div className="font-semibold text-[#0a1628] text-xs">Sofas</div>
          </a>
          <a href="#products" className="bg-[#fdf8f2] rounded-2xl p-4 text-center hover:bg-white border-2 border-transparent hover:border-[#c9933a] hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-[#c9933a]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BedDouble size={22} className="text-[#c9933a]" />
            </div>
            <div className="font-semibold text-[#0a1628] text-xs">Beds</div>
          </a>
          <a href="#products" className="bg-[#fdf8f2] rounded-2xl p-4 text-center hover:bg-white border-2 border-transparent hover:border-[#c9933a] hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-[#c9933a]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Tv size={22} className="text-[#c9933a]" />
            </div>
            <div className="font-semibold text-[#0a1628] text-xs">TVs</div>
          </a>
          <a href="#products" className="bg-[#fdf8f2] rounded-2xl p-4 text-center hover:bg-white border-2 border-transparent hover:border-[#c9933a] hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-[#c9933a]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <UtensilsCrossed size={22} className="text-[#c9933a]" />
            </div>
            <div className="font-semibold text-[#0a1628] text-xs">Kitchen</div>
          </a>
          <a href="#products" className="bg-[#fdf8f2] rounded-2xl p-4 text-center hover:bg-white border-2 border-transparent hover:border-[#c9933a] hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-[#c9933a]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Zap size={22} className="text-[#c9933a]" />
            </div>
            <div className="font-semibold text-[#0a1628] text-xs">Appliances</div>
          </a>
        </div>
      </section>

      <section className="bg-[#fdf8f2] px-5 py-14" id="products">
        <div className="flex items-end justify-between mb-4 flex-wrap gap-4">
          <div>
            <p className="text-[#c9933a] text-xs font-bold tracking-widest uppercase mb-1">Our Products</p>
            <h2 className="text-[#0a1628] text-3xl font-black">Shop Our Collection</h2>
          </div>
          <span className="text-gray-400 text-sm">{products.length} items available</span>
        </div>
        <SearchBar products={products} />
      </section>

      <section className="bg-[#0a1628] px-5 py-14" id="services">
        <p className="text-[#c9933a] text-xs font-bold tracking-widest uppercase mb-2">Why Choose Us</p>
        <h2 className="text-white text-3xl font-black mb-2">We Make It Easy</h2>
        <p className="text-white/50 text-sm mb-8">From timely delivery to affordable pricing, built around you.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            [Truck,'Same-day delivery within Mwingi and its environments. Countrywide delivery also available.'],
            [DollarSign,'Best Prices','We work directly with suppliers to give you the most affordable prices in the region.'],
            [Globe,'Countrywide Delivery','We deliver to all counties across Kenya. Order from anywhere!'],
            [MessageCircle,'Easy Ordering','Just WhatsApp or call us and we will sort your order quickly and efficiently.'],
          ].map(([Icon, title, desc]: any)=>(
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-[#c9933a]/10 hover:border-[#c9933a]/30 hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 bg-[#c9933a]/20 rounded-xl flex items-center justify-center mb-3">
                <Icon size={20} className="text-[#c9933a]" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-14" id="reviews">
        <p className="text-[#c9933a] text-xs font-bold tracking-widest uppercase mb-2">Customer Reviews</p>
        <h2 className="text-[#0a1628] text-3xl font-black mb-6">What People Say</h2>
        <div className="flex flex-col gap-4">
          {[
            ['5','I bought a 3-seater sofa and it was delivered on time. The quality is excellent and the staff were very helpful!','JM','James M.','Mwingi Town'],
            ['4','Got a VON electric kettle and a cooker here. Prices are very fair compared to Nairobi shops. Great variety of appliances.','AW','Agnes W.','Kitui Road'],
            ['5','Ordered a bed frame via WhatsApp and it was delivered and set up in my house quickly. Amazing service!','PK','Peter K.','Tseikuru'],
          ].map(([stars,text,init,name,loc])=>(
            <div key={name} className="bg-[#fdf8f2] rounded-2xl p-5">
              <div className="flex gap-1 mb-3">
                {Array.from({length: Number(stars)}).map((_,i)=>(
                  <span key={i} className="text-[#c9933a] text-lg">★</span>
                ))}
                {Array.from({length: 5 - Number(stars)}).map((_,i)=>(
                  <span key={i} className="text-gray-300 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9933a] flex items-center justify-center font-bold text-[#0a1628] text-sm flex-shrink-0">{init}</div>
                <div>
                  <div className="font-bold text-[#0a1628] text-sm">{name}</div>
                  <div className="text-gray-400 text-xs">{loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fdf8f2] px-5 py-14" id="contact">
        <p className="text-[#c9933a] text-xs font-bold tracking-widest uppercase mb-2">Find Us</p>
        <h2 className="text-[#0a1628] text-3xl font-black mb-6">Visit or Contact Us</h2>
        <div className="flex flex-col gap-3">
          <a href="tel:+254718187545" className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:translate-x-1 transition-transform">
            <div className="w-12 h-12 bg-[#0a1628] rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone size={22} className="text-[#c9933a]" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Phone (Click to Call)</div>
              <div className="font-bold text-[#0a1628]">0718 187 545</div>
            </div>
          </a>
          <a href="https://wa.me/254718187545" target="_blank" className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:translate-x-1 transition-transform">
            <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
              <WAIcon size={22} />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">WhatsApp</div>
              <div className="font-bold text-[#0a1628]">Chat with us now</div>
            </div>
          </a>
          <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-[#0a1628] rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={22} className="text-[#c9933a]" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Address</div>
              <div className="font-bold text-[#0a1628]">138 Bus Park Rd, Mwingi</div>
            </div>
          </div>
        </div>
        <h3 className="font-bold text-[#0a1628] mt-8 mb-3 flex items-center gap-2">
          <Clock size={18} className="text-[#c9933a]" /> Opening Hours
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#c9933a] rounded-xl p-3 flex justify-between items-center">
            <span className="font-bold text-[#0a1628] text-sm">Mon - Sat</span>
            <span className="text-[#0a1628] text-xs font-semibold">7AM - 8PM</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm">
            <span className="font-bold text-[#0a1628] text-sm">Sunday</span>
            <span className="text-gray-400 text-xs">9AM - 5PM</span>
          </div>
        </div>
        <a href="https://maps.google.com/?q=138+Bus+Park+Rd,+Mwingi,+Kenya" target="_blank" className="mt-6 h-44 bg-[#0a1628] rounded-2xl flex items-center justify-center text-center block hover:bg-[#162544] transition-colors">
          <div>
            <MapPin size={40} className="text-[#c9933a] mx-auto mb-2" />
            <strong className="block text-[#c9933a] text-sm font-bold mb-1">Target Furniture Palace</strong>
            <span className="text-white/50 text-xs">138 Bus Park Rd, Mwingi - Tap to open in Maps</span>
          </div>
        </a>
      </section>

      <footer className="bg-[#0a1628] text-white/60 text-center py-10 px-5">
        <div className="text-[#c9933a] text-xl font-black mb-1">Target Furniture Palace</div>
        <div className="text-xs mb-5">Quality Furniture and Appliances - Mwingi, Kenya</div>
        <div className="flex gap-5 justify-center flex-wrap mb-6 text-xs">
          {[['/#products','Products'],['/#services','Services'],['/#reviews','Reviews'],['/#contact','Contact']].map(([href,label])=>(
            <a key={label} href={href} className="hover:text-[#c9933a] transition-colors">{label}</a>
          ))}
        </div>
        <div className="text-xs">© {new Date().getFullYear()} Target Furniture Palace · 138 Bus Park Rd, Mwingi · 0718 187 545</div>
      </footer>
    </div>
  )
}