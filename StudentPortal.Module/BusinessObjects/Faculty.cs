using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using System.Drawing;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo.Metadata;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("eJournal")]
    [Persistent("tblFaculty")]
    [OptimisticLocking(false)]
    public class Faculty : XPLiteObject
    {
        public Faculty(Session session) : base(session)
        {
        }

        private int _id;
        private int _code;
        private string _name;
        private string _address;
        private string _description;
        private string _telNumber;
        private string _siteAddress;
        private Image _photo;

        [Key(true)]
        [Persistent("Id")]
        public int Id
        {
            get { return _id; }
            set { SetPropertyValue("Id", ref _id, value); }
        }

        [Persistent("Code")]
        public int Code
        {
            get { return _code; }
            set { SetPropertyValue("Code", ref _code, value); }
        }

        [Persistent("Name"), RuleRequiredField(DefaultContexts.Save)]
        public string Name
        {
            get { return _name; }
            set { SetPropertyValue("Name", ref _name, value); }
        }

        [Persistent("Address"), RuleRequiredField(DefaultContexts.Save)]
        public string Address
        {
            get { return _address; }
            set { SetPropertyValue("Address", ref _address, value); }
        }

        [Persistent("Description")]
        [Size(SizeAttribute.Unlimited)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        [Persistent("TelNumber")]
        public string TelNumber
        {
            get { return _telNumber; }
            set { SetPropertyValue("TelNumber", ref _telNumber, value); }
        }

        [Persistent("SiteAddress")]
        public string SiteAddress
        {
            get { return _siteAddress; }
            set { SetPropertyValue("SiteAddress", ref _siteAddress, value); }
        }

        [Persistent("Photo")]
        [Size(SizeAttribute.Unlimited), ValueConverter(typeof(ImageValueConverter))]
        public Image Photo
        {
            get { return _photo; }
            set { SetPropertyValue("Photo", ref _photo, value); }
        }

        [Association("Faculty-Department")]
        public XPCollection<Department> Departments => GetCollection<Department>("Departments");
    }
}