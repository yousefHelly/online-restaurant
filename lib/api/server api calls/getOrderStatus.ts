export async function getOrderStatus(id?: string): Promise<PostOrderResponse|undefined> {
    if(id){
       try{
        const text = await (await fetch(`${process.env.BACK_END_URL}/api/Order/${id}`, {next:{revalidate:0}})).text()
        const data: PostOrderResponse = JSON.parse(text)
        return data
       }
       catch(err) {
        return undefined
       }
    } else{
        return undefined
    }
}