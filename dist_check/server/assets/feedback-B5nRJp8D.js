import { t as cn } from "./utils-_lkLOWLq.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-KUoqVIMu.js";
import { t as Input } from "./input-C2txYJdq.js";
import { t as Textarea } from "./textarea-mcJwwC_E.js";
import * as React from "react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
//#region src/components/ui/label.js
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React.forwardRef(({ className, ...props }, ref) => jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/routes/student/feedback.jsx?tsr-split=component
function FeedbackPage() {
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const handleSubmit = (e) => {
		e.preventDefault();
		toast.success("Feedback submitted successfully!", { description: "Thank you for sharing your thoughts." });
		setRating(0);
		e.target.reset();
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold tracking-tight",
			children: "Submit Feedback"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Help us improve by sharing your learning experience."
		})] }), /* @__PURE__ */ jsx(Card, {
			className: "glass",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Course & Trainer Feedback" }), /* @__PURE__ */ jsx(CardDescription, { children: "All feedback is anonymous and used solely for improvement." })] }),
					/* @__PURE__ */ jsxs(CardContent, {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "course",
									children: "Select Course"
								}), /* @__PURE__ */ jsxs(Select, {
									name: "course",
									required: true,
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										id: "course",
										children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose a course" })
									}), /* @__PURE__ */ jsxs(SelectContent, { children: [
										/* @__PURE__ */ jsx(SelectItem, {
											value: "react",
											children: "Advanced React & Next.js"
										}),
										/* @__PURE__ */ jsx(SelectItem, {
											value: "arch",
											children: "Enterprise Architecture Patterns"
										}),
										/* @__PURE__ */ jsx(SelectItem, {
											value: "ui",
											children: "UI/UX Design for Developers"
										})
									] })]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "trainer",
									children: "Trainer Name"
								}), /* @__PURE__ */ jsx(Input, {
									id: "trainer",
									name: "trainer",
									placeholder: "e.g. Sarah Drasner",
									required: true
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Overall Rating" }), /* @__PURE__ */ jsx("div", {
									className: "flex gap-2",
									children: [
										1,
										2,
										3,
										4,
										5
									].map((star) => /* @__PURE__ */ jsx("button", {
										type: "button",
										className: "p-1 transition-all hover:scale-110",
										onMouseEnter: () => setHoverRating(star),
										onMouseLeave: () => setHoverRating(0),
										onClick: () => setRating(star),
										children: /* @__PURE__ */ jsx(Star, { className: `w-8 h-8 ${star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}` })
									}, star))
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "feedback",
									children: "Detailed Feedback"
								}), /* @__PURE__ */ jsx(Textarea, {
									id: "feedback",
									name: "feedback",
									placeholder: "What did you like? What could be improved?",
									className: "min-h-[150px] resize-y",
									required: true
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx(CardFooter, {
						className: "bg-muted/30 pt-6",
						children: /* @__PURE__ */ jsx(Button, {
							type: "submit",
							className: "w-full sm:w-auto btn-hero transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
							disabled: rating === 0,
							children: "Submit Feedback"
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { FeedbackPage as component };
