import React from 'react'
import Feature from './Feature'
type Props = {}

function Header({heading , desc}:{heading:string, desc:string}){
    return(
        <div className='mx-6 lg:mx-0 flex flex-col gap-3 text-center py-5 lg:py-10 bg-slate-50/75 dark:bg-stone-800/75 rounded-2xl mt-5'>
        <h2 className='text-3xl text-header dark:text-stone-300 font-bold py-4 xl:leading-[4rem]'>
            {heading}
        </h2>
        <p className='text-sm text-stone-600 leading-6'>
            {desc}</p>
    </div>
    )
}

function Features({}: Props) {
  return (
    <section>
        <div className='mt-20 flex flex-col gap-5'>
            <Header heading='طعم غير عادي بسبب خبرتنا الكبيرة في المجال' desc='كل الشيفات لدينا في المطبخ لديهم خبره لا تقل عن 10 اعوام في مختلف الأصناف'/>
            <Feature
            dir='r' 
            heading='نتأكد دائما من وصول طبقك ساخناً' 
            desc='يمكنك طلب وجبتك المفضلة عبر الإنترنت أو عبر التطبيق الخاص بنا ، وسنقوم بتوصيلها إلى باب منزلك أو مكتبك في أقل من 30 دقيقة. لا تفوت فرصة تجربة مطعم جو فاست فوود ، واستمتع بالطعام الرائع والخدمة الممتازة.' 
            image='https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80' 
            alt='توصيل سريع للطلبات في اقل من 30 دقيقة!' 
            action='أكمل طلبك الأن !'
            link='/cart'
            />
            <Feature 
            dir='l' 
            heading='نقدم وجبات عالية الجودة' 
            desc='
            استمتع بتجربة طعام لا تنسى في مطعمنا الراقي، حيث نقدم لك أشهى الأطباق المحضرة بعناية من أجود المكونات. سواء كنت تفضل اللحوم الطرية أو السلطات الطازجة أو الحلويات الشهية، ستجد لدينا ما يناسب ذوقك ورغبتك. تذوق نكهات متنوعة من مختلف المطابخ العالمية، بما في ذلك الفرنسية والإيطالية والآسيوية والمصرية. ' 
            image='https://images.unsplash.com/photo-1485962093642-5f4386e84429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' 
            alt='نقدم اصناف عالية الجودة' 
            action='القي نظرة علي الأطباق الأكثر مبيعاً !'
            link='#most-selling'
            />
            <Feature
            dir='r' 
            heading='يمكنك الإختيار بين العديد من الأصناف' 
            desc='في مطعمنا، لا تقتصر خياراتك على قائمة ثابتة. بل تستمتع بتجربة فريدة من نوعها في كل زيارة. فشيفاتنا الماهرون يقدمون لك مجموعة متنوعة من الأطباق الشهية والمبتكرة، مستوحاة من مختلف المطابخ العالمية والمحلية. سواء كنت تفضل اللحوم أو الخضروات أو الحلويات، ستجد لدينا ما يناسب ذوقك ورغبتك. انضم إلينا واستمتع بالمذاق الحقيقي للطعام الجيد.            ' 
            image='https://images.unsplash.com/photo-1673868077295-bc642ae9dec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80' 
            alt='العديدمن الاصناف الرائعة' 
            action='القي نظره علي تصنيفات أطباقنا !'
            link='/menu/categories'
            />
        </div>
    </section>
  )
}

export default Features