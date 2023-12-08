import React, { useState } from "react";
import UserNavbar from "./UserNavbar";
import Footer from "../Footer";

const Details = () => {
	const [user, setUser] = useState(null);
	const getUser = async () => {
		const token = localStorage.getItem("token");
		const response = await fetch("http://localhost:8080/api/user/details", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			const res = await response.json();
			setUser(res);
		}
	};
	return (
		<div onLoad={getUser}>
			<UserNavbar />
			<div className="py-32">
				{user && (
					<div className="px-8">
						<p className="text-3xl text-gray-900 dark:text-white font-bold">
							{user.firstName} {user.lastName}
						</p>
						<div className="grid grid-cols-4 gap-1 mt-2">
							<p className="text-base text-gray-900 dark:text-white font-semibold col-span-1">
								Email:
							</p>
							<p className="text-base text-gray-900 dark:text-white col-span-3">
								{user.email}
							</p>
							<p className="text-base text-gray-900 dark:text-white font-semibold col-span-1">
								Phone Number:
							</p>
							<p className="text-base text-gray-900 dark:text-white col-span-3">
								{user.phone}
							</p>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Details;
