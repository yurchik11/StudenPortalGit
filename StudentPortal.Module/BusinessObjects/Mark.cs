using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("eJournal")]
    [Persistent("tblMark")]
    [OptimisticLocking(false)]
    [Appearance("Appearance for Mark which don't present", TargetItems = "*", Criteria = "!IsPresent", Context = "Lesson_Marks_ListView", BackColor = "LightGray")]
    public class Mark : XPLiteObject
    {
        public Mark(Session session) : base(session)
        {
        }

        public Mark(Session session, Lesson lesson, Student student) : base(session)
        {
            Lesson = lesson;
            Student = student;
        }

        private int _id;
        private Lesson _lesson;
        private Student _student;
        private bool _isPresent;
        private int? _mark;
        private string _comment;

        [Key(true)]
        [Persistent("Id")]
        public int Id
        {
            get { return _id; }
            set { SetPropertyValue("Id", ref _id, value); }
        }

        [Persistent("LessonId")]
        [Association("Mark-Lesson"), RuleRequiredField(DefaultContexts.Save)]
        public Lesson Lesson
        {
            get { return _lesson; }
            set { SetPropertyValue("Lesson", ref _lesson, value); }
        }

        [Persistent("StudentId")]
        [Association("Mark-Student"), RuleRequiredField(DefaultContexts.Save)]
        public Student Student
        {
            get { return _student; }
            set { SetPropertyValue("Student", ref _student, value); }
        }

        [Persistent("IsPresent")]
        public bool IsPresent
        {
            get { return _isPresent; }
            set { SetPropertyValue("IsPresent", ref _isPresent, value); }
        }

        [Persistent("Mark")]
        [RuleRange(0,5)]
        public int? MarkValue
        {
            get { return _mark; }
            set { SetPropertyValue("Mark", ref _mark, value); }
        }

        [Persistent("Comment")]
        public string Comment
        {
            get { return _comment; }
            set { SetPropertyValue("Comment", ref _comment, value); }
        }

    }
}