import React, {useState, useEffect} from "react";
import {SafeAreaView, Text, StyleSheet, View, FlatList, TextInput, Pressable} from "react-native";
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
		textAlignVertical: "center",
	},
});
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {}, []);

	const login = () => {};

	const getUsername = (text) => {
		setUsername(text);
	};
	const getPassword = (text) => {
		setPassword(text);
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
				onChange={(text) => getUsername(text)}
			/>
			<TextInput
				style={styles.textInputStyle}
				placeholder={"Password"}
				value={password}
				onChange={(text) => getPassword(text)}
			/>
			<View style={styles.textForgetPassword}>
				<Pressable color={"#026df7"} onPress={login}>
					<Text style={styles.textForgetPassword}>FORGOT PASSWORD?</Text>
				</Pressable>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable style={styles.buttonStyle} onPress={login}>
					<Text style={styles.buttonText}>Login</Text>
				</Pressable>
				<Pressable style={styles.buttonStyle} onPress={login}>
					<Text style={styles.buttonText}>Signup</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Login;
