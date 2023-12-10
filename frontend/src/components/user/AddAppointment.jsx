import React, { useState } from "react";
import UserNavbar from "./UserNavbar";
import Footer from "../Footer";

const AddAppointment = () => {
	const [data, setData] = useState({ petName: "", details: "", date: "" });
	const [calendar, setCalendar] = useState("");
	const [time, setTime] = useState("");
	const [reason, setReason] = useState("Regular Check-Up");
	const [age, setAge] = useState(1);
	const [details, setDetails] = useState("");
	const [error, setError] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const newDetail = `Pet age: ${age}, Reason: ${reason}.`;
		var dateTimeString = `${calendar}T${time}`;
		const sendData = {
			...data,
			details: newDetail + details,
			date: new Date(dateTimeString),
		};
		try {
			const response = await fetch(
				"http://localhost:8080/api/user/appointments",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					body: JSON.stringify({ ...sendData }),
				}
			);
			if (response.status === 201) {
				setError(null);
				window.location = "/user";
			} else if (response.status === 409) {
				setError("Appointment can't be set on this date");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	return (
		<div className="bg-white dark:bg-gray-900">
			<UserNavbar />
			<div className="py-32 px-4 mx-auto max-w-2xl lg:py-16 mt-8">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					Add Appointment
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div className="sm:col-span-2">
							<label
								htmlFor="petName"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Pet Name
							</label>
							<input
								type="text"
								name="petName"
								id="petName"
								value={data.petName}
								onChange={handleChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Type your pet name"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="reason"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Reason
							</label>
							<select
								id="reason"
								value={reason}
								onChange={(e) => {
									e.preventDefault();
									setReason(e.target.value);
								}}
								required
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							>
								<option value="Regular Check-Up">
									Regular Check-Up
								</option>
								<option value="Vaccination">Vaccination</option>
								<option value="Dental Check-Up">
									Dental Check-Up
								</option>
								<option value="Health Concerns">
									Health Concerns
								</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="petAge"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Pet Age
							</label>
							<input
								type="number"
								name="petAge"
								id="petAge"
								value={age}
								onChange={(e) => {
									e.preventDefault();
									setAge(e.target.value);
								}}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								max={100}
								min={1}
								required
							/>
						</div>
						<div>
							<input
								type="date"
								name="date_calendar"
								id="date_calendar"
								value={calendar}
								onChange={(e) => {
									e.preventDefault();
									setCalendar(e.target.value);
								}}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Select date"
								required
							/>
						</div>
						<div>
							<input
								type="time"
								name="time"
								id="time"
								value={time}
								onChange={(e) => {
									e.preventDefault();
									setTime(e.target.value);
								}}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Select Time"
								required
							/>
						</div>
						<div className="sm:col-span-2">
							<label
								htmlFor="details"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Details (optional)
							</label>
							<textarea
								id="details"
								rows="8"
								className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={details}
								onChange={(e) => setDetails(e.target.value)}
								placeholder="Additional details to help us better understand"
							></textarea>
						</div>
					</div>
					{error && (
						<div
							className="font-semibold p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
							role="alert"
						>
							{error}
						</div>
					)}
					<button
						type="submit"
						className="w-full mt-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						Add Appointment
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default AddAppointment;
