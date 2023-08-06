import { AccountCircle } from "@mui/icons-material";
import {
	Grid,
	Paper,
	Typography,
	TextField,
	InputAdornment,
	FormControlLabel,
	Checkbox,
	Button,
	Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useState, useContext, useEffect } from "react";
import { CButton } from "../common/button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";


const erroDict: { [key: string]: string } = {
	'0': '',
	'1': 'Oops! Your Email or password is not ready for the journey. 🌊 Please check and try again!',
	'2': 'Oops! Our journey encountered a hiccup. 🌊 Please check again or try later.'
}


export const FriendsModal = () => {
	const [registerOpen, setRegisterOpen] = useState(false);
	const authContext = useContext(AuthContext);
	const [autoLogin, setAutoLogin] = useState(false);
	// const [loginRequest, setLoginRequest] = useState<ILoginRequest>({
	// 	email: "",
	// 	password: "",
	// });
	const [error, setError] = useState<string>("0")
	const [loading, setLoading] = useState(false)
	const [modalView, setModalView] = useState<number>(0)


	const navigate = useNavigate();

	const [format, setformat] = useState({
		email: false,
		password: false,
	});

	const [forgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(false)

	const formValidator = () => {
		// if (
		// 	validateEmail(loginRequest.email) &&
		// 	validatePassword(loginRequest.password)
		// ) {
		// 	handleSubmit();
		// }
	};

	const validateEmail = (email: string) => {
		if (
			email === "" ||
			!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
		) {
			setformat((prevFormat) => ({
				...prevFormat,
				email: true,
			}));
			return false;
		} else {
			setformat((prevFormat) => ({
				...prevFormat,
				email: false,
			}));
			return true;
		}
	};

	const validatePassword = (password: string) => {
		if (password === "") {
			setformat((prevFormat) => ({
				...prevFormat,
				password: true,
			}));
			return false;
		} else {
			setformat((prevFormat) => ({
				...prevFormat,
				password: false,
			}));
			return true;
		}
	};

	const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		// setLoginRequest({
		// 	...loginRequest,
		// 	[event.target.name]: event.target.value,
		// });
	}
	const handleSubmit = () => {
		// setLoading(true)
		// smartApi.login(loginRequest)
		// 	.then((results) => {
		// 		console.log(results);

		// 		if (results?.valid && results?.token && results?.tokenExpirationTime) {
		// 			nagvigateToDashboard(results.token, results.tokenExpirationTime)
		// 		} else {
		// 			// ... handle the case when results?.valid is falsy ...
		// 			setError(results.errorType)
		// 			setLoading(false)
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		setError('2')
		// 		setLoading(false)
		// 	});
	};

	function setCookie(
		name: string,
		value: string | null | undefined,
		expires: string
	) {
		document.cookie = `${name}=${value}; expires=${expires}; path=/`;
	}

	const nagvigateToDashboard = (token: string, tokenExpirationTime: string) => {
		// smartApi.dashboard(token)
		// 	.then((results) => {
		// 		console.log(results);

		// 		if (results?.valid) {
		// 			const d = new Date(tokenExpirationTime);
		// 			d.setTime(d.getTime());
		// 			let expires = d.toUTCString();

		// 			setCookie("token", results.token, expires);
		// 			authContext.authenticate(true, {
		// 				first_name: results.firstname,
		// 				surname: results.surname,
		// 				user_id: results.user_id,
		// 				email: results.email,
		// 			});
		// 			localStorage.setItem("user_id", results.user_id);
		// 			localStorage.setItem("email", results.email);
		// 			localStorage.setItem("first_name", results.firstname);
		// 			localStorage.setItem("surname", results.surname);
		// 			setError('0')
		// 			setLoading(false)
		// 			navigate("/dashboard");
		// 		} else {
		// 			// ... handle the case when results?.valid is falsy ...
		// 			setError(results.errorType)
		// 			setLoading(false)
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		setError('2')
		// 		setLoading(false)
		// 	});
	}

	const handleRegisterDialogOpen = () => setRegisterOpen(!registerOpen);
	const handleForgotPasswordDialogOpen = () => setForgotPasswordOpen(!forgotPasswordOpen)

	const handleModalView = () => setModalView(modalView == 0 ? 1:0)


	return (
		<>
			<Paper
				elevation={0}
				style={{
					background: '#f7f7f7',

				}}
			>
				<Grid container style={{ padding: '20px' }}>
					<Typography variant="h5" align="center" style={{ width: '100%' }}>Friends List</Typography>
					{modalView == 0 ? 
					<Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: "10px" }}>
						<Box my={2}>
							<TextField
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								}}
								label="Email"
								placeholder="Please enter your email..."
								variant="outlined"
								color="primary"
								fullWidth
								type="email"
								name="email"
								// value={loginRequest.email}
								onChange={handleInputOnChange}
								error={format.email}
								helperText={
									format.email
										? "Your Email is off on a tropical getaway! 🏝️ Please provide a valid email address so we can catch up."
										: ""
								}
							/>
						</Box>

						<Box mt={3}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<CButton
										title="LOGIN"
										loading={loading}
										onClick={formValidator}
										style={{
											background: '#757de8', color: 'white'
										}}
									/>
								</Grid>
							</Grid>
						</Box>
					</Grid> :
						<Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: "10px" }}>
							<Grid xs={12} style={{ padding: '2px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
								<div style={{ padding: '5px', border: '2px solid #757de8', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
									<Avatar>A</Avatar>
									<span style={{ margin: '0px 10px' }}>anish@gmail.com</span>
								</div>
							</Grid>
						</Grid>
					}
					<span style={{ cursor: 'pointer' }} onClick={handleModalView}><Typography>{'Add Friends'}</Typography></span>
				</Grid>
			</Paper>
		</>
	);
};