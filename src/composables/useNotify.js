import { useQuasar } from "quasar";
export default function useNotify(){
    const $q = useQuasar()

    const notify = ({message, type}) => {
        $q.notify({
            message: message || 'OK',
            type,
        })
    }

    return {
        notify
    }
}