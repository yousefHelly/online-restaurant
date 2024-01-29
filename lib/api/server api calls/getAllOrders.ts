``
export async function GetAllOrders(): Promise<AllUsersOrders[]|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Order/GetAllOrders`, {next:{revalidate:0}})).text()
    const data: AllUsersOrders[] = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}