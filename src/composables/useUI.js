import { useUIStore } from 'stores/ui';
import {storeToRefs} from 'pinia'

const useUI = () => {
    const UIStore = useUIStore();
    const { leftDrawerOpen , addDialogPerfume} = storeToRefs(UIStore);
    const { toggleLeftDrawer, handleAddDialogPerfume } = UIStore;

    return{
        leftDrawerOpen,
        toggleLeftDrawer,
        addDialogPerfume,
        handleAddDialogPerfume
    }
}

export default useUI