import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'; // <-- Add this
import firebaseConfig from './firebaseConfig';
import './signup.css';

// Initialize Firebase app and get auth instance
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // <-- Add this

const ADMIN_EMAIL = "admin@gmail.com"; // Change this to your desired admin email

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
        if (!email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set admin flag if email matches
            await set(ref(db, 'users/' + user.uid), {
                email: user.email,
                isAdmin: email === ADMIN_EMAIL
            });

            console.log('User signed up with email:', email);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error(error);
            setError(error.message || 'Failed to sign up');
        } finally {
            setAuthing(false);
        }
    };

    return (
        <div className='signup-container'>
            <div className='signup-left'></div>
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
                            Sign Up
                        </button>
                    </div>

                    <div className='signup-login'>
                        <p className='signup-login-text'>Already have an account? <span className='signup-login-link' onClick={() => navigate('/login')}>Log In</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;