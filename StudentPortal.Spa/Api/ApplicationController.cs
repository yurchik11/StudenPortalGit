using DevExpress.ExpressApp.Spa;
using DevExpress.ExpressApp.Spa.AspNetCore;
using DevExpress.ExpressApp.Spa.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentPortal.Spa.Api {
	[Microsoft.AspNetCore.Authorization.AllowAnonymous]
    public class StudentPortalSpaApplicationController : SpaApplicationController {
        public StudentPortalSpaApplicationController(ISpaApplicationProvider applicationProvider) : base(applicationProvider) { }
    }
}