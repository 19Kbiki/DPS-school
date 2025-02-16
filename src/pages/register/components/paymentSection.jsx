import React from "react";

export function PaymentSection() {
    return (<div className="form-section">
            <h3>Payment</h3>
            <div className="payment_wrp">
                <div className="payment-option">
                    <h5>Bank Transfer</h5>
                    <ul>
                        <li><strong>Bank Name:</strong> BANDHAN BANK LIMITED</li>
                        <li><strong>Branch Name:</strong> KISHANGANJ</li>
                        <li><strong>IFSC Code:</strong> BDBL0001457</li>
                        <li><strong>Account Number:</strong> 50230002883239</li>
                        <li><strong>Name:</strong> Akul Saurav</li>
                    </ul>
                </div>
                <div className="payment-option">
                    {/*TODO: Add UPI IMAGE ID*/}
                    <h5>UPI Payment</h5>
                    <ul>
                        <li><strong>UPI ID:</strong>9968336459@ibl</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}