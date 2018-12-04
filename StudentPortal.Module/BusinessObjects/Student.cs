using System;
using System.ComponentModel;
using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("DepartmentInfo")]
    [Persistent("tblStudent")]
    [OptimisticLocking(false)]
    public class Student : XPLiteObject
    {
        public Student(Session session) : base(session)
        {
        }

        public override void AfterConstruction()
        {
            base.AfterConstruction();

            IsFullTimeEducation = true;
            IsMan = true;
            IsPaidEducation = false;
        }

        private int _id;
        private Group _group;
        private int _code;
        private string _familyName;
        private string _name;
        private string _surName;
        private DateTime _birthDay;
        private bool _isMan;
        private string _address;
        private string _telNumber;
        private string _homeTelNumber;
        private int _yearOfStart;
        private int _yearOfEnd;
        private bool _isFullTimeEducation;
        private bool _isPaidEducation;


        [Key(true)]
        [Persistent("Id")]
        public int Id
        {
            get { return _id; }
            set { SetPropertyValue("Id", ref _id, value); }
        }

        [Persistent("GroupId"), RuleRequiredField(DefaultContexts.Save)]
        [Association("Group-Student")]
        public Group Group
        {
            get { return _group; }
            set { SetPropertyValue("Group", ref _group, value); }
        }

        [Persistent("Code")]
        public int Code
        {
            get { return _code; }
            set { SetPropertyValue("Code", ref _code, value); }
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

        [Persistent("BirthDay")]
        public DateTime BirthDay
        {
            get { return _birthDay; }
            set { SetPropertyValue("BirthDay", ref _birthDay, value); }
        }

        [Persistent("Address")]
        public string Address
        {
            get { return _address; }
            set { SetPropertyValue("Address", ref _address, value); }
        }

        [Persistent("TelNumber")]
        public string TelNumber
        {
            get { return _telNumber; }
            set { SetPropertyValue("TelNumber", ref _telNumber, value); }
        }

        [Persistent("HomeTelNumber")]
        public string HomeTelNumber
        {
            get { return _homeTelNumber; }
            set { SetPropertyValue("HomeTelNumber", ref _homeTelNumber, value); }
        }

        [Persistent("YearOfStart")]
        public int YearOfStart
        {
            get { return _yearOfStart; }
            set { SetPropertyValue("YearOfStart", ref _yearOfStart, value); }
        }

        [Persistent("YearOfEnd")]
        public int YearOfEnd
        {
            get { return _yearOfEnd; }
            set { SetPropertyValue("YearOfEnd", ref _yearOfEnd, value); }
        }

        [Persistent("IsMan")]
        public bool IsMan
        {
            get { return _isMan; }
            set { SetPropertyValue("IsMan", ref _isMan, value); }
        }

        [Persistent("IsFullTimeEducation")]
        public bool IsFullTimeEducation
        {
            get { return _isFullTimeEducation; }
            set { SetPropertyValue("IsFullTimeEducation", ref _isFullTimeEducation, value); }
        }

        [Persistent("IsPaidEducation")]
        public bool IsPaidEducation
        {
            get { return _isPaidEducation; }
            set { SetPropertyValue("IsPaidEducation", ref _isPaidEducation, value); }
        }

        [Association("Mark-Student")]
        public XPCollection<Mark> Marks => GetCollection<Mark>("Marks");

        [Association("TermMark-Student")]
        public XPCollection<TermMark> TermMarks => GetCollection<TermMark>("TermMarks");
    }
}