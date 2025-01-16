import {handleImageChange} from "../formUtils";
import React, {useState} from "react";

export function PaymentSSSection({register, errors}) {
    const [imagePreview, setImagePreview] = useState(""); // State to hold the image preview

    return (<div className="form-section">
        <label htmlFor="payment-screenshot"
               className={`upload-box ${imagePreview ? "with-image" : ""}`}>
            {imagePreview ? (
                <img src={imagePreview} alt="Uploaded Screenshot"/>
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
                handleImageChange(file, setImagePreview);
            }}
            className="upload-input"
        />
        <p className="error">{errors.paymentScreenshot?.message}</p>
    </div>);
}