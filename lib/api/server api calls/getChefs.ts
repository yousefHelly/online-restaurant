export async function getChefs(): Promise<{chefs:Chef[]}&WithPagination|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Chef/GetAllChefs`, {next:{tags:['chefs']}})).text()
    const data: {chefs:Chef[]}&WithPagination = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}