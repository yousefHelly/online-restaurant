'use client'
import { MantineProvider } from '@mantine/core';
import React from 'react'
type Props = {}

function MProvider({children}: {children: React.ReactNode}) {
  return (
    <MantineProvider>
        {
            children
        }
    </MantineProvider>
  )
}

export default MProvider