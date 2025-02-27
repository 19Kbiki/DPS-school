import {Checkbox, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup} from "@mui/material";
import {createPackageRadioButton} from "./radioButtons";
import React, {useState} from "react";

export const Packages = {
    EVENT : { value: "event", label: "4000 INR Event Registration"},
    EVENT_AND_STAY_ON_TWIN_BASIS : { value: "eventAndStay", label: "2500 INR - Double occupancy"},
    EVENT_AND_STAY_ON_SINGLE_BASIS: { value: "eventAndStaySingle", label: "4500 INR - Single occupancy"}
}

export function PackageSection({register, errors, watch, setValue}) {
    const [isChecked, setIsChecked] = useState(false);
    const [totalAmount, setTotalAmount] = useState(4000);
    const handleCheckBoxChange = () => {
        if (isChecked) {
            setValue('Package', Packages.EVENT.value);
            setTotalAmount(4000);
        }
        setIsChecked(!isChecked);
    }

    const handleRadioButtionChange = () => {
        const pkg = watch('Package');
        if (pkg === Packages.EVENT_AND_STAY_ON_SINGLE_BASIS.value) {
            setTotalAmount(8500)
        } else {
            setTotalAmount(6500)
        }
    }


    return (
        <div className="form-section" style={{marginTop: '1.5rem'}}>
            <h3>Package</h3>
            <FormControl component="fieldset" error={Boolean(errors.Package)}>
                <RadioGroup row defaultValue={Packages.EVENT.value}>
                    <FormControlLabel
                        value="event"
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
                        label={Packages.EVENT.label}
                    />
                </RadioGroup>

                <FormControlLabel control={
                    <Checkbox
                        checked={isChecked}
                        onChange={handleCheckBoxChange}
                        sx={{
                            transform: "scale(0.8)",
                            color: "#E0B757", // Default color
                            "&.Mui-checked": {
                                color: "#E0B757", // Checked color
                            },
                        }}
                    />
                } label={<span style={{ fontSize: "0.8rem" }}>*Require Accommodation</span>}/>
                {isChecked && <>
                    <RadioGroup row onChange={handleRadioButtionChange}>
                        {createPackageRadioButton(register, Packages.EVENT_AND_STAY_ON_TWIN_BASIS.value, Packages.EVENT_AND_STAY_ON_TWIN_BASIS.label)}
                        {createPackageRadioButton(register, Packages.EVENT_AND_STAY_ON_SINGLE_BASIS.value, Packages.EVENT_AND_STAY_ON_SINGLE_BASIS.label)}
                    </RadioGroup>
                    <div style={{margin: '5px'}}>
                       <span style={{fontSize: '0.7rem',lineHeight:"0.2rem", color:"#C0C0C0"}}>⚠️ Note: Accommodation is subject to availability. We have 30 rooms, allocated on a first-come, first-served basis. This offer is valid until April 15, 2025.
                        </span>
                    </div>
                    <h6 style={{marginTop: '10px'}}>Total Amount: {totalAmount} INR</h6>
                    <FormHelperText>{errors.Package?.message}</FormHelperText>
                </>}
            </FormControl>
        </div>
    );
}