export async function getCategory(id?: string): Promise<CategoryById|undefined> {
    if(id){
       try{
        const text = await (await fetch(`${process.env.BACK_END_URL}/api/Category/${id}`, {next:{revalidate:0}})).text()
        const data: CategoryById = JSON.parse(text)
        return data
       }
       catch(err) {
        return undefined
       }
    } else{
        return undefined
    }
}