import React, {useState, useEffect, useContext, useReducer} from "react";
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
	Alert,
	Image,
} from "react-native";
import {
	Divider,
	Appbar,
	Button,
	Avatar,
	DataTable,
	IconButton,
	Provider,
	Modal,
	Portal,
} from "react-native-paper";
import axios from "axios";
import SvgImage from "../SvgImage";
import GlobalStyles from "../GlobalStyles";
import {TouchableOpacity} from "react-native-gesture-handler";
import AuthContext from "../../Context/AuthProvider";
import WorkoutCardEditable from "../Modules/WorkoutCardEditable";
import {useIsFocused} from "@react-navigation/native";

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		backgroundColor: "#000000",
	},
	dayText: {
		fontSize: 40,
		alignSelf: "center",
		color: GlobalStyles.hexColor.brown,
	},
	scheduleNameText: {
		fontSize: 20,
		alignSelf: "center",
		fontStyle: "italic",
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
	tableHeader: {
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	tableData: {
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	gifModal: {
		width: 300,
		height: 300,
		alignSelf: "center",
	},
	buttonStyle: {
		height: 30,
		width: 70,
		margin: 2,
		marginTop: 10,
		alignSelf: "center",
		alignItems: "center",
		textAlign: "center",
		textAlignVertical: "center",
		backgroundColor: GlobalStyles.hexColor.brown,
	},
});

//fixme:: change to reflect database
const daysOfWeek = [
	{
		dayID: "1",
		dayNameShort: "Mon",
		dayNameLong: "Monday",
	},
	{
		dayID: "2",
		dayNameShort: "Tue",
		dayNameLong: "Tuesday",
	},
	{
		dayID: "3",
		dayNameShort: "Wed",
		dayNameLong: "Wednesday",
	},
	{
		dayID: "4",
		dayNameShort: "Thu",
		dayNameLong: "Thursday",
	},
	{
		dayID: "5",
		dayNameShort: "Fri",
		dayNameLong: "Friday",
	},
	{
		dayID: "6",
		dayNameShort: "Sat",
		dayNameLong: "Saturday",
	},
	{
		dayID: "7",
		dayNameShort: "Sun",
		dayNameLong: "Sunday",
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
		navigation.setOptions({
			headerLeft: () => (
				<IconButton
					icon="arrow-left"
					onPress={() => {
						//todo::make sure user is sure about going back
						Alert.alert("", "Any unsaved progress will be discarded, continue?", [
							{text: "Accept", onPress: () => navigation.goBack()},
							{
								text: "Cancel",
								onPress: () => console.log("canceled"),
								style: "cancel",
							},
						]);
					}}
					title="Back"
				/>
			),
		});
	}, [navigation]);

	useEffect(() => {
		if (!auth.user.currentWeeklyScheduleID) {
			console.log("user has not weekly schedule");
			//todo::create new weekly schedule
			return;
		}

		//Android has different formats for toLocaleDateString

		const getDailyRoutine = async () => {
			await axios
				.get(`daily-routine/get-daily-routines/${currentDay}/${weekSchedule.id}`)
				.then((routineResponse) => {
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
					<Modal
						visible={gifShow}
						onDismiss={hideModal}
						contentContainerStyle={styles.gifModal}
					>
						<Image style={{width: 300, height: 300}} source={{uri: modalUri}} />
					</Modal>
				</Portal>
			</Provider>
		);
	};

	const renderItem = ({item}) => {
		return (
			<WorkoutCardEditable forceUpdate={forceUpdate} showModal={showModal} workout={item} />
		);
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<SvgImage
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
							buttonColor={GlobalStyles.hexColor.brown}
							onPress={() => setCurrentDay(day.dayNameLong)}
							key={day.dayID}
						>
							{day.dayNameShort}
						</Button>
					);
				})}
			</View>

			<Text style={styles.dayText}>{currentDay}</Text>

			<Text style={styles.scheduleNameText}>{scheduleName}</Text>

			<FlatList
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={true}
				data={dailyWorkoutData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			{/* <TouchableOpacity>
				<Button
					mode="contained"
					style={{alignSelf: "center"}}
					onPress={() => {
						console.log("add new workout");
						navigation.navigate("SearchBar");
					}}
				>
					Add
				</Button>
			</TouchableOpacity> */}
			<TouchableOpacity
				style={styles.buttonStyle}
				onPress={() =>
					navigation.navigate("SearchBar", {weekSchedule: weekSchedule, day: currentDay})
				}
			>
				<Text style={styles.buttonText}>Add</Text>
			</TouchableOpacity>
			<ShowGif />
		</SafeAreaView>
	);
};

export default Schedules;
