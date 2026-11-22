import api from './api';
import {
  SolarInquiry,
  SiteSurvey,
  SolarPackageTemplate,
  CustomerPortalData,
  DispatchRecord,
  WarrantyLookupResult,
  TechnicianJobSheet,
  SolarSupportTicket,
  DirectorAnalytics,
  AiSolarEvaluationRequest,
  AiSolarEvaluationResponse,
  AiSolarChatRequest,
  AiSolarChatResponse,
  AiRoofPhotoAnalysisResponse,
  CustomerAiSubmission,
  SaveCustomerAiSubmission,
  SolarWorker,
  CreateSolarWorker,
  WorkerTask,
  AssignWorkerTask,
  UpdateWorkerTaskStatus,
} from '../types/solar';

export const solarApi = {
  // Inquiries & Surveys (Scene 1)
  getInquiries: () => api.get<{ data: SolarInquiry[] }>('/solar/inquiries'),
  createInquiry: (payload: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    systemCapacityKw: number;
    systemType: number;
    monthlyElectricityBill: number;
    shadowFreeRoofSqFt: number;
    notes?: string;
  }) => api.post<{ data: SolarInquiry }>('/solar/inquiries', payload),
  updateSurvey: (inquiryId: number, payload: Partial<SiteSurvey>) =>
    api.put<{ data: SiteSurvey }>(`/solar/surveys/${inquiryId}`, payload),
  approveSurvey: (inquiryId: number, technicianName: string) =>
    api.post<{ data: SolarInquiry }>(`/solar/surveys/${inquiryId}/approve?technicianName=${encodeURIComponent(technicianName)}`),

  // Ready Packages & Automated BOM (Scene 2)
  getPackages: () => api.get<{ data: SolarPackageTemplate[] }>('/solar/packages'),
  getPackageTemplate: (capacityKw: number, systemType: number) =>
    api.get<{ data: SolarPackageTemplate }>(`/solar/packages/template?capacityKw=${capacityKw}&systemType=${systemType}`),

  // Projects
  getProjects: () => api.get<{ data: CustomerPortalData[] }>('/solar/projects'),
  getProjectById: (id: number) => api.get<{ data: CustomerPortalData }>(`/solar/projects/${id}`),

  // Dispatch & Serial Numbers (Scene 3)
  createDispatch: (payload: {
    projectId: number;
    assignedVehicle: string;
    driverTechnician: string;
    serializedItems: Array<{ itemName: string; category: string; serialNumber: string; warrantyYears: number }>;
  }) => api.post<{ data: DispatchRecord }>('/solar/dispatch', payload),
  getDispatches: () => api.get<{ data: DispatchRecord[] }>('/solar/dispatches'),
  lookupWarranty: (serialNumber: string) =>
    api.get<{ data: WarrantyLookupResult }>(`/solar/warranty/lookup?serialNumber=${encodeURIComponent(serialNumber)}`),

  // Technician Mobile Job Sheet & Customer Sign-off (Scene 4)
  getJobSheet: (projectId: number) => api.get<{ data: TechnicianJobSheet }>(`/solar/jobsheet/${projectId}`),
  submitJobSheet: (payload: {
    projectId: number;
    leadTechnician: string;
    workStartTime: string;
    workEndTime: string;
    systemSizeKw: number;
    powerGenerationTestPassed: boolean;
    testedKwOutput: number;
    testedVoltage: number;
    roofPhotos: string[];
    customerSignatureBase64: string;
    homeownerName: string;
    notes: string;
  }) => api.post<{ data: TechnicianJobSheet }>('/solar/jobsheet', payload),

  // Support & Rainy Season Breakdown (Scene 5)
  getTickets: () => api.get<{ data: SolarSupportTicket[] }>('/solar/tickets'),
  createTicket: (payload: {
    projectId: number;
    customerName: string;
    customerPhone: string;
    serialNumber: string;
    faultCode: string;
    description: string;
  }) => api.post<{ data: SolarSupportTicket }>('/solar/tickets', payload),
  resolveTicket: (ticketId: number, resolutionNotes: string) =>
    api.put<{ data: SolarSupportTicket }>(`/solar/tickets/${ticketId}/resolve?resolutionNotes=${encodeURIComponent(resolutionNotes)}`),

  // Director Month-End Analytics (Scene 6)
  getDirectorAnalytics: () => api.get<{ data: DirectorAnalytics }>('/solar/director/analytics'),

  // Customer Portal Overview
  getPortalOverview: (projectId?: number, phone?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append('projectId', projectId.toString());
    if (phone) params.append('phone', phone);
    return api.get<{ data: CustomerPortalData }>(`/solar/portal/overview?${params.toString()}`);
  },

  // AI Solar Intelligence (New Innovation)
  evaluateAiSolar: (payload: AiSolarEvaluationRequest) =>
    api.post<{ data: AiSolarEvaluationResponse }>('/solar/ai/recommendation', payload),

  chatAiSolar: (payload: AiSolarChatRequest) =>
    api.post<{ data: AiSolarChatResponse }>('/solar/ai/chat', payload),

  // AI Roof Photo Intelligence (Keras Vision Model)
  analyzeRoofPhoto: (payload: { image: string; filename?: string }) =>
    api.post<{ data: AiRoofPhotoAnalysisResponse }>('/solar/ai/roof-photo', payload),

  // Customer AI Ingestion & Admin Matrix
  getAiSubmissions: () =>
    api.get<{ data: CustomerAiSubmission[] }>('/solar/ai/submissions'),

  getAiSubmission: (identifier: string) =>
    api.get<{ data: CustomerAiSubmission }>(`/solar/ai/submissions/${encodeURIComponent(identifier)}`),

  saveAiSubmission: (payload: SaveCustomerAiSubmission) =>
    api.post<{ data: CustomerAiSubmission }>('/solar/ai/submissions', payload),

  // Worker Portal & Fleet Task Management
  getWorkers: () =>
    api.get<{ data: SolarWorker[] }>('/solar/workers'),

  createWorker: (payload: CreateSolarWorker) =>
    api.post<{ data: SolarWorker }>('/solar/workers', payload),

  getWorkerTasks: (workerId?: number) =>
    api.get<{ data: WorkerTask[] }>(workerId ? `/solar/workers/tasks?workerId=${workerId}` : '/solar/workers/tasks'),

  assignWorkerTask: (payload: AssignWorkerTask) =>
    api.post<{ data: WorkerTask }>('/solar/workers/tasks/assign', payload),

  updateWorkerTaskStatus: (taskId: number, payload: UpdateWorkerTaskStatus) =>
    api.put<{ data: WorkerTask }>(`/solar/workers/tasks/${taskId}/status`, payload),
};
