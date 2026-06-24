import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/student/feedback")({
  component: FeedbackPage,
});

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Feedback submitted successfully!", {
      description: "Thank you for sharing your thoughts.",
    });
    // Reset form would go here
    setRating(0);
    e.target.reset();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit Feedback</h1>
        <p className="text-muted-foreground mt-1">
          Help us improve by sharing your learning experience.
        </p>
      </div>

      <Card className="glass">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Course & Trainer Feedback</CardTitle>
            <CardDescription>
              All feedback is anonymous and used solely for improvement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select name="course" required>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">Advanced React & Next.js</SelectItem>
                  <SelectItem value="arch">Enterprise Architecture Patterns</SelectItem>
                  <SelectItem value="ui">UI/UX Design for Developers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainer">Trainer Name</Label>
              <Input id="trainer" name="trainer" placeholder="e.g. Sarah Drasner" required />
            </div>

            <div className="space-y-2">
              <Label>Overall Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 transition-all hover:scale-110"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 ${star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Detailed Feedback</Label>
              <Textarea
                id="feedback"
                name="feedback"
                placeholder="What did you like? What could be improved?"
                className="min-h-[150px] resize-y"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto btn-hero transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              disabled={rating === 0}
            >
              Submit Feedback
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
