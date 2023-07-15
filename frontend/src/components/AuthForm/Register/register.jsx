import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from '../../../hooks/security/auth'
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Avatar from "./avatar";
import { toast } from "react-toastify";

function Register(props) {
    const clear = () => { localStorage.clear() }
    clear();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selection, setSelection] = useState({profilePic: './imgs/avatars/avatar-1.png'});
    const changeSelection = (newSelection) => {
        setSelection(newSelection)
    }
    const { data, mutate, isSuccess, isError, isLoading } = useRegister();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (dataOnSubmit) => {
        const returnedData = Object.assign(dataOnSubmit, selection);
        mutate(returnedData)
    };
    useEffect(() => {
        if (isSuccess) {
            toast(data.msg)
            navigate('/secure')
        } else if (isError) {
            toast("Something went wrong!")
        } else return;
    }, [isSuccess, isError]);
    if (isLoading) {
        return <div>{<h5>Loading</h5>}</div>;
    }
    return <>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="choose_avatar">
                <span
                    onClick={handleShow}
                    type='button'
                    className="w-100 text-dark"
                    id="choose"
                >
                    Choose your avatar
                </span>
                <picture onClick={handleShow}><img src={Object.values(selection)} /></picture>
            </div>
            <div className="login-container">
                <div className="form-floating mb-5 mt-5">
                    <input
                        className="form-control"
                        type="text"
                        {...register("name")}
                    />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-5 mt-5">
                    <input
                        className="form-control"
                        type="text"
                        defaultValue={props?.props?.email}
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
                    <span>Sign Up</span>
                </button>
            </div>
        </form>
        <Modal show={show} size="sm" onHide={handleClose}>
            <Modal.Header closeButton>
                <h2>Choose your avatar</h2>
            </Modal.Header>
            <Modal.Body>
                <div className='avatar-selection-area'>
                    <Avatar changeSelection={changeSelection} />
                </div>
            </Modal.Body>
        </Modal>
    </>
}
export default Register