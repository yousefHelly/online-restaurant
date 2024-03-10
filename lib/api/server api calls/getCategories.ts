export async function getCategories(): Promise<{categories:Category[]}&WithPagination|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Category`, {next:{tags:['categories']}})).text()
    const data: {categories:Category[]}&WithPagination = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}