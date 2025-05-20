import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import firebaseConfig from './firebaseConfig';
import './login.css';

// Initialize Firebase app and get auth instance
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set session in localStorage
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userUid', user.uid);

            // Check if user is admin in the database
            const userRef = ref(db, `users/${user.uid}`);
            const snapshot = await get(userRef);
            const userData = snapshot.val();

            if (userData && userData.isAdmin) {
                navigate('/admin-dashboard'); // Redirect admin to admin dashboard
            } else {
                navigate('/dashboard'); // Redirect normal users
            }
        } catch (error) {
            setError(error.message || 'Failed to sign in');
        } finally {
            setAuthing(false);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-left'></div>
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