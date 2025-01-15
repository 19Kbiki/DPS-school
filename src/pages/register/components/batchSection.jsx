import {FormControl, FormHelperText, RadioGroup} from "@mui/material";
import createBatchRadioButton from "./radioButtons";
import React from "react";

export function BatchSection({register, errors}) {
    return (
        <div className="form-section">
            <h3>Batch</h3>
            <FormControl component="fieldset" error={Boolean(errors.batch)}>
                <RadioGroup row>
                    {createBatchRadioButton(register, "2008", "2008")}
                    {createBatchRadioButton(register, "2010", "2010")}
                </RadioGroup>
                <FormHelperText>{errors.batch?.message}</FormHelperText>
            </FormControl>

        </div>);
}