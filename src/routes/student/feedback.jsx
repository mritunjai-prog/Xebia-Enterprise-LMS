import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Star, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/student/feedback")({
  component: FeedbackPage,
});

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      toast.success("Feedback submitted successfully!", {
        description: "Thank you for sharing your thoughts.",
      });
      setRating(0);
      e.target.reset();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary dark:text-primary-foreground shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              Submit Feedback
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">
              Help us improve by sharing your learning experience
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl overflow-hidden shadow-sm hover:border-[#6C1D5F] dark:hover:border-[#D3CCEC] transition-all"
      >
        <div className="px-8 py-6 border-b border-border bg-muted/50">
          <h2 className="text-lg font-bold text-foreground">Course & Trainer Feedback</h2>
          <p className="text-sm text-muted-foreground mt-1">
            All feedback is anonymous and used solely for improvement.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="course" className="text-sm font-bold text-foreground">
                Select Course
              </Label>
              <select
                id="course"
                name="course"
                required
                className="w-full px-4 py-3 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-primary transition-all appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="" disabled selected>
                  Choose a course...
                </option>
                <option value="react">Advanced React & Next.js</option>
                <option value="arch">Enterprise Architecture Patterns</option>
                <option value="ui">UI/UX Design for Developers</option>
              </select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="trainer" className="text-sm font-bold text-foreground">
                Trainer Name
              </Label>
              <input
                id="trainer"
                name="trainer"
                placeholder="e.g. Sarah Drasner"
                required
                className="w-full px-4 py-3 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm font-medium text-foreground placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-bold text-foreground">Overall Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={clsx(
                      "w-10 h-10 transition-colors duration-200",
                      star <= (hoverRating || rating)
                        ? "fill-[#FF6200] text-[#FF6200] drop-shadow-sm"
                        : "text-gray-200 dark:text-[#2e2e3e] fill-gray-100 dark:fill-[#1a1a24]",
                    )}
                  />
                </motion.button>
              ))}
              <span className="ml-4 text-sm font-bold text-gray-400">
                {rating === 5
                  ? "Excellent!"
                  : rating === 4
                    ? "Very Good"
                    : rating === 3
                      ? "Average"
                      : rating === 2
                        ? "Poor"
                        : rating === 1
                          ? "Terrible"
                          : "Rate the course"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="feedback" className="text-sm font-bold text-foreground">
              Detailed Feedback
            </Label>
            <textarea
              id="feedback"
              name="feedback"
              placeholder="What did you like? What could be improved?"
              required
              className="w-full px-4 py-3 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm font-medium text-foreground placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-primary transition-all min-h-[160px] resize-y"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={rating === 0 || isSubmitting}
              className={clsx(
                "flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300",
                rating === 0
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-primary hover:bg-[#84117C] shadow-md hover:shadow-lg hover:-translate-y-0.5",
                isSubmitting && "opacity-80 pointer-events-none",
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Submitting...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
