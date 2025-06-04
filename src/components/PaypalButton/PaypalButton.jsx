import { useEffect } from "react";

export default function PaypalButton() {
    useEffect(() => {
        // Load PayPal SDK script
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AQwmw7pwEz6xTHlwxuaK5S1RnSt0AzdJMStk47HlVehip6qjFUkLT0XcJKEt5DnyOnJDNiFAKVdb4S7u";
        script.addEventListener("load", () => {
            if (window.paypal) {
                window.paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color: 'silver',
                        tagline: 'false'
                    },
                    createOrder: (data, actions) => {
                        return fetch("http://localhost:8080/api/paypal/create-paypal-order", {
                            method: "POST",
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    return response.json().then(error => { throw error; });
                                }
                                return response.json();
                            })
                            .then((order) => order.id)
                            .catch(error => alert(error.message));
                    },
                    onApprove: (data, actions) => {
                        return fetch(`http://localhost:8080/api/paypal/capture-paypal-order?orderId=${data.orderID}`, {
                            method: "POST",
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    return response.json().then(error => { throw error; });
                                }
                                window.location.href = "/Cart/PaymentSuccess"; // Điều hướng thành công
                            })
                            .catch(error => alert(error.message));
                    }
                }).render('#paypal-button-container');
            }
        });
        document.body.appendChild(script);

        // Clean up script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ maxWidth: "1000px" }}>
            <div id="paypal-button-container"></div>
        </div>
    );
}