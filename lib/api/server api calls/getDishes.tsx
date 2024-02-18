export async function getDishes(category?: string, name?: string, chef?: string, from?: number, to?: number, page?: number, pageSize?: number, order?: string): Promise<Dishes|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Filter?${category?`Category=${category}`:''}&${name?`MealName=${name}`:''}&${chef?`ChefName=${chef}`:''}&${from?`FromPrice=${from!=0?from:1}`:''}&${to?`ToPrice=${to}`:''}&${page?`Page=${page}`:''}&${pageSize?`Size=${pageSize}`:''}&${order?`OrderMeal=${order}`:''}`, {next:{revalidate:0}})).text()
    const data: Dishes = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}