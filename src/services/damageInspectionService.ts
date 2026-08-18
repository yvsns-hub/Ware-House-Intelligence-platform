import { DamageInspectionRecord } from '@/types';

export class DamageInspectionService {
  private static instance: DamageInspectionService;

  private inspectionHistory: DamageInspectionRecord[] = [
    {
      id: 'insp-001',
      sku: 'ELEC-SPK-002',
      productName: 'Portable Bluetooth Speaker Max',
      damageType: 'TORN_PACKAGING',
      severity: 'MINOR',
      imageUrl: '/images/demo-damage-box.jpg',
      confidenceScore: 94.2,
      status: 'REPACKAGED',
      notes: 'Outer shrink wrap torn during conveyor transit. Internal unit intact with passing diagnostics.',
      inspectedBy: 'Automated Vision Station #2',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: 'insp-002',
      sku: 'GROC-EVO-001',
      productName: 'Organic Extra Virgin Olive Oil 1L',
      damageType: 'LEAKAGE',
      severity: 'CRITICAL',
      imageUrl: '/images/demo-damage-leak.jpg',
      confidenceScore: 98.6,
      status: 'DISPOSED',
      notes: 'Glass bottle hairline crack with liquid seepage detected by moisture vision sensor. Immediate quarantine & spill containment protocol initiated.',
      inspectedBy: 'Inbound Vision Scanner #1',
      timestamp: new Date(Date.now() - 1000 * 60 * 340).toISOString(),
    },
    {
      id: 'insp-003',
      sku: 'AUTO-OIL-003',
      productName: 'Synthetic Motor Oil 5W-30',
      damageType: 'DENT',
      severity: 'MODERATE',
      confidenceScore: 91.0,
      status: 'QUARANTINED',
      notes: 'Side canister dent > 15mm. Integrity check pending before clearance.',
      inspectedBy: 'Forklift Vision Sensor',
      timestamp: new Date(Date.now() - 1000 * 60 * 680).toISOString(),
    },
  ];

  public static getInstance(): DamageInspectionService {
    if (!DamageInspectionService.instance) {
      DamageInspectionService.instance = new DamageInspectionService();
    }
    return DamageInspectionService.instance;
  }

  public getInspections(): DamageInspectionRecord[] {
    return this.inspectionHistory;
  }

  /**
   * Run Computer Vision Inspection (Simulation / Demo Model)
   * Evaluates image or sample input, detects bounding boxes and damage categories.
   */
  public analyzePackageImage(fileData: {
    sku: string;
    productName: string;
    fileName?: string;
    overrideDamageType?: 'TORN_PACKAGING' | 'DENT' | 'LEAKAGE' | 'MISSING_LABEL' | 'CRUSHED';
  }): {
    record: DamageInspectionRecord;
    detectionBoxes: Array<{
      label: string;
      confidence: number;
      x: number;
      y: number;
      width: number;
      height: number;
    }>;
    recommendedDisposition: string;
  } {
    const damageType = fileData.overrideDamageType || 'TORN_PACKAGING';
    let severity: 'MINOR' | 'MODERATE' | 'SEVERE' | 'CRITICAL' = 'MODERATE';
    let recommendedDisposition = 'QUARANTINE_FOR_MANUAL_CHECK';
    let notes = 'Inspection analyzed by vision simulation pipeline.';

    if (damageType === 'LEAKAGE') {
      severity = 'CRITICAL';
      recommendedDisposition = 'DISPOSE_AND_CLAIM_VENDOR_CREDIT';
      notes = 'Liquid leakage detected. Immediate hazardous spill quarantine required.';
    } else if (damageType === 'TORN_PACKAGING') {
      severity = 'MINOR';
      recommendedDisposition = 'REPACK_AND_RESTOCK';
      notes = 'Packaging integrity compromised, product undamaged. Transfer to repack station.';
    } else if (damageType === 'MISSING_LABEL') {
      severity = 'MINOR';
      recommendedDisposition = 'REPRINT_BARCODE_LABEL';
      notes = 'SKU barcode unreadable. Generate replacement GS1-128 label.';
    } else if (damageType === 'CRUSHED' || damageType === 'DENT') {
      severity = 'SEVERE';
      recommendedDisposition = 'RETURN_TO_SUPPLIER';
      notes = 'Structural deformation detected. Defective batch return recommended.';
    }

    const record: DamageInspectionRecord = {
      id: `insp-${Date.now()}`,
      sku: fileData.sku,
      productName: fileData.productName,
      damageType,
      severity,
      confidenceScore: Math.round((88 + Math.random() * 10) * 10) / 10,
      status: 'QUARANTINED',
      notes,
      inspectedBy: 'Automated Vision AI Engine (Demo/Simulated Model)',
      timestamp: new Date().toISOString(),
    };

    this.inspectionHistory.unshift(record);

    return {
      record,
      detectionBoxes: [
        {
          label: damageType.replace('_', ' '),
          confidence: record.confidenceScore,
          x: 24,
          y: 35,
          width: 52,
          height: 48,
        },
      ],
      recommendedDisposition,
    };
  }
}

export const damageInspectionService = DamageInspectionService.getInstance();
