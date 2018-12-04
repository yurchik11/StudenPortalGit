using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("eJournal")]
    [Persistent("tblDiscipline")]
    [OptimisticLocking(false)]
    public class Discipline : XPLiteObject
    {
        public Discipline(Session session) : base(session)
        {
        }

        private int _id;
        private TeachingStaff _teachingStaff;
        private int _code;
        private string _name;
        private string _description;
        private int _lectureHours;
        private int _practicalHours;
        private bool _isExam;

        [Key(true)]
        [Persistent("Id")]
        public int Id
        {
            get { return _id; }
            set { SetPropertyValue("Id", ref _id, value); }
        }

        [Persistent("TeacherId"), RuleRequiredField(DefaultContexts.Save)]
        [Association("Discipline-TeachingStaff")]
        public TeachingStaff TeachingStaff
        {
            get { return _teachingStaff; }
            set { SetPropertyValue("TeachingStaff", ref _teachingStaff, value); }
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

        [Persistent("LectureHours")]
        public int LectureHours
        {
            get { return _lectureHours; }
            set { SetPropertyValue("LectureHours", ref _lectureHours, value); }
        }

        [Persistent("PracticalHours")]
        public int PracticalHours
        {
            get { return _practicalHours; }
            set { SetPropertyValue("PracticalHours", ref _practicalHours, value); }
        }

        [Persistent("IsExam")]
        public bool IsExam
        {
            get { return _isExam; }
            set { SetPropertyValue("IsExam", ref _isExam, value); }
        }

        [Association("Lesson-Discipline")]
        public XPCollection<Lesson> Lessons => GetCollection<Lesson>("Lessons");

        [Association("Term-Discipline")]
        public XPCollection<Term> Terms => GetCollection<Term>("Terms");

    }
}