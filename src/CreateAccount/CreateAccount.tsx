import styles from './CreateAccount.module.scss';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import axios from 'axios';

interface createAccountData {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	state: string;
	city: string;
	zipcode: string;
	username: string;
	password: string;
}

const CreateAccount = () => {
	const [data, setData] = useState<createAccountData>({
		firstName: '',
		lastName: '',
		email: '',
		country: '',
		state: '',
		city: '',
		zipcode: '',
		username: '',
		password: '',
	});
	const [confirmPassData, setConfirmPassData] = useState<string>('');
	const [confirmPassErr, setConfirmPassErr] = useState<string>('');
	const [passwordErr, setPasswordErr] = useState<string>('');
	const [emailErr, setEmailErr] = useState<string>('');
	const [userErr, setUserErr] = useState<string>('');
	const [firstErr, setFirstErr] = useState<string>('');
	const [lastErr, setLastErr] = useState<string>('');
	const [countryErr, setCountryErr] = useState<string>('');
	const [stateErr, setStateErr] = useState<string>('');
	const [cityErr, setCityErr] = useState<string>('');
	const [zipErr, setZipErr] = useState<string>('');
	const [createSubmitted, setCreateSubmitted] = useState<boolean>(false);

	const handleUpdate = (e) => {
		const { name, value } = e.target;
		if (name === 'confirmPass') {
			setConfirmPassData(value);
		} else {
			setData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleEmailBlur = () => {
		setEmailErr(validateFilled(data.email) || validateEmail(data.email));
	};
	const handlePasswordBlur = () => {
		setPasswordErr(
			validateFilled(data.password) || validatePassword(data.password)
		);
	};
	const handleConfirmPassBlur = () => {
		setConfirmPassErr(
			validateFilled(confirmPassData) ||
			validateConfirmPassword(data.password, confirmPassData)
		);
	};
	const handleUsernameBlur = async () => {
		setUserErr(
			validateFilled(data.username) ||
			(await validateUniqueUsername(data.username))
		);
	};
	const handleFirstBlur = () => {
		setFirstErr(validateFilled(data.firstName));
	};
	const handleLastBlur = () => {
		setLastErr(validateFilled(data.lastName));
	};
	const handleCountryBlur = () => {
		setCountryErr(validateFilled(data.country));
	};
	const handleStateBlur = () => {
		setStateErr(validateFilled(data.state));
	};
	const handleCityBlur = () => {
		setCityErr(validateFilled(data.city));
	};
	const handleZipBlur = () => {
		setZipErr(validateFilled(data.zipcode));
	};

	const validateEmail = (email: string) => {
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
			return 'Email address is not valid.';
		}
		return '';
	};

	const validatePassword = (pass: string) => {
		if (pass.length < 10) {
			return 'Password needs to be at least 10 characters long.';
		}
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
			return 'Password needs at least one special character.';
		}
		if (!/[A-Z]/.test(pass)) {
			return 'Password needs at least one uppercase character.';
		}
		if (!/\d/.test(pass)) {
			return 'Password needs at least one number.';
		}
		return '';
	};

	const validateUniqueUsername = async (username: string) => {
		if (!username) {
			return '';
		}
		try {
			const response = await axios.get(
				`http://localhost:8000/uniqueUser/${username}`
			);
			if (response.status === 200) {
				return '';
			}
		} catch (err) {
			if (err.response.status === 409) {
				return 'Username is already taken';
			}
			return 'Unknown Error. Please try again.';
		}

		return '';
	};
	const validateConfirmPassword = (orig: string, confirm: string) => {
		return orig === confirm ? '' : 'Passwords must match';
	};

	const validateFilled = (val: string) => {
		return val ? '' : 'Required field';
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleFirstBlur();
		handleLastBlur();
		handleEmailBlur();
		handleCountryBlur();
		handleStateBlur();
		handleCityBlur();
		handleZipBlur();
		handleUsernameBlur();
		handlePasswordBlur();
		handleConfirmPassBlur();
		setCreateSubmitted(true);
	};

	useEffect(() => {
		(async function () {
			if (
				!firstErr &&
				!lastErr &&
				!emailErr &&
				!countryErr &&
				!stateErr &&
				!cityErr &&
				!zipErr &&
				!userErr &&
				!passwordErr &&
				!confirmPassErr &&
				createSubmitted
			) {
				try {
					const response = await axios.post('http://localhost:8000/users', {
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						country: data.country,
						state: data.state,
						city: data.city,
						zipcode: data.zipcode,
						username: data.username,
						password: data.password,
					});
					console.log(response);
				} catch (err) {
					console.error('err', err);
				}
				setData({
					firstName: '',
					lastName: '',
					email: '',
					country: '',
					state: '',
					city: '',
					zipcode: '',
					username: '',
					password: '',
				});
				setConfirmPassData('');
			}
			setCreateSubmitted(false);
		})();
	}, [createSubmitted]);

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.container}>
				<div className={styles.grid}>
					<div className={styles.first}>
						<FormControl fullWidth>
							<TextField
								error={!!firstErr}
								id="firstName-input"
								helperText={firstErr ? firstErr : ''}
								label={<span style={{ color: 'white', fontSize: '23.4px', fontFamily: 'Sniglet, cursive' }}>First Name</span>}
								type="text"
								variant="filled"
								name="firstName"
								onChange={handleUpdate}
								onBlur={handleFirstBlur}
								value={data.firstName}
							/>
						</FormControl>
					</div>
					<div className={styles.last}>
						<FormControl fullWidth>
							<TextField
								error={!!lastErr}
								id="lastName-input"
								helperText={lastErr ? lastErr : ''}
								label={<span style={{ color: 'white', fontSize: '23.4px', fontFamily: 'Sniglet, cursive' }}>Last Name</span>}
								type="text"
								variant="filled"
								name="lastName"
								onBlur={handleLastBlur}
								onChange={handleUpdate}
								value={data.lastName}
							/>
						</FormControl>
					</div>
					<div className={styles.email}>
						<FormControl fullWidth>
							<TextField
								error={!!emailErr}
								id="email-input"
								helperText={emailErr ? emailErr : ''}
								label={<span style={{ color: 'white', fontSize: '23.4px', fontFamily: 'Sniglet, cursive' }}>Email Address</span>}
								type="text"
								variant="filled"
								name="email"
								onChange={handleUpdate}
								onBlur={handleEmailBlur}
								value={data.email}
							/>
						</FormControl>
					</div>
					<div className={styles.country}>
						<FormControl fullWidth>
							<Select
								value={data.country}
								onChange={handleUpdate}
								displayEmpty
								name="country"
								renderValue={
									(selected) => {
										if (!selected) {
											return <span className={styles.customRenderValue}>Country</span>;
										}
										return <span className={styles.customRenderValue}>{selected}</span>;
									}
								}
							>
								<MenuItem value="" disabled>Country</MenuItem>
								<MenuItem value="Bangladesh">Bangladesh</MenuItem>
								<MenuItem value="Brazil">Brazil</MenuItem>
								<MenuItem value="Canada">Canada</MenuItem>
								<MenuItem value="China">China</MenuItem>
								<MenuItem value="India">India</MenuItem>
								<MenuItem value="Indonesia">Indonesia</MenuItem>
								<MenuItem value="Pakistan">Pakistan</MenuItem>
								<MenuItem value="Mexico">Mexico</MenuItem>
								<MenuItem value="Nigeria">Nigeria</MenuItem>
								<MenuItem value="Russia">Russia</MenuItem>
								<MenuItem value="United States">United States</MenuItem>
							</Select>
							{countryErr && <FormHelperText>{countryErr}</FormHelperText>}
						</FormControl>
					</div>
					<div className={styles.state}>
						<TextField
							error={!!stateErr}
							id="state-input"
							helperText={stateErr ? stateErr : ''}
							label={<span style={{ color: 'white', fontSize: '23.4px', fontFamily: 'Sniglet, cursive' }}>State</span>}
							type="text"
							variant="filled"
							name="state"
							onBlur={handleStateBlur}
							onChange={handleUpdate}
							value={data.state}
						/>
					</div>
					<div className={styles.city}>
						<TextField
							error={!!cityErr}
							id="city-input"
							helperText={cityErr ? cityErr : ''}
							label={<span style={{ color: 'white', fontSize: '23.4px', fontFamily: 'Sniglet, cursive' }}>City</span>}
							type="text"
							variant="filled"
							name="city"
							onBlur={handleCityBlur}
							onChange={handleUpdate}
							value={data.city}
						/>
					</div>
					<div className={styles.zip}>
						<TextField
							error={!!zipErr}
							id="zipcode-input"
							helperText={zipErr ? zipErr : ''}
							label={<span style={{ color: 'white', fontSize: '23.4px', fontFamily: 'Sniglet, cursive' }}>Zip Code</span>}
							type="text"
							variant="filled"
							name="zipcode"
							onBlur={handleZipBlur}
							onChange={handleUpdate}
							value={data.zipcode}
						/>
					</div>
					<div className={styles.user}>
						<FormControl fullWidth>
							<TextField
								error={!!userErr}
								id="username-input"
								label={<span style={{ color: 'white', fontSize: '23.4px', fontFamily: 'Sniglet, cursive' }}>Username</span>}
								helperText={userErr ? userErr : ''}
								type="text"
								name="username"
								variant="filled"
								onBlur={handleUsernameBlur}
								onChange={handleUpdate}
								value={data.username}
							/>
						</FormControl>
					</div>
					<div className={styles.pass}>
						<FormControl fullWidth>
							<TextField
								error={!!passwordErr}
								helperText={passwordErr ? passwordErr : ''}
								id="password-input"
								variant="filled"
								label={<span style={{ color: 'white', fontSize: '25px', fontFamily: 'Sniglet, cursive' }}>Password</span>}
								type="password"
								name="password"
								onBlur={handlePasswordBlur}
								onChange={handleUpdate}
								value={data.password}
							/>
						</FormControl>
					</div>
					<div className={styles.confirmPass}>
						<FormControl fullWidth>
							<TextField
								error={!!confirmPassErr}
								variant="filled"
								helperText={confirmPassErr ? confirmPassErr : ''}
								id="confirmPassword-input"
								label={<span style={{ color: 'white', fontSize: '25px', fontFamily: 'Sniglet, cursive' }}>Confirm Password</span>}
								type="password"
								name="confirmPass"
								onChange={handleUpdate}
								onBlur={handleConfirmPassBlur}
								value={confirmPassData}
							/>
						</FormControl>
					</div>
					<button className={styles.button} type="submit">
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateAccount;
