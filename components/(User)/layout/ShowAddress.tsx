import React from 'react'

type Props = {
    departmentNum: number,
    street: string,
    city: string,
    phoneNumber: string,
}

function ShowAddress({departmentNum, street, city, phoneNumber}: Props) {
  return (
    <>شقة رقم : {departmentNum}، شارع : {street}، مدينة : {city} ، ت : {phoneNumber}
    </>
  )
}

export default ShowAddress