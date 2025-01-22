import {FormControl, FormHelperText, RadioGroup} from "@mui/material";
import {createPackageRadioButton} from "./radioButtons";
import React from "react";

export function PackageSection({register, errors}) {
    return (
        <div className="form-section">
            <h3>Package</h3>
            <FormControl component="fieldset" error={Boolean(errors.Package)}>
                <RadioGroup row>
                    {createPackageRadioButton(register, "event", "4000 INR (Event)")}
                    {createPackageRadioButton(register, "eventAndStay", "6500 INR (Event + Stay)")}
                </RadioGroup>
                <FormHelperText>{errors.Package?.message}</FormHelperText>
            </FormControl>
        </div>
    );
}