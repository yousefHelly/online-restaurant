export async function getDish(name?: string): Promise<Dish|undefined> {
    if(name){
       try{
        const text = await (await fetch(`${process.env.BACK_END_URL}/api/meal?name=${name}`, {next:{revalidate:0}})).text()
        const data: Dish = JSON.parse(text)
        const newAdditions = data?.mealAdditions.map((add)=>{
            return {
              id: add.id,
              name: add.name,
              choices: add.choices.map((choice)=>{
                return{
                  id: choice.id,
                  name: choice.name,
                  price: choice.price,
                  hasPrice:choice.price?true:false
                }
                })
                }
              })
              const newData = {
                ...data,
                mealAdditions:newAdditions
              }
        return newData
       }
       catch(err) {
        return undefined
       }
    } else{
        return undefined
    }
}