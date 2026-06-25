import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { t as Separator } from "./separator-p56coiDe.js";
import { a as enrolledCourses, s as studentProfile } from "./dummy-data-CD87CTHp.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, Building, CalendarDays, Hash, Lock, Mail, Pencil, Phone, User } from "lucide-react";
import { toast } from "sonner";
//#region src/features/student/components/profile/ProfileHeader.jsx
/**
* Profile hero card with avatar, name, role badges, and action buttons.
*/
function ProfileHeader() {
	const initials = studentProfile.name.split(" ").map((n) => n[0]).join("").toUpperCase();
	const handleEditProfile = () => {
		toast.info("Edit Profile", { description: "Profile editing will be available after backend integration." });
	};
	const handleChangePassword = () => {
		toast.info("Change Password", { description: "Password change will be available after backend integration." });
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "glass relative overflow-hidden",
		children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" }), /* @__PURE__ */ jsx(CardContent, {
			className: "relative z-10 p-6 sm:p-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row items-center sm:items-start gap-6",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex-shrink-0 h-24 w-24 rounded-full bg-primary/10 border-4 border-background shadow-lg flex items-center justify-center text-3xl font-bold text-primary",
						children: initials || /* @__PURE__ */ jsx(User, { className: "h-10 w-10" })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 text-center sm:text-left",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-2xl font-bold tracking-tight",
								children: studentProfile.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground mt-1",
								children: studentProfile.role
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-2 mt-3 justify-center sm:justify-start",
								children: [/* @__PURE__ */ jsx(Badge, {
									className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
									children: studentProfile.batch
								}), /* @__PURE__ */ jsx(Badge, {
									variant: "outline",
									className: "text-muted-foreground",
									children: studentProfile.university
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row gap-3 flex-shrink-0",
						children: [/* @__PURE__ */ jsxs(Button, {
							onClick: handleEditProfile,
							className: "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
							children: [/* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4 mr-2" }), "Edit Profile"]
						}), /* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							onClick: handleChangePassword,
							className: "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
							children: [/* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 mr-2" }), "Change Password"]
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/features/student/components/profile/ProfileDetails.jsx
var INFO_ITEMS = [
	{
		icon: Mail,
		label: "Email Address",
		getValue: () => studentProfile.email,
		color: "text-blue-500",
		bg: "bg-blue-500/10"
	},
	{
		icon: Hash,
		label: "Student ID",
		getValue: () => studentProfile.id,
		color: "text-purple-500",
		bg: "bg-purple-500/10"
	},
	{
		icon: Phone,
		label: "Phone Number",
		getValue: () => studentProfile.phone,
		color: "text-green-500",
		bg: "bg-green-500/10"
	},
	{
		icon: Building,
		label: "University / Organisation",
		getValue: () => studentProfile.university,
		color: "text-orange-500",
		bg: "bg-orange-500/10"
	},
	{
		icon: CalendarDays,
		label: "Batch",
		getValue: () => studentProfile.batch,
		color: "text-cyan-500",
		bg: "bg-cyan-500/10"
	},
	{
		icon: CalendarDays,
		label: "Enrollment Date",
		getValue: () => studentProfile.enrollmentDate,
		color: "text-pink-500",
		bg: "bg-pink-500/10"
	},
	{
		icon: BookOpen,
		label: "Enrolled Courses",
		getValue: () => `${enrolledCourses.length} Courses`,
		color: "text-primary",
		bg: "bg-primary/10"
	}
];
/**
* Personal information grid (email, ID, phone, university, etc.)
*/
function ProfileDetails() {
	return /* @__PURE__ */ jsxs(Card, {
		className: "glass",
		children: [
			/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Personal Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Your account details and enrollment information." })] }),
			/* @__PURE__ */ jsx(Separator, {}),
			/* @__PURE__ */ jsx(CardContent, {
				className: "pt-6",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
					children: INFO_ITEMS.map((item) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-muted/50",
						children: [/* @__PURE__ */ jsx("div", {
							className: `p-2.5 rounded-lg ${item.bg} ${item.color} flex-shrink-0`,
							children: /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
								children: item.label
							}), /* @__PURE__ */ jsx("p", {
								className: "font-semibold mt-0.5 truncate",
								children: item.getValue()
							})]
						})]
					}, item.label))
				})
			})
		]
	});
}
/**
* Enrolled courses summary list shown on the profile page.
*/
function EnrolledCoursesList() {
	return /* @__PURE__ */ jsxs(Card, {
		className: "glass",
		children: [
			/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Enrolled Courses" }), /* @__PURE__ */ jsx(CardDescription, { children: "Courses you are currently enrolled in." })] }),
			/* @__PURE__ */ jsx(Separator, {}),
			/* @__PURE__ */ jsx(CardContent, {
				className: "pt-6 space-y-4",
				children: enrolledCourses.map((course) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "h-12 w-12 rounded-lg overflow-hidden flex-shrink-0",
							children: /* @__PURE__ */ jsx("img", {
								src: course.image,
								alt: course.title,
								className: "h-full w-full object-cover"
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold truncate",
								children: course.title
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: [
									course.modulesCompleted,
									"/",
									course.totalModules,
									" modules · ",
									course.duration
								]
							})]
						}),
						/* @__PURE__ */ jsx(Badge, {
							className: course.progress === 100 ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-primary/10 text-primary border-primary/20",
							children: course.progress === 100 ? "Completed" : `${course.progress}%`
						})
					]
				}, course.id))
			})
		]
	});
}
//#endregion
//#region src/routes/student/profile.jsx?tsr-split=component
function ProfilePage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "My Profile"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "View and manage your personal information."
			})] }),
			/* @__PURE__ */ jsx(ProfileHeader, {}),
			/* @__PURE__ */ jsx(ProfileDetails, {}),
			/* @__PURE__ */ jsx(EnrolledCoursesList, {})
		]
	});
}
//#endregion
export { ProfilePage as component };
