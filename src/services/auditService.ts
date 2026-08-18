import { AuditLogEntry } from '@/types';

export class AuditService {
  private static instance: AuditService;

  private auditLogs: AuditLogEntry[] = [
    {
      id: 'audit-001',
      user: 'Operations Manager (Y V S N SWAMY)',
      role: 'MANAGER',
      action: 'APPROVED_CROSS_HUB_TRANSFER',
      decisionId: 'dec-101',
      previousState: JSON.stringify({ status: 'PENDING', sourceHub: 'hub-02', destHub: 'hub-01', qty: 120 }),
      newState: JSON.stringify({ status: 'EXECUTED', transferOrderId: 'TR-9042', inTransit: true }),
      reason: 'Prevent predicted stockout on High-Performance Wireless Headphones and protect 2 Platinum orders.',
      source: 'APPROVAL_CENTER',
      approvalStatus: 'APPROVED',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'audit-002',
      user: 'Warehouse Supervisor (Elena Vance)',
      role: 'SUPERVISOR',
      action: 'REASSIGNED_WORKFORCE',
      decisionId: 'dec-102',
      previousState: JSON.stringify({ zoneE_Pickers: 3, zoneB_Pickers: 1 }),
      newState: JSON.stringify({ zoneE_Pickers: 1, zoneB_Pickers: 3 }),
      reason: 'Absorb high-value order queue surge in Zone B.',
      source: 'WORKFORCE_OPTIMIZER',
      approvalStatus: 'APPROVED',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'audit-003',
      user: 'Automated Event Engine',
      role: 'SYSTEM',
      action: 'QUARANTINE_DAMAGED_STOCK',
      decisionId: 'insp-002',
      previousState: JSON.stringify({ sku: 'GROC-EVO-001', status: 'IN_STOCK', location: 'Rack C-02' }),
      newState: JSON.stringify({ sku: 'GROC-EVO-001', status: 'QUARANTINED', location: 'Quarantine-Bay-1' }),
      reason: 'Computer Vision detected bottle leakage on conveyor inbound scanner.',
      source: 'DAMAGE_INSPECTION',
      approvalStatus: 'AUTO_EXECUTED',
      timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    },
  ];

  public static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  public getLogs(limit: number = 50): AuditLogEntry[] {
    return this.auditLogs.slice(0, limit);
  }

  public logAction(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(newEntry);
    return newEntry;
  }
}

export const auditService = AuditService.getInstance();
