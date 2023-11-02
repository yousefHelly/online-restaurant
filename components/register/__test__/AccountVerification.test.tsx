/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react"
import  AccountVerification  from '@/components/register/AccountVerification';

const mockedStep = jest.fn()

describe('Data Verification step 2 in register page',()=>{
    it('',()=>{
        render(<AccountVerification loginData={{email:'', password:''}} setStep={mockedStep} verCode="ABCDE" />)
    })
})