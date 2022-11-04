import {useState, useEffect} from "react";
import {Appbar, Menu} from "react-native-paper";
import GlobalStyles from "./GlobalStyles";

const CustomNavigationBar = ({navigation, back}) => {
	console.log(navigation);
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	return (
		<Appbar.Header>
			<Appbar.Content title="My awesome app" />

			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={
					<Appbar.Action
						icon="menu"
						color={GlobalStyles.hexColor.red}
						onPress={openMenu}
					/>
				}
			>
				<Menu.Item
					onPress={() => {
						console.log("Option 1 was pressed");
					}}
					title="Option 1"
				/>
				<Menu.Item
					onPress={() => {
						console.log("Option 2 was pressed");
					}}
					title="Option 2"
				/>
				<Menu.Item
					onPress={() => {
						console.log("Signed out");
						navigation.goBack();
					}}
					title="Sign out"
				/>
			</Menu>
		</Appbar.Header>
	);
};

export default CustomNavigationBar;
