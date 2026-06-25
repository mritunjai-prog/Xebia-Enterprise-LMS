import { t as Route } from "./_courseId-CKkaimSU.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-DYANspD-.js";
import { t as Progress } from "./progress-DkDHPJkx.js";
import { a as enrolledCourses, i as commentsData } from "./dummy-data-CD87CTHp.js";
import { t as Textarea } from "./textarea-mcJwwC_E.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, MessageSquare, PlayCircle, Send } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/student/course/$courseId.jsx?tsr-split=component
function CourseVideoPlayer() {
	const { courseId } = Route.useParams();
	const course = enrolledCourses.find((c) => c.id === courseId) || enrolledCourses[0];
	const [commentText, setCommentText] = useState("");
	const handlePostComment = (e) => {
		e.preventDefault();
		if (!commentText.trim()) return;
		toast.success("Comment posted successfully!");
		setCommentText("");
	};
	return /* @__PURE__ */ jsx("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center group shadow-elegant",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: course.image,
								alt: "Video Thumbnail",
								className: "absolute inset-0 w-full h-full object-cover opacity-60"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "z-10 h-16 w-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center transform group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ jsx(PlayCircle, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-2",
								children: /* @__PURE__ */ jsx("div", {
									className: "w-full h-1 bg-white/30 rounded-full overflow-hidden",
									children: /* @__PURE__ */ jsx("div", { className: "h-full bg-primary w-1/3" })
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: course.title
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-muted-foreground text-sm mt-1",
						children: ["Current Module: ", course.lastWatched]
					})] }),
					/* @__PURE__ */ jsxs(Card, {
						className: "glass",
						children: [/* @__PURE__ */ jsx(CardHeader, {
							className: "pb-3",
							children: /* @__PURE__ */ jsxs(CardTitle, {
								className: "text-lg flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5 text-primary" }), "Comments & Discussions"]
							})
						}), /* @__PURE__ */ jsxs(CardContent, {
							className: "space-y-6",
							children: [/* @__PURE__ */ jsxs("form", {
								onSubmit: handlePostComment,
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsxs(Avatar, {
									className: "h-10 w-10 border",
									children: [/* @__PURE__ */ jsx(AvatarImage, { src: "https://i.pravatar.cc/150?u=vinit" }), /* @__PURE__ */ jsx(AvatarFallback, { children: "VN" })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex-1 space-y-2",
									children: [/* @__PURE__ */ jsx(Textarea, {
										placeholder: "Ask a question or share your thoughts...",
										value: commentText,
										onChange: (e) => setCommentText(e.target.value),
										className: "min-h-[80px] resize-y"
									}), /* @__PURE__ */ jsx("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ jsxs(Button, {
											type: "submit",
											size: "sm",
											className: "btn-hero",
											children: [/* @__PURE__ */ jsx(Send, { className: "h-4 w-4 mr-2" }), " Post Comment"]
										})
									})]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-6 mt-6",
								children: commentsData.map((comment) => /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ jsxs(Avatar, {
											className: "h-10 w-10",
											children: [/* @__PURE__ */ jsx(AvatarImage, { src: comment.avatar }), /* @__PURE__ */ jsx(AvatarFallback, { children: comment.author.charAt(0) })]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex-1 bg-muted/40 p-4 rounded-2xl rounded-tl-none border border-border/50",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex justify-between items-start mb-1",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-semibold text-sm",
													children: comment.author
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: comment.timestamp
												})]
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-foreground/90",
												children: comment.text
											})]
										})]
									}), comment.replies?.map((reply) => /* @__PURE__ */ jsxs("div", {
										className: "flex gap-3 ml-12",
										children: [/* @__PURE__ */ jsxs(Avatar, {
											className: "h-8 w-8 border-2 border-primary/20 ring-2 ring-primary/10",
											children: [/* @__PURE__ */ jsx(AvatarImage, { src: reply.avatar }), /* @__PURE__ */ jsx(AvatarFallback, {
												className: "bg-primary/10 text-primary",
												children: "TR"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex-1 bg-primary/5 p-3 rounded-2xl rounded-tl-none border border-primary/10",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex justify-between items-start mb-1",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "font-semibold text-sm text-primary flex items-center gap-1",
													children: [
														reply.author,
														" ",
														/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3 w-3" })
													]
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: reply.timestamp
												})]
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-foreground/90",
												children: reply.text
											})]
										})]
									}, reply.id))]
								}, comment.id))
							})]
						})]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ jsxs(Card, {
					className: "glass sticky top-20",
					children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "pb-3",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-lg",
							children: "Course Progress"
						}), /* @__PURE__ */ jsx(CardDescription, { children: "Your overall progress in this course" })]
					}), /* @__PURE__ */ jsxs(CardContent, {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between text-sm mb-1.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Completed"
								}), /* @__PURE__ */ jsxs("span", {
									className: "font-medium",
									children: [course.progress, "%"]
								})]
							}), /* @__PURE__ */ jsx(Progress, {
								value: course.progress,
								className: "h-2.5"
							})] }),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-muted-foreground mt-2",
								children: [
									course.modulesCompleted,
									" out of ",
									course.totalModules,
									" modules completed."
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "pt-4 mt-4 border-t border-border/50 space-y-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-medium text-sm mb-3",
									children: "Module List"
								}), [
									1,
									2,
									3,
									4,
									5
								].map((idx) => /* @__PURE__ */ jsxs("div", {
									className: `p-3 rounded-lg border text-sm flex items-center justify-between cursor-pointer transition-colors ${idx === 3 ? "bg-primary/10 border-primary/30 text-primary font-medium" : idx < 3 ? "bg-muted/30 border-border text-muted-foreground" : "hover:bg-muted/50 border-transparent"}`,
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [idx < 3 ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsx(PlayCircle, { className: "h-4 w-4" }), /* @__PURE__ */ jsxs("span", { children: [
											"Module ",
											idx,
											": ",
											idx === 3 ? course.lastWatched : `Topic ${idx}`
										] })]
									}), idx === 3 && /* @__PURE__ */ jsx("span", {
										className: "text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full",
										children: "Playing"
									})]
								}, idx))]
							})
						]
					})]
				})
			})]
		})
	});
}
//#endregion
export { CourseVideoPlayer as component };
