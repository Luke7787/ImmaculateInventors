import React from 'react'
import styles from "./Input.module.scss"

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type: string;
    onChange: any;
    error?: string;
}

const Input = ({ label, name, type, onChange, error }: InputProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <input
                    type={type}
                    className={styles.input}
                    name={name}
                    placeholder=" "
                    onChange={onChange}
                />

                <span className={styles.label}> {label} </span>
            </div>

            {
                error &&
                <p className={styles.errorMsg}>
                    {error}
                </p>
            }
        </div>
    )
}

export default Input