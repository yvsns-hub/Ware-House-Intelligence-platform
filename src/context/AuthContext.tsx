'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

export type UserRole = 'PICKER' | 'MANAGER' | 'HEAD';

export interface WarehouseFacility {
  id: string;
  name: string;
  code: string;
  region: string;
  managerName: string;
  managerEmail: string;
  managerInitials: string;
  managerPin: string;
  healthScore: number;
  activeOrders: number;
  totalStockUnits: number;
  utilization: number;
  dailyRevenue: number;
  monthlyBudget: number;
  dailyExpenses: number;
  netProfit: number;
  profitMargin: number;
}

export const warehouseFacilities: WarehouseFacility[] = [
  {
    id: 'hub-01',
    name: 'Hub Central-01 (New York)',
    code: 'NA-EAST-NY',
    region: 'Long Island City, NY',
    managerName: 'Alex Morgan',
    managerEmail: 'a.morgan@warehouseiq.internal',
    managerInitials: 'AM',
    managerPin: '4455',
    healthScore: 91,
    activeOrders: 50,
    totalStockUnits: 7322,
    utilization: 78.4,
    dailyRevenue: 52400,
    monthlyBudget: 380000,
    dailyExpenses: 34100,
    netProfit: 18300,
    profitMargin: 34.9,
  },
  {
    id: 'hub-02',
    name: 'Hub West-02 (Los Angeles)',
    code: 'NA-WEST-CA',
    region: 'Ontario, CA',
    managerName: 'Sarah Chen',
    managerEmail: 's.chen@warehouseiq.internal',
    managerInitials: 'SC',
    managerPin: '5566',
    healthScore: 94,
    activeOrders: 64,
    totalStockUnits: 9140,
    utilization: 82.1,
    dailyRevenue: 68900,
    monthlyBudget: 450000,
    dailyExpenses: 42300,
    netProfit: 26600,
    profitMargin: 38.6,
  },
  {
    id: 'hub-03',
    name: 'Hub South-03 (Dallas)',
    code: 'NA-SOUTH-TX',
    region: 'Grapevine, TX',
    managerName: 'David Rodriguez',
    managerEmail: 'd.rodriguez@warehouseiq.internal',
    managerInitials: 'DR',
    managerPin: '6677',
    healthScore: 78,
    activeOrders: 38,
    totalStockUnits: 4890,
    utilization: 88.6,
    dailyRevenue: 34100,
    monthlyBudget: 290000,
    dailyExpenses: 25600,
    netProfit: 8500,
    profitMargin: 24.9,
  },
  {
    id: 'hub-04',
    name: 'Hub Midwest-04 (Chicago)',
    code: 'NA-MID-IL',
    region: 'Elk Grove Village, IL',
    managerName: 'Emily Watson',
    managerEmail: 'e.watson@warehouseiq.internal',
    managerInitials: 'EW',
    managerPin: '7788',
    healthScore: 88,
    activeOrders: 45,
    totalStockUnits: 6200,
    utilization: 71.0,
    dailyRevenue: 46200,
    monthlyBudget: 330000,
    dailyExpenses: 30800,
    netProfit: 15400,
    profitMargin: 33.3,
  },
];

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  initials: string;
  assignedFacility: string;
  facilityId: string;
  email: string;
  pin: string;
  permissions: string[];
}

export const roleProfiles: Record<UserRole, UserProfile> = {
  PICKER: {
    id: 'usr-picker-01',
    name: 'Marcus Vance',
    role: 'PICKER',
    roleTitle: 'Order Fulfillment Picker',
    initials: 'MV',
    email: 'm.vance@warehouseiq.internal',
    pin: '1122',
    facilityId: 'hub-01',
    assignedFacility: 'Hub Central-01 (Zone A & B)',
    permissions: ['view_assigned_picks', 'scan_items', 'confirm_pick'],
  },
  MANAGER: {
    id: 'usr-mgr-01',
    name: 'Alex Morgan',
    role: 'MANAGER',
    roleTitle: 'Warehouse Hub Operations Manager',
    initials: 'AM',
    email: 'a.morgan@warehouseiq.internal',
    pin: '4455',
    facilityId: 'hub-01',
    assignedFacility: 'Hub Central-01 (New York)',
    permissions: ['manage_inventory', 'manage_orders', 'rebalance_workforce', 'decision_center'],
  },
  HEAD: {
    id: 'usr-head-01',
    name: 'Elena Rostova',
    role: 'HEAD',
    roleTitle: 'VP of Global Supply Chain & Logistics',
    initials: 'ER',
    email: 'e.rostova@warehouseiq.global',
    pin: '8899',
    facilityId: 'all',
    assignedFacility: 'All Regional Hubs (4 Facilities)',
    permissions: ['view_all_facilities', 'cross_warehouse_transfers', 'global_decisions', 'executive_audit'],
  },
};

interface AuthContextType {
  role: UserRole;
  user: UserProfile;
  activeFacility: WarehouseFacility;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: UserRole, facilityId?: string) => void;
  signInWithEmail: (email: string, pass: string, assignedRole: UserRole, facilityId?: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string, roleTitle?: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  role: 'MANAGER',
  user: roleProfiles.MANAGER,
  activeFacility: warehouseFacilities[0],
  isAuthenticated: true,
  isLoading: false,
  login: () => {},
  signInWithEmail: async () => ({}),
  signInWithGoogle: async () => ({}),
  logout: async () => {},
  updateUserProfile: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [role, setRoleState] = useState<UserRole>('MANAGER');
  const [facilityId, setFacilityId] = useState<string>('hub-01');
  const [currentUser, setCurrentUser] = useState<UserProfile>(roleProfiles.MANAGER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initial Local / Cookie State
    const savedRole = (localStorage.getItem('warehouseiq_role') as UserRole) || 'MANAGER';
    const savedFacility = localStorage.getItem('warehouseiq_facility') || 'hub-01';
    const savedAuth = localStorage.getItem('warehouseiq_auth');

    if (savedRole && roleProfiles[savedRole]) {
      setRoleState(savedRole);
      setFacilityId(savedFacility);
      setupUserProfile(savedRole, savedFacility);
    }
    if (savedAuth !== null) {
      setIsAuthenticated(savedAuth === 'true');
    }

    // 2. Firebase Auth State Listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        const name = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Google Operator';
        const initials = name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);

        setRoleState('PICKER');
        localStorage.setItem('warehouseiq_auth', 'true');
        localStorage.setItem('warehouseiq_role', 'PICKER');

        document.cookie = `warehouseiq_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        document.cookie = `warehouseiq_role=PICKER; path=/; max-age=${60 * 60 * 24 * 7}`;

        setCurrentUser({
          id: firebaseUser.uid,
          name,
          role: 'PICKER',
          roleTitle: 'Order Fulfillment Picker (Google Authenticated)',
          initials: initials || 'PK',
          email: firebaseUser.email || 'picker@warehouseiq.internal',
          pin: '1122',
          facilityId: 'hub-01',
          assignedFacility: 'Hub Central-01 (Zone A & B)',
          permissions: ['view_assigned_picks', 'scan_items', 'confirm_pick'],
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const setupUserProfile = (r: UserRole, fId: string) => {
    if (r === 'MANAGER') {
      const fac = warehouseFacilities.find((f) => f.id === fId) || warehouseFacilities[0];
      setCurrentUser({
        id: `usr-mgr-${fac.id}`,
        name: fac.managerName,
        role: 'MANAGER',
        roleTitle: `Hub Operations Manager (${fac.name})`,
        initials: fac.managerInitials,
        email: fac.managerEmail,
        pin: fac.managerPin,
        facilityId: fac.id,
        assignedFacility: fac.name,
        permissions: ['manage_inventory', 'manage_orders', 'rebalance_workforce', 'decision_center'],
      });
    } else {
      setCurrentUser(roleProfiles[r]);
    }
  };

  const login = (newRole: UserRole, selectedFacilityId: string = 'hub-01') => {
    setRoleState(newRole);
    setFacilityId(selectedFacilityId);
    setupUserProfile(newRole, selectedFacilityId);
    setIsAuthenticated(true);
    localStorage.setItem('warehouseiq_role', newRole);
    localStorage.setItem('warehouseiq_facility', selectedFacilityId);
    localStorage.setItem('warehouseiq_auth', 'true');

    document.cookie = `warehouseiq_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
    document.cookie = `warehouseiq_role=${newRole}; path=/; max-age=${60 * 60 * 24 * 7}`;
    document.cookie = `warehouseiq_facility=${selectedFacilityId}; path=/; max-age=${60 * 60 * 24 * 7}`;

    if (newRole === 'PICKER') {
      router.push('/dashboard/picker');
    } else {
      router.push('/');
    }
  };

  const signInWithEmail = async (
    email: string,
    pass: string,
    assignedRole: UserRole,
    selectedFacilityId: string = 'hub-01'
  ): Promise<{ error?: string }> => {
    setIsLoading(true);
    try {
      const fac = warehouseFacilities.find((f) => f.id === selectedFacilityId) || warehouseFacilities[0];
      const isManagerMatch = assignedRole === 'MANAGER' && (pass === fac.managerPin || pass.length >= 4);
      const isHeadMatch = assignedRole === 'HEAD' && (pass === '8899' || pass.length >= 4);
      const isPickerMatch = assignedRole === 'PICKER' && (pass === '1122' || pass.length >= 4);

      if (isManagerMatch || isHeadMatch || isPickerMatch) {
        login(assignedRole, selectedFacilityId);
        return {};
      }

      return { error: 'Invalid credentials. Please verify your email and security PIN.' };
    } catch (err: any) {
      return { error: err.message || 'Authentication failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user) {
        const name = user.displayName || user.email?.split('@')[0] || 'Google Picker';
        const initials = name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);

        setRoleState('PICKER');
        setIsAuthenticated(true);

        localStorage.setItem('warehouseiq_role', 'PICKER');
        localStorage.setItem('warehouseiq_auth', 'true');
        localStorage.setItem('warehouseiq_facility', 'hub-01');

        document.cookie = `warehouseiq_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        document.cookie = `warehouseiq_role=PICKER; path=/; max-age=${60 * 60 * 24 * 7}`;
        document.cookie = `warehouseiq_facility=hub-01; path=/; max-age=${60 * 60 * 24 * 7}`;

        setCurrentUser({
          id: user.uid,
          name,
          role: 'PICKER',
          roleTitle: 'Order Fulfillment Picker',
          initials: initials || 'PK',
          email: user.email || 'picker@warehouseiq.internal',
          pin: '1122',
          facilityId: 'hub-01',
          assignedFacility: 'Hub Central-01 (Zone A & B)',
          permissions: ['view_assigned_picks', 'scan_items', 'confirm_pick'],
        });

        router.push('/dashboard/picker');
        return {};
      }
      return { error: 'Google sign in did not return user info.' };
    } catch (err: any) {
      console.warn('Firebase Google Auth error:', err);
      // If popup blocked or cancelled, return friendly error message
      if (err.code === 'auth/popup-closed-by-user') {
        return { error: 'Google sign-in popup was closed before completing.' };
      }
      if (err.code === 'auth/unauthorized-domain') {
        return { error: 'Domain not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains.' };
      }
      return { error: err.message || 'Google sign-in failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Firebase SignOut note:', err);
    }

    setIsAuthenticated(false);
    localStorage.setItem('warehouseiq_auth', 'false');
    document.cookie = 'warehouseiq_auth=false; path=/; max-age=0';
    document.cookie = 'warehouseiq_role=; path=/; max-age=0';
    router.push('/login');
  };

  const updateUserProfile = (name: string, roleTitle?: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const updated = {
      ...currentUser,
      name,
      roleTitle: roleTitle || currentUser.roleTitle,
      initials: initials || currentUser.initials,
    };

    setCurrentUser(updated);
  };

  const activeFacility =
    warehouseFacilities.find((f) => f.id === facilityId) || warehouseFacilities[0];

  return (
    <AuthContext.Provider
      value={{
        role,
        user: currentUser,
        activeFacility,
        isAuthenticated,
        isLoading,
        login,
        signInWithEmail,
        signInWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
