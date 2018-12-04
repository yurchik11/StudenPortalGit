using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("Term")]
    [Persistent("tblTermMark")]
    [OptimisticLocking(false)]
    [Appearance("Appearance for TermMark which don't present", TargetItems = "*", Criteria = "!IsPresent", Context = "Term_TermMarks_ListView", BackColor = "LightGray")]
    public class TermMark : XPLiteObject
    {
        public TermMark(Session session) : base(session)
        {
        }

        public TermMark(Session session, Term term, Student student) : base(session)
        {
            Term = term;
            Student = student;
        }

        private int _id;
        private Term _term;
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

        [Persistent("TermId")]
        [Association("TermMark-Term"), RuleRequiredField(DefaultContexts.Save)]
        public Term Term
        {
            get { return _term; }
            set { SetPropertyValue("Lesson", ref _term, value); }
        }

        [Persistent("StudentId")]
        [Association("TermMark-Student"), RuleRequiredField(DefaultContexts.Save)]
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
        [RuleRange(0,100)]
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