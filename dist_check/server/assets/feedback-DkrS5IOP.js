import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DtCIqy0P.js";
import { f as PageHeader, i as useFeedback } from "./manager-data-B87DN6xf.js";
import { t as Skeleton } from "./skeleton-BSi1XvLP.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DYANspD-.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-KUoqVIMu.js";
import { t as Progress } from "./progress-DkDHPJkx.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Minus, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
//#region src/components/manager/feedback/feedback-card.js
var sentimentConfig = {
	positive: {
		color: "bg-[#00A99D]/10 text-[#00A99D] border-[#00A99D]/20",
		label: "Positive"
	},
	neutral: {
		color: "bg-[#FF6A00]/10 text-[#FF6A00] border-[#FF6A00]/20",
		label: "Neutral"
	},
	negative: {
		color: "bg-red-50 text-red-500 border-red-200",
		label: "Negative"
	}
};
function StarRating({ rating }) {
	return jsx("div", {
		className: "flex items-center gap-0.5",
		children: Array.from({ length: 5 }).map((_, i) => jsx("span", {
			className: `text-sm ${i < rating ? "text-[#FF6A00]" : "text-gray-200"}`,
			children: "★"
		}, i))
	});
}
function FeedbackCard({ feedback, index = 0 }) {
	const sentiment = sentimentConfig[feedback.sentiment] || sentimentConfig.neutral;
	const dateStr = new Date(feedback.date).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	return jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .3,
			delay: index * .05
		},
		children: jsx(Card, {
			className: "border-0 bg-white shadow-sm transition-all duration-200 hover:shadow-md",
			children: jsx(CardContent, {
				className: "p-5",
				children: jsxs("div", {
					className: "space-y-3",
					children: [
						jsxs("div", {
							className: "flex items-start justify-between",
							children: [jsxs("div", {
								className: "flex items-center gap-3",
								children: [jsx(Avatar, {
									className: "h-10 w-10 border border-[#EDEDED]",
									children: jsx(AvatarFallback, {
										className: "bg-[#6C1D5F]/8 text-xs font-semibold text-[#6C1D5F]",
										children: feedback.studentAvatar
									})
								}), jsxs("div", { children: [jsx("p", {
									className: "text-sm font-semibold text-[#000000]",
									children: feedback.student
								}), jsx("p", {
									className: "text-xs text-[#5A5A5A]",
									children: feedback.course
								})] })]
							}), jsx(Badge, {
								variant: "outline",
								className: `text-[10px] font-medium ${sentiment.color}`,
								children: sentiment.label
							})]
						}),
						jsxs("div", {
							className: "flex items-center justify-between",
							children: [jsx(StarRating, { rating: feedback.rating }), jsx("span", {
								className: "text-xs text-[#5A5A5A]/70",
								children: dateStr
							})]
						}),
						jsx("p", {
							className: "text-sm leading-relaxed text-[#5A5A5A]",
							children: feedback.comment
						})
					]
				})
			})
		})
	});
}
//#endregion
//#region src/components/manager/feedback/feedback-panel.js
function FeedbackPanel() {
	const { data: feedbackData, isLoading } = useFeedback();
	const [courseFilter, setCourseFilter] = useState("all");
	const [ratingFilter, setRatingFilter] = useState("all");
	const courses = useMemo(() => {
		if (!feedbackData) return [];
		return [...new Set(feedbackData.map((f) => f.course))];
	}, [feedbackData]);
	const filtered = useMemo(() => {
		if (!feedbackData) return [];
		let result = feedbackData;
		if (courseFilter !== "all") result = result.filter((f) => f.course === courseFilter);
		if (ratingFilter !== "all") {
			const r = parseInt(ratingFilter);
			result = result.filter((f) => f.rating === r);
		}
		return result;
	}, [
		feedbackData,
		courseFilter,
		ratingFilter
	]);
	const stats = useMemo(() => {
		if (!feedbackData) return {
			avg: 0,
			distribution: [],
			sentiments: {}
		};
		const total = feedbackData.length;
		return {
			avg: (feedbackData.reduce((s, f) => s + f.rating, 0) / total).toFixed(1),
			distribution: [
				5,
				4,
				3,
				2,
				1
			].map((r) => ({
				rating: r,
				count: feedbackData.filter((f) => f.rating === r).length,
				percentage: Math.round(feedbackData.filter((f) => f.rating === r).length / total * 100)
			})),
			sentiments: {
				positive: feedbackData.filter((f) => f.sentiment === "positive").length,
				neutral: feedbackData.filter((f) => f.sentiment === "neutral").length,
				negative: feedbackData.filter((f) => f.sentiment === "negative").length
			},
			total
		};
	}, [feedbackData]);
	if (isLoading) return jsx("div", {
		className: "space-y-6",
		children: [jsx(Skeleton, { className: "h-48 w-full rounded-xl" }), jsx(Skeleton, { className: "h-48 w-full rounded-xl" })]
	});
	return jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .4 },
		className: "space-y-6",
		children: [
			jsx("div", {
				className: "grid grid-cols-1 gap-5 lg:grid-cols-3",
				children: [
					jsx(Card, {
						className: "border-0 bg-white shadow-sm",
						children: jsx(CardContent, {
							className: "flex flex-col items-center justify-center p-6",
							children: jsxs("div", {
								className: "text-center",
								children: [
									jsx("p", {
										className: "text-5xl font-bold text-[#6C1D5F]",
										children: stats.avg
									}),
									jsx("div", {
										className: "mt-2 flex justify-center gap-0.5",
										children: Array.from({ length: 5 }).map((_, i) => jsx("span", {
											className: `text-lg ${i < Math.round(stats.avg) ? "text-[#FF6A00]" : "text-gray-200"}`,
											children: "★"
										}, i))
									}),
									jsxs("p", {
										className: "mt-1 text-sm text-[#5A5A5A]",
										children: [
											"Based on ",
											stats.total,
											" reviews"
										]
									})
								]
							})
						})
					}),
					jsxs(Card, {
						className: "border-0 bg-white shadow-sm",
						children: [jsx(CardHeader, {
							className: "pb-2",
							children: jsx(CardTitle, {
								className: "text-sm font-semibold text-[#000000]",
								children: "Rating Distribution"
							})
						}), jsx(CardContent, { children: jsx("div", {
							className: "space-y-2.5",
							children: stats.distribution.map((d) => jsxs("div", {
								className: "flex items-center gap-3",
								children: [
									jsxs("span", {
										className: "flex w-6 items-center gap-0.5 text-sm font-medium text-[#5A5A5A]",
										children: [d.rating, jsx("span", {
											className: "text-[10px] text-[#FF6A00]",
											children: "★"
										})]
									}),
									jsx(Progress, {
										value: d.percentage,
										className: "h-2 flex-1 bg-[#EDEDED]"
									}),
									jsxs("span", {
										className: "w-8 text-right text-xs font-medium text-[#5A5A5A]",
										children: [d.count]
									})
								]
							}, d.rating))
						}) })]
					}),
					jsxs(Card, {
						className: "border-0 bg-white shadow-sm",
						children: [jsx(CardHeader, {
							className: "pb-2",
							children: jsx(CardTitle, {
								className: "text-sm font-semibold text-[#000000]",
								children: "Sentiment Analysis"
							})
						}), jsx(CardContent, { children: jsx("div", {
							className: "space-y-4",
							children: [
								{
									label: "Positive",
									value: stats.sentiments.positive,
									icon: ThumbsUp,
									color: "text-[#00A99D]",
									bg: "bg-[#00A99D]/8"
								},
								{
									label: "Neutral",
									value: stats.sentiments.neutral,
									icon: Minus,
									color: "text-[#FF6A00]",
									bg: "bg-[#FF6A00]/8"
								},
								{
									label: "Negative",
									value: stats.sentiments.negative,
									icon: ThumbsDown,
									color: "text-red-500",
									bg: "bg-red-50"
								}
							].map((s) => jsxs("div", {
								className: "flex items-center justify-between",
								children: [jsxs("div", {
									className: "flex items-center gap-3",
									children: [jsx("div", {
										className: `flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`,
										children: jsx(s.icon, { className: `h-4 w-4 ${s.color}` })
									}), jsx("span", {
										className: "text-sm font-medium text-[#5A5A5A]",
										children: s.label
									})]
								}), jsx("span", {
									className: "text-lg font-bold text-[#000000]",
									children: s.value
								})]
							}, s.label))
						}) })]
					})
				]
			}),
			jsxs("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [jsxs(Select, {
					value: courseFilter,
					onValueChange: setCourseFilter,
					children: [jsx(SelectTrigger, {
						className: "h-10 w-full border-[#EDEDED] bg-white shadow-sm sm:w-[250px]",
						children: jsx(SelectValue, { placeholder: "Filter by course" })
					}), jsxs(SelectContent, { children: [jsx(SelectItem, {
						value: "all",
						children: "All Courses"
					}), ...courses.map((c) => jsx(SelectItem, {
						value: c,
						children: c
					}, c))] })]
				}), jsxs(Select, {
					value: ratingFilter,
					onValueChange: setRatingFilter,
					children: [jsx(SelectTrigger, {
						className: "h-10 w-full border-[#EDEDED] bg-white shadow-sm sm:w-[150px]",
						children: jsx(SelectValue, { placeholder: "Rating" })
					}), jsxs(SelectContent, { children: [
						jsx(SelectItem, {
							value: "all",
							children: "All Ratings"
						}),
						jsx(SelectItem, {
							value: "5",
							children: "5 Stars"
						}),
						jsx(SelectItem, {
							value: "4",
							children: "4 Stars"
						}),
						jsx(SelectItem, {
							value: "3",
							children: "3 Stars"
						}),
						jsx(SelectItem, {
							value: "2",
							children: "2 Stars"
						}),
						jsx(SelectItem, {
							value: "1",
							children: "1 Star"
						})
					] })]
				})]
			}),
			jsx("div", {
				className: "space-y-3",
				children: filtered.length === 0 ? jsx("div", {
					className: "rounded-xl bg-white p-12 text-center shadow-sm",
					children: jsxs("div", { children: [jsx(Star, { className: "mx-auto h-12 w-12 text-[#FF6A00]/30" }), jsx("p", {
						className: "mt-3 text-sm font-medium text-[#5A5A5A]",
						children: "No feedback matches your filters"
					})] })
				}) : filtered.map((fb, index) => jsx(FeedbackCard, {
					feedback: fb,
					index
				}, fb.id))
			})
		]
	});
}
//#endregion
//#region src/routes/manager/feedback.js?tsr-split=component
function FeedbackPage() {
	return jsxs("div", {
		className: "space-y-6",
		children: [jsx(PageHeader, {
			title: "Feedback",
			description: "Student reviews, ratings, and sentiment analysis."
		}), jsx(FeedbackPanel, {})]
	});
}
//#endregion
export { FeedbackPage as component };
