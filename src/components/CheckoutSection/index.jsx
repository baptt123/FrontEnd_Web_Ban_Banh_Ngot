


import React, {  useRef } from 'react';
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
    HStack,
    ChakraProvider,
    extendTheme,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

// Import your images
import visa from '../../images/checkout/img-1.png';
import mastercard from '../../images/checkout/img-2.png';
import skrill from '../../images/checkout/img-3.png';
import paypal from '../../images/checkout/img-5.png';

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

// PayPal Button Component
const PaypalButton = () => {
    const paypalRef = useRef(null);
    const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let isMounted = true;

        const loadPayPalScript = async () => {
            if (window.paypal) {
                if (isMounted) {
                    setIsScriptLoaded(true);
                    renderPayPalButton();
                }
                return;
            }

            try {
                const script = document.createElement("script");
                script.src = "https://www.paypal.com/sdk/js?client-id=AQwmw7pwEz6xTHlwxuaK5S1RnSt0AzdJMStk47HlVehip6qjFUkLT0XcJKEt5DnyOnJDNiFAKVdb4S7u&currency=USD&disable-funding=credit,card";
                script.async = true;

                script.onload = () => {
                    if (isMounted) {
                        setIsScriptLoaded(true);
                        renderPayPalButton();
                    }
                };

                script.onerror = () => {
                    setError('PayPal SDK failed to load');
                };

                document.body.appendChild(script);
            } catch (error) {
                setError('Error loading PayPal script');
            }
        };

        loadPayPalScript();

        return () => {
            isMounted = false;
            if (paypalRef.current) {
                paypalRef.current.innerHTML = '';
            }
        };
    }, []);

    const renderPayPalButton = () => {
        if (!window.paypal || !paypalRef.current) return;

        try {
            paypalRef.current.innerHTML = '';
            window.paypal.Buttons({
                // PayPal button configuration remains the same
                style: {
                    layout: 'vertical',
                    color: 'silver',
                    shape: 'rect',
                    tagline: false,
                    height: 40
                },
                createOrder: async () => {
                    try {
                        const response = await fetch("http://localhost:8080/api/paypal/create-paypal-order", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (!response.ok) {
                            throw new Error('Failed to create order');
                        }
                        const order = await response.json();
                        return order.id;
                    } catch (error) {
                        setError('Error creating PayPal order');
                        throw error;
                    }
                },
                onApprove: async (data) => {
                    try {
                        const response = await fetch(`http://localhost:8080/api/paypal/capture-paypal-order?orderId=${data.orderID}`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (!response.ok) {
                            throw new Error('Failed to capture payment');
                        }
                        window.location.href = "/Cart/PaymentSuccess";
                    } catch (error) {
                        setError('Error processing payment');
                    }
                },
            }).render(paypalRef.current);
        } catch (error) {
            setError('Error rendering PayPal button');
        }
    };

    if (error) {
        return (
            <Text color="red.500" mt={2}>
                {error}
            </Text>
        );
    }

    return (
        <Box maxW="100%" mt={5}>
            {!isScriptLoaded && <Text>Loading PayPal...</Text>}
            <div ref={paypalRef}></div>
        </Box>
    );
};

// Card types data
// const cardType = [
//     { title: 'visa', img: visa },
//     { title: 'mastercard', img: mastercard },
//     { title: 'skrill', img: skrill },
//     { title: 'paypal', img: paypal },
// ];

// Custom theme
const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'gray.50',
            },
        },
    },
});

// Main Component
const CheckoutSection = ({ cartList = [] }) => {
    const [tabs, setTabs] = React.useState({
        cupon: false,
        billing_adress: false,
        payment: false
    });

    const [forms, setForms] = React.useState({
        cupon_key: '',
        fname: '',
        lname: '',
        country: '',
        district: '',
        address: '',
        post_code: '',
        email: '',
        phone: '',
        note: '',
        payment_method: 'cash',
        card_type: '',
        fname2: '',
        lname2: '',
        country2: '',
        district2: '',
        address2: '',
        post_code2: '',
        email2: '',
        phone2: '',
    });

    // const [dif_ship, setDif_ship] = React.useState(false);

    const handleTabChange = (tabName) => {
        setTabs(prev => ({
            ...prev,
            [tabName]: !prev[tabName]
        }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForms(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = ['fname', 'lname', 'address', 'email'];
        const missingFields = requiredFields.filter(field => !forms[field]);
        
        if (missingFields.length > 0) {
            alert(`Please fill in required fields: ${missingFields.join(', ')}`);
            return false;
        }
        return true;
    };

    const handleCheckout = () => {
        if (!validateForm()) return;
        window.location.href = "/Cart/PaymentSuccess";
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + (item.price * item.qty), 0);
    };

    return (
        <ChakraProvider theme={theme}>
            <ErrorBoundary>
                <Box py={10} className="checkoutWrapper">
                    <Container maxW="container.xl">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                            {/* Left Column - Forms */}
                            <VStack spacing={4}>
                                {/* Coupon Section */}
                                <Box w="100%" bg="white" borderRadius="md" shadow="md">
                                    <Button
                                        w="100%"
                                        onClick={() => handleTabChange('cupon')}
                                        rightIcon={tabs.cupon ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                        justifyContent="space-between"
                                        p={4}
                                        variant="ghost"
                                    >
                                        Have a coupon? Click here to enter your code.
                                    </Button>
                                    <Collapse in={tabs.cupon}>
                                        <Box p={4}>
                                            <HStack>
                                                <Input
                                                    name="cupon_key"
                                                    value={forms.cupon_key}
                                                    onChange={handleFormChange}
                                                    placeholder="Enter coupon code"
                                                />
                                                <Button colorScheme="black">
                                                    Apply
                                                </Button>
                                            </HStack>
                                        </Box>
                                    </Collapse>
                                </Box>

                                {/* Billing Address Section */}
                                <Box w="100%" bg="white" borderRadius="md" shadow="md">
                                    <Button
                                        w="100%"
                                        onClick={() => handleTabChange('billing_adress')}
                                        rightIcon={tabs.billing_adress ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                        justifyContent="space-between"
                                        p={4}
                                        variant="ghost"
                                    >
                                        Billing Address
                                    </Button>
                                    <Collapse in={tabs.billing_adress}>
                                        <Box p={4}>
                                            <VStack spacing={4}>
                                                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                                                    <FormControl isRequired>
                                                        <FormLabel>First Name</FormLabel>
                                                        <Input
                                                            name="fname"
                                                            value={forms.fname}
                                                            onChange={handleFormChange}
                                                        />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>Last Name</FormLabel>
                                                        <Input
                                                            name="lname"
                                                            value={forms.lname}
                                                            onChange={handleFormChange}
                                                        />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>Address</FormLabel>
                                                         <Input
                                                            name="address"
                                                            value={forms.address}
                                                            onChange={handleFormChange}
                                                        />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>Phone</FormLabel>
                                                        <Input
                                                            name="phone"
                                                            value={forms.phone}
                                                            onChange={handleFormChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                {/* Add other billing form fields */}
                                            </VStack>
                                        </Box>
                                    </Collapse>
                                </Box>

                                {/* Payment Method Section */}
                                <Box w="100%" bg="white" borderRadius="md" shadow="md">
                                    <Button
                                        w="100%"
                                        onClick={() => handleTabChange('payment')}
                                        rightIcon={tabs.payment ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                        justifyContent="space-between"
                                        p={4}
                                        variant="ghost"
                                    >
                                        Payment Method
                                    </Button>
                                    <Collapse in={tabs.payment}>
                                        <Box p={4}>
                                            <RadioGroup
                                                name="payment_method"
                                                value={forms.payment_method}
                                                onChange={(value) => handleFormChange({
                                                    target: { name: 'payment_method', value }
                                                })}
                                            >
                                                <Stack>
                                                    <Radio value="cash">Cash on Delivery</Radio>
                                                    {/* <Radio value="card">Credit Card</Radio> */}
                                                    <Radio value="paypal">PayPal</Radio>
                                                </Stack>
                                            </RadioGroup>

                                            {forms.payment_method === 'card' && (
                                                <Box mt={4}>
                                                    {/* Credit card form fields */}
                                                </Box>
                                            )}

                                            {forms.payment_method === 'paypal' && (
                                                <PaypalButton />
                                            )}

                                            {forms.payment_method === 'cash' && (
                                                <Button
                                                    onClick={handleCheckout}
                                                    colorScheme="blue"
                                                    w="100%"
                                                    mt={4}
                                                >
                                                    Place Order
                                                </Button>
                                            )}
                                        </Box>
                                    </Collapse>
                                </Box>
                            </VStack>

                            {/* Right Column - Cart Summary */}
                            <Box bg="white" p={6} borderRadius="md" shadow="md">
                                <Text fontSize="2xl" mb={4}>Order Summary</Text>
                                <Table variant="simple">
                                    <Tbody>
                                        {cartList.map((item) => (
                                            <Tr key={item.id}>
                                                <Td>
                                                    {item.title} (x{item.qty})
                                                </Td>
                                                <Td isNumeric>
                                                    ${item.price * item.qty}
                                                </Td>
                                            </Tr>
                                        ))}
                                      
                                          <Tr>
                                            <Td fontWeight="bold">Tax</Td>
                                            <Td isNumeric fontWeight="bold">
                                                ${calculateTotal(cartList)}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td fontWeight="bold">Shipping</Td>
                                            <Td isNumeric fontWeight="bold">
                                                ${calculateTotal(cartList) * 0.1} 
                                            </Td>
                                            </Tr>
                                          <Tr>
                                            <Td fontWeight="bold">Total</Td>
                                            <Td isNumeric fontWeight="bold">
                                                ${calculateTotal(cartList)}
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Box>
                        </Grid>
                    </Container>
                </Box>
            </ErrorBoundary>
        </ChakraProvider>
    );
};

export default CheckoutSection;