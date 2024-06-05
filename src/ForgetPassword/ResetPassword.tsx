"use client"
import React, { use, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Button from './common/Button/Button.tsx'
import Input from './common/Input/Input.tsx'
import styles from './Auth.module.scss'
import { InputError, ResetPasswordProps } from '../passwordTypes'
import axios, { AxiosError } from 'axios'
import { RESET_PASSWORD_API_URL } from '../passwordConstants';
import ErrorText from './common/ErrorText/ErrorText.tsx'

const ResetPassword = ({ params }: ResetPasswordProps) => {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();

    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    })

    const [validationError, setValidationError] = useState<InputError>({})
    const [submitError, setSubmitError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (data.password.trim() === "") {
            setValidationError({ password: "Password is required" })
        }
        else if (data.confirmPassword.trim() === "") {
            setValidationError({ confirmPassword: "Confirm password is required" })
        }
        else if (data.password !== data.confirmPassword) {
            setValidationError({ confirmPassword: "Passwords don't match" })
        }
        else if (data.password.length < 6) {
            setValidationError({ password: "Password should be at least 6 characters long" })
        }
        else {
            setValidationError({ password: "" })
            setValidationError({ confirmPassword: "" })

            try {
                setLoading(true)

                const apiRes = await axios.post(RESET_PASSWORD_API_URL, {
                    password: data.password,
                    resetToken: token
                })

                console.log("api post sent");

                if (apiRes?.data.success) {
                    setSubmitError("")
                    console.log("reset success");
                    navigate("/")
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    setSubmitError(errorMsg)
                }
            }

            setLoading(false)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <Link className={styles.applogo} to={"/"} >
                Enter a New Password
            </Link>

            <form
                className={`${styles.form} ${styles.forgotPasswordForm}`}
                onSubmit={handleResetPassword}
            >
                <h2 className={styles.title}> Reset Password </h2>

                <Input
                    className={styles.input}
                    label={"New Password"}
                    name={"password"}
                    type={"password"}
                    onChange={handleInputChange}
                    error={validationError.password}
                />

                <Input
                    className={styles.input}
                    label={"Confirm Password"}
                    name={"confirmPassword"}
                    type={"password"}
                    onChange={handleInputChange}
                    error={validationError.confirmPassword}
                />

                <Button type={"submit"} loading={loading}>
                    <div className={styles.button}>Reset</div>
                </Button>

                {
                    submitError &&
                    <ErrorText text={submitError} />
                }

            </form>
        </div>
    )
}

export default ResetPassword