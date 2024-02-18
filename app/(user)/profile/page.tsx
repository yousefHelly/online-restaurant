import ProfileContent from "@/components/(User)/profile/ProfileContent"
import PageHeaderWithoutLink from "@/components/layout/PageHeaderWithoutLink"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'صفحتي الشخصية',
}

type Props = {}

function ProfilePage({}: Props) {

  return (
    <PageHeaderWithoutLink header='صفحتي الشخصية'>
      <div className='lg:px-8'>
        <ProfileContent/>
      </div>
    </PageHeaderWithoutLink>
  )
}

export default ProfilePage