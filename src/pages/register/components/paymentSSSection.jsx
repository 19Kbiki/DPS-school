import React, {useState} from "react";
import {Button, Box, Typography} from "@mui/material";


export const PaymentSSSection = ({register, errors}) => {
    const [imagePreview, setImagePreview] = useState(null); // For previewing the uploaded image

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <Box
            sx={{
                textAlign: "center",
                marginTop: 4,
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Upload Image
            </Typography>

            <input
                accept="image/*"
                style={{display: "none"}}
                id="upload-image"
                type="file"
                onChange={handleFileChange}
                {...register("paymentScreenshot")}
            />
            <label htmlFor="upload-image">
                <Button variant="contained" component="span" color="primary">
                    Choose File
                </Button>
            </label>
            {imagePreview && (
                <Box mt={3}>
                    <Typography variant="body1">Preview:</Typography>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "cover",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </Box>
            )}
            <p className="error">{errors.paymentScreenshot?.message}</p>
        </Box>
    );
};
