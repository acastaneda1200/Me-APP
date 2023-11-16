
import { createClient } from '@supabase/supabase-js'
import useAuthUser from "src/composables/useAuthUser";

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
    const { user } = useAuthUser()
    user.value = session?.user || null
})

export { supabase };
