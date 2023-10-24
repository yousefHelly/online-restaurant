"use client"
import Image from 'next/image'
import React from 'react'
import {Formik, Form, Field} from 'formik'
type Props = {}

function JoinUs({}: Props) {
  return (
    <section className='text-center py-3 lg:py-10 w-full'>
        <div className='relative rounded-2xl h-[350px]'>
            <Image
            src={'https://images.unsplash.com/photo-1529940316268-e245e031bcd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
            alt='انضم لنا الان!'
            width={1000}
            height={1000}
            className='w-full h-full object-cover rounded-2xl '
            />
            <div className='flex flex-col items-center justify-center lg:justify-start py-12 gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/25 backdrop-blur-sm w-full h-full rounded-2xl'>
                <h5 className='text-slate-50 text-xl lg:text-5xl font-bold font-header lg:leading-[5rem] px-2 lg:w-1/2'>إنضم لنا و احصل علي خصومات تصل الي 50%</h5>
                <Formik
                initialValues={{
                    email:''
                }}
                onSubmit={(val)=>{
                    console.log(val);  
                }}
                >
                    <Form className='flex flex-col items-center lg:flex-row lg:-translate-x-10'>
                        <Field className='rounded-t-2xl lg:rounded-full w-64 lg:w-[28rem] h-12 focus-visible:outline-none p-2' id='email' name='email'/>
                        <button className='bg-main rounded-b-2xl w-64 lg:w-auto  lg:rounded-full px-3 py-2 text-slate-50 dark:text-stone-900  font-bold lg:translate-x-[5.2rem] border border-slate-50 dark:border-transparent transition duration-150 hover:bg-main/90' type='submit'>انضمام!</button>
                    </Form>
                </Formik>
            </div>
        </div>
    </section>
  )
}

export default JoinUs