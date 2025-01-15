import {FormControl, FormHelperText, RadioGroup} from "@mui/material";
import {createGenderRadioButton} from "./radioButtons";
import React from "react";

export function PersonalDetails({register, errors}) {
    return (
        <div className="form-section">
            <h4>Personal Details</h4>
            <input type="text" placeholder="Name" {...register("name")} className="form-input"/>
            <p className="error">{errors.name?.message}</p>
            <h3>Gender</h3>
            <FormControl component="fieldset" error={Boolean(errors.gender)}>
                {/* <FormLabel >Gender</FormLabel> */}
                <RadioGroup row>
                    {createGenderRadioButton(register, 'male', "Male")}
                    {createGenderRadioButton(register, 'female', "Female")}
                    {createGenderRadioButton(register, 'other', "Other")}
                </RadioGroup>
                <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>

            <div className="form_wrp">
                <div>
                    <input type="email" placeholder="Email" {...register("email")} className="form-input"/>
                    <p className="error">{errors.email?.message}</p>
                </div>
                <div>
                    <input type="text" placeholder="Contact Number" {...register("contactNumber")}
                           className="form-input"/>
                    <p className="error">{errors.contactNumber?.message}</p>
                </div>

            </div>
        </div>
    );
}