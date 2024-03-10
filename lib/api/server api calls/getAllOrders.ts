``
export async function GetAllOrders(): Promise<{orders:AllUsersOrders[]}&WithPagination|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Order/GetAllOrders`, {next:{revalidate:0}})).text()
    const data: {orders:AllUsersOrders[]}&WithPagination = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}