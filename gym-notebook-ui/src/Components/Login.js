import React, {useState, useEffect} from "react";
import {
	SafeAreaView,
	Text,
	StyleSheet,
	View,
	FlatList,
	TextInput,
	TouchableOpacity,
} from "react-native";
import {Divider} from "react-native-paper";
import axios from "axios";

const styles = StyleSheet.create({
	textTitle: {
		fontSize: 30,
		alignSelf: "center",
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
		borderColor: "#949494",
		backgroundColor: "#949494",
	},
	buttonText: {
		fontSize: 20,
		color: "#000000",
		textAlign: "center",
	},
});
const Login = ({navigation}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {}, []);

	const forgetPassword = () => {
		console.log("forget password clicked");
		//todo::send email to user to reset password
	};
	const login = () => {
		navigation.navigate("Front Page");
		console.log("login clicked");
		//todo::check if user input is in our database
	};
	const signup = () => {
		navigation.navigate("Signup");
		console.log("signup clicked");
		//todo::send user to signup page
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<Text style={styles.textTitle}>GYM NOTEBOOK</Text>
			<Divider
				style={{borderColor: "#ff0000", borderWidth: 3, borderRadius: 5}}
				horizontalInset="3"
			/>
			<TextInput
				style={styles.textInputStyle}
				placeholder={"Username"}
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.textInputStyle}
				secureTextEntry={true}
				placeholder={"Password"}
				value={password}
				onChangeText={setPassword}
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
		</SafeAreaView>
	);
};

export default Login;
