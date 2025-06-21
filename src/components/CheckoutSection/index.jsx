import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Button, Input, Radio, RadioGroup, Table, Tbody, Tr, Td, Text, Stack,
    Container, Collapse, FormControl, FormLabel, VStack, ChakraProvider, extendTheme,
    useToast
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

// ==== Xử lý lỗi ====
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
            return <Box p={3} textAlign="center"><Text fontSize="xl" color="red.500">Đã xảy ra lỗi. Vui lòng thử lại sau.</Text></Box>;
        }
        return this.props.children;
    }
}

const CheckoutSection = () => {
    const toast = useToast();
    const [cartList, setCartList] = useState([]);
    const [tabs, setTabs] = useState({ billing_adress: true, payment: true });
    const [forms, setForms] = useState({
        address: '',
        phone: '',
        email: '',
        payment_method: 'COD',
        promotion_code: ''
    });

    // ✅ Load cart từ localStorage có dạng [{ productId, storeId, quantity }]
    useEffect(() => {
        const raw = localStorage.getItem('cartItems');
        if (!raw) return;
        try {
            const parsed = JSON.parse(raw);
            const formatted = parsed.map(item => ({
                productId: item.productId,
                storeId: item.storeId,
                quantity: item.quantity,
                title: `Sản phẩm #${item.productId}`,
                price: 100000, // Giá mặc định, có thể fetch API nếu cần
                customization: ''
            }));
            setCartList(formatted);
        } catch (e) {
            console.error("Lỗi đọc giỏ hàng:", e);
            setCartList([]);
        }
    }, []);

    const handleFormChange = e => setForms({ ...forms, [e.target.name]: e.target.value });
    const handleTabChange = tab => setTabs(prev => ({ ...prev, [tab]: !prev[tab] }));

    const validateForm = () => {
        const { address, phone, email } = forms;
        if (!address || !phone || !email) {
            toast({ title: 'Thiếu thông tin', description: 'Vui lòng điền đầy đủ địa chỉ, email và số điện thoại.', status: 'error', duration: 5000 });
            return false;
        }
        return true;
    };

    const buildOrderPayload = () => ({
        address: forms.address,
        phone: forms.phone,
        email: forms.email,
        paymentMethod: forms.payment_method,
        promotionCode: forms.promotion_code,
        items: cartList.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
            customization: i.customization
        }))
    });

    const placeOrder = async (payload) => {
        const res = await fetch("http://localhost:8080/api/orders-handle", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Không thể tạo đơn hàng");
        return res.text();
    };

    const handleCheckout = async () => {
        if (!validateForm()) return;
        try {
            const payload = buildOrderPayload();
            const msg = await placeOrder(payload);
            toast({ title: 'Đặt hàng thành công', description: msg, status: 'success', duration: 5000 });
            localStorage.removeItem('cartItems');
            setTimeout(() => window.location.href = '/', 1500);
        } catch (err) {
            toast({ title: 'Thất bại', description: err.message, status: 'error', duration: 5000 });
        }
    };

    const formatVND = amount => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    const subTotal = cartList.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subTotal * 0.1;
    const tax = subTotal * 0.08;
    const total = subTotal + shipping + tax;

    return (
        <ChakraProvider theme={extendTheme({ styles: { global: { body: { bg: 'gray.50' } } } })}>
            <ErrorBoundary>
                <Box py={10}>
                    <Container maxW="container.xl">
                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                            {/* Form nhập thông tin giao hàng */}
                            <VStack spacing={4}>
                                <Box bg="white" borderRadius="md" shadow="md" w="100%">
                                    <Button w="100%" onClick={() => handleTabChange('billing_adress')} rightIcon={tabs.billing_adress ? <ChevronUpIcon /> : <ChevronDownIcon />} justifyContent="space-between" p={4} variant="ghost">Thông tin giao hàng</Button>
                                    <Collapse in={tabs.billing_adress}>
                                        <Box p={4}>
                                            <FormControl><FormLabel>Địa chỉ</FormLabel><Input name="address" value={forms.address} onChange={handleFormChange} /></FormControl>
                                            <FormControl><FormLabel>Email</FormLabel><Input name="email" type="email" value={forms.email} onChange={handleFormChange} /></FormControl>
                                            <FormControl><FormLabel>Số điện thoại</FormLabel><Input name="phone" value={forms.phone} onChange={handleFormChange} /></FormControl>
                                            <FormControl><FormLabel>Mã khuyến mãi (nếu có)</FormLabel><Input name="promotion_code" value={forms.promotion_code} onChange={handleFormChange} /></FormControl>
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
                                                    <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
                                                    <Radio value="PAYPAL">Thanh toán qua PayPal</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <Button onClick={handleCheckout} colorScheme="blue" w="100%" mt={4}>Đặt hàng</Button>
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
                                                    <Td>{item.title}<br /><Text fontSize="sm" color="gray.500">SL: {item.quantity}</Text></Td>
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
