import React from "react";
import {Box, Button, Typography} from "@mui/material";


export const PaymentSSSection = ({register, errors, watch}) => {
    const registeredData = watch("paymentScreenshot");
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
                {...register("paymentScreenshot")}
            />
            <label htmlFor="upload-image">
                <Button variant="contained" component="span" color="primary">
                    Choose File
                </Button>
            </label>
            {registeredData && registeredData[0] && (
                <Box mt={3}>
                    <Typography variant="body1">Preview:</Typography>
                    <img
                        src={URL.createObjectURL(registeredData[0])}
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
