import { supabase } from '@/lib/supabase';

const BUCKET = 'food';

export function getImageUrl(path: string) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
