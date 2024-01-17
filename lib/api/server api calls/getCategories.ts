export async function getCategories(): Promise<Category[]|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Category`, {next:{revalidate:0}})).text()
    const data: Category[] = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}