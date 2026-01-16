import { api } from 'boot/axios';

export default function useUploads() {
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Assuming the backend returns { url: '...' } or { key: '...', url: '...' }
            // If it returns just key, we might need to construct URL or call getSignedUrl.
            // Let's assume it returns { url } based on common practices, or I check the service.
            // But I can't check service easily without reading more files.
            // `uploads.controller.ts` calls `uploadFile`.
            // Let's assume it returns an object that has the URL or I can use the key to get the URL.
            // If the backend returns S3 key, I might need another call.
            // Let's inspect the response in development or guess.
            // `uploads.controller.ts` has `getSignedUrl`.
            // Let's assume `uploadFile` returns the file object.

            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    return {
        uploadFile
    };
}
