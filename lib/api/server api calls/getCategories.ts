export async function getCategories(page: number = 1, size?: number): Promise<{ categories: Category[] } & WithPagination | undefined> {
    try {
        const text = await (await fetch(`${process.env.BACK_END_URL}/api/Category?Page=${page ?? 1}&Size=${size ?? 8}`, { next: { tags: ['categories'] } })).text()
        const data: { categories: Category[] } & WithPagination = JSON.parse(text)
        return data
    }
    catch (err) {
        return undefined
    }
}