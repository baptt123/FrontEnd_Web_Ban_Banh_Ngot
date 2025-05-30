'use client'

import {
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  HStack,
  VStack,
  Spinner,
} from '@chakra-ui/react'

// Hook để sử dụng toast
export const useToaster = () => {
  const toast = useToast()

  return {
    toast: (options) => {
      return toast({
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
        ...options,
        render: ({ onClose, title, description, status, isClosable }) => (
            <Alert
                status={status || 'info'}
                variant="solid"
                borderRadius="md"
                boxShadow="lg"
                maxWidth="400px"
                pr={isClosable ? 8 : 4}
                position="relative"
            >
              {status === 'loading' ? (
                  <Spinner size="sm" color="blue.500" mr={3} />
              ) : (
                  <AlertIcon />
              )}
              <VStack align="start" spacing={1} flex={1}>
                {title && (
                    <AlertTitle fontSize="sm" fontWeight="bold">
                      {title}
                    </AlertTitle>
                )}
                {description && (
                    <AlertDescription fontSize="sm">
                      {description}
                    </AlertDescription>
                )}
              </VStack>
              {isClosable && (
                  <CloseButton
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={onClose}
                      size="sm"
                  />
              )}
            </Alert>
        ),
      })
    },
    success: (options) => toast({ ...options, status: 'success' }),
    error: (options) => toast({ ...options, status: 'error' }),
    warning: (options) => toast({ ...options, status: 'warning' }),
    info: (options) => toast({ ...options, status: 'info' }),
    loading: (options) => toast({ ...options, status: 'loading', duration: null }),
  }
}

// Component toaster (không cần thiết trong v2 vì useToast đã handle)
export const Toaster = () => {
  // Trong v2, toasts được quản lý tự động bởi ChakraProvider
  // Component này có thể để trống hoặc return null
  return null
}