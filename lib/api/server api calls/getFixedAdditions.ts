``
export async function getFixedAdditions(): Promise<FixedAddition[]|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/StaticAddition`, {next:{revalidate:0}})).text()
    const data: FixedAddition[] = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}