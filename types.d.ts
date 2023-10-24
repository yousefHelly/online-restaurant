type Category = {
    id: number,
    name: string,
    categoryImg: string,
    numOfChefs: number,
    numOfMeals: number
}

type Chef = {
    id: number,
    name: string,
    chefImgUrl: string,
    categoryId: number,
    rate: number,
    numOfRate: number,    
    categoryName: string,
    numOfMeals: number
}

type Review = {
    id: number, 
    text: string, 
    userImg: string|null, 
    userName: string, 
    createdDate: string, 
    rate: number
}
type MealAddition = {
    id: number, 
    name: string, 
    choices: {
        id: number, 
        name: string, 
        price?: string
    }[]
}

type StaticMealAddition = {
    id: number, 
    name: string, 
    price: number, 
    additionUrl: string
}

type Dish = {
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    chefName: string,
    oldPrice: number,
    isFavourite?: string,
    categoryName: string,
    rate: number,
    numOfRates: number,
    reviews: Review[],
    mealAdditions: MealAddition[],
    staticMealAdditions: StaticMealAddition[]
}
type MealCard =  {
    id: number,
    name: string,
    price: number,
    mealImgUrl: string,
    chefName: string,
    oldPrice?: number,
    chefId: number,
    categoryid: number,
    categoryName: string,
    rate: number,
    numOfRate: number
}

type Dishes  = {
    meals:MealCard[], 
    maxprice: number
}

type Wishlist = {
    wishListId: number,
    meals: MealCard[]
}[]

type Sort = 'PD' | 'PA' | 'SD' | 'RD'

type Address = {
    id: number,
    street: string,
    city: string,
    departmentNum: number,
    phoneNumber: string
}

type AuthResponse = {
    id:string,
    message: string | null,
    isAuthenticated: boolean,
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    roles: string[],
    token: string,
    expiresOn: string,
}
type UpdateAuth = {
    user: {
        message: string,
        isAuthenticated: boolean,
        userName: string,
        email: string,
        firstName: string,
        lastName: string,
        roles: 'User' | 'Admin'[],
        token: string,
        expiresOn: string,
        userImgUrl: string | null
    },
    message: string
}