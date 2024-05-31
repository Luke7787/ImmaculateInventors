import React, { useCallback, useState } from 'react';
import styles from './Header.module.scss';
import { Box, Button, Modal, Slide, Backdrop, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateAccount from '../CreateAccount/CreateAccount.tsx';
import SignIn from '../SignIn/SignIn.tsx';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../hooks/useAuth.ts';

const Header = () => {
	const [signInOpen, setSignInOpen] = useState<boolean>(false);
	const [createAccountOpen, setCreateAccountOpen] = useState<boolean>(false);
	const [sideModalOpen, setSideModalOpen] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState({
		username: 'Username',
		email: '',
		phoneNumber: '',
		about: '',
	});
	const { logout, getUser, getUsername, getEmail, getCountry } = useAuth();
	const [profilePicModalOpen, setProfilePicModalOpen] =
		useState<boolean>(false);
	const [profilePic, setProfilePic] = useState<string>(
		`${process.env.PUBLIC_URL}/images/penguin.png`
	);

	const navigate = useNavigate();

	const handleOpenSideModal = () => {
		setSideModalOpen(true);
	};

	const handleCloseSideModal = () => {
		setSideModalOpen(false);
		setIsEditing(false); // Reset editing state when modal is closed
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSave = () => {
		setIsEditing(false);
		// Here you can add your logic to save the updated info, e.g., API call
	};

	const handleProfilePicClick = () => {
		setProfilePicModalOpen(true);
	};

	const handleProfilePicSelect = (pic: string) => {
		setProfilePic(pic);
		setProfilePicModalOpen(false);
	};

	return (
		<nav className={styles.header}>
			<div className={styles.headerLeft} onClick={() => navigate('/')}>
				<div style={{ cursor: 'pointer' }}>
					<h1>My Inventory</h1>
				</div>
				<img
					src={`${process.env.PUBLIC_URL}/images/newlogo.png`}
					alt="Logo"
					className={styles.logoImage}
				/>
			</div>

			<div className={styles.headerCenter}>
				<Button
					className={styles.signInButton}
					onClick={() => navigate('/about')}
				>
					ABOUT
				</Button>
				<Button
					className={styles.signInButton}
					onClick={() => navigate('/contact')}
				>
					CONTACT
				</Button>
				{getUser() ? (
					<>
						<Button
							className={styles.signInButton}
							onClick={() => navigate('/inventory')}
						>
							INVENTORY
						</Button>
					</>
				) : (
					<></>
				)}
			</div>

			<img
				src={profilePic}
				alt="Logo"
				className={styles.logoImage1}
				onClick={handleOpenSideModal}
				style={{ cursor: 'pointer' }}
			/>
			<Modal
				open={sideModalOpen}
				onClose={handleCloseSideModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Slide direction="left" in={sideModalOpen} mountOnEnter unmountOnExit>
					<Box className={styles.sideModal}>
						<CloseIcon
							onClick={handleCloseSideModal}
							className={styles.closeIcon}
						/>
						<div className={styles.sideModalContent}>
							<img
								src={profilePic}
								alt="Profile"
								className={styles.profileImage}
								onClick={handleProfilePicClick}
								style={{ cursor: 'pointer' }}
							/>

							{getUser() ? (
								<>
									{isEditing ? (
										<>
											<TextField
												name="username"
												value={userInfo.username}
												onChange={handleInputChange}
												className={styles.textField}
												label="Username"
												variant="outlined"
											/>
											<TextField
												name="email"
												value={userInfo.email}
												onChange={handleInputChange}
												className={styles.textField}
												label="Email"
												variant="outlined"
											/>
											<TextField
												name="phoneNumber"
												value={userInfo.phoneNumber}
												onChange={handleInputChange}
												className={styles.textField}
												label="Phone number"
												variant="outlined"
											/>
											<TextField
												name="about"
												value={userInfo.about}
												onChange={handleInputChange}
												className={styles.textField}
												label="About me"
												variant="outlined"
												multiline
												rows={3}
											/>
											<Button
												variant="contained"
												color="primary"
												className={styles.saveButton}
												onClick={handleSave}
											>
												Save
											</Button>
										</>
									) : (
										<>
											<h2 onClick={handleEditClick}>
												{getUsername().replace(/"/g, '')}
											</h2>
											<p onClick={handleEditClick}>
												<span className={styles.label}>Email:</span>{' '}
												{getEmail().replace(/"/g, '')}
											</p>
											<p onClick={handleEditClick}>
												<span className={styles.label}>Location:</span>{' '}
												{getCountry().replace(/"/g, '')}
											</p>
											<p onClick={handleEditClick}>
												<span className={styles.label}>About me:</span>{' '}
												{userInfo.about}
											</p>
										</>
									)}
								</>
							) : (
								<>
									<h2>Please Sign In Below</h2>
								</>
							)}
							<div className={styles.spacer}></div>
							<hr className={styles.divider} />
							<div className={styles.menuContainer}>
								{getUser() ? (
									<>
										<div className={styles.menuItem}>
											<AccountCircleIcon className={styles.menuIcon} />
											<span>Friends</span>
										</div>
										<div className={styles.menuItem}>
											<SettingsIcon className={styles.menuIcon} />
											<span>Settings</span>
										</div>
										<div
											className={styles.menuItem}
											onClick={() => {
												logout();
												navigate('/');
											}}
										>
											<ExitToAppIcon className={styles.menuIcon} />
											<span>Log Out</span>
										</div>
									</>
								) : (
									<div
										className={styles.menuItem}
										onClick={() => setSignInOpen(true)}
									>
										<LoginIcon className={styles.menuIcon} />
										<span>Sign In</span>
										<Modal
											open={signInOpen}
											onClose={() => setSignInOpen(false)}
										>
											{!createAccountOpen ? (
												<Box className={styles.signInModal}>
													<div className={styles.modalHeader}></div>
													<CloseIcon
														onClick={() => setSignInOpen(false)}
														className={styles.closeIcon}
													/>
													<SignIn setCreateAccountOpen={setCreateAccountOpen} />
												</Box>
											) : (
												<Box className={styles.createAccountModal}>
													<div className={styles.modalHeader}>
														<img
															src="/images/part1.png"
															alt="Decorative"
															className={styles.loginNewImage}
														/>
														<img
															src="/images/part2.png"
															alt="Decorative"
															className={styles.loginNewImage2}
														/>
														<h1>Create Account</h1>
													</div>
													<CloseIcon
														onClick={() => setCreateAccountOpen(false)}
														className={styles.closeIcon}
													/>
													<CreateAccount />
												</Box>
											)}
										</Modal>
									</div>
								)}
							</div>
						</div>
					</Box>
				</Slide>
			</Modal>
			<Modal
				open={profilePicModalOpen}
				onClose={() => setProfilePicModalOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Slide
					direction="up"
					in={profilePicModalOpen}
					mountOnEnter
					unmountOnExit
				>
					<Box className={styles.profilePicModal}>
						<CloseIcon
							onClick={() => setProfilePicModalOpen(false)}
							className={styles.closeIcon}
						/>
						<div className={styles.profilePicGallery}>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic1.png`}
								alt="Profile 1"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic1.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic2.png`}
								alt="Profile 2"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic2.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic3.png`}
								alt="Profile 3"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic3.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic4.png`}
								alt="Profile 4"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic4.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic5.png`}
								alt="Profile 4"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic5.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic6.png`}
								alt="Profile 4"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic6.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic7.png`}
								alt="Profile 4"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic7.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic8.png`}
								alt="Profile 4"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic8.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic9.png`}
								alt="Profile 4"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic9.png`
									)
								}
							/>
							<img
								src={`${process.env.PUBLIC_URL}/images/pic10.png`}
								alt="Profile 4"
								onClick={() =>
									handleProfilePicSelect(
										`${process.env.PUBLIC_URL}/images/pic10.png`
									)
								}
							/>
							{/* Add more images as needed */}
						</div>
					</Box>
				</Slide>
			</Modal>
		</nav>
	);
};

export default Header;
