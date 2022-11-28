import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, FlatList, SafeAreaView, Image, Platform} from "react-native";
import {Divider, Provider, Modal, Portal, Text} from "react-native-paper";
import AuthContext from "../../Context/AuthProvider";
import SvgComponent from "../../SVG_Backgrounds/Main-bg";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import GlobalStyles from "../GlobalStyles";
import WorkoutCard from "../Modules/WorkoutCard";

const styles = StyleSheet.create({
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
	workoutCellStyles: {
		color: GlobalStyles.hexColor.brown,
	},
	gifModal: {
		width: 300,
		height: 300,
		alignSelf: "center",
	},
});

const dayAndroid = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MainSchedule = ({update}) => {
	const {auth, setAuth} = useContext(AuthContext);
	const [currentDay, setCurrentDay] = useState("Current Day");
	const [scheduleName, setScheduleName] = useState("Start Creating Your New Schedule!");
	const [gifShow, setGifShow] = useState(false);
	const [modalUri, setModalUri] = useState("");
	const [dailyWorkoutData, setDailyWorkoutData] = useState([]);
	const day = new Date();
	const navigation = useNavigation();

	useEffect(() => {
		console.log(auth.user.currentWeeklyScheduleId);

		//Android has different formats for toLocaleDateString

		const getDailyRoutine = async () => {
			if (Platform.OS === "android") {
				await axios
					.get(`daily-routine/get-daily-routines/${dayAndroid[day.getDay()]}/${auth.user.currentWeeklyScheduleId}`)
					.then((routineResponse) => {
						setDailyWorkoutData(routineResponse.data);
					});
				setCurrentDay(dayAndroid[day.getDay()]);
			} else {
				await axios
					.get(
						`daily-routine/get-daily-routines/${day.toLocaleDateString("en-us", {
							weekday: "long",
						})}/${auth.user.currentWeeklyScheduleId}`
					)
					.then((routineResponse) => {
						setDailyWorkoutData(routineResponse.data);
					});
				setCurrentDay(day.toLocaleDateString("en-us", {weekday: "long"}));
			}
		};
		const getScheduleTitle = async () => {
			await axios.get(`weekly-schedule/id/${auth.user.currentWeeklyScheduleId}`).then((titleResponse) => {
				setScheduleName(titleResponse.data[0].title);
			});
		};
		getScheduleTitle();
		getDailyRoutine();
	}, [navigation, update]);

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

	const renderItem = ({item}) => <WorkoutCard showModal={showModal} workout={item} />;

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<SvgComponent
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: -1,
				}}
			/>
			<Text style={styles.dayText}>{currentDay}</Text>
			<Text style={styles.scheduleNameText}>{scheduleName}</Text>
			<Divider
				style={{
					borderColor: GlobalStyles.hexColor.red,
					borderWidth: 1,
					borderRadius: 5,
					margin: 10,
				}}
				horizontalInset="3"
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

export default MainSchedule;
