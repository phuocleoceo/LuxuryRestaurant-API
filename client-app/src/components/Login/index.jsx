import React from 'react';

export default function Login()
{
    return (
        <div className="login-form-container">
            <form action="">
                <h3>LOGIN FORM</h3>
                <input type="text" name="" placeholder="Enter your username..." className="box" />
                <input type="password" name="" placeholder="Enter your password..." className="box" />
                <div className="remember">
                    <input type="checkbox" name="" id="remember-me" />
                    <label>remember me</label>
                </div>
                <input type="submit" value="login now" className="btn" />
                <p>forget password? <a href="/">click here</a></p>
                <p>don't have an account? <a href="/">create one</a></p>
            </form>

        </div>
    )
}
