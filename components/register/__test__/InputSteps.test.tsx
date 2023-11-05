/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react"
import InputSteps from './../InputSteps';

describe('Registeration steps flow',()=>{
    it('',async()=>{
        render(<InputSteps/>)
        const inputFields = screen.getAllByRole('textbox')
        const passwordFiled = screen.getByLabelText('كلمة المرور')
        const submitBtn = screen.getByRole('button',{name:'تسجيل'})
        const defaultStep = screen.getByTitle(/step-1/)
        expect(defaultStep).toHaveAttribute('aria-current', 'true')
        const registerValues = ['yousef', 'helly','yousefHelly', 'yousef.helly@gmail.com']
        registerValues.forEach((val)=>{
            inputFields.forEach((inputField)=>{
                fireEvent.change(inputField, {target:{value:val}})
            })
        })
        fireEvent.change(passwordFiled, {target:{value:'Yousefh&00'}})
        expect(submitBtn).not.toBeDisabled()
        fireEvent.click(submitBtn)
        const secondStep =  screen.getByTitle(/step-2/)
        const secondStepNumber = screen.getByText(/2/)
        expect(secondStep).toHaveAttribute('aria-current', 'true')
        expect(secondStepNumber).toHaveClass('animate-bounce')
    })
})
