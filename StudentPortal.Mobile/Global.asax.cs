﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using DevExpress.ExpressApp.Mobile;
using DevExpress.ExpressApp.ReportsV2.Mobile;
using DevExpress.XtraReports.Web.WebDocumentViewer;

namespace StudentPortal.Mobile {
    public class Global : System.Web.HttpApplication {
        protected void Application_Start(Object sender, EventArgs e) {
            DefaultWebDocumentViewerContainer.Register<IWebDocumentViewerReportResolver, XafReportsResolver<StudentPortalMobileApplication>>();
        }
		protected void Application_BeginRequest(object sender, EventArgs e) {
            CorsSupport.HandlePreflightRequest(HttpContext.Current);
        }
}