import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./register.scss"
import { toast, ToastContainer } from "react-toastify";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";


const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    gender: yup.string().required("Gender is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    contactNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        // .len(10, "Must be at least 10 digits")
        .max(10, "Must be at 10 digits")
        .required("Contact number is required"),
    batch: yup.string().required("Batch is required"),
    Package: yup.string().required("Please select Packge"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    zipCode: yup
        .string()
        .required("Zip code is required")
        .matches(/^\d{5,6}$/, "Zip code must be 5 or 6 digits"),
    paymentScreenshot: yup
        .mixed()
        .required("Payment screenshot is required")
        .test("fileType", "Only images are allowed", (value) => {
            return value && ["image/jpeg","image/jpg", "image/png"].includes(value.type);
        }),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const RegisterForm = () => {
    const [imagePreview, setImagePreview] = useState(""); // State to hold the image preview

    const { register, handleSubmit, control, formState: { errors }, } = useForm({ resolver: yupResolver(validationSchema), });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("gender", data.gender);
            formData.append("email", data.email);
            formData.append("contactNumber", data.contactNumber);
            formData.append("batch", data.batch);
            formData.append("Package", data.Package);
            formData.append("city", data.city);
            formData.append("CountryCode", +91);
            formData.append("state", data.state);
            formData.append("country", data.country);
            formData.append("zipCode", data.zipCode);
            formData.append("paymentScreenshot", data.paymentScreenshot[0]);

            // API call to submit form data
            const response = await fetch("https://memorylane-2525-be-551279970988.us-central1.run.app/api/v1/register", {
                method: "POST",
                headers: {
                    "fun-code": data.password, // Ensure this is correct
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Something went wrong while submitting the form");
            }

            const result = await response.json();
            console.log("result----------", result)

            if (result.success) {
                toast.success("Registration successful!");
            } else {
                toast.error(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        }
    };

    const handleImageChange = (file) => {
        if (file && ["image/jpeg", "image/png"].includes(file.type)) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            toast.error("Invalid file format. Only JPEG and PNG are allowed.");
            setImagePreview("");
        }
    };


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
                <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-section">
                        <h4>Personal Details</h4>
                        <input type="text" placeholder="Name" {...register("name")} className="form-input" />
                        <p className="error">{errors.name?.message}</p>
                        <h3>Gender</h3>
                        <FormControl component="fieldset" error={Boolean(errors.gender)}>
                            {/* <FormLabel >Gender</FormLabel> */}
                            <RadioGroup row>
                                <FormControlLabel
                                    value="male"
                                    control={<Radio sx={{
                                        color: "#E0B757", // Default color
                                        "&.Mui-checked": {
                                            color: "#E0B757", // Checked color
                                        },
                                    }} />}
                                    label="Male"
                                    {...register("gender", { required: "Please select your gender" })}
                                />
                                <FormControlLabel
                                    value="female"
                                    control={<Radio sx={{
                                        color: "#E0B757", // Default color
                                        "&.Mui-checked": {
                                            color: "#E0B757", // Checked color
                                        },
                                    }} />}
                                    label="Female"
                                    {...register("gender", { required: "Please select your gender" })}
                                />
                                <FormControlLabel
                                    value="other"
                                    control={<Radio sx={{
                                        color: "#E0B757", // Default color
                                        "&.Mui-checked": {
                                            color: "#E0B757", // Checked color
                                        },
                                    }} />}
                                    label="Other"
                                    {...register("gender", { required: "Please select your gender" })}
                                />
                            </RadioGroup>
                            <FormHelperText>{errors.gender?.message}</FormHelperText>
                        </FormControl>

                        <div className="form_wrp">
                            <div>
                                <input type="email" placeholder="Email" {...register("email")} className="form-input" />
                                <p className="error">{errors.email?.message}</p>
                            </div>
                            <div>
                                <input type="text" placeholder="Contact Number" {...register("contactNumber")}
                                    className="form-input" />
                                <p className="error">{errors.contactNumber?.message}</p>
                            </div>

                        </div>
                    </div>

                    {/* Batch Section */}
                    <div className="form-section">
                        <h3>Batch</h3>
                        <FormControl component="fieldset" error={Boolean(errors.batch)}>
                            <RadioGroup row>

                                <FormControlLabel
                                    value="2008"
                                    control={<Radio sx={{
                                        color: "#E0B757", // Default color
                                        "&.Mui-checked": {
                                            color: "#E0B757", // Checked color
                                        },
                                    }} />}
                                    label="2008"
                                    {...register("batch", { required: "Please select a batch" })}
                                />
                                <FormControlLabel
                                    value="2010"
                                    control={<Radio sx={{
                                        color: "#E0B757", // Default color
                                        "&.Mui-checked": {
                                            color: "#E0B757", // Checked color
                                        },
                                    }} />}
                                    label="2010"
                                    {...register("batch", { required: "Please select a batch" })}
                                />
                            </RadioGroup>
                            <FormHelperText>{errors.batch?.message}</FormHelperText>
                        </FormControl>

                    </div>

                    {/* Address Section */}
                    <div className="form-section">
                        <h3>Address</h3>
                        <div className="form_wrp">
                            <div>
                                <input type="text" placeholder="City *" {...register("city")} className="form-input" />
                                <p className="error">{errors.city?.message}</p>

                            </div>
                            <div>
                                <input type="text" placeholder="State" {...register("state")} className="form-input" />
                                <p className="error">{errors.state?.message}</p>

                            </div>

                            <div>

                                <input type="text" placeholder="Country" {...register("country")}
                                    className="form-input" />
                                <p className="error">{errors.country?.message}</p>
                            </div>


                            <div>

                                <input type="text" placeholder="Zip Code" {...register("zipCode")}
                                    className="form-input" />
                                <p className="error">{errors.zipCode?.message}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="form-section">
                        <h3>Payment</h3>
                        <div className="payment_wrp">

                            <div className="payment-option">
                                <h5>Bank Transfer</h5>
                                <ul>
                                    <li><strong>Bank Name:</strong> BANK OF BARODA</li>
                                    <li><strong>IFSC Code:</strong> BARB0AMBARI</li>
                                    <li><strong>Branch Name:</strong> AMBARI,GUWAHATI</li>
                                    <li><strong>Account Type:</strong> Current A/C</li>
                                    <li><strong>Account Number:</strong> 39010200000385</li>
                                    <li><strong>Name:</strong> DHARMARAJ KALITA</li>
                                </ul>
                            </div>

                            <div className="payment-option">
                                {/*TODO: Add UPI IMAGE ID*/}
                                <h5>UPI Payment</h5>
                                <ul>
                                    <li><strong>UPI ID:</strong>tuman111999-3@okaxis</li>
                                </ul>
                            </div>
                        </div>

                        {/* Display image preview */}

                    </div>

                    <div className="form-section">
                        <h3>Packge</h3>
                        <FormControl component="fieldset" error={Boolean(errors.Package)}>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="event"
                                    control={<Radio sx={{
                                        color: "#E0B757", // Default color
                                        "&.Mui-checked": {
                                            color: "#E0B757", // Checked color
                                        },
                                    }}
                                    />}
                                    label="4000 INR (Event)"
                                    {...register("Package", { required: "Please select a package" })}
                                />
                                <FormControlLabel
                                    value="eventAndStay"
                                    control={<Radio sx={{
                                        color: "#E0B757", // Default color
                                        "&.Mui-checked": {
                                            color: "#E0B757", // Checked color
                                        },
                                    }}
                                    />}
                                    label="6500 INR (Event + Stay)"
                                    {...register("Package", { required: "Please select a package" })}
                                />
                            </RadioGroup>
                            <FormHelperText>{errors.Package?.message}</FormHelperText>
                        </FormControl>
                    </div>

                    <div className="form-section">
                        <label htmlFor="payment-screenshot" className={`upload-box ${imagePreview ? "with-image" : ""}`}>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Uploaded Screenshot" />
                            ) : (
                                <div className="placeholder-text">Upload Payment Screenshot</div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="payment-screenshot"
                            accept="image/jpeg,image/jpg image/png"
                            {...register("paymentScreenshot")}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                handleImageChange(file);
                            }}
                            className="input-input"
                        />
                        <p className="error">{errors.paymentScreenshot?.message}</p>
                    </div>

                    {/* Security Check Section */}
                    <div className="form-section">
                        <div className="form_wrp">
                            <div>
                                <h5>Security Check</h5>
                                <p>Type the password shared in the group chat.</p>
                            </div>
                            <div>
                                <input type="password" placeholder="Password" {...register("password")}
                                    className="form-input" />
                                <p className="error">{errors.password?.message}</p>
                            </div>
                        </div>

                    </div>

                    {/* Register Button */}
                    <div className="register-button">
                        <button type="submit">
                            Register
                        </button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterForm;


const formSections = [
    {
        sectionTitle: "Personal Details",
        fields: [
            {
                type: "text",
                name: "name",
                placeholder: "Name",
                className: "form-input",
                errorField: "name",
            },
            {
                type: "radio",
                name: "gender",
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                ],
                errorField: "gender",
            },
            {
                type: "email",
                name: "email",
                placeholder: "Email",
                className: "form-input",
                errorField: "email",
            },
            {
                type: "text",
                name: "contactNumber",
                placeholder: "Contact Number",
                className: "form-input",
                errorField: "contactNumber",
            },
        ],
    },
    {
        sectionTitle: "Batch",
        fields: [
            {
                type: "radio",
                name: "batch",
                options: [
                    { label: "2008", value: "2008" },
                    { label: "2010", value: "2010" },
                ],
                errorField: "batch",
            },
        ],
    },
    {
        sectionTitle: "Address",
        fields: [
            { type: "text", name: "city", placeholder: "City *", className: "form-input", errorField: "city" },
            { type: "text", name: "state", placeholder: "State", className: "form-input", errorField: "state" },
            { type: "text", name: "country", placeholder: "Country", className: "form-input", errorField: "country" },
            { type: "text", name: "zipCode", placeholder: "Zip Code", className: "form-input", errorField: "zipCode" },
        ],
    },
    {
        sectionTitle: "Payment",
        fields: [
            {
                type: "file",
                name: "paymentScreenshot",
                label: "Upload your payment Screenshot",
                className: "upload-input",
                accept: "image/png, image/jpeg",
                errorField: "paymentScreenshot",
            },
        ],
    },
    {
        sectionTitle: "Security Check",
        fields: [
            {
                type: "password",
                name: "password",
                placeholder: "Password",
                className: "form-input",
                errorField: "password",
            },
        ],
    },
];