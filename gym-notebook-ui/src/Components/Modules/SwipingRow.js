import React, {Component} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";

import {RectButton, Swipeable} from "react-native-gesture-handler";

const styles = StyleSheet.create({
	leftAction: {
		width: 120,
		backgroundColor: "#497AFC",
		justifyContent: "center",
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

const SwipingRow = (props) => {
	const renderLeftActions = () => {
		return (
			<RectButton style={styles.leftAction} onPress={() => {}}>
				<Animated.Text style={[styles.actionText]}>Post Schedule</Animated.Text>
			</RectButton>
		);
	};
	const renderRightAction = (text, color) => {
		const pressHandler = () => {
			alert(text);
		};
		return (
			<Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
				<RectButton
					style={[styles.rightAction, {backgroundColor: color}]}
					onPress={pressHandler}
				>
					<Text style={styles.actionText}>{text}</Text>
				</RectButton>
			</Animated.View>
		);
	};

	const {children} = props;

	const renderRightActions = (progress) => (
		<View style={{width: 230, flexDirection: "row"}}>
			{renderRightAction("Select", "#C8C7CD", 230, progress)}
			{renderRightAction("Edit", "#ffab00", 200, progress)}
			{renderRightAction("Delete", "#dd2c00", 170, progress)}
		</View>
	);

	return (
		<Swipeable
			friction={2}
			leftThreshold={40}
			rightThreshold={40}
			renderLeftActions={renderLeftActions}
			renderRightActions={renderRightActions}
		>
			{children}
		</Swipeable>
	);
};

export default SwipingRow;
