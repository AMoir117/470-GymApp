import React, {useState, useEffect} from "react";
import {SafeAreaView, Text, StyleSheet, View, FlatList, TextInput, Button} from "react-native";
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
		margin: 5,
		alignSelf: "center",
		borderColor: "#009688",
		backgroundColor: "#FFFFFF",
	},
	textForgetPassword: {
		fontSize: 5,
		alignSelf: "center",
	},
	buttonContainer: {
		height: 40,
		width: 130,
		borderWidth: 1,
		margin: 5,
		flexDirection: "row",
		alignContent: "center",
		alignSelf: "center",
	},
	buttonStyle: {
		height: 40,
		width: 50,
		borderWidth: 1,
		borderColor: "#FFFFFF",
		backgroundColor: "#FFFFFF",
	},
});
const Login = () => {
	useEffect(() => {}, []);

	const login = () => {};

	return (
		<SafeAreaView style={{flex: 1}}>
			<Text style={styles.textTitle}>GYM NOTEBOOK</Text>
			<TextInput style={styles.textInputStyle} value={"Username"} />
			<TextInput style={styles.textInputStyle} value={"Password"} />
			<View style={styles.textForgetPassword}>
				<Button color={"#026df7"} onPress={login} title="FORGET PASSWORD?" />
			</View>
			<View style={styles.buttonContainer}>
				<Button color={"#000000"} onPress={login} title="Login" />
				<Button color={"#000000"} onPress={login} title="Signup" />
			</View>
		</SafeAreaView>
	);
};

export default Login;
