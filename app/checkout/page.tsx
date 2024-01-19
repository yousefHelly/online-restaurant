import CheckoutSteps from "@/components/(User)/checkout/CheckoutSteps"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'تأكيد الطلبية',
}

type Props = {}

function CheckoutPage({}: Props) {

  return (
    <CheckoutSteps/>
  )
}

export default CheckoutPage