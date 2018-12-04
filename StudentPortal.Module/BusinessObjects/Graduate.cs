using DevExpress.Xpo;
using System.ComponentModel;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("DepartmentInfo")]
    [Persistent("tblGraduate")]
    public class Graduate : XPLiteObject
    {
        public Graduate(Session session)  : base(session)
        {
        }

        private int _id;
        private string _familyName;
        private string _name;
        private string _surName;
        private string _speciality;
        private int _yearOfGraduation;
        private string _workPlace;
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

        [Persistent("Speciality"), RuleRequiredField(DefaultContexts.Save)]
        public string Speciality
        {
            get { return _speciality; }
            set { SetPropertyValue("Speciality", ref _speciality, value); }
        }

        [Persistent("YearOfGraduation"), RuleRequiredField(DefaultContexts.Save)]
        public int YearOfGraduation
        {
            get { return _yearOfGraduation; }
            set { SetPropertyValue("YearOfGraduation", ref _yearOfGraduation, value); }
        }

        [Persistent("WorkPlace"), RuleRequiredField(DefaultContexts.Save)]
        public string WorkPlace
        {
            get { return _workPlace; }
            set { SetPropertyValue("WorkPlace", ref _workPlace, value); }
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