/**
 * @jest-environment jsdom
 */
import StepIndicator from "@/components/register/StepIndicator"
import { render, screen } from "@testing-library/react"

describe('Register Step Indicator',()=>{
    test("Step 1 will be the default if no steps have been passed.", ()=>{
        render(<StepIndicator/>)
        const defaultStep = screen.getByTitle(/step-1/)
        expect(defaultStep).toHaveAttribute('aria-current', 'true')
    })
    test("The steps that have not yet been reached should be slate-300.", ()=>{
        render(<StepIndicator step={2}/>)
        const nextStep = screen.getByTitle(/step-3/)
        expect(nextStep).toHaveClass('bg-slate-300 text-header')
    })
    test("The current step should be bouncing.", ()=>{
        render(<StepIndicator step={2}/>)
        const currentStep = screen.getByText(/2/)
        expect(currentStep).toHaveClass('animate-bounce')
    })
    test("The main color should be the color of the current and previous steps.", ()=>{
        render(<StepIndicator step={3}/>)
        const Step2 = screen.getByTitle(/step-2/)
        expect(Step2).toHaveClass('bg-main text-slate-50')
        const currentStep = screen.getByTitle(/step-3/)
        expect(currentStep).toHaveClass('bg-main text-slate-50')
    })
})