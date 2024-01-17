export async function getChefs(): Promise<Chef[]|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Chef/GetAllChefs`, {next:{revalidate:0}})).text()
    const data: Chef[] = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}