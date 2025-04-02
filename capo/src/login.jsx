import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css'; // Import the CSS file

const Login = () => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        // Input validation
        if (!email || !password) {
            setError('All fields are required');
            setAuthing(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format');
            setAuthing(false);
            return;
        }

        try {
            const response = await fetch('http://localhost/walkin/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.message) {
                console.log('User signed in with email:', email);

                // Navigate based on access level
                if (data.access === 1) {
                    navigate('/dashboard'); // Navigate to user dashboard
                } else if (data.access === 2) {
                    navigate('/admin-dashboard'); // Navigate to admin dashboard
                } else {
                    setError('Invalid access level');
                }
            } else {
                setError(data.error || 'Failed to sign in');
                setAuthing(false);
            }
        } catch (error) {
            console.log(error);
            setError('Failed to connect to the server');
            setAuthing(false);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-left'>
            </div>

            <div className='login-right'>
                <div className='login-form'>
                    <div className='login-header'>
                        <h3 className='login-title'>Login</h3>
                        <p className='login-subtitle'>Welcome Back! Please enter your details.</p>
                    </div>

                    <div className='login-inputs'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='login-input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <div className='login-password-container'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='login-input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button
                                type='button'
                                className='login-show-password'
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className='login-button-container'>
                        <button
                            className='login-button'
                            onClick={signInWithEmail}
                            disabled={authing}>
                            LOGIN
                        </button>
                    </div>

                    {error && <div className='login-error'>{error}</div>}

                    <div className='login-signup'>
                        <p className='login-signup-text'>Don't have an account? <span className='login-signup-link' onClick={() => navigate('/signup')}>Sign Up</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;