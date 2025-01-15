import * as yup from "yup";
import {REGISTER_URL} from "../../config/Api";
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
        .required("Please select Packge"),
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
        .test("fileType", "Only images are allowed", (value) => {
            return value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export function formSubmit() {
    const formSubmit = async (data) => {
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
            const response = await fetch(REGISTER_URL, {
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
    return formSubmit;
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