namespace StudentPortal.Module.Spa {
    partial class StudentPortalSpaModule {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing) {
            if(disposing && (components != null)) {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent() {
            // 
            // StudentPortalSpaModule
            // 
            this.RequiredModuleTypes.Add(typeof(StudentPortal.Module.StudentPortalModule));
            this.RequiredModuleTypes.Add(typeof(DevExpress.ExpressApp.Spa.SystemModule.SystemSpaModule));
        }

        #endregion
    }
}