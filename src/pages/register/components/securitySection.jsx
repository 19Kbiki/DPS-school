import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons from Material-UI

export function SecuritySection({ register, errors }) {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="form-section security">
            <div className="form_wrp">
                <div>
                    <h5>Security Check</h5>
                    <p>**Type the password shared in the group chat.</p>
                </div>
                <div className="eye_hold">
                    <input
                        type={showPassword ? "text" : "password"} // Show text if password is visible
                        placeholder="Password"
                        {...register("password")}
                        className="form-input"
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="eye-icon-btn">
                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
                    </button>
                    <p className="error">{errors.password?.message}</p>
                </div>
            </div>
        </div>
    );
}
