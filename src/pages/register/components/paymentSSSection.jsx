import React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const PaymentSSSection = ({ register, errors, watch, setValue }) => {
    const registeredData = watch("paymentScreenshot");

    return (
        <Box
            sx={{
                textAlign: "center",
                marginTop: 4,
                padding: 3,
                border: "2px dashed #ccc",
                borderRadius: 2,
                backgroundColor: "#2D2D2D",
                color: "#fff",
                position: "relative",
            }}
        >
            {registeredData && registeredData[0] ? (
                <Box position="relative">
                    <IconButton
                        onClick={() => {
                            // Clear the preview and reset the input
                            setValue("paymentScreenshot", null); // Reset registered data
                        }}
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: "rgba(255, 255, 255, 0.7)",
                            "&:hover": {
                                background: "rgba(255, 255, 255, 1)",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={URL.createObjectURL(registeredData[0])}
                        alt="Preview"
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </Box>
            ) : (
                <>
                    <Box sx={{ textAlign: "center", padding: 2 }}>
                        <CloudUploadIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body1" gutterBottom>
                            Upload your payment Screenshot
                        </Typography>
                    </Box>

                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="upload-image"
                        type="file"
                        {...register("paymentScreenshot")}
                    />
                    <label htmlFor="upload-image">
                        <Button variant="contained" component="span" color="primary">
                            Choose File
                        </Button>
                    </label>
                    <p className="error">{errors.paymentScreenshot?.message}</p>
                </>
            )}
        </Box>
    );
};
