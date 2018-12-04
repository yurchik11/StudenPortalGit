using DevExpress.ExpressApp.Spa.AspNetCore;
using DevExpress.ExpressApp.Spa.AspNetCore.Mvc;

namespace StudentPortal.Spa.Api
{
    public class StudentPortalSpaMetaDataController : MetaDataController {
        public StudentPortalSpaMetaDataController(ISpaApplicationProvider applicationProvider) : base(applicationProvider) { }
    }
}