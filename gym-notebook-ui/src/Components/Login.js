import React, {useContext, useState, useEffect} from "react";
import {SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity} from "react-native";
import {Divider, Snackbar} from "react-native-paper";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";
import SvgImage from "../SVG_Backgrounds/SvgImage";
import GlobalStyles from "./GlobalStyles";
import API from "../API_interface/API_interface";
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../firebaseConfig";

const styles = StyleSheet.create({
	textTitle: {
		fontSize: 30,
		alignSelf: "center",
		color: "#ffffff",
	},
	textInputStyle: {
		height: 40,
		width: 250,
		borderWidth: 1,
		paddingLeft: 10,
		marginTop: 30,
		alignSelf: "center",
		borderColor: "#000000",
		backgroundColor: "#FFFFFF",
	},
	textForgetPassword: {
		margin: 5,
		fontSize: 10,
		color: "#0073ff",
		alignSelf: "center",
	},
	buttonContainer: {
		height: 30,
		width: 130,
		flexDirection: "row",
		alignSelf: "center",
	},
	buttonStyle: {
		height: 30,
		width: 70,
		margin: 2,
		marginTop: 10,
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	buttonText: {
		fontSize: 20,
		color: "#000000",
		textAlign: "center",
	},
	snackBar: {
		backgroundColor: GlobalStyles.hexColor.red,
	},
});
const Login = ({navigation}) => {
	const {auth, setAuth} = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [visible, setVisible] = useState(false);
	const [verifyUser, setVerifyUser] = useState(false);
	const [authFailed, setAuthFailed] = useState(false);

	const app = initializeApp(firebaseConfig);
	const firebaseAuth = getAuth();

	useEffect(() => {
		if (!verifyUser || email.length === 0) return;

		const api = new API();
		async function getUserInfo() {
			api.getUserInfo(username).then((userInfo) => {
				if (userInfo.status === "OK") {
					setAuth(userInfo);
					setVerifyUser(false);
					navigation.navigate("Front Page");
				}
				setVisible(true);
				setVerifyUser(false);
				setAuthFailed(true);
			});
		}
		getUserInfo();
	}, [verifyUser, setAuth]);

	const handleUsernameChange = (u) => {
		setEmail(u);
	};

	const handlePasswordChange = (p) => {
		setPassword(p);
	};

	const forgetPassword = () => {
		navigation.navigate("Reset Password");
	};
	const login = async () => {
		signInWithEmailAndPassword(firebaseAuth, email, password)
			.then(async (userCredential) => {
				console.log(`Signed in`);

				await axios
					.get(`users/uid/${userCredential.user.uid}`)
					.then((response) => {
						const userInfo = response.data[0];
						if (userInfo === undefined) {
							setVisible(true);
						} else if (password === userInfo.userPassword) {
							setAuth({user: userInfo});
							navigation.navigate("Front Page");
						}
					})
					.catch(function (error) {
						if (error.response) {
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);
						}
					});
				navigation.navigate("Front Page");
			})
			.catch((error) => {
				console.log(error);
				setVisible(true);
			});
	};
	const signup = () => {
		navigation.navigate("Signup");
	};

	const onDismissSnackBar = () => {
		setVisible(false);
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<SvgImage
				style={{
					zIndex: -1,
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			<Text style={styles.textTitle}>GYM NOTEBOOK</Text>
			<Divider style={{borderColor: "#ff6666", borderWidth: 3, borderRadius: 5}} horizontalInset="3" />
			<TextInput style={styles.textInputStyle} placeholder={"email"} value={email} onChangeText={(u) => handleUsernameChange(u)} />
			<TextInput
				style={styles.textInputStyle}
				secureTextEntry={true}
				placeholder={"Password"}
				value={password}
				onChangeText={(p) => handlePasswordChange(p)}
			/>
			<View style={styles.textForgetPassword}>
				<TouchableOpacity color={"#026df7"} onPress={forgetPassword}>
					<Text style={styles.textForgetPassword}>FORGOT PASSWORD?</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.buttonStyle} onPress={login}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonStyle} onPress={signup}>
					<Text style={styles.buttonText}>Signup</Text>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity
					style={{
						backgroundColor: GlobalStyles.hexColor.black,
						borderColor: GlobalStyles.hexColor.black,
						width: 50,
						height: 50,
					}}
					onPress={() => navigation.navigate("WORKING_PAGE")}
				>
					<Text style={{alignSelf: "center"}}></Text>
				</TouchableOpacity>
			</View>
			<Snackbar style={styles.snackBar} wrapperStyle={{top: 0}} visible={visible} duration={2000} onDismiss={onDismissSnackBar}>
				Username or Password Incorrect!
			</Snackbar>
		</SafeAreaView>
	);
};

export default Login;
