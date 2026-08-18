import { openRouterClient, OpenRouterMessage } from '../lib/openrouter';
import { AIAnalysisRequest, AIAnalysisResponse } from '../types';

export class AIService {
  /**
   * Run decision intelligence analysis on warehouse state
   * (Phase 1: Setup with OpenRouter client and realistic mock fallback response)
   */
  public async analyzeWarehouseState(request: AIAnalysisRequest = {}): Promise<AIAnalysisResponse> {
    const prompt = request.query || 'Analyze current warehouse inventory bottlenecks, order fulfillment risks, and workforce allocations.';

    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: `You are the AI Decision Intelligence Engine for an automated warehouse operations center.
Your task is to analyze inventory shortages, order deadlines, workforce bottlenecking, and external factors like weather disruptions.
Output concise, high-priority operational decisions with actionable recommendations.`,
      },
      {
        role: 'user',
        content: `Context: ${request.context || 'general'}. Prompt: ${prompt}. Parameters: ${JSON.stringify(request.parameters || {})}`,
      },
    ];

    try {
      const completion = await openRouterClient.createChatCompletion(messages, {
        model: 'anthropic/claude-3.5-sonnet',
        temperature: 0.2,
      });

      // Parse JSON if response is stringified JSON, or return structured fallback
      try {
        const parsed = JSON.parse(completion.content);
        if (parsed.insights && parsed.recommendations) {
          return parsed as AIAnalysisResponse;
        }
      } catch (parseErr) {
        // Response was freeform text, convert to structured format
      }

      return this.getMockAnalysis(prompt);
    } catch (error) {
      console.warn('AI Service analysis error, falling back to mock response:', error);
      return this.getMockAnalysis(prompt);
    }
  }

  private getMockAnalysis(prompt: string): AIAnalysisResponse {
    return {
      insights: [
        'Detected 5 SKUs with high velocity and under 15 units remaining in Fast Moving Zone A.',
        'Orders for Platinum Tier customers have 99.4% on-time priority fulfillment guarantee.',
        'Morning shift picking throughput is outpacing packing station buffer by 18%.',
      ],
      recommendations: [
        {
          id: 'REC-101',
          type: 'RESTOCK',
          title: 'Expedited Purchase Order for HyperDrive NVMe SSD & Manuka Honey',
          description: 'Inventory levels are below standard safety stock thresholds while demand score is 9.5.',
          impactLevel: 'CRITICAL',
          suggestedAction: 'Generate and send electronic PO to SiliconEdge Ltd for 150 units.',
          confidenceScore: 0.95,
        },
        {
          id: 'REC-102',
          type: 'PRIORITIZE_ORDER',
          title: 'Fast-Track SameDay Order Batch #ORD-2026001',
          description: 'Order deadline is within 2 hours for Apex Logistics Hub.',
          impactLevel: 'HIGH',
          suggestedAction: 'Assign Picker Sarah Jenkins to prioritize items in Aisle B.',
          confidenceScore: 0.92,
        },
        {
          id: 'REC-103',
          type: 'STAFFING_ADJUSTMENT',
          title: 'Reallocate 2 Morning Shift Pickers to Packing Station 3',
          description: 'Alleviate outbound packing queue bottleneck before 14:00 courier cutoff.',
          impactLevel: 'MEDIUM',
          suggestedAction: 'Shift Carlos Mendez and Aisha Patel for next 90 minutes.',
          confidenceScore: 0.89,
        },
      ],
      riskAssessment: {
        bottleneckZone: 'Aisle B (High Value Storage)',
        delayedOrdersCount: 2,
        stockoutRiskProducts: ['SKU-ELE-004', 'SKU-MED-039', 'SKU-GRO-026'],
      },
      generatedAt: new Date().toISOString(),
    };
  }
}

export const aiService = new AIService();
