import React, { useState } from "react";
import UsersTable from "./UsersTable";
import AdminNavbar from "./AdminNavbar";
import Footer from "../Footer";
import Filter from "./Filter";

const AdminPage = () => {
	const [users, setUsers] = useState(null);
	const token = localStorage.getItem("token");
	const getUsers = async () => {
		const response = await fetch(
			"http://localhost:8080/api/admin/allUsers",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			const res = await response.json();
			setUsers(res);
		}
	};
	const getUsersByRole = async (role) => {
		const response = await fetch(
			`http://localhost:8080/api/admin/${role}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			const res = await response.json();
			setUsers(res);
		}
	};
	return (
		<div className="pt-32" onLoad={getUsers}>
			<AdminNavbar />
			<div className="px-4">
				<Filter getUsers={getUsers} getUsersByRole={getUsersByRole} />
				<UsersTable users={users} />
			</div>
			<Footer />
		</div>
	);
};

export default AdminPage;
