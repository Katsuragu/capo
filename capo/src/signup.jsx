import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './signup.css'; // Import the CSS file

const Signup = () => {
    const navigate = useNavigate();
    
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        // Simulate sign up with email and password
        try {
            // Replace this with your own sign-up logic
            console.log('User signed up with email:', email);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError('Failed to sign up');
            setAuthing(false);
        }
    };

    return (
        <div className='signup-container'>
            <div className='signup-left'>
            </div>

            <div className='signup-right'>
                <div className='signup-form'>
                    <div className='signup-header'>
                        <h3 className='signup-title'>Sign Up</h3>
                        <p className='signup-subtitle'>Welcome! Please enter your information below to begin.</p>
                    </div>

                    <div className='signup-inputs'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='signup-input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='signup-password-container'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='signup-input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type='button'
                                className='signup-show-password'
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className='signup-password-container'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Re-Enter Password'
                                className='signup-input'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type='button'
                                className='signup-show-password'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && <div className='signup-error'>{error}</div>}

                    <div className='signup-button-container'>
                        <button
                            onClick={signUpWithEmail}
                            disabled={authing}
                            className='signup-button'>
                            Sign Up With Email and Password
                        </button>
                        <div className='signup-login'>
                    <p className='signup-login-text'>Already have an account? <span className='signup-login-link' onClick={() => navigate('/')}>Log In</span></p>
                </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Signup;