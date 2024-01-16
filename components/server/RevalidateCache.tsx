"use server"
import { revalidatePath, revalidateTag } from "next/cache"
async function RevalidateCache(path: string, tag?:boolean) {
    if(tag){
        revalidateTag(path)
    }else{
        revalidatePath(path)
    }
}

export default RevalidateCache