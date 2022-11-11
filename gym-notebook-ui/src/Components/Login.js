import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../Context/AuthProvider";
import {
	SafeAreaView,
	Text,
	StyleSheet,
	View,
	FlatList,
	TextInput,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import {Divider, Snackbar} from "react-native-paper";
import axios from "axios";
import SvgImage from "./SvgImage";
import GlobalStyles from "./GlobalStyles";

import API from "../API_interface/API_interface";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
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
	const {setAuth} = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [verifyUser, setVerifyUser] = useState(false);
	const [authFailed, setAuthFailed] = useState(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {}, []);

	const handleUsernameChange = (u) => {
		setUsername(u);
	};

	const handlePasswordChange = (p) => {
		setPassword(p);
	};

	const forgetPassword = () => {
		//todo::send email to user to reset password
	};
	const login = async () => {
		//fixme::try catch for wrong inputs
		await axios
			.get(`users/username/${username}`)
			.then((response) => {
				const userInfo = response.data[0];
				if (userInfo === undefined) {
					setVisible(true);
				} else if (password === userInfo.userPassword) {
					setAuth({user: userInfo});
					setVerifyUser(true);
					setAuthFailed(false);
					navigation.navigate("Front Page");
				} else {
					setVerifyUser(false);
					setAuthFailed(true);
				}
			})
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			});
	};
	const signup = () => {
		navigation.navigate("Signup");
		//todo::send user to signup page
	};

	const onDismissSnackBar = () => {
		setVisible(false);
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<SvgImage
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			<Text style={styles.textTitle}>GYM NOTEBOOK</Text>
			<Divider
				style={{borderColor: "#ff6666", borderWidth: 3, borderRadius: 5}}
				horizontalInset="3"
			/>
			<TextInput
				style={styles.textInputStyle}
				placeholder={"Username"}
				value={username}
				onChangeText={(u) => handleUsernameChange(u)}
			/>
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
			<Snackbar
				style={styles.snackBar}
				wrapperStyle={{top: 0}}
				visible={visible}
				duration={2000}
				onDismiss={onDismissSnackBar}
			>
				Username or Password Incorrect!!
			</Snackbar>
		</SafeAreaView>
	);
};

export default Login;
