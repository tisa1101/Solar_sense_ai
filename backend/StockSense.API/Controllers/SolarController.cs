using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StockSense.Application.Common;
using StockSense.Application.DTOs;
using StockSense.Application.Interfaces;

namespace StockSense.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolarController : ControllerBase
    {
        private readonly ISolarService _solarService;

        public SolarController(ISolarService solarService)
        {
            _solarService = solarService;
        }

        [HttpGet("inquiries")]
        public async Task<ActionResult<ApiResponse<List<SolarInquiryDto>>>> GetInquiries()
        {
            var data = await _solarService.GetInquiriesAsync();
            return Ok(ApiResponse<List<SolarInquiryDto>>.Ok(data));
        }

        [HttpPost("inquiries")]
        public async Task<ActionResult<ApiResponse<SolarInquiryDto>>> CreateInquiry([FromBody] CreateSolarInquiryDto dto)
        {
            var data = await _solarService.CreateInquiryAsync(dto);
            return Ok(ApiResponse<SolarInquiryDto>.Ok(data, "Rooftop solar inquiry registered successfully."));
        }

        [HttpPut("surveys/{inquiryId}")]
        public async Task<ActionResult<ApiResponse<SiteSurveyDto>>> UpdateSurvey(int inquiryId, [FromBody] UpdateSiteSurveyDto dto)
        {
            var data = await _solarService.UpdateSurveyAsync(inquiryId, dto);
            return Ok(ApiResponse<SiteSurveyDto>.Ok(data, "Rooftop feasibility survey updated."));
        }

        [HttpPost("surveys/{inquiryId}/approve")]
        public async Task<ActionResult<ApiResponse<SolarInquiryDto>>> ApproveSurvey(int inquiryId, [FromQuery] string technicianName = "Lead Surveyor")
        {
            var data = await _solarService.ApproveSurveyAsync(inquiryId, technicianName);
            return Ok(ApiResponse<SolarInquiryDto>.Ok(data, "Survey approved. Ready-kit quote unlocked for customer."));
        }

        [HttpGet("packages")]
        public async Task<ActionResult<ApiResponse<List<SolarPackageTemplateDto>>>> GetPackages()
        {
            var data = await _solarService.GetPackageTemplatesAsync();
            return Ok(ApiResponse<List<SolarPackageTemplateDto>>.Ok(data));
        }

        [HttpGet("packages/template")]
        public async Task<ActionResult<ApiResponse<SolarPackageTemplateDto>>> GetPackageTemplate([FromQuery] double capacityKw, [FromQuery] SolarSystemType systemType)
        {
            var data = await _solarService.GetPackageByCapacityAndTypeAsync(capacityKw, systemType);
            if (data == null) return NotFound(ApiResponse<SolarPackageTemplateDto>.Fail("No package found matching specifications."));
            return Ok(ApiResponse<SolarPackageTemplateDto>.Ok(data));
        }

        [HttpGet("projects")]
        public async Task<ActionResult<ApiResponse<List<CustomerPortalDto>>>> GetProjects()
        {
            var data = await _solarService.GetAllProjectsAsync();
            return Ok(ApiResponse<List<CustomerPortalDto>>.Ok(data));
        }

        [HttpGet("projects/{id}")]
        public async Task<ActionResult<ApiResponse<CustomerPortalDto>>> GetProjectById(int id)
        {
            var data = await _solarService.GetProjectByIdAsync(id);
            if (data == null) return NotFound(ApiResponse<CustomerPortalDto>.Fail("Project not found."));
            return Ok(ApiResponse<CustomerPortalDto>.Ok(data));
        }

        [HttpPost("dispatch")]
        public async Task<ActionResult<ApiResponse<DispatchRecordDto>>> CreateDispatch([FromBody] CreateDispatchDto dto)
        {
            var data = await _solarService.CreateDispatchAsync(dto);
            return Ok(ApiResponse<DispatchRecordDto>.Ok(data, "Kit dispatched. Serial numbers recorded and warranty clocks started."));
        }

        [HttpGet("dispatches")]
        public async Task<ActionResult<ApiResponse<List<DispatchRecordDto>>>> GetDispatches()
        {
            var data = await _solarService.GetDispatchesAsync();
            return Ok(ApiResponse<List<DispatchRecordDto>>.Ok(data));
        }

        [HttpGet("warranty/lookup")]
        public async Task<ActionResult<ApiResponse<WarrantyLookupResultDto>>> LookupWarranty([FromQuery] string serialNumber)
        {
            var data = await _solarService.LookupWarrantyBySerialAsync(serialNumber);
            return Ok(ApiResponse<WarrantyLookupResultDto>.Ok(data));
        }

        [HttpGet("jobsheet/{projectId}")]
        public async Task<ActionResult<ApiResponse<TechnicianJobSheetDto>>> GetJobSheet(int projectId)
        {
            var data = await _solarService.GetJobSheetByProjectAsync(projectId);
            return Ok(ApiResponse<TechnicianJobSheetDto>.Ok(data));
        }

        [HttpPost("jobsheet")]
        public async Task<ActionResult<ApiResponse<TechnicianJobSheetDto>>> SubmitJobSheet([FromBody] SubmitJobSheetDto dto)
        {
            var data = await _solarService.SubmitJobSheetAsync(dto);
            return Ok(ApiResponse<TechnicianJobSheetDto>.Ok(data, "Installation verified and homeowner sign-off recorded."));
        }

        [HttpGet("tickets")]
        public async Task<ActionResult<ApiResponse<List<SolarSupportTicketDto>>>> GetTickets()
        {
            var data = await _solarService.GetSupportTicketsAsync();
            return Ok(ApiResponse<List<SolarSupportTicketDto>>.Ok(data));
        }

        [HttpPost("tickets")]
        public async Task<ActionResult<ApiResponse<SolarSupportTicketDto>>> CreateTicket([FromBody] CreateSupportTicketDto dto)
        {
            var data = await _solarService.CreateSupportTicketAsync(dto);
            return Ok(ApiResponse<SolarSupportTicketDto>.Ok(data, "Support ticket logged. Warranty status evaluated."));
        }

        [HttpPut("tickets/{id}/resolve")]
        public async Task<ActionResult<ApiResponse<SolarSupportTicketDto>>> ResolveTicket(int id, [FromQuery] string resolutionNotes = "Power generation restored and customer verified.")
        {
            var data = await _solarService.ResolveSupportTicketAsync(id, resolutionNotes);
            return Ok(ApiResponse<SolarSupportTicketDto>.Ok(data, "Ticket resolved and customer sign-off recorded."));
        }

        [HttpGet("director/analytics")]
        public async Task<ActionResult<ApiResponse<DirectorAnalyticsDto>>> GetDirectorAnalytics()
        {
            var data = await _solarService.GetDirectorMonthEndAnalyticsAsync();
            return Ok(ApiResponse<DirectorAnalyticsDto>.Ok(data));
        }

        [HttpGet("portal/overview")]
        public async Task<ActionResult<ApiResponse<CustomerPortalDto>>> GetCustomerPortalOverview([FromQuery] int? projectId, [FromQuery] string? phone)
        {
            var data = await _solarService.GetCustomerPortalOverviewAsync(projectId, phone);
            return Ok(ApiResponse<CustomerPortalDto>.Ok(data));
        }

        // ==========================================
        // AI SOLAR INTELLIGENCE ENDPOINTS
        // ==========================================
        [HttpPost("ai/recommendation")]
        public async Task<ActionResult<ApiResponse<AiSolarEvaluationResponseDto>>> EvaluateSolarIntelligence([FromBody] AiSolarEvaluationRequestDto request)
        {
            var data = await _solarService.EvaluateSolarIntelligenceAsync(request);
            return Ok(ApiResponse<AiSolarEvaluationResponseDto>.Ok(data, "AI Solar Intelligence assessment generated successfully."));
        }

        [HttpPost("ai/chat")]
        public async Task<ActionResult<ApiResponse<AiSolarChatResponseDto>>> ChatSolarAssistant([FromBody] AiSolarChatRequestDto request)
        {
            var data = await _solarService.ChatSolarAssistantAsync(request);
            return Ok(ApiResponse<AiSolarChatResponseDto>.Ok(data));
        }

        [HttpPost("ai/roof-photo")]
        public async Task<ActionResult<ApiResponse<AiRoofPhotoAnalysisResponseDto>>> AnalyzeRoofPhoto([FromBody] AiRoofPhotoRequestDto request)
        {
            var data = await _solarService.AnalyzeRoofPhotoAsync(request);
            return Ok(ApiResponse<AiRoofPhotoAnalysisResponseDto>.Ok(data, "Roof photo assessed successfully using Keras vision model."));
        }
    }
}
