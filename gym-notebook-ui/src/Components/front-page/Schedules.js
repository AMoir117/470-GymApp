import React, {useState, useEffect, useContext, useReducer} from "react";
import {Text, StyleSheet, View, FlatList, SafeAreaView, Image, TextInput} from "react-native";
import {Button, IconButton, Provider, Modal, Portal} from "react-native-paper";
import axios from "axios";
import SvgComponent from "../../SVG_Backgrounds/Schedule-edit-bg";
import GlobalStyles from "../GlobalStyles";
import AuthContext from "../../Context/AuthProvider";
import WorkoutCardEditable from "../Modules/WorkoutCardEditable";
import {useIsFocused} from "@react-navigation/native";

const styles = StyleSheet.create({
	dayText: {
		fontSize: 40,
		alignSelf: "center",
		color: GlobalStyles.hexColor.brown,
	},
	daysOfWeek: {
		flexDirection: "row",
	},
	dayButton: {
		flexGrow: 1,
		margin: 7,
		marginTop: 10,
	},
	gifModal: {
		width: 300,
		height: 300,
		alignSelf: "center",
	},
	scheduleTitle: {
		textAlign: "center",
		backgroundColor: GlobalStyles.hexColor.white,
		width: "auto",
		padding: 4,
		margin: 4,
		alignSelf: "center",
	},
});

const daysOfWeek = [
	{
		dayID: "0",
		dayNameShort: "Sun",
		dayNameLong: "Sunday",
		color: GlobalStyles.hexColor.green,
	},
	{
		dayID: "1",
		dayNameShort: "Mon",
		dayNameLong: "Monday",
		color: GlobalStyles.hexColor.grey,
	},
	{
		dayID: "2",
		dayNameShort: "Tue",
		dayNameLong: "Tuesday",
		color: GlobalStyles.hexColor.blue,
	},
	{
		dayID: "3",
		dayNameShort: "Wed",
		dayNameLong: "Wednesday",
		color: GlobalStyles.hexColor.red,
	},
	{
		dayID: "4",
		dayNameShort: "Thu",
		dayNameLong: "Thursday",
		color: GlobalStyles.hexColor.teal,
	},
	{
		dayID: "5",
		dayNameShort: "Fri",
		dayNameLong: "Friday",
		color: GlobalStyles.hexColor.orange,
	},
	{
		dayID: "6",
		dayNameShort: "Sat",
		dayNameLong: "Saturday",
		color: GlobalStyles.hexColor.orange,
	},
];

const Schedules = ({navigation, back, route}) => {
	const {auth, setAuth} = useContext(AuthContext);
	const {weekSchedule} = route.params;
	const [currentDay, setCurrentDay] = useState("Monday");
	const [scheduleName, setScheduleName] = useState("");
	const [dailyWorkoutData, setDailyWorkoutData] = useState([]);
	const [gifShow, setGifShow] = useState(false);
	const [modalUri, setModalUri] = useState("");
	const isFocused = useIsFocused();

	const [update, setUpdate] = useReducer((x) => x + 1, 0);
	function forceUpdate() {
		setUpdate();
		console.log("updating");
	}

	useEffect(() => {
		const day = new Date();
		setCurrentDay(daysOfWeek[day.getDay()].dayNameLong);
	}, []);

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<IconButton
					icon="arrow-left"
					onPress={() => {
						navigation.goBack();
					}}
					title="Back"
				/>
			),
			headerRight: () => (
				<IconButton
					icon="pencil-plus"
					onPress={() => {
						navigation.navigate("SearchBar", {
							weekSchedule: weekSchedule,
							day: currentDay,
						});
					}}
					title="Back"
				/>
			),
		});
	}, [navigation, currentDay]);

	useEffect(() => {
		//Android has different formats for toLocaleDateString

		const getDailyRoutine = async () => {
			await axios.get(`daily-routine/get-daily-routines/${currentDay}/${weekSchedule.id}`).then((routineResponse) => {
				setDailyWorkoutData(routineResponse.data);
			});
		};
		const getScheduleTitle = async () => {
			await axios.get(`weekly-schedule/id/${weekSchedule.id}`).then((titleResponse) => {
				setScheduleName(titleResponse.data[0].title);
			});
		};
		getScheduleTitle();
		getDailyRoutine();
	}, [currentDay, isFocused, update]);

	const showModal = (item) => {
		setGifShow(true);
		setModalUri(item.gifUrl);
	};

	const hideModal = () => setGifShow(false);

	const ShowGif = (props) => {
		return (
			<Provider>
				<Portal>
					<Modal visible={gifShow} onDismiss={hideModal} contentContainerStyle={styles.gifModal}>
						<Image style={{width: 300, height: 300}} source={{uri: modalUri}} />
					</Modal>
				</Portal>
			</Provider>
		);
	};

	const renderItem = ({item}) => {
		return <WorkoutCardEditable forceUpdate={forceUpdate} showModal={showModal} workout={item} />;
	};

	const changeTitle = async () => {
		await axios.put(`weekly-schedule/update-title/${scheduleName}/${weekSchedule.id}`);
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<SvgComponent
				style={{
					zIndex: -1,
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			<View style={styles.daysOfWeek}>
				{daysOfWeek.map((day) => {
					return (
						<Button
							style={styles.dayButton}
							compact={true}
							mode="elevated"
							textColor="#000000"
							buttonColor={day.color}
							onPress={() => setCurrentDay(day.dayNameLong)}
							key={day.dayID}
						>
							{day.dayNameShort}
						</Button>
					);
				})}
			</View>
			<Text style={styles.dayText}>{currentDay}</Text>
			<TextInput
				style={styles.scheduleTitle}
				placeholder={scheduleName}
				value={scheduleName}
				onSubmitEditing={changeTitle}
				onChangeText={setScheduleName}
			/>
			<FlatList
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={true}
				data={dailyWorkoutData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			<ShowGif />
		</SafeAreaView>
	);
};

export default Schedules;
