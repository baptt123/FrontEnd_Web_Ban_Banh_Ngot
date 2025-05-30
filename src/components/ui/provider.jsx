'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import {theme} from '/src/components/helpers/index.jsx'

export function Provider(props) {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme}>
                <ColorModeProvider>
                    {props.children}
                </ColorModeProvider>
            </ChakraProvider>
        </>
    )
}