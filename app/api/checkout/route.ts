import { getDish } from "@/lib/api/server api calls/getDish"
import { getFixedAddition } from "@/lib/api/server api calls/getFixedAddition"
import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import Stripe from "stripe"

async function CreateSession(stripe: Stripe) {
    return async function (staticAdditionOrders: PostOrder['staticAdditionOrders']) {
        let stripeOrders: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        await Promise.all(
            staticAdditionOrders.map(async (sao) => {
                const saData = await getFixedAddition('' + sao.id);
                stripeOrders.push({
                    price_data: {
                        currency: 'egp',
                        unit_amount: saData?.price! * 100,
                        product_data: {
                            name: saData?.name!,
                        },
                    },
                    quantity: sao.amount,
                });
            })
        );
        return async function (mealOrders: PostOrder['mealOrders']) {
            await Promise.all(
                mealOrders.map(async (mo) => {
                    const mData = await getDish(mo.name!);
                    stripeOrders.push({
                        price_data: {
                            currency: 'egp',
                            unit_amount: mData?.price! * 100,
                            product_data: {
                                name: mData?.name!,
                                description: mData?.description,
                            },
                        },
                        quantity: mo.amount,
                    });
                })
            );
            return async function () {
                const session = await stripe.checkout.sessions.create({
                    line_items: stripeOrders,
                    payment_method_types: ['card'],
                    mode: 'payment',
                    success_url: `${process.env.URL}/checkout/payment-confirmation?s=success`,
                    cancel_url: `${process.env.URL}/checkout/payment-confirmation/failure`,
                    submit_type:'pay',
                    shipping_options:[
                    {
                        shipping_rate_data:{
                            display_name:'التوصيل',
                            delivery_estimate:{
                                minimum:{
                                    value:'1',
                                    unit:'hour'
                                },
                                maximum:{
                                    value:'2',
                                    unit:'hour'
                                }
                            },
                            fixed_amount:{
                                amount:25 * 100,
                                currency:'egp',
                            },
                            type:'fixed_amount'
                        }
                    }
                    ] as any
                });
                return session.url;
            };
        };
    };
}


export async function POST(req: Request) {
    const order = await (req.json() as Promise<PostOrder>)
    const stripe = new Stripe(process.env.STRIPE_API_KEY!)
    const cookieStore = cookies()
    try{
        const newSession = await CreateSession(stripe)
        const addSideDishes = await newSession(order.staticAdditionOrders)
        const addMeals = await addSideDishes(order.mealOrders)
        const url =  await addMeals()   
        cookieStore.set('orderState', JSON.stringify(order))
        return NextResponse.json(url)
    } catch(err){
        return NextResponse.json(JSON.stringify(err), {
            status:400
        })

    }
}