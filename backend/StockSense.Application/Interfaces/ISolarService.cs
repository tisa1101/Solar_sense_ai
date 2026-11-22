using System.Collections.Generic;
using System.Threading.Tasks;
using StockSense.Application.DTOs;

namespace StockSense.Application.Interfaces
{
    public interface ISolarService
    {
        Task<List<SolarInquiryDto>> GetInquiriesAsync();
        Task<SolarInquiryDto> CreateInquiryAsync(CreateSolarInquiryDto dto);
        Task<SiteSurveyDto> UpdateSurveyAsync(int inquiryId, UpdateSiteSurveyDto dto);
        Task<SolarInquiryDto> ApproveSurveyAsync(int inquiryId, string technicianName);

        Task<List<SolarPackageTemplateDto>> GetPackageTemplatesAsync();
        Task<SolarPackageTemplateDto?> GetPackageByCapacityAndTypeAsync(double capacityKw, SolarSystemType systemType);

        Task<List<CustomerPortalDto>> GetAllProjectsAsync();
        Task<CustomerPortalDto?> GetProjectByIdAsync(int id);
        Task<CustomerPortalDto?> GetProjectByPhoneAsync(string phone);

        Task<DispatchRecordDto> CreateDispatchAsync(CreateDispatchDto dto);
        Task<List<DispatchRecordDto>> GetDispatchesAsync();
        Task<WarrantyLookupResultDto> LookupWarrantyBySerialAsync(string serialNumber);

        Task<TechnicianJobSheetDto?> GetJobSheetByProjectAsync(int projectId);
        Task<TechnicianJobSheetDto> SubmitJobSheetAsync(SubmitJobSheetDto dto);

        Task<List<SolarSupportTicketDto>> GetSupportTicketsAsync();
        Task<SolarSupportTicketDto> CreateSupportTicketAsync(CreateSupportTicketDto dto);
        Task<SolarSupportTicketDto> ResolveSupportTicketAsync(int ticketId, string resolutionNotes);

        Task<DirectorAnalyticsDto> GetDirectorMonthEndAnalyticsAsync();
        Task<CustomerPortalDto> GetCustomerPortalOverviewAsync(int? projectId = null, string? phone = null);

        // AI Solar Intelligence (New Innovation)
        Task<AiSolarEvaluationResponseDto> EvaluateSolarIntelligenceAsync(AiSolarEvaluationRequestDto request);
        Task<AiSolarChatResponseDto> ChatSolarAssistantAsync(AiSolarChatRequestDto request);
        Task<AiRoofPhotoAnalysisResponseDto> AnalyzeRoofPhotoAsync(AiRoofPhotoRequestDto request);

        // Customer Portal AI Ingestion & Admin Matrix
        Task<List<CustomerAiSubmissionDto>> GetCustomerAiSubmissionsAsync();
        Task<CustomerAiSubmissionDto?> GetCustomerAiSubmissionAsync(string identifier);
        Task<CustomerAiSubmissionDto> SaveCustomerAiSubmissionAsync(SaveCustomerAiSubmissionDto dto);

        // Worker Portal & Fleet Task Management
        Task<List<SolarWorkerDto>> GetWorkersAsync();
        Task<SolarWorkerDto> CreateWorkerAsync(CreateSolarWorkerDto dto);
        Task<List<WorkerTaskDto>> GetWorkerTasksAsync(int? workerId = null);
        Task<WorkerTaskDto> AssignWorkerTaskAsync(AssignWorkerTaskDto dto);
        Task<WorkerTaskDto> UpdateWorkerTaskStatusAsync(int taskId, UpdateWorkerTaskStatusDto dto);
    }
}
