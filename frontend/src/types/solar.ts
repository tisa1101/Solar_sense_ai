export enum SolarSystemType {
  OnGrid = 1,
  OffGrid = 2,
}

export enum SolarProjectStatus {
  Inquiry = 1,
  SurveyScheduled = 2,
  SurveyApproved = 3,
  QuotationSent = 4,
  AdvancePaid = 5,
  KitDispatched = 6,
  InstallationDone = 7,
  SubsidyProcessing = 8,
  GridConnected = 9,
}

export interface SiteSurvey {
  id: number;
  inquiryId: number;
  technicianName: string;
  scheduledDate?: string;
  roofDirection: string;
  roofTiltDegrees: number;
  cableDistanceMeters: number;
  shadingAnalysis: string;
  structuralFeasibility: string;
  isApproved: boolean;
  approvedAt?: string;
  notes: string;
}

export interface SolarInquiry {
  id: number;
  inquiryNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  systemCapacityKw: number;
  systemType: SolarSystemType;
  monthlyElectricityBill: number;
  shadowFreeRoofSqFt: number;
  gridConnectionSuitability: string;
  status: string;
  createdAt: string;
  survey?: SiteSurvey;
}

export interface SolarBomItem {
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  sku: string;
  unitCost: number;
  totalCost: number;
  isSerialized: boolean;
}

export interface SolarPackageTemplate {
  id: number;
  name: string;
  capacityKw: number;
  systemType: SolarSystemType;
  basePrice: number;
  centralSubsidyAmount: number;
  netCustomerPrice: number;
  estimatedAnnualSavings: number;
  paybackPeriodMonths: number;
  billOfMaterials: SolarBomItem[];
}

export interface DispatchSerialItem {
  itemName: string;
  category: string;
  serialNumber: string;
  warrantyYears: number;
  warrantyStartDate: string;
  warrantyEndDate: string;
  isWarrantyActive: boolean;
  daysRemainingFormatted: string;
}

export interface DispatchRecord {
  id: number;
  projectId: number;
  dispatchNumber: string;
  customerName: string;
  assignedVehicle: string;
  driverTechnician: string;
  dispatchedAt: string;
  serializedItems: DispatchSerialItem[];
}

export interface TechnicianJobSheet {
  id: number;
  projectId: number;
  projectNumber: string;
  customerName: string;
  address: string;
  leadTechnician: string;
  workStartTime?: string;
  workEndTime?: string;
  systemSizeKw: number;
  powerGenerationTestPassed: boolean;
  testedKwOutput: number;
  testedVoltage: number;
  roofPhotos: string[];
  customerSignatureBase64: string;
  homeownerName: string;
  signedAt?: string;
  handoverCertificateNumber: string;
  notes: string;
}

export interface SolarSupportTicket {
  id: number;
  ticketNumber: string;
  projectId: number;
  customerName: string;
  customerPhone: string;
  equipmentName: string;
  serialNumber: string;
  faultCode: string;
  description: string;
  isUnderWarranty: boolean;
  billedAmount: number;
  status: string;
  assignedTechnician: string;
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  customerConfirmed: boolean;
}

export interface JobProfitabilityItem {
  projectId: number;
  projectNumber: string;
  customerName: string;
  capacityKw: number;
  systemType: SolarSystemType;
  contractRevenue: number;
  hardwareBomCost: number;
  technicianLaborCost: number;
  miscCost: number;
  netProfit: number;
  marginPercentage: number;
  madeMoney: boolean;
  subsidyStatus: string;
}

export interface TechnicianPerformance {
  technicianName: string;
  jobsCompleted: number;
  totalKwInstalled: number;
  totalEarnings: number;
  averageRating: number;
}

export interface DirectorAnalytics {
  totalProjectsMonth: number;
  completedProjects: number;
  inProgressProjects: number;
  totalRevenue: number;
  totalHardwareCost: number;
  totalLaborCost: number;
  totalNetProfit: number;
  averageMarginPercentage: number;
  subsidyApplicationsPending: number;
  totalSubsidyAmountPending: number;
  activeTechniciansCount: number;
  jobProfitability: JobProfitabilityItem[];
  pipelineStages: Record<string, number>;
  technicianPerformance: TechnicianPerformance[];
}

export interface WarrantyLookupResult {
  found: boolean;
  serialNumber?: string;
  equipmentName?: string;
  category?: string;
  customerName?: string;
  customerPhone?: string;
  address?: string;
  projectNumber?: string;
  installationDate?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  isValidWarranty: boolean;
  daysRemaining?: string;
  repairCostIfClaimed: number;
}

export interface CustomerPortalData {
  projectId: number;
  projectNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  systemCapacityKw: number;
  systemType: SolarSystemType;
  status: SolarProjectStatus;
  currentStageName: string;
  progressPercent: number;
  totalCost: number;
  advancePaid: number;
  balanceDue: number;
  governmentSubsidy: number;
  assignedTechnician: string;
  estimatedInstallDate?: string;
  equipmentWithWarranty: DispatchSerialItem[];
  tickets: SolarSupportTicket[];
  commissioningDetails?: TechnicianJobSheet;
}

// ==========================================
// AI Solar Intelligence Types
// ==========================================

export interface AiSolarEvaluationRequest {
  monthlyBill: number;
  monthlyUnitsKwh?: number | null;
  propertyType?: string | null;
  roofAreaSqFt: number;
  roofType?: string | null;
  shadowObstructions?: string | null;
  powerCutsFrequency?: string | null;
  daytimeUsagePercent?: number | null;
  sanctionedLoadKw?: number | null;
  discomName?: string | null;
  roofOrientation?: string | null;
}

export interface AiBatteryRecommendation {
  needed: boolean;
  capacityKwh: number;
  batteryType: string;
  backupHours: number;
  estimatedCost: number;
  reasoning: string;
}

export interface AiFinancials {
  grossSystemCost: number;
  centralSubsidy: number;
  netCost: number;
  annualSavings: number;
  paybackYears: number;
  lifetimeSavings25Yr: number;
  monthlyAverageSavings: number;
}

export interface AiEnvironmentalImpact {
  co2SavedPerYearTons: number;
  treesEquivalent: number;
  coalSavedKg: number;
}

export interface AiRoofUtilization {
  requiredSqFt: number;
  utilizationPercent: number;
  panelsCount: number;
  panelModel: string;
  structureType: string;
}

export interface AiMissingInformation {
  field: string;
  importance: 'Critical' | 'Recommended' | 'Optional';
  description: string;
  impact: string;
}

export interface AiSolarEvaluationResponse {
  recommendedCapacityKw: number;
  systemType: string; // "On-Grid" | "Off-Grid" | "Hybrid (Grid + Storage)"
  systemTypeReasoning: string;
  aiExplanation: string;
  batteryRecommendation: AiBatteryRecommendation;
  financials: AiFinancials;
  environmentalImpact: AiEnvironmentalImpact;
  roofUtilization: AiRoofUtilization;
  missingInformationAlerts: AiMissingInformation[];
  technicalConfidenceScore: number;
  keyEngineeringHighlights: string[];
}

export interface AiSolarChatRequest {
  message: string;
  context?: AiSolarEvaluationRequest | null;
}

export interface AiSolarChatResponse {
  reply: string;
  timestamp: string;
  suggestedFollowUps: string[];
}

// ==========================================
// AI Roof Photo Intelligence (Keras Vision)
// ==========================================

export interface AiRoofObstruction {
  name: string;
  severity: 'Critical' | 'Medium' | 'Low' | 'Informational';
  estimatedFootprintSqFt: number;
  requiredSetbackMeters: number;
  recommendation: string;
}

export interface AiRoofShading {
  shadingRating: string;
  estimatedShadowPercent: number;
  impactAssessment: string;
  optimalExposureQuadrant: string;
}

export interface AiRoofSuitability {
  score: number;
  tier: string;
  tierColor: string;
  usableAreaPercent: number;
  estimatedCapacityKwRange: string;
}

export interface AiRoofInstallationConcern {
  category: string;
  observation: string;
  protocol: string;
}

export interface AiRoofKerasMetadata {
  modelEngine: string;
  featuresExtracted: boolean;
  topVisionLabels?: Array<{ label: string; confidence: number }> | null;
  resolution: string;
}

export interface AiRoofPhotoAnalysisResponse {
  roofType: string;
  roofTypeCode: string;
  slopeCategory: string;
  confidenceScore: number;
  loadBearingCapability: string;
  recommendedMounting: string;
  obstructionsDetected: AiRoofObstruction[];
  totalObstructionsCount: number;
  shadingAnalysis: AiRoofShading;
  suitability: AiRoofSuitability;
  installationConcerns: AiRoofInstallationConcern[];
  assessmentSummary: string;
  disclaimer: string;
  kerasMetadata: AiRoofKerasMetadata;
}

// ==========================================
// Customer AI Ingestion & Admin Matrix
// ==========================================
export interface CustomerAiSubmission {
  id: string;
  projectId?: number;
  projectNumber?: string;
  customerName: string;
  phone: string;
  address?: string;
  submittedAt: string;
  costEstimation?: AiSolarEvaluationResponse;
  cameraReview?: AiRoofPhotoAnalysisResponse;
  roofPhotoPreviewUrl?: string;
  status: string;
}

export interface SaveCustomerAiSubmission {
  projectId?: number;
  projectNumber?: string;
  customerName?: string;
  phone?: string;
  address?: string;
  costEstimation?: AiSolarEvaluationResponse;
  cameraReview?: AiRoofPhotoAnalysisResponse;
  roofPhotoPreviewUrl?: string;
}

// ==========================================
// Worker Portal & Fleet Task Management
// ==========================================
export interface SolarWorker {
  id: number;
  workerCode: string;
  fullName: string;
  phone: string;
  role: 'CrewLeader' | 'FieldTechnician' | 'MasterElectrician' | 'SolarRoofer';
  specialization: string;
  status: 'Active' | 'OnField' | 'OnLeave';
  assignedTasksCount: number;
  completedTasksCount: number;
  rating: number;
  joinedAt: string;
}

export interface CreateSolarWorker {
  fullName: string;
  phone: string;
  role: string;
  specialization: string;
  email?: string;
}

export interface WorkerTask {
  id: number;
  taskCode: string;
  projectId: number;
  projectNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  assignedWorkerId: number;
  assignedWorkerName: string;
  assignedWorkerRole: string;
  taskType: 'RoofMounting' | 'InverterWiring' | 'PreCommissioningAudit' | 'NetMeterLiaison' | 'SupportTicketVisit';
  status: 'Assigned' | 'EnRoute' | 'InProgress' | 'Completed';
  scheduledDate: string;
  systemCapacityKw: number;
  systemType: string;
  checklistItems: string[];
  notes?: string;
  testedKw?: number;
  testedVoltage?: number;
  customerSignatureBase64?: string;
  completedAt?: string;
}

export interface AssignWorkerTask {
  projectId: number;
  workerId: number;
  taskType: string;
  scheduledDate: string;
  notes?: string;
}

export interface UpdateWorkerTaskStatus {
  status: string;
  notes?: string;
  testedKw?: number;
  testedVoltage?: number;
  customerSignatureBase64?: string;
}



