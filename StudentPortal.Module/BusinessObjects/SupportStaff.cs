using DevExpress.Xpo;
using System.ComponentModel;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo.Metadata;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("DepartmentInfo")]
    [Persistent("tblSupportStaff")]
    public class SupportStaff : XPLiteObject
    {
        public SupportStaff(Session session) : base(session)
        {
        }

        private int _id;
        private string _familyName;
        private string _name;
        private string _surName;
        private string _position;
        private int _yearOfStartWork;
        private int _yearOfEndWork;
        private System.Drawing.Image _photo;
        private int _code;

        [Key(true)]
        [Persistent("Id")]
        public int Id
        {
            get { return _id; }
            set { SetPropertyValue("Id", ref _id, value); }
        }

        [Persistent("FamilyName"), RuleRequiredField(DefaultContexts.Save)]
        public string FamilyName
        {
            get { return _familyName; }
            set { SetPropertyValue("FamilyName", ref _familyName, value); }
        }

        [Persistent("Name"), RuleRequiredField(DefaultContexts.Save)]
        public string Name
        {
            get { return _name; }
            set { SetPropertyValue("Name", ref _name, value); }
        }

        [Persistent("SurName")]
        public string SurName
        {
            get { return _surName; }
            set { SetPropertyValue("SurName", ref _surName, value); }
        }

        [Persistent("Position"), RuleRequiredField(DefaultContexts.Save)]
        public string Position
        {
            get { return _position; }
            set { SetPropertyValue("Position", ref _position, value); }
        }

        [Persistent("YearOfStartWork")]
        public int YearOfStartWork
        {
            get { return _yearOfStartWork; }
            set { SetPropertyValue("YearOfStartWork", ref _yearOfStartWork, value); }
        }

        [Persistent("YearOfEndWork")]
        public int YearOfEndWork
        {
            get { return _yearOfEndWork; }
            set { SetPropertyValue("YearOfEndWork", ref _yearOfEndWork, value); }
        }

        [Size(SizeAttribute.Unlimited), ValueConverter(typeof(ImageValueConverter))]
        public System.Drawing.Image Photo
        {
            get { return _photo; }
            set { SetPropertyValue("Photo", ref _photo, value); }
        }

        [Persistent("Code"), RuleRequiredField(DefaultContexts.Save)]
        [Browsable(false)]
        public int Code
        {
            get { return _code; }
            set { SetPropertyValue("Code", ref _code, value); }
        }
    }
}