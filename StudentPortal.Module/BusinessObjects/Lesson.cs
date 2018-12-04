using System;
using DevExpress.Xpo;
using DevExpress.Persistent.Base;
using DevExpress.Data.Filtering;
using DevExpress.Persistent.Validation;

namespace StudentPortal.Module.BusinessObjects
{
    [DefaultClassOptions]
    [NavigationItem("eJournal")]
    [Persistent("tblLesson")]
    [OptimisticLocking(false)]
    public class Lesson : XPLiteObject
    {
        public Lesson(Session session) : base(session)
        {
        }

        private int _id;
        private Discipline _descipline;
        private Group _group;
        private string _name;
        private DateTime _date;
        private string _description;

        public override void AfterConstruction()
        {
            base.AfterConstruction();

            Date = DateTime.Today;
        }

        protected override void OnSaving()
        {
            base.OnSaving();

            var criteria = CriteriaOperator.Parse($"Group.Id = {Group.Id}");

            if (Marks.Count > 0) return;

            using (var students = new XPCollection<Student>(Session, criteria))
            {
                foreach (var student in students)
                {
                    var mark = new Mark(Session, this, student);
                    Marks.Add(mark);
                }
            }
        }

        [Key(true)]
        [Persistent("Id")]
        public int Id
        {
            get { return _id; }
            set { SetPropertyValue("Id", ref _id, value); }
        }

        [Persistent("DisciplineId")]
        [Association("Lesson-Discipline"), RuleRequiredField(DefaultContexts.Save)]
        [ImmediatePostData]
        public Discipline Discipline
        {
            get { return _descipline; }
            set { SetPropertyValue("Discipline", ref _descipline, value); }
        }

        [Persistent("GroupId")]
        [Association("Lesson-Group"), RuleRequiredField(DefaultContexts.Save)]
        public Group Group
        {
            get { return _group; }
            set { SetPropertyValue("Group", ref _group, value); }
        }

        [Persistent("Date"), RuleRequiredField(DefaultContexts.Save)]
        public DateTime Date
        {
            get { return _date; }
            set { SetPropertyValue("Date", ref _date, value); }
        }

        [Persistent("Name"), RuleRequiredField(DefaultContexts.Save)]
        public string Name
        {
            get { return _name; }
            set { SetPropertyValue("Name", ref _name, value); }
        }

        [PersistentAlias("Discipline.TeachingStaff")]
        public TeachingStaff Teacher
        {
            get { return EvaluateAlias("Teacher") as TeachingStaff; }
        }

        [Persistent("Description")]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        [Association("Mark-Lesson")]
        public XPCollection<Mark> Marks => GetCollection<Mark>("Marks");
    }
}