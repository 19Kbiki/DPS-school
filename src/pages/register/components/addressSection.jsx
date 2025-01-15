import React from "react";

export function AddressSection({register, errors}) {
    return (<div className="form-section">
        <h3>Address</h3>
        <div className="form_wrp">
            <div>
                <input type="text" placeholder="City *" {...register("city")} className="form-input"/>
                <p className="error">{errors.city?.message}</p>

            </div>
            <div>
                <input type="text" placeholder="State" {...register("state")} className="form-input"/>
                <p className="error">{errors.state?.message}</p>
            </div>
            <div>
                <input type="text" placeholder="Country" {...register("country")} className="form-input"/>
                <p className="error">{errors.country?.message}</p>
            </div>
            <div>
                <input type="text" placeholder="Zip Code" {...register("zipCode")} className="form-input"/>
                <p className="error">{errors.zipCode?.message}</p>
            </div>
        </div>
    </div>);
}