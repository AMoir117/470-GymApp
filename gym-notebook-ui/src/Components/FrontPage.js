import React, {useState, useEffect, createContext} from "react";
import {BottomNavigation} from "react-native-paper";
import Profile from "./front-page/Profile";
import MainSchedule from "./front-page/MainSchedule";
import FriendsList from "./front-page/FriendsList";
import Lobby from "./front-page/Lobby";
import SchedulesList from "./front-page/SchedulesList";

const FriendsRoute = () => {
	return <FriendsList />;
};

const LobbyRoute = () => {
	return <Lobby />;
};

const MainRoute = () => {
	return <MainSchedule />;
};

const SchedulesRoute = () => {
	return <SchedulesList />;
};

const FrontPage = ({navigation}) => {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{key: "main", title: "Main", focusedIcon: "star", unfocusedIcon: "star-outline"},
		{key: "friends", title: "Friends", focusedIcon: "heart", unfocusedIcon: "heart-outline"},
		{key: "lobby", title: "Lobby", focusedIcon: "forum", unfocusedIcon: "forum-outline"},
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
