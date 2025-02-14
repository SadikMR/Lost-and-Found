import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const endpoints = import.meta.env.VITE_backendUrl;

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your email...");
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${endpoints}/user/verifyEmail/${token}`)
            .then((res) => {
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate("/login"); // Redirect after 3 seconds
                }, 30000);
            })
            .catch(() => {
                setError("Email verification failed. Invalid or expired token.");
            });
    }, [token, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{error ? "Verification Failed" : "Email Verification"}</h1>
            <p style={{ color: error ? "red" : "green" }}>{error || message}</p>
        </div>
    );
};

export default VerifyEmail;
