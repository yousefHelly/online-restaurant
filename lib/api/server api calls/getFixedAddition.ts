``
export async function getFixedAddition(id?: string): Promise<FixedAddition|undefined> {
    if(id){
       try{
        const text = await (await fetch(`${process.env.BACK_END_URL}/api/StaticAddition/${id}`, {next:{revalidate:0}})).text()
        const data: FixedAddition = JSON.parse(text)
        return data
       }
       catch(err) {
        return undefined
       }
    } else{
        return undefined
    }
}