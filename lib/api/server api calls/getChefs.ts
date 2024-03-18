export async function getChefs(page: number = 1, size?: number): Promise<{ chefs: Chef[] } & WithPagination | undefined> {
    try {
        const text = await (await fetch(`${process.env.BACK_END_URL}/api/Chef/GetAllChefs?Page=${page ?? 1}&Size=${size ?? 8}`, { next: { tags: ['chefs'] } })).text()
        const data: { chefs: Chef[] } & WithPagination = JSON.parse(text)
        return data
    }
    catch (err) {
        return undefined
    }
}