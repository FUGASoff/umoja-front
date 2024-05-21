import { useApi } from "./useApi";
import { useUserStore } from "~/stores/userStore";

export const fetchAllPosts = async () => {
    const api = useApi()
    const userStore = useUserStore()
    try{
        const response = await api({
            url: 'allposts',
            method: 'GET'
        });
        userStore.allPosts = response.data.data
        return 
    }catch(error){
        console.error(error)
    }
}
export const fetchAllArticle = async () => {
    const api = useApi()
    const userStore = useUserStore()
    try{
        const response = await api({
            url: 'allarticles',
            method: 'GET'
        });
        userStore.allArticles = response.data.data
        return 
    }catch(error){
        console.error(error)
    }
}