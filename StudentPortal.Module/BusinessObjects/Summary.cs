using System;
using System.Linq;
using System.Text;
using DevExpress.Xpo;
using DevExpress.ExpressApp;
using System.ComponentModel;
using DevExpress.ExpressApp.DC;
using DevExpress.Data.Filtering;
using DevExpress.Persistent.Base;
using System.Collections.Generic;
using DevExpress.ExpressApp.Model;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Persistent.Validation;

namespace RadioPhysics.Module.BusinessObjects
{
    [DefaultClassOptions]
    //[ImageName("BO_Contact")]
    //[DefaultProperty("DisplayMemberNameForLookupEditorsOfThisType")]
    //[DefaultListViewOptions(MasterDetailMode.ListViewOnly, false, NewItemRowPosition.None)]
    [NavigationItem("SummaryData")]
    //[Persistent("Summary")]//[Persistent("DatabaseTableName")]
    // Specify more UI options using a declarative approach (https://documentation.devexpress.com/#eXpressAppFramework/CustomDocument112701).
    public class Summary : BaseObject
    { // Inherit from a different class to provide a custom primary key, concurrency and deletion behavior, etc. (https://documentation.devexpress.com/eXpressAppFramework/CustomDocument113146.aspx).
        public Summary(Session session)
            : base(session)
        {
        }
        public override void AfterConstruction()
        {
            base.AfterConstruction();
            // Place your initialization code here (https://documentation.devexpress.com/eXpressAppFramework/CustomDocument112834.aspx).
        }
        private string _familyName;
        private string _name;
        private string _surName;
        private string _position;
        private int _yearOfStartWork;
        private int _yearOfEndWork;
        private string _tableName;
        private int _tableID;



        //[Persistent("FamilyName"), RuleRequiredField(DefaultContexts.Save)]
        public string FamilyName
        {
            get { return _familyName; }
            set { SetPropertyValue("FamilyName", ref _familyName, value); }
        }

       // [Persistent("Name"), RuleRequiredField(DefaultContexts.Save)]
        public string Name
        {
            get { return _name; }
            set { SetPropertyValue("Name", ref _name, value); }
        }

       // [Persistent("SurName")]
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

       // [Persistent("YearOfStartWork")]
        public int YearOfStartWork
        {
            get { return _yearOfStartWork; }
            set { SetPropertyValue("YearOfStartWork", ref _yearOfStartWork, value); }
        }

       // [Persistent("YearOfEndWork")]
        public int YearOfEndWork
        {
            get { return _yearOfEndWork; }
            set { SetPropertyValue("YearOfEndWork", ref _yearOfEndWork, value); }
        }

        //[Persistent("TableName")]
        public string TableName
        {
            get { return _tableName; }
            set { SetPropertyValue("TableName", ref _tableName, value); }
        }

        [Browsable(false)]
        //[Persistent("TableID")]
        public int TableID
        {
            get { return _tableID; }
            set { SetPropertyValue("TableID", ref _tableID, value); }
        }
    }
}