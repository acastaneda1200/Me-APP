import { ref } from "vue";
import { supabase } from 'boot/supabase'

export default function useApiSP(){

    const getPerfume = async () => {
        const { data, error } = await supabase.from("perfume").select(`
        *,
        perfume_properties ( * )
      `);
      if (error) throw error
      return data
    }

    const uploadImage = async (image, storage) => {
        const nameImg = `${image.name}-${Date.now()}`
        const { data, error } = await supabase.storage
        .from(storage)
        .upload(nameImg, image, {
            cacheControl: "3600",
            upsert: false,
        });
        const publicUrl = await getUrlPublic(nameImg, storage)
        if (error) throw error
        return publicUrl
    }

    const getUrlPublic = async (filename, storage) => {
        const { data } = supabase
        .storage
        .from(storage)
        .getPublicUrl(filename)
        return data
    }

    const insertRow = async (form, table) => {
        const { data, error } = await supabase
        .from(table)
        .insert(form)
        .select()
        if (error) throw error
        return data
    }

    return {
        getPerfume,
        uploadImage,
        insertRow,
    }


}