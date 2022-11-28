import React, {useContext, useState, useEffect} from "react";
import {SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert} from "react-native";
import {Divider, Snackbar} from "react-native-paper";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";
import SvgImage from "../SVG_Backgrounds/SvgImage";
import GlobalStyles from "./GlobalStyles";
import API from "../API_interface/API_interface";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
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
		fontSize: 10,
		color: "#0073ff",
		alignSelf: "center",
	},
	buttonStyle: {
		padding: 5,
		marginTop: 10,
		alignSelf: "center",
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
const ResetPassword = ({navigation}) => {
	const {auth, setAuth} = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [visible, setVisible] = useState(false);

	const app = initializeApp(firebaseConfig);
	const firebaseAuth = getAuth(app);

	useEffect(() => {}, []);

	const handleEmailChange = (u) => {
		setEmail(u);
	};

	const forgetPassword = (email) => {
		console.log(email);
		sendPasswordResetEmail(firebaseAuth, email).then(() => {
			Alert.alert("Password email reset sent!");
			navigation.navigate("Login");
		});
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
			<Text style={styles.textTitle}>Reset Password</Text>
			<Divider style={{borderColor: "#ff6666", borderWidth: 3, borderRadius: 5}} horizontalInset="3" />
			<TextInput style={styles.textInputStyle} placeholder={"Email"} value={email} onChangeText={(u) => handleEmailChange(u)} />

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.buttonStyle} onPress={() => forgetPassword(email)}>
					<Text style={styles.buttonText}>Send Email</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ResetPassword;
