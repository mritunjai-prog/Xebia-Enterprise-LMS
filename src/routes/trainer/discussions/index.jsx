import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Users, AlertCircle } from "lucide-react";
import { ModuleHeroBanner } from "@/components/module-hero-banner";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/discussions/")({
  component: DiscussionsView,
});

function DiscussionsView() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ModuleHeroBanner
        breadcrumb="Dashboard / Discussions"
        title="Course Discussions"
        subtitle="Manage forums, answer student queries, and monitor active threads."
        actions={
          <button
            onClick={() => toast.info("Opening New Thread Dialog...")}
            className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" /> Start New Thread
          </button>
        }
      />

      <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-border/40">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-muted-foreground">
          <Users className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-foreground">No active discussions</h3>
        <p className="text-muted-foreground max-w-md mt-2 text-sm leading-relaxed">
          Your batches haven't started any discussion threads yet. Create an introductory thread to get the conversation going!
        </p>
      </div>
    </div>
  );
}
