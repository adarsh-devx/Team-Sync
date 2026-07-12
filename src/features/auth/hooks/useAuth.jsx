import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee } from "../state/auth/AuthAction";




export let useAuth = () => {

    let dispatch = useDispatch()


    let navigate = useNavigate()




     const {
        register,
        handleSubmit,
        watch, 
        formState: { errors },
      } = useForm({
        mode: "onChange",
      });
    
      const onRegisterSubmit = (data) => {
        console.log("Logged In Form Data:", data);
      };
      const onLoginSubmit = (data) => {
        dispatch(loginEmployee(data))
      };



      return {
        register , 
        handleSubmit , 
        watch, 
        errors ,
        onRegisterSubmit,
        onLoginSubmit,
        navigate
      }
}