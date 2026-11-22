import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ReorderingRulesPage } from '../pages/ReorderingRulesPage';
import { ProductFormPage } from '../pages/ProductFormPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ReceiptsPage } from '../pages/ReceiptsPage';
import { CreateReceiptPage } from '../pages/CreateReceiptPage';
import { DeliveriesPage } from '../pages/DeliveriesPage';
import { CreateDeliveryPage } from '../pages/CreateDeliveryPage';
import { TransfersPage } from '../pages/TransfersPage';
import { CreateTransferPage } from '../pages/CreateTransferPage';
import { AdjustmentsPage } from '../pages/AdjustmentsPage';
import { CreateAdjustmentPage } from '../pages/CreateAdjustmentPage';
import { LedgerPage } from '../pages/LedgerPage';
import { WarehousesPage } from '../pages/WarehousesPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ForecastPage } from '../pages/ForecastPage';
import { AnomaliesPage } from '../pages/AnomaliesPage';
import { CopilotPage } from '../pages/CopilotPage';

import { LandingPage } from '../pages/LandingPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { SuppliersPage } from '../pages/SuppliersPage';
import { SupplierDetailPage } from '../pages/SupplierDetailPage';
import { ReportsPage } from '../pages/ReportsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';

// SunPower Solutions - Solar Installation & Customer Portal Pages
import { CustomerPortalPage } from '../pages/CustomerPortalPage';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { SolarInquiriesPage } from '../pages/SolarInquiriesPage';
import { SolarPackagesPage } from '../pages/SolarPackagesPage';
import { SolarDispatchPage } from '../pages/SolarDispatchPage';
import { SolarJobSheetPage } from '../pages/SolarJobSheetPage';
import { SolarSupportPage } from '../pages/SolarSupportPage';
import { SolarDirectorPage } from '../pages/SolarDirectorPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Dedicated Customer / User Portal (Accessible to Homeowners & Commercial Clients) */}
      <Route path="/portal" element={<CustomerPortalPage />} />
      <Route path="/portal/login" element={<CustomerLoginPage />} />

      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected App Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* SunPower Solar Installation Management Suite (All 6 Scenes) */}
        <Route path="/solar/inquiries" element={<SolarInquiriesPage />} />
        <Route path="/solar/packages" element={<SolarPackagesPage />} />
        <Route path="/solar/dispatch" element={<SolarDispatchPage />} />
        <Route path="/solar/jobsheet" element={<SolarJobSheetPage />} />
        <Route path="/solar/support" element={<SolarSupportPage />} />
        <Route path="/solar/director" element={<SolarDirectorPage />} />

        {/* Existing Inventory & Warehouse Management Routes */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/reordering-rules" element={<ReorderingRulesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/receipts" element={<ReceiptsPage />} />
        <Route path="/receipts/new" element={<CreateReceiptPage />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
        <Route path="/deliveries/new" element={<CreateDeliveryPage />} />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route path="/transfers/new" element={<CreateTransferPage />} />
        <Route path="/adjustments" element={<AdjustmentsPage />} />
        <Route path="/adjustments/new" element={<CreateAdjustmentPage />} />
        <Route path="/ledger" element={<LedgerPage />} />
        <Route path="/warehouses" element={<WarehousesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* AI Routes */}
        <Route path="/forecast" element={<ForecastPage />} />
        <Route path="/anomalies" element={<AnomaliesPage />} />
        <Route path="/copilot" element={<CopilotPage />} />
        
        {/* Analytics & Reports */}
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/suppliers/:id" element={<SupplierDetailPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* Default Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
