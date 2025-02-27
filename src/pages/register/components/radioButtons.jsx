import {FormControlLabel, Radio} from "@mui/material";
import React from "react";

export function createGenderRadioButton(register, value, label) {
    return (
        <FormControlLabel
            value={value}
            control={
                <Radio
                    sx={{
                        color: "#E0B757", // Default color
                        "&.Mui-checked": {
                            color: "#E0B757", // Checked color
                        },
                    }}
                />
            }
            label={label}
            {...register("gender", { required: "Select your gender" })}
        />
    );
}

export function createPackageRadioButton(register, value, label) {
    return (
        <FormControlLabel
            value={value}
            control={
                <Radio
                    sx={{
                        transform: "scale(0.8)",
                        fontSize: "0.7rem",
                        color: "#E0B757", // Default color
                        "&.Mui-checked": {
                            color: "#E0B757", // Checked color
                        },
                    }}
                />
            }
            label={<span style={{ fontSize: "0.8rem" }}>{label}</span>}
            {...register("Package", { required: "Select your Package" })}
        />
    );
}

function createBatchRadioButton(register, value, label) {
    return (
        <FormControlLabel
            value={value}
            control={
                <Radio
                    sx={{
                        color: "#E0B757", // Default color
                        "&.Mui-checked": {
                            color: "#E0B757", // Checked color
                        },
                    }}
                />
            }
            label={label}
            {...register("batch", { required: "Please select a batch" })}
        />
    );
}

export default createBatchRadioButton;