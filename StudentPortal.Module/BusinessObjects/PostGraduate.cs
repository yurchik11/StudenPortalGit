﻿using DevExpress.Xpo;
using System.ComponentModel;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo.Metadata;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("DepartmentInfo")]
    [Persistent("tblPostgraduate")]
    public class PostGraduate : XPLiteObject
    {
        public PostGraduate(Session session)  : base(session)
        {
        }

        private int _id;
        private string _familyName;
        private string _name;
        private string _surName;
        private int _yearOfGraduation;
        private int _yearOfDefenseDissertation;
        private string _nameOfEducationInstitution;
        private string _note;
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

        [Persistent("YearOfGraduation")]
        public int YearOfGraduation
        {
            get { return _yearOfGraduation; }
            set { SetPropertyValue("YearOfGraduation", ref _yearOfGraduation, value); }
        }

        [Persistent("YearOfDefenseDissertation")]
        public int YearOfDefenseDissertation
        {
            get { return _yearOfDefenseDissertation; }
            set { SetPropertyValue("YearOfDefenseDissertation", ref _yearOfDefenseDissertation, value); }
        }

        [Persistent("NameOfEducationInstitution")]
        public string NameOfEducationInstitution
        {
            get { return _nameOfEducationInstitution; }
            set { SetPropertyValue("NameOfEducationInstitution", ref _nameOfEducationInstitution, value); }
        }

        [Persistent("Note")]
        public string Note
        {
            get { return _note; }
            set { SetPropertyValue("Note", ref _note, value); }
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