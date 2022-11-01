import React, {useState} from "react";
import {StyleSheet, Platform} from "react-native";
import {TextInput as TextInputDoB, Button} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
	buttonSave: {
		height: 40,
		width: 100,
		marginTop: 20,
		alignSelf: "center",
	},
	IOSdatePicker: {
		alignSelf: "center",
		width: 70,
		height: 40,
		margin: 20,
		backgroundColor: "#ff0000",
	},
});

const InsertDate = (props) => {
	const {show, setShow, date, setDate} = props;

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	if (Platform.OS === "android") {
		if (show)
			return (
				<>
					<Button
						style={styles.buttonSave}
						icon="calendar-range"
						mode="contained"
						buttonColor="red"
						onPress={() => setShow(true)}
					/>
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						display="calender"
						mode="date"
						onChange={onChange}
						positiveButtonLabel="set"
						negativeButtonLabel="cancel"
						maximumDate={new Date(Date.now())}
						minimumDate={new Date(1920, 0, 1)}
						style={styles.IOSdatePicker}
					/>
				</>
			);
		else if (!show) {
			return (
				<Button
					style={styles.buttonSave}
					icon="calendar-range"
					mode="contained"
					buttonColor="red"
					onPress={() => setShow(true)}
				/>
			);
		}
	} else if (!show) {
		return (
			<DateTimePicker
				testID="dateTimePicker"
				value={date}
				display="compact"
				mode="date"
				onChange={onChange}
				maximumDate={new Date(Date.now())}
				minimumDate={new Date(1920, 0, 1)}
				textColor="white"
				themeVariant="dark"
				style={styles.IOSdatePicker}
			/>
		);
	}
};

export default InsertDate;
