import React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/login')({
  component: Login,
});

const ROLES = [
  { id: 'student', title: 'Student', path: '/student', desc: "Access your courses and progress" },
  { id: 'trainer', title: 'Trainer', path: '/trainer', desc: "Manage your batches and content" },
  { id: 'manager', title: 'Manager', path: '/manager', desc: "Monitor your team's learning" },
  { id: 'organiser', title: 'Organiser', path: '/organiser', desc: "Create courses and assignments" },
  { id: 'admin', title: 'Platform Admin', path: '/admin', desc: "Manage platform operations" },
];

function Login() {
  const navigate = useNavigate();

  const handleLogin = (path) => {
    // In a real app, you would set an auth cookie/token here
    localStorage.setItem('xebia_lms_role', path.replace('/', ''));
    navigate({ to: path });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome to Xebia LMS</h1>
          <p className="text-slate-500 text-lg">Select a role to log in as for testing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((role) => (
            <Card 
              key={role.id} 
              className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200"
              onClick={() => handleLogin(role.path)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-slate-800">{role.title}</CardTitle>
                <CardDescription>{role.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-blue-600">Login as {role.title} &rarr;</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
