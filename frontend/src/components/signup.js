import react,{useState}  from "react"
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import Dashboard from "./dashboard"
import { useNavigate } from "react-router-dom";

const Signup =()=>{
    const navigate = useNavigate();
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""


    })
    const handleChange= e =>{
       
        const {name,value}=e.target
    
        setUser({
            ...user,
            [name]:value
        })
        
        
    }
    const register=()=>{
        const {name,email,password,reEnterPassword}=user
        if(name &&email&&password && password===reEnterPassword){
            alert("posted")
            axios.post("http://localhost:9002/register",user)
            
            .then(res=>{console.log(res.data)})
           

         }
        else{
            alert("invalid input")
        }
    }
  

    return (
      


<div class="container mx-auto px-4">
   {console.log(user)}
    <div class="mt-10 sm:mt-20 flex justify-center">
        <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 class="text-3xl text-center font-bold mb-8">MERN SATCK ACCOUNT</h1>

            <div class="flex gap-4 mb-4">
                <input type="text" name="name" value={user.name} placeholder="FullName*" class="hover:bg-gray-200 flex-1 px-4 py-2 rounded-md border border-gray-300" onChange={handleChange}></input>
               
            </div>

            <div class="mb-4">
                <input type="text" name="email" value={user.email} placeholder="Username* @gmail.com"  class="hover:bg-gray-200 w-full px-4 py-2 rounded-md border border-gray-300" required onChange={handleChange}></input>
                <p class="text-sm text-gray-500">You can use letters, numbers & periods</p>

            </div>

            <div class="mb-4">
                <input type="password" name="password" value={user.password} placeholder="Password*" class="hover:bg-gray-200 w-full px-4 py-2 rounded-md border border-gray-300" required onChange={handleChange}></input>
                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Confirm*" class="hover:bg-gray-200 w-full mt-2 px-4 py-2 rounded-md border border-gray-300" required onChange={handleChange}></input>
                <p class="text-sm text-gray-500">Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>

            <label class="flex items-center mb-4 cursor-pointer">
                <input type="checkbox" class="form-checkbox mr-2"></input>
                <span>ShowPassword</span>
            </label>

            <div class="flex items-center justify-between">
               
                <input onClick={register} type="button" value="Next" class="bg-blue-500 text-white px-6 py-2 rounded-md"></input>
                <input onClick={() => navigate("/dashboard")}  type="button" value="Stored_database_Nextpage" class="bg-blue-500 text-white px-6 py-2 rounded-md"></input>
            </div>
        </div>
    </div>
</div>


    )
}
export default Signup