import CheckoutSteps from "@/components/(User)/checkout/CheckoutSteps"
import PageHeaderWithoutLink from "@/components/layout/PageHeaderWithoutLink"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'تأكيد الطلبية',
}

type Props = {}

function CheckoutPage({}: Props) {

  return (
    <PageHeaderWithoutLink header='تأكيد الطلبية'>
      <div className='w-full grid grid-cols-4 gap-5 items-start'>
        <CheckoutSteps/>
      </div>
    </PageHeaderWithoutLink>
  )
}

export default CheckoutPage