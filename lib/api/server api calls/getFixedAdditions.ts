``
export async function getFixedAdditions(): Promise<{additions:FixedAddition[]}&WithPagination|undefined> {
    try{
    const text = await (await fetch(`${process.env.BACK_END_URL}/api/StaticAddition`, {next:{tags:['fixedAdditions']}})).text()
    const data: {additions:FixedAddition[]}&WithPagination = JSON.parse(text)
    return data
    }
    catch(err) {
    return undefined
    }
}