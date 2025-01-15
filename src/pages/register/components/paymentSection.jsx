import React from "react";

export function PaymentSection() {
    return (<div className="form-section">
            <h3>Payment</h3>
            <div className="payment_wrp">
                <div className="payment-option">
                    <h5>Bank Transfer</h5>
                    <ul>
                        <li><strong>Bank Name:</strong> BANK OF BARODA</li>
                        <li><strong>IFSC Code:</strong> BARB0AMBARI</li>
                        <li><strong>Branch Name:</strong> AMBARI,GUWAHATI</li>
                        <li><strong>Account Type:</strong> Current A/C</li>
                        <li><strong>Account Number:</strong> 39010200000385</li>
                        <li><strong>Name:</strong> DHARMARAJ KALITA</li>
                    </ul>
                </div>
                <div className="payment-option">
                    {/*TODO: Add UPI IMAGE ID*/}
                    <h5>UPI Payment</h5>
                    <ul>
                        <li><strong>UPI ID:</strong>tuman111999-3@okaxis</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}