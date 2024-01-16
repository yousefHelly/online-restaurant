export async function getChef(id?: string): Promise<ChefById|undefined> {
    if(id){
       try{
        const text = await (await fetch(`${process.env.BACK_END_URL}/api/chef/${id}`, {next:{revalidate:0}})).text()
        const data: ChefById = JSON.parse(text)
        return data
       }
       catch(err) {
        return undefined
       }
    } else{
        return undefined
    }
}