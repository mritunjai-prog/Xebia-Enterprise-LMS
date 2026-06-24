import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, PieChart, BarChart } from "lucide-react";
import { ModuleHeroBanner } from "@/components/module-hero-banner";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/reports/")({
  component: ReportsView,
});

function ReportsView() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ModuleHeroBanner
        breadcrumb="Dashboard / Reports"
        title="Trainer Reports & Analytics"
        subtitle="Export performance metrics, batch completion rates, and individual student analysis."
        actions={
          <button
            onClick={() => toast.success("Generating master report...")}
            className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export Master CSV
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Batch Performance", desc: "Average grades and completion rates by cohort", icon: BarChart, color: "text-blue-500" },
          { title: "Student Risk Analysis", desc: "Identify students falling behind schedule", icon: PieChart, color: "text-amber-500" },
          { title: "Assessment Breakdown", desc: "Item analysis on specific quizzes and labs", icon: FileText, color: "text-primary" }
        ].map((report, idx) => (
          <div key={idx} className="glass rounded-2xl p-6 border border-border/40 hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col items-start gap-4">
            <div className={`p-3 rounded-xl bg-card border border-border/50 ${report.color}`}>
              <report.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{report.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{report.desc}</p>
            </div>
            <button className="mt-auto w-full bg-secondary hover:bg-secondary/80 text-foreground text-sm font-bold py-2.5 rounded-xl transition-colors cursor-pointer">
              Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
