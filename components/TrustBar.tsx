'use client'

export default function TrustBar() {
  const items = [
    '✓ Affordable Prices',
    '✓ Same-Day Delivery in Mwingi',
    '✓ Quality Guaranteed',
    '✓ Easy WhatsApp Orders',
    '✓ Countrywide Delivery',
    '✓ Affordable Prices',
    '✓ Same-Day Delivery in Mwingi',
    '✓ Quality Guaranteed',
    '✓ Easy WhatsApp Orders',
    '✓ Countrywide Delivery',
  ]
  return (
    <div className="bg-[#c9933a] overflow-hidden py-2.5">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-[#0a1628] font-bold text-sm whitespace-nowrap">
            {item}
            <span className="text-[#0a1628]/40 text-lg">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
