import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserPage from "./components/user/UserPage";
import AdminPage from "./components/admin/AdminPage";
import AddAppointment from "./components/user/AddAppointment";
import Details from "./components/user/Details";
import AppointmentDetails from "./components/user/AppointmentDetails";
import AddAdmin from "./components/admin/AddAdmin";
import Appointments from "./components/admin/Appointments";

function App() {
	const user = localStorage.getItem("token");
	const admin = localStorage.getItem("role") === "ADMIN";
	return (
		<Routes>
			<Route path="/" exact element={<MainPage />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/signup" exact element={<Signup />} />
			{user && <Route path="/user" exact element={<UserPage />} />}
			{user && (
				<Route
					path="/user/addAppointment"
					exact
					element={<AddAppointment />}
				/>
			)}
			{user && (
				<Route
					path="/user/appointments/:id"
					element={<AppointmentDetails />}
				/>
			)}
			{user && <Route path="/user/details" exact element={<Details />} />}
			{user && admin && (
				<Route path="/admin" exact element={<AdminPage />} />
			)}
			{user && admin && (
				<Route path="/admin/addAdmin" exact element={<AddAdmin />} />
			)}
			{user && admin && (
				<Route
					path="/admin/appointments"
					exact
					element={<Appointments />}
				/>
			)}
		</Routes>
	);
}

export default App;
