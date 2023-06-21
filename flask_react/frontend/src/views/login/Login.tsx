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
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useState } from "react";
import { Register } from "./components/Register";
import { isMobile } from "react-device-detect";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import background from "../../resources/images/login-background.jpg";
import ILoginRequest from "../../models/ILoginRequest";
import { smartApi } from "../../utils/apiCalls";

export const Login = () => {
	const [registerOpen, setRegisterOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loginRequest, setLoginRequest] = useState<ILoginRequest>({
		email: "",
		password: "",
	});

	const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) =>
		setLoginRequest({
			...loginRequest,
			[event.target.name]: event.target.value,
		});

    const handleSubmit = () =>{
			let results = smartApi.login(loginRequest,true);
			if(results.valid){
				//valid register
			}else{
				setErrorMessage("Login failed, either password or email was incorrect.")
			}
    }


	const handleRegisterDialogOpen = () => setRegisterOpen(!registerOpen);
	return (
		<>
			<Register
				open={registerOpen}
				handleRegisterDialogOpen={handleRegisterDialogOpen}
			/>
			{!isMobile && (
				<Grid item xs={0} sm={12} md={12} lg={12}>
					<svg>
						<text x="50%" y="50%" dy=".35em" text-anchor="middle">
							Smart City Explorer
						</text>
					</svg>
				</Grid>
			)}

			<Paper
				style={{
					paddingLeft: "20px",
					marginLeft: "15%",
					marginRight: "15%",
				}}
			>
				<Grid container>
					<Grid item xs={12} sm={12} md={7} lg={7} style={{ padding: "10px" }}>
						<Typography
							variant="h4"
							align="center"
							color="textSecondary"
							gutterBottom
							style={{ margin: "20px 0" }}
						>
							Welcome
						</Typography>
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
								value={loginRequest.email}
								onChange={handleInputOnChange}
							/>
						</Box>
						<Box my={2}>
							<TextField
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockOpenIcon />
										</InputAdornment>
									),
								}}
								label="Password"
								placeholder="Please enter your password..."
								variant="outlined"
								color="primary"
								fullWidth
								type="password"
								name="password"
								value={loginRequest.password}
							/>
						</Box>
						<FormControlLabel
							control={<Checkbox defaultChecked />}
							label="Remember Me?"
						/>
						<Box mt={3}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Button
										variant="contained"
										color="primary"
										fullWidth
										size="large"
										style={{ marginBottom: "15px" }}
									>
										Login
									</Button>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Button
										style={{ float: "right" }}
										onClick={handleRegisterDialogOpen}
									>
										Need an account?
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid
						item
						style={{
							backgroundImage: `URL(${background})`,
							backgroundSize: "100% 100%",
						}}
						sm={0}
						xs={0}
						md={5}
						lg={5}
					></Grid>
				</Grid>
			</Paper>
		</>
	);
};