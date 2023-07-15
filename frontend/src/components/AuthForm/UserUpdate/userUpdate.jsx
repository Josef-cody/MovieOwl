import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {  UpdateUser } from '../../../hooks/user'


function UserUpdate(props) {
    const { mutate } = UpdateUser();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (dataOnSubmit) => {
        console.log(dataOnSubmit)
        mutate(dataOnSubmit)
    };
    return <>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Good to see you {props.props.name}</h3>
            <div className="login-container">
                <div className="form-floating mb-5 mt-5">
                    <input
                        className="form-control"
                        type="text"
                        defaultValue={props.props.email}
                        {...register("email")}
                    />
                    <label htmlFor="floatingInput">Update email address</label>
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
                <button className="cta-sign-in w-75 m-auto" type="submit">
                    <span>Update</span>
                </button>
            </div>
        </form>
        </>
}
export default UserUpdate