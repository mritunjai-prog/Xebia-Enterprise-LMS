import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/login.jsx?tsr-split=component
var ROLES = [
	{
		id: "student",
		title: "Student",
		path: "/student",
		desc: "Access your courses and progress"
	},
	{
		id: "trainer",
		title: "Trainer",
		path: "/trainer",
		desc: "Manage your batches and content"
	},
	{
		id: "manager",
		title: "Manager",
		path: "/manager",
		desc: "Monitor your team's learning"
	},
	{
		id: "organiser",
		title: "Organiser",
		path: "/organiser",
		desc: "Create courses and assignments"
	},
	{
		id: "admin",
		title: "Platform Admin",
		path: "/admin",
		desc: "Manage platform operations"
	}
];
function Login() {
	const navigate = useNavigate();
	const handleLogin = (path) => {
		localStorage.setItem("xebia_lms_role", path.replace("/", ""));
		navigate({ to: path });
	};
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-slate-50 flex items-center justify-center p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-2xl",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-10",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-4xl font-bold text-slate-900 mb-3",
					children: "Welcome to Xebia LMS"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-slate-500 text-lg",
					children: "Select a role to log in as for testing"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: ROLES.map((role) => /* @__PURE__ */ jsxs(Card, {
					className: "cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200",
					onClick: () => handleLogin(role.path),
					children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "pb-3",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-xl text-slate-800",
							children: role.title
						}), /* @__PURE__ */ jsx(CardDescription, { children: role.desc })]
					}), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", {
						className: "text-sm font-medium text-blue-600",
						children: [
							"Login as ",
							role.title,
							" →"
						]
					}) })]
				}, role.id))
			})]
		})
	});
}
//#endregion
export { Login as component };
