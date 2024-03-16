type Category = {
    id: number,
    name: string,
    categoryImg: string,
    numOfChefs: number,
    numOfMeals: number
}
type CategoryById = {
    id: number,
    name: string,
    categoryUrl: string,
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
type ChefById = {
    id: number,
    name: string,
    chefImgUrl: string,
    categoryId: number
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
        price?: number
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
    categoryId: number,
    chefId: number,
    isFavourite?: boolean,
    oldPrice?: number,
    categoryName: string,
    rate: number,
    numOfRates: number,
    reviews: Review[],
    mealAdditions?: MealAddition[],
    staticMealAdditions: StaticMealAddition[]
}
type MealCard =  {
    id: number,
    name: string,
    price: number,
    mealImgUrl: string,
    chefName: string,
    oldPrice?: number,
    isFavourite: boolean,
    chefId: number,
    categoryid: number,
    categoryName: string,
    rate: number,
    numOfRate: number
}

type Dishes  = {
    meals:MealCard[], 
    maxprice: number,
    nextPage: boolean
}

type Wishlist = {
    wishListMeals: { wishListId: number, meals: MealCard[] }[],
    nextPage: boolean,
    numOfPages: number
}

type Sort = 'PD' | 'PA' | 'SD' | 'RD'

type Role = 'Admin' | 'User'

type Address = {
    id: number,
    street: string,
    city: string,
    departmentNum: number,
    phoneNumber: string
}

type Addresses = {
    addresses: Address[],
    nextPage: boolean,
    numOfPages: number
}

type AuthResponse = {
    id:string,
    message: string | null,
    isAuthenticated: boolean,
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    roles: Role[],
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
        roles: Role[],
        token: string,
        expiresOn: string,
        userImgUrl: string | null
    },
    message: string
}

type FixedAddition = {
    id: number,
    name: string,
    price: number,
    additionUrl: string
}

type Cart = {
    id: string,
    type:'dish' | 'side dish',
    name: string,
    price: number,
    amount: number,
    totalPrice: number
    mealImgUrl: string,
    chefName: number,
    categoryName: number,
    additions: { id: number, val:string }[]  
}[]

type PostOrder = {
    totalPrice: number,
    paymentMethod: string,
    addressId: number,
    staticAdditionOrders: {id: number, amount: number}[],
    mealOrders: {id: number, addition: string, amount: number, name?: string}[]
}

enum Status {
    Processing = 'Processing',
    Cooking = 'Cooking',
    Delivering = 'Delivering',
    Delivered = 'Delivered'
}

type PostOrderResponse = {
    id: string,
    date: string,
    statusDate: string,
    status: Status,
    totalCost: number,
    isPaid: boolean,
    paymentMethod: string,
    street: string,
    city: string,
    departmentNum: number,
    phoneNumber: string,
    meals: {id: number, mealName: string, addition: string, amount: number, mealImgUrl: string, mealPrice: number}[],
    staticAdditions: {id: number, staticAdditionName: string, amount: number, staticAdditionImgUrl: string, staticAdditionPrice: number}[]
}

type UserOrder = {
    id: string,
    date: string,
    status: Status,
    totalCost: number,
    isPaid: boolean,
    paymentMethod: string,
    street: string,
    city: string,
    departmentNum: number,
    phoneNumber: string,
    numOfMeals: number,
    numOfStaticMealAdditions: number
}

type AllUsersOrders = UserOrder & {
    userImg: string | null,
    userName: string
}

type User = {
    userId: string,
    userName: string,
    userImgUrl: string | null,
    role: Role
}

type WithPagination = {
    nextPage: boolean,
    numOfPages: number
}