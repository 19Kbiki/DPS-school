import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './login.scss';
import axios from 'axios';
import {LOGIN_URL} from '../../../../config/api';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from "../../../../App";
import {Checkbox, FormControlLabel} from "@mui/material";

export default function Login() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        const savedPassword = localStorage.getItem('rememberedPassword');
        if (savedEmail) {
            formik.setFieldValue('user', savedEmail);
            formik.setFieldValue('password', savedPassword);
            setIsChecked(true);
        }
    }, []);

    const handleCheckBoxChange = () => {
        if (!isChecked) {
            localStorage.setItem('rememberedEmail', formik.values['user']);
            localStorage.setItem('rememberedPassword', formik.values['password']);
        } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
        }
        setIsChecked(!isChecked);
    }
    const validationSchema = Yup.object({
        user: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            user: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            try {
                const response = await axios.post(LOGIN_URL, values);
                sessionStorage.setItem('token', response.data.token)
                sessionStorage.setItem('user', response.data.user)
                navigate(ROUTES.PARTICIPANTS)
            } catch (error) {
                console.error('Login failed:', error.response?.data || error.message);
                setErrors({apiError: 'Login failed. Please check your credentials.'});
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div>
            <section className="login">
                <div className="container">
                    <div className='login_wrp'>
                        <h1>Login</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className={`form-control ${formik.touched.user && formik.errors.user ? 'is-invalid' : ''}`}
                                    id="user"
                                    name="user"
                                    placeholder='Email'
                                    value={formik.values.user}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.user && formik.errors.user && (
                                    <div className="invalid-feedback">{formik.errors.user}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    placeholder='Password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                )}
                            </div>
                            <div>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={handleCheckBoxChange}
                                        sx={{
                                            transform: "scale(0.8)",
                                            color: "#E0B757", // Default color
                                            "&.Mui-checked": {
                                                color: "#E0B757", // Checked color
                                            },
                                        }}
                                    />
                                } label={<span style={{ fontSize: "0.8rem" }}>Remember me</span>}/>
                            </div>
                            {formik.errors.apiError && (
                                <div className="alert alert-danger">{formik.errors.apiError}</div>
                            )}
                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>

                    </div>
                </div>
            </section>
        </div>
    );
}
