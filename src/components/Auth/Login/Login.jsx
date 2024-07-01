import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


function Login() {
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

    const [userEmail,setUserEmail] = useState("");
    const [matches, setmatches] = useState(true);

    const handleInputChange = (e) => {
        e.preventDefault();
        setUserEmail(e.target.value);
    };

    const handleSubmit = async () => {
        const userObject = {
            email : userEmail
        };

        try{
            const result = await axios.get('https://simpplr-slackclone.onrender.com/user/getinfo');
            if(result.data.email == userEmail){
              console.log("Email verified");
              setmatches(true);
            }else{
              console.log("Email unverified");
              setmatches(false);
            }
        }catch(e){
            console.log(e.error);
        }
    }



    return (
        <div className="min-h-screen bg-gray-300 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-center mb-6">
                    <img src="/slack.png" alt="Logo" className="h-12" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-center">Sign in to</h1>
                <p className="text-gray-600 text-center mb-4">We suggest using the email address that you use at work.</p>

                    {/* Email Input */}
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M10.036 8.278 19.294.488A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                            placeholder="name@work-email.com"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='text-red-600 rounded mb-2 text-center'>{matches == false ? "Invalid Email" : null }</div>

                    {/* Continue Button */}
                    <button onClick={handleSubmit} type="submit" className={"bg-purple-700 text-white rounded-lg w-full py-2 mb-4"}><Link to='/confirmmail'>Continue</Link></button>

                    {/* Or Divider */}
                    <div className="flex items-center mb-4">
                        <hr className="w-full border-gray-300" />
                        <span className="px-2 text-gray-600">OR</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    {/* Social Login Buttons */}
                    <button type="button" className="flex items-center justify-center w-full mb-2 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-2 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.16 8.253v3.504H5.879V8.253H4.66V6.386h1.219V5.178c0-.973.549-2.453 2.25-2.453h1.641v1.722H9.384c-.187 0-.455.094-.455.493v1.446h2.072l-.295 1.867H8.928z" />
                        </svg>
                        Continue with Google
                    </button>
                    <button type="button" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-2 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.002 2.005c1.067 0 1.788.408 2.242.784a6.44 6.44 0 0 1 1.327-1.327c-.628-.514-1.373-.909-2.319-1.106a9.393 9.393 0 0 0-3.298 0C5.086 1.164 4.344 1.555 3.702 2.206a6.533 6.533 0 0 1 1.328 1.327c.454-.376 1.175-.784 2.242-.784v2.328H8.002v-2.32zM12.272 4.77c.137.323.24.654.307.992a6.3 6.3 0 0 1 0 4.418c-.067.338-.17.67-.307.992.378-.069.727-.178 1.047-.311a8.537 8.537 0 0 0 0-6.281c-.32-.133-.67-.241-1.047-.31zM8.001 13.995c-1.067 0-1.788-.408-2.242-.784a6.533 6.533 0 0 1-1.328 1.327c.629.514 1.374.909 2.319 1.106a9.393 9.393 0 0 0 3.298 0c.946-.197 1.69-.587 2.333-1.239a6.533 6.533 0 0 1-1.328-1.327c-.454.376-1.175.784-2.242.784v-2.328h-.001v2.32zM1.946 11.147c-.137-.322-.24-.654-.307-.992a6.3 6.3 0 0 1 0-4.418c.067-.338.17-.67.307-.992a8.537 8.537 0 0 0-1.047.311 8.537 8.537 0 0 0 0 6.281c.32.133.67.241 1.047.31zm1.789 1.264c-.323-.137-.654-.24-.992-.307a6.3 6.3 0 0 1-4.418 0c-.338-.067-.67-.17-.992-.307-.069.378-.178.727-.311 1.047a8.537 8.537 0 0 0 6.281 0c-.133-.32-.241-.67-.31-1.047zm-.805-6.601c.654-.137 1.289-.24 1.923-.307.323-.137.654-.24.992-.307a6.3 6.3 0 0 1 4.418 0c.338.067.67.17.992.307.069-.378.178-.727.311-1.047a8.537 8.537 0 0 0-6.281 0c-.133.32-.241.67-.31 1.047z" />
                        </svg>
                        Continue with Apple
                    </button>

                {showAlert && (
                    <div className="mt-4">
                        {Object.values(errors).map((error, index) => (
                            <div key={index} className="bg-red-100 text-red-600 p-2 mb-2 rounded-lg text-sm">
                                {error}
                            </div>
                        ))}
                    </div>
                )}
                <p className="text-center text-gray-600 mt-4">Already using our service? <a href="#" className="text-blue-600 hover:underline">Sign in to an existing account</a></p>
            </div>
        </div>
    );
}

export default Login;
