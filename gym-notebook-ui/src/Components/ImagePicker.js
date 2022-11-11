import React, {useState, useEffect} from "react";
import {Button, Image, View, StyleSheet, Pressable, Text} from "react-native";
import {Avatar} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system";
//import {getStorage, ref, uploadBytes} from "firebase/storage";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyB4zyAMCH-mZgRfZg8H2tb_YdH1ZDNUNMk",
	authDomain: "gymapp-470.firebaseapp.com",
	projectId: "gymapp-470",
	storageBucket: "gymapp-470.appspot.com",
	messagingSenderId: "1042794128025",
	appId: "1:1042794128025:web:f5a32270ecb4e00dc74e08",
	measurementId: "G-N71EJW49W4",
};

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

const ImagePick = () => {
	const [image, setImage] = useState(undefined);

	const app = initializeApp(firebaseConfig);
	const storage = getStorage(app);
	const storageRef = ref(storage, "some-child");

	useEffect(() => {});

	const pickImage = async () => {
		const pick = await ImagePicker.launchImageLibraryAsync({
			base64: true,
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (pick) {
			await FS.writeAsStringAsync(FS.documentDirectory + "profile.jpg", pick.base64, {
				encoding: FS.EncodingType.Base64,
			}).then(async () => {
				const read = await FS.readAsStringAsync(FS.documentDirectory + "profile.jpg", {
					encoding: FS.EncodingType.Base64,
				});
				if (read) {
					const getImage = await FS.getInfoAsync(FS.documentDirectory + "profile.jpg");
					if (getImage) {
						console.log("get image");
						setImage(newImage);
					}
				}
			});
		}

		// const saveToDir = await FS.downloadAsync(
		// 	"https://www.drworkout.fitness/wp-content/uploads/2021/10/Jeff-Nippard-Diet.jpg",
		// 	FS.documentDirectory + "jeff-nippard.jpg"
		// );

		// const readFromDir = await FS.readDirectoryAsync(FS.documentDirectory);
		// console.log(readFromDir);
	};

	const pickImage2 = async () => {
		const pick = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!pick.cancelled) {
			uploadImage(pick.uri);
		}
	};

	const uploadImage = async (uri) => {
		const response = await fetch(uri);
		const blob = await response.blob();

		//var ref = getStorage().ref().child("first-image");
		//return ref.put(blob);
		uploadBytes(storageRef, blob).then((snapshot) => {
			console.log("uploaded blob");
		});
	};

	return (
		<View>
			<Avatar.Image style={styles.avatarStyle} size={150} source={{uri: image}} />

			<Pressable color={"#026df7"} onPress={pickImage2}>
				<Text style={styles.textUploadImage}>Upload Image</Text>
			</Pressable>
		</View>
	);
};
export default ImagePick;
