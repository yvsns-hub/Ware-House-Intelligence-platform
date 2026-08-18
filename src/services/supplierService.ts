import { SupplierInfo } from '@/types';

export class SupplierService {
  private static instance: SupplierService;

  private suppliers: SupplierInfo[] = [
    {
      id: 'sup-001',
      name: 'Apex Global Electronics',
      code: 'APEX-ELEC',
      category: 'Electronics',
      reliabilityScore: 94.8,
      qualityScore: 98.2,
      avgDelayDays: 0.8,
      costIndex: 1.02,
      responseTimeHours: 3.2,
      emergencySupported: true,
      contactEmail: 'logistics@apexelectronics.com',
    },
    {
      id: 'sup-002',
      name: 'Zenith Logistics & Components',
      code: 'ZENITH-COMP',
      category: 'Electronics',
      reliabilityScore: 91.5,
      qualityScore: 96.0,
      avgDelayDays: 1.4,
      costIndex: 0.98,
      responseTimeHours: 4.5,
      emergencySupported: true,
      contactEmail: 'orders@zenithsupplies.io',
    },
    {
      id: 'sup-003',
      name: 'BioPharm ColdChain Solutions',
      code: 'BIOPHARM-MED',
      category: 'Medicine',
      reliabilityScore: 98.9,
      qualityScore: 99.5,
      avgDelayDays: 0.2,
      costIndex: 1.15,
      responseTimeHours: 1.5,
      emergencySupported: true,
      contactEmail: 'emergency@biopharm.med',
    },
    {
      id: 'sup-004',
      name: 'FreshHarvest Agro Logistics',
      code: 'FRESH-AGRO',
      category: 'Groceries',
      reliabilityScore: 89.2,
      qualityScore: 94.1,
      avgDelayDays: 2.1,
      costIndex: 0.92,
      responseTimeHours: 6.0,
      emergencySupported: false,
      contactEmail: 'fleet@freshharvest.org',
    },
    {
      id: 'sup-005',
      name: 'Vanguard Industrial Supply',
      code: 'VANGUARD-IND',
      category: 'Automotive',
      reliabilityScore: 93.0,
      qualityScore: 95.8,
      avgDelayDays: 1.1,
      costIndex: 1.04,
      responseTimeHours: 3.8,
      emergencySupported: true,
      contactEmail: 'dispatch@vanguard.ind',
    },
  ];

  public static getInstance(): SupplierService {
    if (!SupplierService.instance) {
      SupplierService.instance = new SupplierService();
    }
    return SupplierService.instance;
  }

  public getSuppliers(): SupplierInfo[] {
    return this.suppliers;
  }

  public getSuppliersByCategory(category: string): SupplierInfo[] {
    return this.suppliers.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
  }

  public getBestEmergencySupplier(category: string): SupplierInfo | undefined {
    const candidates = this.suppliers.filter(
      (s) => s.emergencySupported && (s.category.toLowerCase() === category.toLowerCase() || category === 'all')
    );
    return candidates.sort((a, b) => b.reliabilityScore - a.reliabilityScore)[0];
  }
}

export const supplierService = SupplierService.getInstance();
