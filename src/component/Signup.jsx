import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, fs } from './Config/Config';

const Signup = () => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
            .then((credentials) => {
                console.log(credentials);
                fs.collection('users').doc(credentials.user.uid)
                    .set({
                        FullName: fullname,
                        Email: email,
                        Password: password
                    }).then(() => {
                        setSuccessMsg('Registered Successfull!')
                        setErrorMsg('');
                        setTimeout(() => {
                            setSuccessMsg('');
                            navigate('/login');
                        },3000)
                    }).catch((error) => { setErrorMsg(error.message); })
            })
            .catch((error) => {
                setErrorMsg(error.message);
            })
    }

    return (
        <>
            <div className="w-full lg:max-w-5xl mt-8 lg:ml-36 md:max-w-2xl md:ml-16">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-2xl font-bold mb-2">
                            Register
                        </label>
                    </div>
                    <hr className="font-bold mb-4"></hr>
                    { successMsg && <>
                    <div className="shadow mb-4 appearance-none border bg-green-100 rounded w-full py-2 px-3 text-green-400 leading-tight focus:outline-none focus:shadow-outline">
                        {successMsg}
                    </div>
                    </> }
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-semibold mb-2">
                            Full Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="fullname" 
                        type="text" 
                        value={fullname}
                        onChange={(e)=>setFullname(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-semibold mb-2">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-semibold mb-2">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit">
                            Register
                        </button>
                    </div>
                    <div className="flex items-center mb-4 justify-between">
                        <Link to="/login">  
                            <p>Already have an account!!</p>
                        </Link>
                    </div>
                    { errorMsg && <>
                    <div className="shadow appearance-none border bg-red-100 rounded w-full py-2 px-3 text-red-400 leading-tight focus:outline-none focus:shadow-outline">
                        {errorMsg}
                    </div>
                    </> }
                </form>
            </div>
        </>
    )
}

export default Signup;
