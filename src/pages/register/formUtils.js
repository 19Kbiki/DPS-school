import * as yup from "yup";
import {REGISTER_URL} from "../../config/api";
import {toast} from "react-toastify";


export const formValidationSchema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    gender: yup.string()
        .required("Gender is required"),
    email: yup.string()
        .email("Invalid email")
        .required("Email is required"),
    contactNumber: yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        // .len(10, "Must be at least 10 digits")
        .max(10, "Must be at 10 digits")
        .required("Contact number is required"),
    batch: yup.string()
        .required("Batch is required"),
    Package: yup.string()
        .default("event"),
        // .required("Please select Package"),
    city: yup.string()
        .required("City is required"),
    state: yup.string()
        .required("State is required"),
    country: yup.string()
        .required("Country is required"),
    zipCode: yup.string()
        .required("Zip code is required")
        .matches(/^\d{5,6}$/, "Zip code must be 5 or 6 digits"),
    paymentScreenshot: yup.mixed()
        .required("Payment screenshot is required")
        .test("fileType", "Only images are allowed", function (value) {
            return value && value[0] ? ["image/jpeg", "image/png"].includes(value[0].type) : false;
        }),
    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});


export async function formSubmit(data, handleRoute, setStatusMessage, setIsVisible, isLoading, setIsLoading) {
    if (isLoading) return;
    setIsLoading(true);
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("gender", data.gender);
        formData.append("email", data.email);
        formData.append("contactNumber", data.contactNumber);
        formData.append("batch", data.batch);
        formData.append("Package", data.Package);
        formData.append("city", data.city);
        formData.append("CountryCode", "+91");
        formData.append("state", data.state);
        formData.append("country", data.country);
        formData.append("zipCode", data.zipCode);
        formData.append("paymentScreenshot", data.paymentScreenshot[0]);

        // API call to submit form data
        const response = await fetch(REGISTER_URL, {
            method: "POST",
            headers: {
                "fun-code": data.password, // Ensure this is correct
            },
            body: formData,
        });
        setIsLoading(false);
        if (response.ok) {
            setStatusMessage("Registration successful!");
            setTimeout(() => {
                setIsVisible(false);
                handleRoute(data.contactNumber, true);
            }, 3000)
        } else {
            switch (response.status) {
                case 401:
                    setStatusMessage("Registration is not permitted for your account.");
                    break;
                case 429:
                    setStatusMessage("Too many requests. Please try again later.");
                    break;
                case 409:
                    setStatusMessage("You are already registered. Please contact the Admin for assistance.");
                    break;
                default:
                    setStatusMessage("Something went wrong while submitting the form");
            }
            setTimeout(() => {
                setIsVisible(false);
            }, 5000)
        }
        setIsVisible(true)

    } catch (error) {
        toast.error(error.message || "Registration failed. Please try again.");
    }
}


export const handleImageChange = (file, setImagePreview) => {
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    } else {
        toast.error("Invalid file format. Only JPEG and PNG are allowed.");
        setImagePreview("");
    }
};