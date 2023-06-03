import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../includes/Header'
import { authApi } from '../../config/axios'


const Home = () => {
    const [isPaid, setPaid] = useState("")
    const [donationAmount, setAmount] = useState(0)
    const [name, setName] = useState("")

    const loadScript = async () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        document.body.appendChild(script);
    };

    const handlePaymentSuccess = (response) => {
        authApi
            .post("/accounts/pay/verification/", response)
            .then(res => {
                const { statusCode } = res.data

                if (statusCode === 6000) {
                    setPaid("SUCCESS")
                    setAmount("")
                    setName("")
                } else {
                    setPaid("FAILED")
                }
            })
            .catch(err => console.log(err))
    }

    const showRazorpay = async () => {
        await loadScript();
        await loadScript();

        const formData = new FormData()

        formData.append("amount", donationAmount.toString())
        formData.append("user_id", "a74b25d6-2bfb-4b2f-b8cd-a60a8f3e8e16")

        const { data, statusCode } = await authApi
            .post("/accounts/pay/", formData)
            .then(res => res.data)
            .catch(err => err)

        if (statusCode === 6000) {
            var options = {
                key_id: import.meta.VITE_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
                key_secret: import.meta.VITE_APP_SECRET_KEY,
                amount: +donationAmount,
                currency: "INR",
                name: "Buy me a coffee",
                description: "Test transaction",
                image: "", // add image url
                order_id: data.order_id,
                handler: handlePaymentSuccess,
                prefill: {
                    name: name,
                    email: data.email,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        }
    };

    return (
        <>
            <Header />
            <Wrapper>
                {isPaid === "SUCCESS" && <h1>Payment Success</h1>}
                {isPaid === "FAILED" && <h1 className="failed">Payment Failed</h1>}
                <InputContainer>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <input
                        type="text"
                        value={donationAmount}
                        placeholder='Amount'
                        onChange={e => setAmount(e.target.value)}
                    />
                </InputContainer>
                <Button onClick={showRazorpay}>
                    Donate
                </Button>
            </Wrapper>
        </>
    )
}

export default Home

const Wrapper = styled.section`
    height: calc(100vh - 124px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h1{
        font-size: 17px;
        color: green;
        font-weight: 600;
        margin-bottom: 24px;

        &.failed{
            color:red;
        }
    }
`
const Button = styled.button`
    width: 350px;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    color: #fff;
    background-color: #30a1c7;
`
const InputContainer = styled.div`
    margin-bottom: 28px;

    input{
        width: 350px;
        border: 1px solid #111;
        border-radius: 8px;
        padding: 8px 16px;
    }
`