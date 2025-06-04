import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react'
import * as React from 'react'

export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    showArrow = true,
    children,
    disabled,
    portalled = true,
    content,
    label, // v2 sử dụng label thay vì content
    contentProps,
    portalRef,
    hasArrow, // v2 sử dụng hasArrow thay vì showArrow
    ...rest
  } = props

  if (disabled) return children

  const tooltipContent = content || label

  const tooltipElement = (
      <ChakraTooltip
          label={tooltipContent}
          hasArrow={showArrow || hasArrow}
          ref={ref}
          {...contentProps}
          {...rest}
      >
        {children}
      </ChakraTooltip>
  )

  if (portalled && portalRef) {
    return (
        <Portal containerRef={portalRef}>
          {tooltipElement}
        </Portal>
    )
  }

  return tooltipElement
})