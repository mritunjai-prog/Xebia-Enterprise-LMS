import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  BarChart2,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  PieChart as RePie,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AdminAssessmentService, AssessmentService } from "@/services/api";
import { MetricCard } from "@/admin/features/analytics/components/metrics/MetricCard";
import StudentReportTable from "@/components/assessment-admin/StudentReportTable";
import { clsx } from "clsx";

const COLORS = ["#6C1D5F", "#01AC9F", "#FF6200", "#84117C", "#4A1E47"];

export default function AssessmentDetailAdmin() {
  const { assessmentId } = useParams({ strict: false });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState(null);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchData();
  }, [assessmentId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reportData, allAssessments] = await Promise.all([
        AdminAssessmentService.getStudentReport(assessmentId).catch(() => null),
        AssessmentService.getAssessments().catch(() => []),
      ]);
      setReport(reportData);
      const found = (Array.isArray(allAssessments) ? allAssessments : []).find((a) => a.id === assessmentId);
      setAssessment(found || reportData?.assessment);
    } catch (err) {
      console.error("Failed to load assessment details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 h-[400px] animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6"></div>
          <div className="h-full bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-16 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="font-bold text-lg text-gray-700 dark:text-gray-300">Assessment not found</p>
          <button
            onClick={() => navigate({ to: "/admin/assessments" })}
            className="mt-4 text-sm font-bold text-[#6C1D5F] hover:underline"
          >
            Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  const summary = report?.summary || {};
  const students = report?.students || [];

  const passFailData = [
    { name: "Passed", value: summary.passed || 0 },
    { name: "Failed", value: summary.failed || 0 },
  ];

  const overviewStats = [
    { title: "Total Assigned", value: summary.totalAssigned || 0, icon: Users, color: "#6C1D5F" },
    { title: "Attempted", value: summary.attempted || 0, icon: CheckCircle, color: "#01AC9F" },
    { title: "Passed", value: summary.passed || 0, icon: Award, color: "#01AC9F" },
    { title: "Failed", value: summary.failed || 0, icon: XCircle, color: "#FF6200" },
    { title: "Avg Score", value: `${Math.round(summary.averageScore || 0)}%`, icon: TrendingUp, color: "#84117C" },
    { title: "Highest", value: `${summary.highestScore || 0}%`, icon: BarChart2, color: "#6C1D5F" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate({ to: "/admin/assessments" })}
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Assessments
      </button>

      {/* Assessment Header */}
      <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{assessment.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{assessment.topic || "No topic"}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#6C1D5F]/10 text-[#6C1D5F]">
                {(assessment.type || "mcq").toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {assessment.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                <Clock className="w-3 h-3" /> {assessment.duration}m
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#6C1D5F]/10 text-[#6C1D5F]">
                {assessment.marks} pts
              </span>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 dark:text-gray-400 space-y-1">
            {assessment.course && <p>Course: <span className="font-bold text-gray-700 dark:text-gray-300">{assessment.course}</span></p>}
            {assessment.startDate && <p>Start: {assessment.startDate} {assessment.startTime}</p>}
            {assessment.endDate && <p>End: {assessment.endDate} {assessment.endTime}</p>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm">
        <div className="flex border-b border-gray-100 dark:border-[#2e2e3e]">
          {[
            { id: "overview", label: "Overview" },
            { id: "report", label: "Student Report" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-6 py-3 text-sm font-bold transition-colors relative",
                activeTab === tab.id
                  ? "text-[#6C1D5F] dark:text-[#84117C]"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C1D5F] dark:bg-[#84117C]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {overviewStats.map((stat, idx) => (
                  <MetricCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    delay={idx * 0.05}
                  />
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pass/Fail Donut */}
                <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Pass vs Fail</h3>
                  <div className="h-[250px]">
                    {passFailData.some((d) => d.value > 0) ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <RePie>
                          <Pie
                            data={passFailData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                          >
                            <Cell fill="#01AC9F" />
                            <Cell fill="#FF6200" />
                          </Pie>
                          <Tooltip />
                          <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </RePie>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-sm text-gray-400">No data</div>
                    )}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Performance Summary</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Average Score", value: `${Math.round(summary.averageScore || 0)}%` },
                      { label: "Highest Score", value: `${summary.highestScore || 0}%` },
                      { label: "Lowest Score", value: `${summary.lowestScore || 0}%` },
                      { label: "Median Score", value: `${summary.medianScore || 0}%` },
                      { label: "Avg Time Taken", value: summary.averageTimeTaken ? `${Math.round(summary.averageTimeTaken / 60)}m` : "—" },
                      { label: "Submission Rate", value: `${Math.round(summary.submissionRate || 0)}%` },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{item.label}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "report" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <StudentReportTable students={students} assessment={assessment} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
