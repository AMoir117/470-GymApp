import React, {useState} from "react";
import {StyleSheet, Platform} from "react-native";
import {Button} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
	buttonSave: {
		height: 40,
		width: 100,
		margin: 20,
		alignSelf: "center",
	},
	buttonSaveDatePicker: {
		alignSelf: "center",
		height: 50,
		width: 130,
		margin: 20,
	},
	IOSdatePickerButton: {
		width: 80,
		height: 40,
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

	if (Platform.OS === "android" || Platform.OS === "web") {
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
						display="default"
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
			//fixme::change style of datepicker on IOS
			<Button style={styles.buttonSaveDatePicker} mode="contained" buttonColor="#ff0000">
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					display="default"
					mode="date"
					onChange={onChange}
					maximumDate={new Date(Date.now())}
					minimumDate={new Date(1920, 0, 1)}
					themeVariant="dark"
					style={styles.IOSdatePickerButton}
				/>
			</Button>
		);
	}
};

export default InsertDate;
