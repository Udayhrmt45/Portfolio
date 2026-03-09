import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch(apiUrl("/api/auth/login"), {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email, password})
            })
            const data = await res.json();
            if(res.status === 200){
                localStorage.setItem("token", data.token);
                navigate("/admin");
            }else{
                alert(data.message);
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-full max-w-md">
    
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Admin Login
            </h2>
    
            <form onSubmit={handleLogin} className="space-y-5">
    
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
    
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Login
              </button>
    
            </form>
          </div>
        </div>
      );
}

export default Login;
