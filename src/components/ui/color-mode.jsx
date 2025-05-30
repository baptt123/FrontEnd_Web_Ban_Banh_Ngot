'use client'

import {
    IconButton,
    Skeleton,
    Box,
    useColorMode as useChakraColorMode,
    useColorModeValue as useChakraColorModeValue,
    ColorModeProvider as ChakraColorModeProvider
} from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function ColorModeProvider(props) {
    return (
        <ChakraColorModeProvider {...props}>
            <ThemeProvider attribute='class' disableTransitionOnChange>
                {props.children}
            </ThemeProvider>
        </ChakraColorModeProvider>
    )
}

export function useColorMode() {
    const { colorMode, setColorMode, toggleColorMode } = useChakraColorMode()
    return {
        colorMode,
        setColorMode,
        toggleColorMode,
    }
}

export function useColorModeValue(light, dark) {
    return useChakraColorModeValue(light, dark)
}

export function ColorModeIcon() {
    const { colorMode } = useColorMode()
    return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef(
    function ColorModeButton(props, ref) {
        const { toggleColorMode } = useColorMode()
        return (
            <IconButton
                onClick={toggleColorMode}
                variant='ghost'
                aria-label='Toggle color mode'
                size='sm'
                ref={ref}
                icon={<ColorModeIcon />}
                {...props}
            />
        )
    },
)

export const LightMode = React.forwardRef(function LightMode(props, ref) {
    return (
        <Box
            ref={ref}
            className='chakra-ui-light'
            {...props}
        />
    )
})

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
    return (
        <Box
            ref={ref}
            className='chakra-ui-dark'
            {...props}
        />
    )
})