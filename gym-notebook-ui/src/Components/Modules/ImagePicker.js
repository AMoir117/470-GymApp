import React, {useState, useEffect} from "react";
import {Button, Image, View, StyleSheet, Pressable, Text} from "react-native";
import {Avatar} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../../firebaseConfig";

const styles = StyleSheet.create({
	areaView: {
		height: 1200,
	},
	textUploadImage: {
		fontSize: 15,
		color: "#0073ff",
		alignSelf: "center",
		marginBottom: 15,
	},
	avatarStyle: {
		alignSelf: "center",
		marginTop: 15,
	},
});

//COMPONENT TO TO PICK AND SHOW IMAGE FROM LIBRARY
const ImagePick = (props) => {
	const {image, setImage} = props;

	useEffect(() => {});

	//PICK IMAGE FROM IMAGE LIBRARY
	const pickImage = async () => {
		const pick = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!pick.cancelled) {
			setImage(pick.uri);
		}
	};

	return (
		<View>
			<Avatar.Image style={styles.avatarStyle} size={150} source={{uri: image}} />

			<Pressable color={"#026df7"} onPress={pickImage}>
				<Text style={styles.textUploadImage}>Upload Image</Text>
			</Pressable>
		</View>
	);
};
export default ImagePick;
