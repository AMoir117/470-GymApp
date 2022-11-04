import React, {useState, useEffect} from "react";
import {
	ScrollView,
	Text,
	StyleSheet,
	View,
	FlatList,
	TextInput,
	Pressable,
	SafeAreaView,
	ImageBackground,
} from "react-native";
import {DataTable, Avatar, Surface} from "react-native-paper";

import SwipingRow from "../SwipingRow";
import GmailStyleSwipeableRow from "../AndroidSwipe";
import GlobalStyles from "../GlobalStyles";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	surfaceStyle: {
		height: 80,
		flex: 1,
		flexDirection: "row",
	},
	flatListContainer: {
		flex: 1,
	},
	addButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.red,
		alignSelf: "center",
	},
	addTextStyle: {
		height: 20,
		margin: 1,
		alignSelf: "center",
		color: "#ffffff",
	},
	userNameStyle: {
		height: 20,
		margin: 1,
		alignSelf: "center",
	},
	postTitleStyle: {
		height: 20,
		marginTop: 10,
		alignSelf: "center",
	},
	upVoteStyle: {
		height: 20,
		margin: 5,
		flex: 1,
		alignSelf: "center",
		textAlign: "right",
		color: "#93c47d",
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.white,
	},
});

const mySchedules = [
	{
		scheduleID: "01",
		dateCreated: "08/11/2005",
		title: "Path to Mr. Olympia",
		upVotes: 93,
	},
];

const renderSchedules = ({item}) => {
	return (
		<SwipingRow>
			<Surface style={styles.surfaceStyle} numColumns={2} elevation={1}>
				<View style={{flex: 1}}>
					<Text style={styles.postTitleStyle}>{item.title}</Text>
					<Text style={styles.postTitleStyle}>Created: {item.dateCreated}</Text>
				</View>
				<Text style={styles.upVoteStyle}>{item.upVotes}</Text>
			</Surface>
		</SwipingRow>
	);
};

const SchedulesList = () => {
	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<ImageBackground style={styles.backgroundColor}>
				<FlatList
					style={styles.flatListContainer}
					numColumns={1}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={true}
					data={mySchedules}
					renderItem={renderSchedules}
					keyExtractor={(item) => item.scheduleID}
				/>
				<Surface style={styles.addButton} elevation={1}>
					<Avatar.Image
						style={styles.avatarStyle}
						size={30}
						source={require("../../../assets/add.png")}
					/>
					<Text style={styles.addTextStyle}>Post</Text>
				</Surface>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default SchedulesList;
