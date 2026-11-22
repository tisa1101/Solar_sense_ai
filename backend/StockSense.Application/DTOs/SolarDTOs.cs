using System;
using System.Collections.Generic;

namespace StockSense.Application.DTOs
{
    public enum SolarSystemType
    {
        OnGrid = 1,
        OffGrid = 2
    }

    public enum SolarProjectStatus
    {
        Inquiry = 1,
        SurveyScheduled = 2,
        SurveyApproved = 3,
        QuotationSent = 4,
        AdvancePaid = 5,
        KitDispatched = 6,
        InstallationDone = 7,
        SubsidyProcessing = 8,
        GridConnected = 9
    }

    public record SolarInquiryDto(
        int Id,
        string InquiryNumber,
        string CustomerName,
        string Phone,
        string Email,
        string Address,
        double SystemCapacityKw,
        SolarSystemType SystemType,
        decimal MonthlyElectricityBill,
        int ShadowFreeRoofSqFt,
        string GridConnectionSuitability,
        string Status,
        DateTime CreatedAt,
        SiteSurveyDto? Survey
    );

    public record CreateSolarInquiryDto(
        string CustomerName,
        string Phone,
        string Email,
        string Address,
        double SystemCapacityKw,
        SolarSystemType SystemType,
        decimal MonthlyElectricityBill,
        int ShadowFreeRoofSqFt,
        string? Notes
    );

    public record SiteSurveyDto(
        int Id,
        int InquiryId,
        string TechnicianName,
        DateTime? ScheduledDate,
        string RoofDirection,
        double RoofTiltDegrees,
        double CableDistanceMeters,
        string ShadingAnalysis,
        string StructuralFeasibility,
        bool IsApproved,
        DateTime? ApprovedAt,
        string Notes
    );

    public record UpdateSiteSurveyDto(
        string TechnicianName,
        string RoofDirection,
        double RoofTiltDegrees,
        double CableDistanceMeters,
        string ShadingAnalysis,
        string StructuralFeasibility,
        bool IsApproved,
        string Notes
    );

    public record SolarBomItemDto(
        string ItemName,
        string Category,
        int Quantity,
        string Unit,
        string Sku,
        decimal UnitCost,
        decimal TotalCost,
        bool IsSerialized
    );

    public record SolarPackageTemplateDto(
        int Id,
        string Name,
        double CapacityKw,
        SolarSystemType SystemType,
        decimal BasePrice,
        decimal CentralSubsidyAmount,
        decimal NetCustomerPrice,
        decimal EstimatedAnnualSavings,
        int PaybackPeriodMonths,
        List<SolarBomItemDto> BillOfMaterials
    );

    public record DispatchSerialItemDto(
        string ItemName,
        string Category,
        string SerialNumber,
        int WarrantyYears,
        DateTime WarrantyStartDate,
        DateTime WarrantyEndDate,
        bool IsWarrantyActive,
        string DaysRemainingFormatted
    );

    public record DispatchRecordDto(
        int Id,
        int ProjectId,
        string DispatchNumber,
        string CustomerName,
        string AssignedVehicle,
        string DriverTechnician,
        DateTime DispatchedAt,
        List<DispatchSerialItemDto> SerializedItems
    );

    public record CreateDispatchDto(
        int ProjectId,
        string AssignedVehicle,
        string DriverTechnician,
        List<DispatchSerialItemInputDto> SerializedItems
    );

    public record DispatchSerialItemInputDto(
        string ItemName,
        string Category,
        string SerialNumber,
        int WarrantyYears
    );

    public record TechnicianJobSheetDto(
        int Id,
        int ProjectId,
        string ProjectNumber,
        string CustomerName,
        string Address,
        string LeadTechnician,
        DateTime? WorkStartTime,
        DateTime? WorkEndTime,
        double SystemSizeKw,
        bool PowerGenerationTestPassed,
        double TestedKwOutput,
        double TestedVoltage,
        List<string> RoofPhotos,
        string CustomerSignatureBase64,
        string HomeownerName,
        DateTime? SignedAt,
        string HandoverCertificateNumber,
        string Notes
    );

    public record SubmitJobSheetDto(
        int ProjectId,
        string LeadTechnician,
        DateTime WorkStartTime,
        DateTime WorkEndTime,
        double SystemSizeKw,
        bool PowerGenerationTestPassed,
        double TestedKwOutput,
        double TestedVoltage,
        List<string> RoofPhotos,
        string CustomerSignatureBase64,
        string HomeownerName,
        string Notes
    );

    public record SolarSupportTicketDto(
        int Id,
        string TicketNumber,
        int ProjectId,
        string CustomerName,
        string CustomerPhone,
        string EquipmentName,
        string SerialNumber,
        string FaultCode,
        string Description,
        bool IsUnderWarranty,
        decimal BilledAmount,
        string Status,
        string AssignedTechnician,
        DateTime CreatedAt,
        DateTime? ResolvedAt,
        string ResolutionNotes,
        bool CustomerConfirmed
    );

    public record CreateSupportTicketDto(
        int ProjectId,
        string CustomerName,
        string CustomerPhone,
        string SerialNumber,
        string FaultCode,
        string Description
    );

    public record JobProfitabilityItemDto(
        int ProjectId,
        string ProjectNumber,
        string CustomerName,
        double CapacityKw,
        SolarSystemType SystemType,
        decimal ContractRevenue,
        decimal HardwareBomCost,
        decimal TechnicianLaborCost,
        decimal MiscCost,
        decimal NetProfit,
        double MarginPercentage,
        bool MadeMoney,
        string SubsidyStatus
    );

    public record DirectorAnalyticsDto(
        int TotalProjectsMonth,
        int CompletedProjects,
        int InProgressProjects,
        decimal TotalRevenue,
        decimal TotalHardwareCost,
        decimal TotalLaborCost,
        decimal TotalNetProfit,
        double AverageMarginPercentage,
        int SubsidyApplicationsPending,
        decimal TotalSubsidyAmountPending,
        int ActiveTechniciansCount,
        List<JobProfitabilityItemDto> JobProfitability,
        Dictionary<string, int> PipelineStages,
        List<TechnicianPerformanceDto> TechnicianPerformance
    );

    public record TechnicianPerformanceDto(
        string TechnicianName,
        int JobsCompleted,
        double TotalKwInstalled,
        decimal TotalEarnings,
        double AverageRating
    );

    public record WarrantyLookupResultDto(
        bool Found,
        string? SerialNumber,
        string? EquipmentName,
        string? Category,
        string? CustomerName,
        string? CustomerPhone,
        string? Address,
        string? ProjectNumber,
        DateTime? InstallationDate,
        DateTime? WarrantyStartDate,
        DateTime? WarrantyEndDate,
        bool IsValidWarranty,
        string? DaysRemaining,
        decimal RepairCostIfClaimed
    );

    public record CustomerPortalDto(
        int ProjectId,
        string ProjectNumber,
        string CustomerName,
        string Phone,
        string Email,
        string Address,
        double SystemCapacityKw,
        SolarSystemType SystemType,
        SolarProjectStatus Status,
        string CurrentStageName,
        int ProgressPercent,
        decimal TotalCost,
        decimal AdvancePaid,
        decimal BalanceDue,
        decimal GovernmentSubsidy,
        string AssignedTechnician,
        DateTime? EstimatedInstallDate,
        List<DispatchSerialItemDto> EquipmentWithWarranty,
        List<SolarSupportTicketDto> Tickets,
        TechnicianJobSheetDto? CommissioningDetails
    );

    // AI Solar Intelligence DTOs
    public record AiSolarEvaluationRequestDto(
        decimal MonthlyBill,
        double? MonthlyUnitsKwh,
        string? PropertyType,
        double RoofAreaSqFt,
        string? RoofType,
        string? ShadowObstructions,
        string? PowerCutsFrequency,
        double? DaytimeUsagePercent,
        double? SanctionedLoadKw,
        string? DiscomName,
        string? RoofOrientation
    );

    public record AiBatteryRecommendationDto(
        bool Needed,
        double CapacityKwh,
        string BatteryType,
        double BackupHours,
        decimal EstimatedCost,
        string Reasoning
    );

    public record AiFinancialsDto(
        decimal GrossSystemCost,
        decimal CentralSubsidy,
        decimal NetCost,
        decimal AnnualSavings,
        double PaybackYears,
        decimal LifetimeSavings25Yr,
        decimal MonthlyAverageSavings
    );

    public record AiEnvironmentalImpactDto(
        double Co2SavedPerYearTons,
        int TreesEquivalent,
        double CoalSavedKg
    );

    public record AiRoofUtilizationDto(
        double RequiredSqFt,
        double UtilizationPercent,
        int PanelsCount,
        string PanelModel,
        string StructureType
    );

    public record AiMissingInformationDto(
        string Field,
        string Importance, // "Critical", "Recommended", "Optional"
        string Description,
        string Impact
    );

    public record AiSolarEvaluationResponseDto(
        double RecommendedCapacityKw,
        string SystemType, // "On-Grid", "Off-Grid", "Hybrid (Grid + Storage)"
        string SystemTypeReasoning,
        string AiExplanation,
        AiBatteryRecommendationDto BatteryRecommendation,
        AiFinancialsDto Financials,
        AiEnvironmentalImpactDto EnvironmentalImpact,
        AiRoofUtilizationDto RoofUtilization,
        List<AiMissingInformationDto> MissingInformationAlerts,
        double TechnicalConfidenceScore,
        List<string> KeyEngineeringHighlights
    );

    public record AiSolarChatRequestDto(
        string Message,
        AiSolarEvaluationRequestDto? Context
    );

    public record AiSolarChatResponseDto(
        string Reply,
        DateTime Timestamp,
        List<string> SuggestedFollowUps
    );

    // AI Roof Photo Intelligence (Keras Model)
    public record AiRoofPhotoRequestDto(
        string Image,
        string? Filename
    );

    public record AiRoofObstructionDto(
        string Name,
        string Severity,
        double EstimatedFootprintSqFt,
        double RequiredSetbackMeters,
        string Recommendation
    );

    public record AiRoofShadingDto(
        string ShadingRating,
        double EstimatedShadowPercent,
        string ImpactAssessment,
        string OptimalExposureQuadrant
    );

    public record AiRoofSuitabilityDto(
        int Score,
        string Tier,
        string TierColor,
        double UsableAreaPercent,
        string EstimatedCapacityKwRange
    );

    public record AiRoofInstallationConcernDto(
        string Category,
        string Observation,
        string Protocol
    );

    public record AiRoofKerasMetadataDto(
        string ModelEngine,
        bool FeaturesExtracted,
        object? TopVisionLabels,
        string Resolution
    );

    public record AiRoofPhotoAnalysisResponseDto(
        string RoofType,
        string RoofTypeCode,
        string SlopeCategory,
        double ConfidenceScore,
        string LoadBearingCapability,
        string RecommendedMounting,
        List<AiRoofObstructionDto> ObstructionsDetected,
        int TotalObstructionsCount,
        AiRoofShadingDto ShadingAnalysis,
        AiRoofSuitabilityDto Suitability,
        List<AiRoofInstallationConcernDto> InstallationConcerns,
        string AssessmentSummary,
        string Disclaimer,
        AiRoofKerasMetadataDto KerasMetadata
    );
}
