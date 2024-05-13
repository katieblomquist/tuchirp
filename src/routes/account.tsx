import React from 'react';
import '/src/index.css';  //this is the only css file that have styling on it, the app.css file doesn't have any thing

function AccountPage() {
    return (
        <div className="account-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h1>Katelyn Winner</h1>
                    <p>@princess.katelyn</p>
                    <p>katelyn.winner@gmail.com</p>
                </div>
                <button className="delete-profile">Delete Profile</button>
            </div>
        </div>
    );
}

export default AccountPage;
