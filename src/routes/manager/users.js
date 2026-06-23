import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/manager/shared/page-header";
import { UserTable } from "@/components/manager/users/user-table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/manager/users")({
  head: () => ({
    meta: [
      { title: "User Management — Xebia Enterprise LMS" },
      { name: "description", content: "Manage universities, trainers, and students in the LMS." },
    ],
  }),
  component: UsersPage,
});

function UsersPage() {
  return (
    _jsxs("div", {
      className: "space-y-6",
      children: [
        _jsx(PageHeader, {
          title: "User Management",
          description: "Manage universities, trainers, and students across the platform.",
          children: _jsxs(Button, {
            className: "bg-[#FF6A00] text-white shadow-sm hover:bg-[#FF6A00]/90",
            children: [
              _jsx(UserPlus, { className: "mr-2 h-4 w-4" }),
              "Add User",
            ],
          }),
        }),

        _jsx(UserTable, {}),
      ],
    })
  );
}
