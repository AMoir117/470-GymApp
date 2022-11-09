import {React, useEffect, useState, goBack} from "react";
import {AuthProvider} from "./src/Context/AuthProvider";
import App from "./App";

const Index = () => {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
};

export default Index;
