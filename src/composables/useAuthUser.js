import { ref } from "vue";
import { supabase } from 'boot/supabase'
// import { useAuthStore } from 'stores/auth';
// import {storeToRefs} from 'pinia'

const user = ref(null)
export default function useAuthUser(){
    // const authStore = useAuthStore();
    // const { user } = storeToRefs(authStore);

    const login = async ({email, password}) => {
        const {user, error} = await supabase.auth.signInWithPassword({email, password})
        if (error) throw error
        return user
    }

    const loginWithSocialProvider = async (provider) => {
        const {user, error} = await supabase.auth.signIn({provider})
        if (error) throw error
        return user
    }

    const logout = async () => {
        const {error} = await supabase.auth.signOut()
        if (error) throw error
    }
    
    const isLoggedIn = () => {
        return !!user.value
    }

    const register = async ({email, password, ...meta}) => {
        const { user, error } = await supabase.auth.signUp(
            {
                email,
                password,
                options: {
                    data: meta,
                    emailRedirectTo: `${window.location.origin}/main`
                }
            },
           
        )
        if (error) throw error
        return user
    }

    const update = async (data) => {
        const {user, error} = await supabase.auth.update(data)
        if (error) throw error
        return user
    }

    const sendPasswordResetEmail = async (email) =>{
        const {user, error} = await supabase.auth.api.resetPasswordForEmail(email)
        if (error) throw error
        return user
    }

    return {
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordResetEmail,
    }


}