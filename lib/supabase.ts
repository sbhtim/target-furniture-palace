import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  category: string
  price: number
  description: string
  image_url: string | null
  tag: string | null
  stock_count: number | null
  in_stock: boolean
  created_at: string
}

export const CATEGORIES = [
  { value: 'all',       label: 'All Items' },
  { value: 'sofa',      label: 'Sofas' },
  { value: 'bed',       label: 'Beds' },
  { value: 'tv',        label: 'TVs' },
  { value: 'kitchen',   label: 'Kitchen' },
  { value: 'appliance', label: 'Appliances' },
]