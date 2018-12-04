using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("eJournal")]
    [Persistent("tblGroup")]
    [OptimisticLocking(false)]
    public class Group : XPLiteObject
    {
        public Group(Session session) : base(session)
        {
        }

        private int _id;
        private Speciality _speciality;
        private Department _department;
        private int _code;
        private string _name;
        private int _numOfStud;
        private int _course;

        [Key(true)]
        [Persistent("Id")]
        public int Id
        {
            get { return _id; }
            set { SetPropertyValue("Id", ref _id, value); }
        }

        [Persistent("SpecialityId")]
        [Association("Speciality-Group"), RuleRequiredField(DefaultContexts.Save)]
        public Speciality Speciality
        {
            get { return _speciality; }
            set { SetPropertyValue("Faculty", ref _speciality, value); }
        }

        [Persistent("DepartmentId")]
        [Association("Department-Group"), RuleRequiredField(DefaultContexts.Save)]
        public Department Department
        {
            get { return _department; }
            set { SetPropertyValue("Department", ref _department, value); }
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

        [Persistent("NumOfStud")]
        public int NumOfStud
        {
            get { return _numOfStud; }
            set { SetPropertyValue("NumOfStud", ref _numOfStud, value); }
        }

        [Persistent("Course")]
        public int Course
        {
            get { return _course; }
            set { SetPropertyValue("Course", ref _course, value); }
        }

        [Association("Group-Student")]
        public XPCollection<Student> Students => GetCollection<Student>("Students");

        [Association("Lesson-Group")]
        public XPCollection<Lesson> Lessons => GetCollection<Lesson>("Lessons");

        [Association("Term-Group")]
        public XPCollection<Term> Terms => GetCollection<Term>("Terms");
    }
}