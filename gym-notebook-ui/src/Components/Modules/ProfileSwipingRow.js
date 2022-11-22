import React, {Component} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";

import {RectButton, Swipeable} from "react-native-gesture-handler";

const styles = StyleSheet.create({
	leftAction: {
		width: 120,
		backgroundColor: "#497AFC",
		justifyContent: "center",
    borderRadius: 25,
	},
	actionText: {
		color: "white",
		fontSize: 16,
		backgroundColor: "transparent",
		padding: 10,

	},
	rightAction: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},

});

const ProfileSwipingRow = (props) => {


	const {children} = props;
	const clickAddSchedule = props.clickAddSchedule;
	const data = props.data;
	const renderRightAction = () => {
		// console.log("on swipe right.");
		// console.log(children);
		return (
			// fix: onPress needs to be passed the data of the element clicked


			<RectButton style={styles.leftAction} onPress={() => clickAddSchedule(data)}>
				<Animated.Text style={[styles.actionText]}>Add Schedule</Animated.Text>
			</RectButton>
		);
	};

	return (
		<Swipeable
			friction={2}
			leftThreshold={40}
			rightThreshold={40}
			renderRightActions={renderRightAction}

		>
			{children}
		</Swipeable>
	);
};

export default ProfileSwipingRow;
