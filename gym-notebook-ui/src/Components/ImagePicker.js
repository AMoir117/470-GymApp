import React, {useState, useEffect} from "react";
import {Button, Image, View, StyleSheet, Pressable, Text} from "react-native";
import {Avatar} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system";

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

	useEffect(() => {
		console.log("image has changed!!!!");
	}, [image]);

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
						setImage(getImage.uri);
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
