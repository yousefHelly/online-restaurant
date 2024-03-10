export async function getUsers(): Promise<{users:User[]}&WithPagination|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Auth/GetAllUsers`, {next:{revalidate:0}})).text()
    const data: {users:User[]}&WithPagination = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}