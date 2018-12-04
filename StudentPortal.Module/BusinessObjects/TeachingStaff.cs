using System;
using DevExpress.Xpo;
using System.ComponentModel;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo.Metadata;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("DepartmentInfo")]
    [Persistent("tblTeachingStaff")]
    public class TeachingStaff : XPLiteObject
    {
        public TeachingStaff(Session session)  : base(session)
        {
        }

        public override void AfterConstruction()
        {
            base.AfterConstruction();

            IsActive = true;
        }

        private int _id;
        private string _familyName;
        private string _name;
        private string _surName;
        private bool _isActive;
        private DateTime _dateOfBirthDay;
        private string _academicStatus;
        private string _academicDegree;
        private string _workingPhone;
        private string _scientificInterests;
        private string _finishedUniversity;
        private int _yearOfDefenseDissertation;
        private string _subjectOfDissertation;
        private int _yearOfStartWork;
        private int _yearOfEndWork;
        private System.Drawing.Image _photo;
        private int _code;
        private Department _department;

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

        [Browsable(false)]
        [PersistentAlias("FamilyName + ' ' + Name")]
        public string FullName => EvaluateAlias("FullName") as string;

        [Persistent("SurName")]
        public string SurName
        {
            get { return _surName; }
            set { SetPropertyValue("SurName", ref _surName, value); }
        }

        [Persistent("IsActive")]
        public bool IsActive
        {
            get { return _isActive; }
            set { SetPropertyValue("IsActive", ref _isActive, value); }
        }

        [Association("Department-TeachingStaff")]
        [Persistent("DepartmentId")]
        public Department Department
        {
            get { return _department; }
            set { SetPropertyValue("Department", ref _department, value); }
        }

        [Persistent("DateOfBirthday")]
        public DateTime DateOfBirthday
        {
            get { return _dateOfBirthDay; }
            set { SetPropertyValue("DateOfBirthday", ref _dateOfBirthDay, value); }
        }

        [Persistent("AcademicStatus")]
        public string AcademicStatus
        {
            get { return _academicStatus; }
            set { SetPropertyValue("AcademicStatus", ref _academicStatus, value); }
        }

        [Persistent("AcademicDegree")]
        public string AcademicDegree
        {
            get { return _academicDegree; }
            set { SetPropertyValue("AcademicDegree", ref _academicDegree, value); }
        }

        [Persistent("WorkingPhone")]
        public string WorkingPhone
        {
            get { return _workingPhone; }
            set { SetPropertyValue("WorkingPhone", ref _workingPhone, value); }
        }

        [Persistent("ScientificInterests")]
        public string ScientificInterests
        {
            get { return _scientificInterests; }
            set { SetPropertyValue("ScientificInterests", ref _scientificInterests, value); }
        }

        [Persistent("FinishedUniversity")]
        public string FinishedUniversity
        {
            get { return _finishedUniversity; }
            set { SetPropertyValue("FinishedUniversity", ref _finishedUniversity, value); }
        }

        [Persistent("YearOfDefenseDissertation")]
        public int YearOfDefenseDissertation
        {
            get { return _yearOfDefenseDissertation; }
            set { SetPropertyValue("YearOfDefenseDissertation", ref _yearOfDefenseDissertation, value); }
        }

        [Persistent("SubjectOfDissertation")]
        public string SubjectOfDissertation
        {
            get { return _subjectOfDissertation; }
            set { SetPropertyValue("SubjectOfDissertation", ref _subjectOfDissertation, value); }
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

        [Association("Discipline-TeachingStaff")]
        public XPCollection<Discipline> Disciplines => GetCollection<Discipline>("Disciplines");
    }
}