import React, {useState} from "react";
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
import {CircularProgress, Typography} from "@mui/material";


const RegisterForm = () => {
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleRoute = (id) => {
        navigate(`${ROUTES.STATUS}/${id}`);
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue
    } = useForm({
        defaultValues: {Package: 'event'},
        resolver: yupResolver(formValidationSchema),
    });


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
                <form className="form-container" onSubmit={handleSubmit(
                    (data) =>
                        formSubmit(data, handleRoute, setStatusMessage, setIsVisible, isLoading, setIsLoading))
                }>
                    <PersonalDetails register={register} errors={errors}/>
                    <BatchSection register={register} errors={errors}/>
                    <AddressSection register={register} errors={errors}/>
                    <PaymentSection/>
                    <PackageSection register={register} errors={errors} watch={watch} setValue={setValue}/>
                    <PaymentSSSection register={register} errors={errors} watch={watch} setValue={setValue}/>
                    <SecuritySection register={register} errors={errors}/>
                    {isVisible && (
                        <Typography
                            variant="body1"
                            style={{
                                textAlign: 'center',
                                border: "2px solid #E0B757", // Add a border with the theme color
                                borderRadius: "5px",         // Slightly rounded corners
                                padding: "10px 15px",        // Padding for spacing inside the border
                                color: "#E0B757",            // Text color
                                marginBottom: "10px",
                                marginTop: "10px",
                            }}
                        >
                            {statusMessage}
                        </Typography>
                    )}
                    <div className="register-button">
                        <button type="submit">
                            {isLoading && (<CircularProgress size={20} color="#C99A46"/>)}
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


