using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("eJournal")]
    [Persistent("tblSpeciality")]
    [OptimisticLocking(false)]
    public class Speciality : XPLiteObject
    {
        public Speciality(Session session) : base(session)
        {
        }

        private int _id;
        private Department _department;
        private int _code;
        private string _name;
        private string _description;
        private string _branchOfKnowledge;

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

        [Persistent("Description")]
        [Size(SizeAttribute.Unlimited)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        [Persistent("BranchOfKnowledge")]
        public string BranchOfKnowledge
        {
            get { return _branchOfKnowledge; }
            set { SetPropertyValue("BranchOfKnowledge", ref _branchOfKnowledge, value); }
        }

        [Association("Speciality-Group")]
        public XPCollection<Group> Groups => GetCollection<Group>("Groups");
    }
}