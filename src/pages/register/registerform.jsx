import React, { useState } from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import "./register.scss"
import {ToastContainer} from "react-toastify";
import {formSubmit, formValidationSchema} from "./formUtils";
import {PersonalDetails} from "./components/personalDetails";
import {BatchSection} from "./components/batchSection";
import {AddressSection} from "./components/addressSection";
import {PaymentSection} from "./components/paymentSection";
import {PackageSection} from "./components/packageSection";
import {PaymentSSSection} from "./components/paymentSSSection";
import {SecuritySection} from "./components/securitySection";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../App";


const RegisterForm = () => {
    const navigate = useNavigate();
    const handleRoute = (id) => {
        navigate(`${ROUTES.STATUS}/${id}/isFirstTime=${true}`);
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue
    } = useForm({resolver: yupResolver(formValidationSchema),});


    return (
        <div className="app-container">
            <div className="header">
                <div className="container">
                    <div className="frm_info">
                        <h1 className="school-name">Registration form</h1>
                    </div>
                </div>
            </div>

            <div className="container">
                <form className="form-container" onSubmit={handleSubmit((data) => formSubmit(data, handleRoute))}>
                    <PersonalDetails register={register} errors={errors}/>
                    <BatchSection register={register} errors={errors}/>
                    <AddressSection register={register} errors={errors}/>
                    <PaymentSection/>
                    <PackageSection register={register} errors={errors}/>
                    <PaymentSSSection register={register} errors={errors} watch={watch} setValue={setValue}/>
                    <SecuritySection register={register} errors={errors}/>
                    <div className="register-button">
                        <button type="submit" >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default RegisterForm;


