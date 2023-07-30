import React, { useEffect, useContext, } from "react";
import { useForm } from "react-hook-form";
import { contextData } from "../../../ContextApi";
import { useUserLogin } from '../../../hooks/security/auth'
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/footer";
import { toast } from "react-toastify";
import { MySpinner, ErrorMessage }from '../../Spinner/Spinner'

function Login() {
    const clear = () => { localStorage.clear() }
    clear();
    const { data, mutate, isSuccess, isError, isLoading } = useUserLogin();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (dataOnSubmit) => {
        mutate(dataOnSubmit)
    };
    const { setUserData } = useContext(contextData);
    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("Access_token", data.Access_token);
            localStorage.setItem("Avatar", data.profilePic);
            setUserData(data.user);
            toast(data.msg)
            navigate('/secure')
        } else if (isError) {
            toast("Wrong username or password!")
        } else return;
    }, [isSuccess, isError]);
    if (isLoading) {
        return <div>{<MySpinner />}</div>;
    }
    if (isError) {
        return <ErrorMessage />;
    }
    return <>
        <Header />
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-container">
                <div className="form-floating mb-5 mt-5">
                    <input
                        className="form-control"
                        type="text"
                        name='email'
                        {...register("email")}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        className="form-control"
                        type="password"
                        {...register("password")}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5 mb-5">
                <button className="cta-sign-in w-100" type="submit">
                    <span>Login</span>
                </button>
            </div>
        </form>
        <Footer />
    </>
}
export default Login