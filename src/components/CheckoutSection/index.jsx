import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Button,
    Input,
    Radio,
    RadioGroup,
    Table,
    Tbody,
    Tr,
    Td,
    Text,
    Stack,
    Container,
    Collapse,
    FormControl,
    FormLabel,
    VStack,
    ChakraProvider,
    extendTheme,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box p={3} textAlign="center">
                    <Text fontSize="xl" color="red.500">
                        Something went wrong. Please try again later.
                    </Text>
                </Box>
            );
        }
        return this.props.children;
    }
}

// PayPal Button Component (ĐÃ CẬP NHẬT)
const PaypalButton = ({ cartTotal, cartList, billingDetails, onSuccess, onError }) => {
    const paypalRef = useRef(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useToast();

    useEffect(() => {
        let isMounted = true;
        const loadPayPalScript = () => {
            if (window.paypal) {
                if (isMounted) {
                    setIsScriptLoaded(true);
                    setIsLoading(false);
                }
                return;
            }
            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?client-id=AQwmw7pwEz6xTHlwxuaK5S1RnSt0AzdJMStk47HlVehip6qjFUkLT0XcJKEt5DnyOnJDNiFAKVdb4S7u&currency=USD&disable-funding=credit,card";
            script.async = true;
            script.onload = () => {
                if (isMounted) { setIsScriptLoaded(true); setIsLoading(false); }
            };
            script.onerror = () => {
                if (isMounted) {
                    setError('Failed to load PayPal SDK');
                    setIsLoading(false);
                    toast({ title: "PayPal Error", description: "Failed to load PayPal payment system", status: "error", duration: 5000, isClosable: true });
                }
            };
            document.head.appendChild(script);
        };
        loadPayPalScript();
        return () => {
            isMounted = false;
            if (paypalRef.current) paypalRef.current.innerHTML = '';
        };
    }, [toast]);

    useEffect(() => {
        if (isScriptLoaded && window.paypal && paypalRef.current) {
            try {
                paypalRef.current.innerHTML = '';
                window.paypal.Buttons({
                    style: { layout: 'vertical', color: 'silver', shape: 'rect', tagline: false, height: 45 },
                    createOrder: async () => {
                        console.log("Creating order with details:", { cartTotal, cartList, billingDetails });
                        try {
                            const payload = { cartTotal, cartList, billingDetails };
                            const response = await fetch("http://localhost:8080/api/paypal/create-paypal-order", {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            });
                            if (!response.ok) {
                                const errorData = await response.json();
                                throw new Error(errorData.message || 'Failed to create PayPal order');
                            }
                            const order = await response.json();
                            console.log("Order created on backend, PayPal Order ID:", order.id);
                            return order.id;
                        } catch (error) {
                            toast({ title: "Payment Error", description: error.message || "Failed to create PayPal order.", status: "error", duration: 5000, isClosable: true });
                            throw error;
                        }
                    },
                    onApprove: async (data) => {
                        try {
                            const response = await fetch(`http://localhost:8080/api/paypal/capture-paypal-order?orderId=${data.orderID}`, {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                            });
                            if (!response.ok) {
                                const errorData = await response.json();
                                throw new Error(errorData.message || 'Failed to capture payment');
                            }
                            toast({ title: "Payment Successful", description: "Your PayPal payment has been processed!", status: "success", duration: 5000, isClosable: true });
                            if (onSuccess) onSuccess(data);
                            setTimeout(() => { window.location.href = "http://localhost:5173"; }, 1000);
                        } catch (error) {
                            toast({ title: "Payment Failed", description: error.message || "Failed to process payment.", status: "error", duration: 5000, isClosable: true });
                            if (onError) onError(error);
                        }
                    },
                    onError: (err) => {
                        toast({ title: "PayPal Error", description: "An error occurred with PayPal.", status: "error", duration: 5000, isClosable: true });
                        if (onError) onError(err);
                    },
                    onCancel: () => {
                        toast({ title: "Payment Cancelled", description: "PayPal payment was cancelled.", status: "warning", duration: 3000, isClosable: true });
                    }
                }).render(paypalRef.current);
            } catch (err) {
                setError('Error rendering PayPal button');
                toast({ title: "PayPal Error", description: "Failed to render PayPal button", status: "error", duration: 5000, isClosable: true });
            }
        }
    }, [isScriptLoaded, cartTotal, cartList, billingDetails, onSuccess, onError, toast]);

    if (isLoading) return <Box textAlign="center" py={4}><Spinner size="md" color="blue.500" /><Text mt={2} fontSize="sm" color="gray.600">Loading PayPal...</Text></Box>;
    if (error) return <Box textAlign="center" py={4}><Text color="red.500" fontSize="sm">{error}</Text><Button size="sm" mt={2} onClick={() => window.location.reload()} colorScheme="blue" variant="outline">Retry</Button></Box>;
    
    return (
        <Box maxW="100%" mt={4}>
            <div ref={paypalRef} style={{ maxWidth: '100%', minHeight: '45px' }} />
        </Box>
    );
};

// Custom theme
const theme = extendTheme({
    styles: {
        global: {
            body: { bg: 'gray.50' },
        },
    },
});

// Main Component (ĐÃ CẬP NHẬT)
const CheckoutSection = () => {
    const [cartList, setCartList] = useState([]);
    const toast = useToast();
    
    const [tabs, setTabs] = useState({ cupon: false, billing_adress: true, payment: true });
    const [forms, setForms] = useState({
        cupon_key: '', fname: 'John', lname: 'Doe', country: 'Vietnam', address: '123 Nguyen Hue, District 1', email: 'john.doe@example.com', phone: '0901234567',
        payment_method: 'cash',
    });

    useEffect(() => {
        const loadCartFromStorage = () => {
            try {
                const storedCart = localStorage.getItem('cartItems');
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    const formattedCart = parsedCart.map(item => ({
                        title: item.title || item.name || 'Unknown Product',
                        price: parseFloat(item.price) || 0,
                        quantity: parseInt(item.quantity) || 1,
                        ...item
                    }));
                    setCartList(formattedCart);
                } else {
                    setCartList([]);
                }
            } catch (error) {
                setCartList([]);
            }
        };
        loadCartFromStorage();
        const handleStorageChange = (e) => {
            if (e.key === 'cartItems') loadCartFromStorage();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleTabChange = (tabName) => setTabs(prev => ({ ...prev, [tabName]: !prev[tabName] }));
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForms(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const requiredFields = ['fname', 'lname', 'address', 'email'];
        const missingFields = requiredFields.filter(field => !forms[field]);
        if (missingFields.length > 0) {
            toast({ title: "Form Validation Error", description: `Please fill in: ${missingFields.join(', ')}`, status: "error", duration: 5000, isClosable: true });
            return false;
        }
        return true;
    };

    const handleCheckout = () => {
        if (!validateForm()) return;
        toast({ title: "Order Placed", description: "Your order has been placed successfully!", status: "success", duration: 5000, isClosable: true });
        localStorage.removeItem('cartItems');
        setCartList([]);
        setTimeout(() => { window.location.href = "/Cart/PaymentSuccess"; }, 1000);
    };

    const handlePayPalSuccess = () => localStorage.removeItem('cartItems');
    const handlePayPalError = () => {};
    const formatVND = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
    const calculateSubTotal = (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const calculateShipping = (subtotal) => subtotal * 0.1;
    const calculateTax = (subtotal) => subtotal * 0.08;
    const calculateTotal = (items) => calculateSubTotal(items) + calculateShipping(calculateSubTotal(items)) + calculateTax(calculateSubTotal(items));

    const subTotal = calculateSubTotal(cartList);
    const total = calculateTotal(cartList);

    return (
        <ChakraProvider theme={theme}>
            <ErrorBoundary>
                <Box py={10} className="checkoutWrapper">
                    <Container maxW="container.xl">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                            {/* Left Column - Forms */}
                            <VStack spacing={4}>
                                <Box w="100%" bg="white" borderRadius="md" shadow="md">
                                    <Button w="100%" onClick={() => handleTabChange('billing_adress')} rightIcon={tabs.billing_adress ? <ChevronUpIcon /> : <ChevronDownIcon />} justifyContent="space-between" p={4} variant="ghost">Billing Address</Button>
                                    <Collapse in={tabs.billing_adress}>
                                        <Box p={4}><VStack spacing={4}>
                                            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                                                <FormControl isRequired><FormLabel>First Name</FormLabel><Input name="fname" value={forms.fname} onChange={handleFormChange} /></FormControl>
                                                <FormControl isRequired><FormLabel>Last Name</FormLabel><Input name="lname" value={forms.lname} onChange={handleFormChange} /></FormControl>
                                                <FormControl isRequired><FormLabel>Address</FormLabel><Input name="address" value={forms.address} onChange={handleFormChange} /></FormControl>
                                                <FormControl isRequired><FormLabel>Email</FormLabel><Input name="email" type="email" value={forms.email} onChange={handleFormChange} /></FormControl>
                                            </Grid>
                                        </VStack></Box>
                                    </Collapse>
                                </Box>

                                <Box w="100%" bg="white" borderRadius="md" shadow="md">
                                    <Button w="100%" onClick={() => handleTabChange('payment')} rightIcon={tabs.payment ? <ChevronUpIcon /> : <ChevronDownIcon />} justifyContent="space-between" p={4} variant="ghost">Payment Method</Button>
                                    <Collapse in={tabs.payment}>
                                        <Box p={4}>
                                            <RadioGroup name="payment_method" value={forms.payment_method} onChange={(value) => handleFormChange({ target: { name: 'payment_method', value } })}>
                                                <Stack><Radio value="cash">Cash on Delivery</Radio><Radio value="paypal">PayPal</Radio></Stack>
                                            </RadioGroup>
                                            
                                            {forms.payment_method === 'paypal' && (
                                                <PaypalButton cartTotal={total} cartList={cartList} billingDetails={forms} onSuccess={handlePayPalSuccess} onError={handlePayPalError} />
                                            )}

                                            {forms.payment_method === 'cash' && (
                                                <Button onClick={handleCheckout} colorScheme="blue" w="100%" mt={4} isDisabled={cartList.length === 0}>Place Order</Button>
                                            )}
                                        </Box>
                                    </Collapse>
                                </Box>
                            </VStack>

                            {/* Right Column - Cart Summary */}
                            <Box bg="white" p={6} borderRadius="md" shadow="md">
                                <Text fontSize="2xl" mb={4}>Order Summary</Text>
                                {cartList.length === 0 ? (
                                    <Text textAlign="center" color="gray.500" py={8}>Your cart is empty</Text>
                                ) : (
                                    <Table variant="simple">
                                        <Tbody>
                                            {cartList.map((item, index) => (
                                                <Tr key={item.id || index}>
                                                    <Td><Text fontWeight="medium">{item.title}</Text><Text fontSize="sm" color="gray.500">Số lượng: {item.quantity}</Text></Td>
                                                    <Td isNumeric><Text fontWeight="medium">{formatVND(item.price * item.quantity)}</Text></Td>
                                                </Tr>
                                            ))}
                                            <Tr borderTop="2px solid" borderColor="gray.200"><Td fontWeight="medium">Tổng cộng</Td><Td isNumeric fontWeight="medium">{formatVND(subTotal)}</Td></Tr>
                                            <Tr><Td>Thuế (8%)</Td><Td isNumeric>{formatVND(calculateTax(subTotal))}</Td></Tr>
                                            <Tr><Td>Phí ship (10%)</Td><Td isNumeric>{formatVND(calculateShipping(subTotal))}</Td></Tr>
                                            <Tr borderTop="2px solid" borderColor="gray.200"><Td fontWeight="bold" fontSize="lg">Total</Td><Td isNumeric fontWeight="bold" fontSize="lg" color="blue.600">{formatVND(total)}</Td></Tr>
                                        </Tbody>
                                    </Table>
                                )}
                            </Box>
                        </Grid>
                    </Container>
                </Box>
            </ErrorBoundary>
        </ChakraProvider>
    );
};

export default CheckoutSection;