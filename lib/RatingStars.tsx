'use client'
import React from 'react'
import {fillColorArray} from '@/Data'
import { Rating } from 'react-simple-star-rating'

type Props = {
    rating: number
}

function RatingStars({rating}: Props) {
  return (
    <>
        <Rating
        rtl
        allowFraction
        initialValue={rating}
        transition
        readonly={true}
        fillColorArray={fillColorArray}
        className='dark:fill-stone-400'
        size={24}
        />
    </>
  )
}

export default RatingStars