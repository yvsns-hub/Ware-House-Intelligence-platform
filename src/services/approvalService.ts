import { ExplainableDecision, DecisionStatus, AuditLogEntry } from '@/types';
import { auditService } from './auditService';

export class ApprovalService {
  private static instance: ApprovalService;

  private pendingDecisions: ExplainableDecision[] = [
    {
      decisionId: 'dec-101',
      decisionType: 'CROSS_HUB_TRANSFER',
      recommendation: 'Transfer 120 units of "High-Performance Wireless Headphones" (SKU: ELEC-WHD-001) from Hub West-02 (Los Angeles) -> Hub East-01 (New York)',
      confidence: 94.5,
      reasons: [
        'Hub East-01 stockout predicted in 9 hours due to 47% demand velocity surge.',
        'Hub West-02 has 240 units excess buffer stock above safety threshold.',
        '23 pending customer orders (including 2 Platinum accounts) protected from SLA breach.',
        'Transfer transit distance: 3 hours air freight at estimated cost of ₹2,400 vs ₹18,000 potential SLA penalty.',
      ],
      evidence: {
        currentHubStock: 0,
        sourceHubStock: 240,
        transferUnits: 120,
        estimatedTransitHours: 3,
        slaRiskProbability: '87%',
      },
      expectedImpact: 'Protects ₹1,80,000 revenue; preserves 100% on-time delivery for 23 orders.',
      estimatedCost: 2400,
      estimatedSavings: 15600,
      alternatives: [
        {
          title: 'Option B: Expedite Supplier Reorder',
          cost: 6500,
          impact: 'Lead time 24 hours; risks delaying 8 high-priority orders.',
          tradeoff: 'Higher cost and slower turnaround.',
        },
        {
          title: 'Option C: Delay Orders & Offer Credit',
          cost: 14200,
          impact: 'SLA breach on 23 orders; negative customer retention impact.',
          tradeoff: 'Severe customer satisfaction penalty.',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      status: 'PENDING',
      warehouseId: 'hub-01',
      targetEntityId: 'prod-01',
    },
    {
      decisionId: 'dec-102',
      decisionType: 'WORKFORCE_REBALANCE',
      recommendation: 'Reassign 2 pickers from Zone E (Standard) to Zone B (High Value) & 1 packer to Station Beta.',
      confidence: 91.0,
      reasons: [
        'Zone B active order queue depth exceeds 24 orders.',
        'Packing Station Beta is currently a bottleneck with 34 items queued.',
        'Rebalance reduces order picking queue wait time by 23.5%.',
      ],
      evidence: {
        zoneBQueue: 24,
        stationBetaQueue: 34,
        projectedThroughputGain: '+17.2%',
      },
      expectedImpact: 'Prevents 31 order SLA breaches; improves daily throughput velocity by 17.2%.',
      estimatedCost: 0,
      estimatedSavings: 8400,
      alternatives: [
        {
          title: 'Option B: Overtime Shift Callout',
          cost: 3200,
          impact: 'Adds capacity in 3 hours after shift transition.',
          tradeoff: 'Delayed response to current queue spike.',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      status: 'PENDING',
      warehouseId: 'hub-01',
      targetEntityId: 'emp-01',
    },
    {
      decisionId: 'dec-103',
      decisionType: 'EXPEDITE_SUPPLIER',
      recommendation: 'Issue emergency PO for 200 units of "Organic Multivitamin Daily" to BioPharm Solutions.',
      confidence: 89.0,
      reasons: [
        'Local stock reaches reorder trigger point (15 units remaining).',
        'BioPharm has 98.9% reliability score with guaranteed emergency turnaround under 12 hours.',
      ],
      evidence: {
        currentStock: 15,
        reorderThreshold: 15,
        supplierReliability: '98.9%',
      },
      expectedImpact: 'Buffers regional medical inventory before weekend surge.',
      estimatedCost: 4800,
      estimatedSavings: 12000,
      alternatives: [],
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: 'PENDING',
      warehouseId: 'hub-01',
      targetEntityId: 'prod-03',
    },
  ];

  public static getInstance(): ApprovalService {
    if (!ApprovalService.instance) {
      ApprovalService.instance = new ApprovalService();
    }
    return ApprovalService.instance;
  }

  public getPendingDecisions(status?: DecisionStatus): ExplainableDecision[] {
    if (status) {
      return this.pendingDecisions.filter((d) => d.status === status);
    }
    return this.pendingDecisions;
  }

  public getDecisionById(decisionId: string): ExplainableDecision | undefined {
    return this.pendingDecisions.find((d) => d.decisionId === decisionId);
  }

  /**
   * Process manager action on a decision (APPROVE, REJECT, MODIFY)
   */
  public processDecision(
    decisionId: string,
    action: 'APPROVE' | 'REJECT' | 'MODIFY',
    user: string = 'Operations Manager',
    role: string = 'MANAGER',
    notes: string = ''
  ): { success: boolean; decision?: ExplainableDecision; auditEntry?: AuditLogEntry } {
    const decision = this.getDecisionById(decisionId);
    if (!decision) {
      return { success: false };
    }

    const previousStatus = decision.status;
    let newStatus: DecisionStatus = 'APPROVED';

    if (action === 'APPROVE') {
      newStatus = 'APPROVED';
      decision.status = 'EXECUTED';
      decision.approvedBy = user;
      decision.executedAt = new Date().toISOString();
    } else if (action === 'REJECT') {
      newStatus = 'REJECTED';
      decision.status = 'REJECTED';
    } else if (action === 'MODIFY') {
      newStatus = 'APPROVED';
      decision.status = 'EXECUTED';
      decision.approvedBy = `${user} (Modified)`;
      decision.executedAt = new Date().toISOString();
    }

    // Record Immutable Audit Log Entry
    const auditEntry = auditService.logAction({
      user,
      role,
      action: `${action}_${decision.decisionType}`,
      decisionId: decision.decisionId,
      previousState: JSON.stringify({ status: previousStatus }),
      newState: JSON.stringify({ status: decision.status, notes }),
      reason: notes || `Manager ${action.toLowerCase()} decision ${decision.decisionId} (${decision.recommendation.slice(0, 60)}...)`,
      source: 'APPROVAL_CENTER',
      approvalStatus: action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'MODIFIED',
    });

    return { success: true, decision, auditEntry };
  }
}

export const approvalService = ApprovalService.getInstance();
