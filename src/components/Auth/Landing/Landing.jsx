import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {


    const [email,setEmail] = useState("");

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get('http://localhost:3000/user/getinfo');
            setEmail(result.data.email);
        };

        getData();
    },[]);

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex justify-center mb-6">
                    <img src="/slack.png" alt="Slack Logo" className="h-12" />
                    {email}
                </div>
                <p className="text-center text-sm text-gray-600 mb-4">
                    Confirmed as <strong>{email.length > 0 ? email : "Temporary Gmail"}</strong> <a href="#" className="text-blue-500">Change</a>
                </p>
                <h1 className="text-3xl font-bold mb-4 text-center">Create a new Slack workspace</h1>
                <p className="text-gray-600 text-center mb-6">
                    Slack gives your team a home – a place where they can talk and work together. To create a new workspace, click on the button below.
                </p>
                <button className="bg-purple-700 text-white rounded-lg w-full py-2 mb-4"><Link to='/channel'>Create a workspace</Link></button>
                <p className="text-center text-gray-600 mb-4">OR</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-center text-gray-700 mb-2">Open a workspace</p>
                    <div className="bg-white p-2 rounded-lg shadow flex items-center justify-center cursor-pointer mb-2">
                        <span className="text-purple-700">New Workspace</span>
                    </div>
                    <p className="text-center text-gray-700">Workspaces for {email.length > 0 ? email : "Temporary Gmail"}</p>
                </div>
                <p className="text-gray-500 text-center text-xs mt-4">
                    By continuing, you're agreeing to our main services agreement, user terms of service and Slack supplemental Terms. Additional disclosures are available in our privacy policy and cookie policy.
                </p>
            </div>
            
        </div>
    );
}

export default LandingPage;
