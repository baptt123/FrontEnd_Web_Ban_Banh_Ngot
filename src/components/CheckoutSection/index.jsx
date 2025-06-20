// ==== Các thư viện và hook ====
import React, { useRef, useState, useEffect } from 'react';
import {
    Box, Grid, Button, Input, Radio, RadioGroup, Table, Tbody, Tr, Td, Text, Stack,
    Container, Collapse, FormControl, FormLabel, VStack, ChakraProvider, extendTheme,
    useToast, Spinner
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

// ==== Thành phần xử lý lỗi ====
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Lỗi:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box p={3} textAlign="center">
                    <Text fontSize="xl" color="red.500">Đã xảy ra lỗi. Vui lòng thử lại sau.</Text>
                </Box>
            );
        }
        return this.props.children;
    }
}

// ==== Nút thanh toán PayPal ====
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
                if (isMounted) {
                    setIsScriptLoaded(true);
                    setIsLoading(false);
                }
            };
            script.onerror = () => {
                if (isMounted) {
                    setError('Không tải được PayPal');
                    setIsLoading(false);
                    toast({
                        title: "Lỗi PayPal",
                        description: "Không thể tải hệ thống thanh toán PayPal",
                        status: "error", duration: 5000, isClosable: true
                    });
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
                    style: { layout: 'vertical', color: 'silver', shape: 'rect', height: 45 },
                    createOrder: async () => {
                        const payload = { cartTotal, cartList, billingDetails };
                        const res = await fetch("http://localhost:8080/api/paypal/create-paypal-order", {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        if (!res.ok) throw new Error("Không thể tạo đơn PayPal");
                        const order = await res.json();
                        return order.id;
                    },
                    onApprove: async (data) => {
                        try {
                            const res = await fetch(`http://localhost:8080/api/paypal/capture-paypal-order?orderId=${data.orderID}`, {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' }
                            });
                            if (!res.ok) throw new Error("Không thể xử lý thanh toán");
                            toast({
                                title: "Thanh toán thành công",
                                description: "Bạn đã thanh toán qua PayPal!",
                                status: "success", duration: 5000, isClosable: true
                            });
                            onSuccess?.(data);
                            setTimeout(() => window.location.href = "http://localhost:5173", 1000);
                        } catch (err) {
                            toast({
                                title: "Lỗi thanh toán",
                                description: err.message,
                                status: "error", duration: 5000, isClosable: true
                            });
                            onError?.(err);
                        }
                    },
                    onError: (err) => {
                        toast({
                            title: "Lỗi PayPal",
                            description: "Đã có lỗi xảy ra trong quá trình thanh toán.",
                            status: "error", duration: 5000, isClosable: true
                        });
                        onError?.(err);
                    },
                    onCancel: () => {
                        toast({
                            title: "Hủy thanh toán",
                            description: "Bạn đã hủy thanh toán qua PayPal.",
                            status: "warning", duration: 3000, isClosable: true
                        });
                    }
                }).render(paypalRef.current);
            } catch (err) {
                setError('Không thể hiển thị nút PayPal');
                toast({
                    title: "Lỗi PayPal",
                    description: "Không thể hiển thị nút PayPal",
                    status: "error", duration: 5000, isClosable: true
                });
            }
        }
    }, [isScriptLoaded, cartTotal, cartList, billingDetails, onSuccess, onError, toast]);

    if (isLoading) return <Box textAlign="center" py={4}><Spinner color="blue.500" /><Text mt={2}>Đang tải PayPal...</Text></Box>;
    if (error) return <Box textAlign="center" py={4}><Text color="red.500">{error}</Text><Button size="sm" mt={2} onClick={() => window.location.reload()} colorScheme="blue">Thử lại</Button></Box>;

    return <Box mt={4}><div ref={paypalRef} /></Box>;
};

// ==== Giao diện thanh toán chính ====
const CheckoutSection = () => {
    const toast = useToast();
    const [cartList, setCartList] = useState([]);
    const [tabs, setTabs] = useState({ cupon: false, billing_adress: true, payment: true });
    const [forms, setForms] = useState({
        cupon_key: '',
        fname: 'Nguyễn',
        lname: 'Văn A',
        country: 'Việt Nam',
        address: '123 Nguyễn Huệ, Quận 1',
        email: 'example@gmail.com',
        phone: '0901234567',
        payment_method: 'cash',
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const format = storedCart.map(i => ({
            ...i,
            title: i.name || 'Sản phẩm',
            price: parseFloat(i.price) || 0,
            quantity: parseInt(i.quantity) || 1
        }));
        setCartList(format);
    }, []);

    const handleFormChange = e => setForms({ ...forms, [e.target.name]: e.target.value });
    const handleTabChange = tab => setTabs(prev => ({ ...prev, [tab]: !prev[tab] }));

    const validateForm = () => {
        const missing = ['fname', 'lname', 'address', 'email'].filter(f => !forms[f]);
        if (missing.length) {
            toast({ title: "Thiếu thông tin", description: `Vui lòng điền: ${missing.join(', ')}`, status: "error", duration: 5000 });
            return false;
        }
        return true;
    };

    const buildOrderPayload = () => ({
        userId: 1,
        storeId: 1,
        address: forms.address,
        phone: forms.phone,
        email: forms.email,
        items: cartList.map(i => ({ productId: i.productId || i.id, quantity: i.quantity }))
    });

    const placeOrder = async (orderPayload) => {
        const res = await fetch("http://localhost:8080/api/orders/place-order", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload),
        });
        if (!res.ok) throw new Error("Không thể tạo đơn hàng");
        return res.json();
    };

    const handleCheckout = async () => {
        if (!validateForm()) return;
        try {
            const payload = buildOrderPayload();
            await placeOrder(payload);
            toast({ title: "Đặt hàng thành công", status: "success", duration: 5000 });
            localStorage.removeItem('cartItems');
            setTimeout(() => window.location.href = "http://localhost:5173", 1000);
        } catch (err) {
            toast({ title: "Thất bại", description: err.message, status: "error", duration: 5000 });
        }
    };

    const formatVND = amount => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    const subTotal = cartList.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subTotal * 0.1;
    const tax = subTotal * 0.08;
    const total = subTotal + tax + shipping;

    return (
        <ChakraProvider theme={extendTheme({ styles: { global: { body: { bg: 'gray.50' } } } })}>
            <ErrorBoundary>
                <Box py={10}>
                    <Container maxW="container.xl">
                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                            {/* Thông tin thanh toán */}
                            <VStack spacing={4}>
                                <Box bg="white" borderRadius="md" shadow="md" w="100%">
                                    <Button w="100%" onClick={() => handleTabChange('billing_adress')} rightIcon={tabs.billing_adress ? <ChevronUpIcon /> : <ChevronDownIcon />} justifyContent="space-between" p={4} variant="ghost">Thông tin giao hàng</Button>
                                    <Collapse in={tabs.billing_adress}>
                                        <Box p={4}>
                                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                                <FormControl><FormLabel>Họ</FormLabel><Input name="fname" value={forms.fname} onChange={handleFormChange} /></FormControl>
                                                <FormControl><FormLabel>Tên</FormLabel><Input name="lname" value={forms.lname} onChange={handleFormChange} /></FormControl>
                                                <FormControl><FormLabel>Địa chỉ</FormLabel><Input name="address" value={forms.address} onChange={handleFormChange} /></FormControl>
                                                <FormControl><FormLabel>Email</FormLabel><Input name="email" type="email" value={forms.email} onChange={handleFormChange} /></FormControl>
                                            </Grid>
                                        </Box>
                                    </Collapse>
                                </Box>

                                {/* Phương thức thanh toán */}
                                <Box bg="white" borderRadius="md" shadow="md" w="100%">
                                    <Button w="100%" onClick={() => handleTabChange('payment')} rightIcon={tabs.payment ? <ChevronUpIcon /> : <ChevronDownIcon />} justifyContent="space-between" p={4} variant="ghost">Phương thức thanh toán</Button>
                                    <Collapse in={tabs.payment}>
                                        <Box p={4}>
                                            <RadioGroup value={forms.payment_method} onChange={(v) => setForms(prev => ({ ...prev, payment_method: v }))}>
                                                <Stack>
                                                    <Radio value="cash">Thanh toán khi nhận hàng</Radio>
                                                    <Radio value="paypal">Thanh toán qua PayPal</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            {forms.payment_method === 'paypal' && <PaypalButton cartTotal={total} cartList={cartList} billingDetails={forms} onSuccess={() => localStorage.removeItem('cartItems')} onError={() => {}} />}
                                            {forms.payment_method === 'cash' && <Button onClick={handleCheckout} colorScheme="blue" w="100%" mt={4}>Đặt hàng</Button>}
                                        </Box>
                                    </Collapse>
                                </Box>
                            </VStack>

                            {/* Tóm tắt đơn hàng */}
                            <Box bg="white" p={6} borderRadius="md" shadow="md">
                                <Text fontSize="2xl" mb={4}>Tóm tắt đơn hàng</Text>
                                {cartList.length === 0 ? (
                                    <Text textAlign="center" color="gray.500">Giỏ hàng trống</Text>
                                ) : (
                                    <Table variant="simple">
                                        <Tbody>
                                            {cartList.map((item, idx) => (
                                                <Tr key={idx}>
                                                    <Td>{item.title} <br /><Text fontSize="sm" color="gray.500">Số lượng: {item.quantity}</Text></Td>
                                                    <Td isNumeric>{formatVND(item.price * item.quantity)}</Td>
                                                </Tr>
                                            ))}
                                            <Tr><Td>Tạm tính</Td><Td isNumeric>{formatVND(subTotal)}</Td></Tr>
                                            <Tr><Td>Thuế (8%)</Td><Td isNumeric>{formatVND(tax)}</Td></Tr>
                                            <Tr><Td>Phí giao hàng (10%)</Td><Td isNumeric>{formatVND(shipping)}</Td></Tr>
                                            <Tr><Td fontWeight="bold">Tổng cộng</Td><Td isNumeric fontWeight="bold" color="blue.600">{formatVND(total)}</Td></Tr>
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
