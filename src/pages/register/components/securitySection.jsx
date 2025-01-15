import React from "react";

export function SecuritySection({register, errors}) {
    return (<div className="form-section">
        <div className="form_wrp">
            <div>
                <h5>Security Check</h5>
                <p>Type the password shared in the group chat.</p>
            </div>
            <div>
                <input type="password" placeholder="Password" {...register("password")}
                       className="form-input"/>
                <p className="error">{errors.password?.message}</p>
            </div>
        </div>

    </div>);
}