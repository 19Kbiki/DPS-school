import React from "react";
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


const RegisterForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
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
                <form className="form-container" onSubmit={handleSubmit(formSubmit)}>
                    <PersonalDetails register={register} errors={errors}></PersonalDetails>
                    <BatchSection register={register} errors={errors}/>
                    <AddressSection register={register} errors={errors}/>
                    <PaymentSection/>
                    <PackageSection register={register} errors={errors}/>
                    <PaymentSSSection register={register} errors={errors}/>
                    <SecuritySection register={register} errors={errors}/>
                    <div className="register-button">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default RegisterForm;


