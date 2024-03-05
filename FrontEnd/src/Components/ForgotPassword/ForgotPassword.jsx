import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import axios from '../../HTTP';
import { Context } from '../../Components/Context/Context';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: '20px',
    p: 4,
};

function ForgotPassword({ open, setOpen }) {
    const {ActivateToast} = useContext(Context);
    const [email, setEmail] = useState('');
    const [inputOTP, setInputOTP] = useState('');
    const [OTP, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verificationStep, setVerificationStep] = useState('email'); // email, otp, password

    function handleClose() {
        setOpen(false);
        resetState();
    }

    function resetState() {
        setEmail('');
        setInputOTP('');
        setOTP('');
        setNewPassword('');
        setVerificationStep('email');
    }

    async function sendOTP() {
        // Simulate sending OTP to the provided email
        let { data } = await axios.post(`sendOtp`, { email: email })
        setOTP(data)
        setVerificationStep('otp');
    }

    function verifyOTP() {
        if (OTP == inputOTP) {
            setVerificationStep('password');
        } else {
            console.log('Invalid OTP');
        }
    }

    function updatePassword() {
        axios.patch(`forgotPassword`, {
            email:email,
            password: newPassword
        })
        ActivateToast("Password updated successfully","success")
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                    {verificationStep === 'email' && (
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    )}
                    {verificationStep === 'otp' && (
                        <TextField
                            label="OTP"
                            type="number"
                            value={inputOTP}
                            onChange={({ target }) => {
                                if (target.value.length > 6) return;
                                setInputOTP(target.value);
                            }}
                        />
                    )}
                    {verificationStep === 'password' && (
                        <TextField
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                    )}
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (verificationStep === 'email') {
                                sendOTP();
                            } else if (verificationStep === 'otp') {
                                verifyOTP();
                            } else if (verificationStep === 'password') {
                                updatePassword();
                            }
                        }}
                    >
                        {verificationStep === 'email'
                            ? 'Send OTP'
                            : verificationStep === 'otp'
                                ? 'Verify OTP'
                                : 'Update Password'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ForgotPassword;
