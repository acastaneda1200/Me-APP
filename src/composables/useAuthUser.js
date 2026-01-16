import { storeToRefs } from 'pinia';
import { useAuthStore } from 'stores/auth';

export default function useAuthUser() {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);

    const login = async ({ email, password }) => {
        return await authStore.login(email, password);
    };

    const register = async (data) => {
        return await authStore.register(data);
    };

    const logout = async () => {
        return authStore.logout();
    };

    const isLoggedIn = () => {
        return authStore.isAuthenticated;
    };

    // Keep other methods as stubs or implement if needed
    const loginWithSocialProvider = async (provider) => {
        console.warn('Social login not implemented in new backend');
        throw new Error('Social login not supported');
    };

    const update = async (data) => {
        console.warn('Update user not implemented yet');
    };

    const sendPasswordResetEmail = async (email) => {
        console.warn('Password reset not implemented yet');
        // throw new Error('Password reset not supported');
    };

    return {
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordResetEmail,
    };
}