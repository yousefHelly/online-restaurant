export async function getUsers(): Promise<User[]|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/Auth/GetAllUsers`, {next:{revalidate:0}})).text()
    const data: User[] = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}