import React, {useState, useEffect} from "react";
import {BottomNavigation, Text} from "react-native-paper";
import Profile from "./front-page/Profile";
import MainSchedule from "./front-page/MainSchedule";
import FriendsList from "./front-page/FriendsList";
import Lobby from "./front-page/Lobby";
import SchedulesList from "./front-page/SchedulesList";

const FriendsRoute = ({navigation}) => {
	console.log("Friends clicked");
	return <FriendsList />;
};

const LobbyRoute = () => {
	console.log("Lobby clicked");
	return <Lobby />;
};

const MainRoute = () => {
	console.log("Main clicked");
	return <MainSchedule />;
};

const MyProfileRoute = () => {
	console.log("MyProfile clicked");
	return <Profile />;
};
const SchedulesRoute = () => {
	console.log("Schedules clicked");
	return <SchedulesList />;
};

const FrontPage = ({navigation}) => {
	const [index, setIndex] = useState(2);
	const [routes] = useState([
		{key: "friends", title: "Friends", focusedIcon: "heart", unfocusedIcon: "heart-outline"},
		{key: "lobby", title: "Lobby", focusedIcon: "forum", unfocusedIcon: "forum-outline"},
		{key: "main", title: "Main", focusedIcon: "star", unfocusedIcon: "star-outline"},
		{key: "myProfile", title: "Profile", focusedIcon: "face-man-profile"},
		{
			key: "schedules",
			title: "Schedules",
			focusedIcon: "notebook-edit",
			unfocusedIcon: "notebook-edit-outline",
		},
	]);

	useEffect(() => {
		navigation.setOptions({title: routes[index].title});
	}, [index, navigation]);

	const renderScene = BottomNavigation.SceneMap({
		main: MainRoute,
		friends: FriendsRoute,
		lobby: LobbyRoute,
		myProfile: MyProfileRoute,
		schedules: SchedulesRoute,
	});

	return (
		<BottomNavigation
			navigationState={{index, routes}}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
};

export default FrontPage;
