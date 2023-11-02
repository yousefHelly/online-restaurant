/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react"
import  DataRegisteration  from '@/components/register/DataRegisteration';

const mockedStep = jest.fn()


describe('Data Registeration step 1 in register page',()=>{
    it('should contains 5 input fields (first name / last name / username / email / password)',()=>{
        render(<DataRegisteration setLoginData={()=>{}} setVerCode={()=>''} setStep={mockedStep} />)
        const inputFields = screen.getAllByRole('textbox')
        const passwordFiled = screen.getByLabelText('كلمة المرور')
        inputFields.push(passwordFiled)
        expect(inputFields.length).toBe(5)
    })
    it('should prevent you from submitting if you leave the fields empty',async()=>{
        render(<DataRegisteration setLoginData={()=>{}} setVerCode={()=>''} setStep={mockedStep} />)
        const submitBtn = screen.getByRole('button',{name:'تسجيل'})
        expect(submitBtn).toBeDisabled()
    })
    it('should show an error message whenever you blur from a field with an error',async()=>{
        render(<DataRegisteration setLoginData={()=>{}} setVerCode={()=>''} setStep={mockedStep} />)
        const inputFields = screen.getAllByRole('textbox')
        inputFields.forEach((inputField)=>{
            fireEvent.change(inputField,{target:{value:'ي'}})
            fireEvent.blur(inputField)
        })
        const passwordFiled = screen.getByLabelText('كلمة المرور')
        fireEvent.change(passwordFiled,{target:{value:'ي'}})
        fireEvent.blur(passwordFiled)
        const errorMsg = await screen.findAllByTitle('خطأ')
        expect(errorMsg.length).toBe(5)
    })
    it('should prevent you from submitting if you leave the fields with errors',()=>{
        render(<DataRegisteration setLoginData={()=>{}} setVerCode={()=>''} setStep={mockedStep} />)
        const inputFields = screen.getAllByRole('textbox')
        inputFields.forEach((inputField)=>{
            fireEvent.change(inputField,{target:{value:'ي'}})
            fireEvent.blur(inputField)
        })
        const submitBtn = screen.getByRole('button',{name:'تسجيل'})
        expect(submitBtn).toBeDisabled()
    })
    describe('show and hide password button', ()=>{
        function showPassword(){
            const showPasswordBtn = screen.getByTestId('set-eye-on')
            fireEvent.click(showPasswordBtn)
        }
        async function hidePassword(){
            const hidePasswordBtn = await screen.findByTestId('set-eye-off')
            fireEvent.click(hidePasswordBtn)
        }
        it('should change the type of password field to text and change the button to hide-password button on clicking on show-password button', async()=>{
            render(<DataRegisteration setLoginData={()=>{}} setVerCode={()=>''} setStep={mockedStep} />)
            const passwordFiled = screen.getByLabelText('كلمة المرور')
            expect(passwordFiled).toHaveAttribute('type', 'password')
            showPassword()
            expect(passwordFiled).toHaveAttribute('type', 'text')
            const hidePasswordBtn = await screen.findByTestId('set-eye-off')
            expect(hidePasswordBtn).toBeInTheDocument()
        })
        it('should change the type of password field to password and change the button to show-password button on clicking on hide-password button', async()=>{
            render(<DataRegisteration setLoginData={()=>{}} setVerCode={()=>''} setStep={mockedStep} />)
            const passwordFiled = screen.getByLabelText('كلمة المرور')
            expect(passwordFiled).toHaveAttribute('type', 'password')
            showPassword()
            expect(passwordFiled).toHaveAttribute('type', 'text')
            await hidePassword()
            expect(passwordFiled).toHaveAttribute('type', 'password')
        })
    })
})
