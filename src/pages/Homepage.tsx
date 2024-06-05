import React, { useState } from 'react';
import { Typography, Button, Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import { ThemeProvider } from '@mui/material';
import theme from '../theme.tsx';
import styles from './Homepage.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import SignIn from '../SignIn/SignIn.tsx';
import CreateAccount from '../CreateAccount/CreateAccount.tsx';
import { useAuth } from '../hooks/useAuth.ts';

const Homepage = () => {
	const navigate = useNavigate();
	const { getUser } = useAuth();
	const [signInOpen, setSignInOpen] = useState<boolean>(false);
	const [createAccountOpen, setCreateAccountOpen] = useState<boolean>(false);
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<div className={styles.homepageContainer}>
				<img
					src="/images/homePage3.png"
					alt="Home Page"
					style={{ width: '100%', display: 'block', filter: 'blur(2px)' }}
				/>
				<Box className={styles.overlayTextBox}>
					<Box className={styles.decorativeRectangle}></Box>
					<Typography
						variant="h4"
						component="h2"
						style={{
							color: '#FFC700',
							fontWeight: 'bold',
							marginBottom: 'px',
							lineHeight: '1',
							marginTop: '70px',
							marginLeft: '23px',
							fontSize: '2.7rem',
						}}
						gutterBottom
					>
						Discover A New Way <br /> To Stay Organized
					</Typography>
					<Typography
						variant="subtitle1"
						gutterBottom
						style={{
							lineHeight: '1.2',
							marginBottom: '15px',
							marginLeft: '25px',
							fontSize: '1.20rem',
						}}
					>
						Optimizing Your Storage: Effortless Inventory <br /> Management
					</Typography>
					{getUser() ? (
						<Button
							variant="contained"
							style={{
								backgroundColor: '#FFC700',
								color: 'white',
								fontWeight: 'bold',
								marginLeft: '25px',
								fontSize: '1.20rem',
								padding: '15px 35px',
							}}
							onClick={() => navigate('/inventory')}
						>
							EXPLORE NOW
						</Button>
					) : (
						<Button
							variant="contained"
							style={{
								backgroundColor: '#FFC700',
								color: 'white',
								fontWeight: 'bold',
								marginLeft: '25px',
								fontSize: '1.20rem',
								padding: '15px 35px',
							}}
							onClick={() => setSignInOpen(true)}
						>
							REGISTER NOW
						</Button>
					)}

					<Modal open={signInOpen} onClose={() => setSignInOpen(false)}>
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
				</Box>
				<div className={styles.featureSection}>
					<Typography
						variant="h4"
						component="h2"
						className={styles.featuresTitle}
						style={{ fontWeight: 'bold' }}
					>
						Key Features
					</Typography>
					<div className={styles.featuresContainer}>
						{[
							{
								text: 'Easily Add Images to Your Inventory',
								img: 'addImage.png',
							},
							{
								text: 'Secure Your Data: Advanced Password Encryption',
								img: 'Lock.png',
							},
							{
								text: 'Real-Time Inventory Updates: Instant Notifications',
								img: 'bell.png',
							},
						].map((feature, index) => (
							<div key={index} className={styles.featureBox}>
								{index === 0 && (
									<div className={styles.decorativeRectangleFeature1}></div>
								)}
								{index === 1 && (
									<div className={styles.decorativeRectangleFeature2}></div>
								)}
								{index === 2 && (
									<div className={styles.decorativeRectangleFeature3}></div>
								)}
								<div
									style={{
										paddingTop: '35px',
										display: 'flex',
										flexDirection: 'column',
										height: '90%',
										justifyContent: 'space-between',
									}}
								>
									<Typography
										variant="h6"
										align="left"
										style={{
											fontWeight: 'bold',
											fontSize: '1.38rem',
											lineHeight: 1.2,
										}}
									>
										{feature.text}
									</Typography>
									<img
										src={`/images/${feature.img}`}
										alt={feature.text}
										className={styles.featureIcon}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.tryOurProductSection}>
				<Typography
					variant="h4"
					component="h2"
					className={styles.tryOurProductTitle}
					style={{ fontWeight: 'bold', marginBottom: '15px' }}
				>
					Overview of Our Product
				</Typography>
				<iframe
					width="1300"
					height="764"
					src="https://www.loom.com/embed/75faca4e598b4a4ba7b73c5c7d6a4ff8?sid=b40c6891-de69-4285-a923-ce36ad600f2a"
					frameBorder="0"
					allowFullScreen
				/>
				{/* <div className={styles.placeholderBox}></div> */}
			</div>
		</ThemeProvider>
	);
};

export default Homepage;
