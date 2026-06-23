/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}
