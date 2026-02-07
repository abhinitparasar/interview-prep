import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
function Login() {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isLoading, isError, message, isSuccess} = useSelector((state)=> state.auth);

    useEffect(()=>{
        if(isError){
            alert(`Error : ${message}`)
        }
        if(isSuccess || user){
            navigate("/dashboard");
        }
        dispatch(reset());
    },[user, isSuccess, navigate, dispatch, isError, message])

    const {email, password} = formData;

    const onChange = (e) =>{
        setFormData((prev) => ({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        const userData = {email, password};
        dispatch(login(userData));
    }

     if(isLoading){
        return <div className="text-3xl text-center font-semibold font-serif py-4 text-indigo-700">Loading...</div>;
    }

    return (
    <div className="container max-w-xs border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl border-gray-300 shadow-2xl">
        <h1 
        className="text-center font-bold text-4xl font-serif bg-gradient-to-r from-indigo-800 to-pink-600 bg-clip-text text-transparent">Login</h1>
        <form onSubmit={onSubmit}>
        <div>
            <label 
            className="block font-semibold font-serif text-xl mt-4"
            htmlFor="email"
            >Email</label>
            <input
            className="border border-gray-400 w-full rounded-lg p-1 px-2"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            />
        </div>
        <div className="mt-3">
            <label
            htmlFor="password"
            className="font-semibold font-serif text-xl"
            >Password</label>
            <input 
            className="border border-gray-400 w-full rounded-lg p-1 px-2"
            type="password"
            onChange={onChange}
            value={password}
            id="password"
            name="password"
            required
            />
        </div>
        <button
        type="submit"
        className="w-full mt-4 bg-indigo-700 text-white p-2 rounded-lg font-bold font-serif text cursor-pointer"
        >
            login
        </button>
        </form>

    </div>
    )
}

export default Login