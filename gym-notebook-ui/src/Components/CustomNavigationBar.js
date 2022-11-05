import {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {Appbar, Button, Divider, Menu, IconButton} from "react-native-paper";
import GlobalStyles from "./GlobalStyles";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
	appBarHeader: {
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	appBarTitle: {
		fontSize: 25,
	},
	dividerMenu: {
		borderWidth: 0.5,
	},
	menuDialog: {
		backgroundColor: "#00000000",
		borderRadius: 5,
	},
	menuItemTop: {
		color: GlobalStyles.hexColor.brown,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	menuItemBot: {
		color: GlobalStyles.hexColor.black,
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	homeButton: {
		fontSize: 30,
	},
});

const CustomNavigationBar = ({navigation, back}) => {
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	return (
		<Appbar.Header style={styles.appBarHeader} mode="center-aligned">
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				style={styles.menuDialog}
				contentStyle={styles.menuDialog}
				//statusBarHeight={0}
				anchor={
					<Appbar.Action
						icon="menu"
						color={GlobalStyles.hexColor.black}
						onPress={openMenu}
					/>
				}
			>
				<Menu.Item
					title="Profile"
					style={styles.menuItemTop}
					titleStyle={styles.menuItemTop}
					onPress={() => {
						closeMenu();
						navigation.navigate("Profile");
					}}
				/>
				<Divider style={styles.dividerMenu} />
				<Menu.Item
					title="Sign out"
					style={styles.menuItemBot}
					titleStyle={styles.menuItemBot}
					onPress={() => {
						console.log("Signed out");
						navigation.navigate("Login");
					}}
				/>
			</Menu>
			<Appbar.Content
				titleStyle={styles.appBarTitle}
				color={GlobalStyles.hexColor.black}
				title="Gym Notebook"
			/>
			<IconButton
				icon="home"
				iconColor={GlobalStyles.hexColor.black}
				labelStyle={styles.homeButton}
				compact={true}
				onPress={() => navigation.navigate("Front Page")}
			/>
		</Appbar.Header>
	);
};

export default CustomNavigationBar;
