/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react"
import  AccountVerification  from '@/components/register/AccountVerification';

const mockedStep = jest.fn()

describe('Data Verification step 2 in register page',()=>{
    it('should prevent user from submitting if he left the verification code empty',()=>{
        render(<AccountVerification loginData={{email:'', password:''}} setStep={mockedStep} verCode="ABCDEF" />)
        const submitBtn = screen.getByRole('button')
        expect(submitBtn).toBeDisabled()
    })
    it('should prevent user from submitting if he left the verification code with error or less than 6 characters ',()=>{
        render(<AccountVerification loginData={{email:'', password:''}} setStep={mockedStep} verCode="ABCDEF" />)
        const verCode = screen.getByRole('textbox')
        fireEvent.change(verCode, {target:{value:'ABC'}})
        fireEvent.blur(verCode)
        const submitBtn = screen.getByRole('button')
        expect(submitBtn).toBeDisabled()
    })
})