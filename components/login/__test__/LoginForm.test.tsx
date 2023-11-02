/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react"
import LoginForm from './../LoginForm';
import React from "react";

describe('Login form', ()=>{
    it('should show 2 error messages and prevent user from logging in if he left the email and password fields empty', async()=>{
        render(<LoginForm/>)
        const loginBtn = screen.getByRole('button', {name:'تسجيل الدخول'})
        fireEvent.click(loginBtn)
        const errorMsg = await screen.findAllByTitle('خطأ')
        expect(errorMsg.length).toBe(2)
        expect(loginBtn).toBeDisabled()
    })
    
    it('should show an error message and prevent user from logging in if he left the email field with errors', async()=>{
        render(<LoginForm/>)
        const emailInput = screen.getByRole('textbox')
        const loginBtn = screen.getByRole('button', {name:'تسجيل الدخول'})
        fireEvent.change(emailInput, {target:{value:'y@w.c'}})
        fireEvent.blur(emailInput)
        const errorMsg = await screen.findByTitle('خطأ')
        expect(errorMsg).toBeDefined()
        expect(loginBtn).toBeDisabled()
    })
    it('should show an error message and prevent user from logging in if he left the password field with errors', async()=>{
        render(<LoginForm/>)
        const passwordFiled = screen.getByLabelText('كلمة المرور')
        fireEvent.change(passwordFiled,{target:{value:'ي'}})
        fireEvent.blur(passwordFiled)
        const loginBtn = screen.getByRole('button', {name:'تسجيل الدخول'})
        const errorMsg = await screen.findByTitle('خطأ')
        expect(errorMsg).toBeDefined()
        expect(loginBtn).toBeDisabled()
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
            render(<LoginForm/>)
            const passwordFiled = screen.getByLabelText('كلمة المرور')
            expect(passwordFiled).toHaveAttribute('type', 'password')
            showPassword()
            expect(passwordFiled).toHaveAttribute('type', 'text')
            const hidePasswordBtn = await screen.findByTestId('set-eye-off')
            expect(hidePasswordBtn).toBeInTheDocument()
        })
        it('should change the type of password field to password and change the button to show-password button on clicking on hide-password button', async()=>{
            render(<LoginForm/>)
            const passwordFiled = screen.getByLabelText('كلمة المرور')
            expect(passwordFiled).toHaveAttribute('type', 'password')
            showPassword()
            expect(passwordFiled).toHaveAttribute('type', 'text')
            await hidePassword()
            expect(passwordFiled).toHaveAttribute('type', 'password')
        })
    })
})
