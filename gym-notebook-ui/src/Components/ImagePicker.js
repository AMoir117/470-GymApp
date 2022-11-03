import React, {useState, useEffect} from "react";
import {Button, Image, View, StyleSheet, Pressable, Text} from "react-native";
import {Avatar} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const styles = StyleSheet.create({
	areaView: {
		height: 1200,
	},
	textUploadImage: {
		fontSize: 15,
		color: "#0073ff",
		alignSelf: "center",
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 15,
	},
});

const ImagePick = (props) => {
	const {image, setImage} = props;

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result.uri);

		if (!result.cancelled) {
			setImage(result.uri);
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