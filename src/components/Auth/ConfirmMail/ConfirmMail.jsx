import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ConfirmMail() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        // Here you would typically verify the OTP with your backend
        if (false) {
            setError("That code wasn't valid. Have another go!");
        } else {
            setError("");
            console.log("OTP verified!");
            // Handle successful OTP verification
        }
    };

    return (
        <div className="min-h-screen bg-gray-300 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="/slack.png" alt="Logo" className="h-12" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-center">Check your email for a code</h1>
                <p className="text-gray-600 text-center mb-4">We've sent a 6-character code to your email. The code expires shortly, so please enter it soon.</p>
                <form onSubmit={handleSubmit} className="text-center">
                    <div className="flex justify-center mb-4">
                        {otp.map((data, index) => (
                            <input
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                                className="w-12 h-12 mx-2 text-center text-lg border border-gray-300 rounded"
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="bg-purple-700 text-white rounded-lg w-full py-2 mb-4"><Link to='/landing'>Verify</Link></button>
                    <div className="flex items-center mb-4 justify-center">
                        <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center mx-2 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 px-4">
                            <svg className="w-4 h-4 mr-2 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.16 8.253v3.504H5.879V8.253H4.66V6.386h1.219V5.178c0-.973.549-2.453 2.25-2.453h1.641v1.722H9.384c-.187 0-.455.094-.455.493v1.446h2.072l-.295 1.867H8.928z" />
                            </svg>
                            Open Gmail
                        </a>
                        <a href="https://outlook.live.com" target="_blank" rel="noopener noreferrer" className="flex items-center mx-2 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 px-4">
                            <svg className="w-4 h-4 mr-2 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.16 8.253v3.504H5.879V8.253H4.66V6.386h1.219V5.178c0-.973.549-2.453 2.25-2.453h1.641v1.722H9.384c-.187 0-.455.094-.455.493v1.446h2.072l-.295 1.867H8.928z" />
                            </svg>
                            Open Outlook
                        </a>
                    </div>
                    <p className="text-center text-gray-600">Can't find your code? Check your spam folder!</p>
                </form>
            </div>
        </div>
    );
}

export default ConfirmMail;
