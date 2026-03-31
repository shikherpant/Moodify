import {loginUserAPI, registerUserAPI, logoutUserAPI, getMeAPI} from "../services/auth.api"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context/auth.context"

export const useAuth = () => {

    const {user, setUser, loading, setLoading} = useContext(AuthContext)

    const handleRegister = async(email,username,password) => {
        setLoading(true)
        try{
            const data = await registerUserAPI(email,username,password)
            setUser(data.user)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogin = async(email,username,password) => {
        setLoading(true)
        try{
            const data = await loginUserAPI(email,username,password)
            setUser(data.user)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const handlegetMe = async ()=>{
        setLoading(true)
        try{
            const data = await getMeAPI()
            setUser(data.user)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
        
    }

    const handleLogout = async() => {
        setLoading(true)
        try{
            await logoutUserAPI()
            setUser(null)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        handlegetMe()
    },[])

    return ({
        user,
        loading,
        handleLogin,
        handleLogout,
        handleRegister,
        handlegetMe
    })
}