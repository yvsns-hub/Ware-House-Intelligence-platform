'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Zap,
  Clock,
  Briefcase,
  TrendingUp,
  Award,
  RotateCcw,
} from 'lucide-react';
import { useEmployees, useDashboardSummary } from '@/hooks';
import { EmployeeRoleBadge, ShiftBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { TableSkeleton, CardSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedShift, setSelectedShift] = useState('all');

  const { data: dashboard } = useDashboardSummary();
  const { data: employees, isLoading } = useEmployees(
    selectedRole !== 'all' ? selectedRole : undefined,
    selectedShift !== 'all' ? selectedShift : undefined
  );

  const filteredEmployees = (employees || []).filter((emp) => {
    if (!search) return true;
    return emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase());
  });

  const morningCount = (employees || []).filter((e) => e.shift === 'Morning').length;
  const eveningCount = (employees || []).filter((e) => e.shift === 'Evening').length;
  const nightCount = (employees || []).filter((e) => e.shift === 'Night').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Workforce Operations &amp; Shift Management
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            Realtime workforce allocation, efficiency scoring, and picking throughput across shifts.
          </p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workforce"
          value={employees?.length ?? 20}
          subtitle="Active on warehouse roster"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Average Efficiency"
          value={`${dashboard?.workforce.averageEfficiency ?? 91.6}%`}
          subtitle="Cross-shift throughput rate"
          icon={Zap}
          variant="purple"
          trend={{ value: '+2.4%', isPositive: true, label: 'above baseline' }}
        />
        <StatCard
          title="Active Order Assignments"
          value={(employees || []).reduce((acc, e) => acc + e.activeOrders, 0)}
          subtitle="Orders currently in pick/pack"
          icon={Briefcase}
          variant="cyan"
        />
        <StatCard
          title="Shift Balance"
          value={`${morningCount}M / ${eveningCount}E / ${nightCount}N`}
          subtitle="Morning / Evening / Night"
          icon={Clock}
          variant="amber"
        />
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search employees by name or role..."
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="h-10 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg outline-none focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="Picker">Pickers</option>
            <option value="Packer">Packers</option>
            <option value="Supervisor">Supervisors</option>
          </select>

          {/* Shift Filter */}
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="h-10 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg outline-none focus:border-blue-500"
          >
            <option value="all">All Shifts</option>
            <option value="Morning">Morning Shift</option>
            <option value="Evening">Evening Shift</option>
            <option value="Night">Night Shift</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedRole('all');
              setSelectedShift('all');
            }}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={8} cols={5} />
        ) : filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Employee Name</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Efficiency Score</th>
                  <th className="py-3.5 px-4 text-center">Active Orders</th>
                  <th className="py-3.5 px-4">Assigned Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredEmployees.map((emp) => {
                  const isTopPerformer = emp.efficiencyScore >= 94;
                  return (
                    <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs">
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{emp.name}</span>
                              {isTopPerformer && (
                                <span title="Top Performer">
                                  <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {emp.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <EmployeeRoleBadge role={emp.role} />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-200 font-mono w-10">
                            {emp.efficiencyScore}%
                          </span>
                          <div className="w-28 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className={`h-full rounded-full ${
                                emp.efficiencyScore >= 95
                                  ? 'bg-emerald-500'
                                  : emp.efficiencyScore >= 90
                                  ? 'bg-blue-500'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${emp.efficiencyScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                            emp.activeOrders > 4
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : emp.activeOrders > 0
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {emp.activeOrders} orders
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <ShiftBadge shift={emp.shift} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No employees found"
            description="No staff members match the selected role and shift filters."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearch('');
              setSelectedRole('all');
              setSelectedShift('all');
            }}
          />
        )}
      </div>
    </div>
  );
}
