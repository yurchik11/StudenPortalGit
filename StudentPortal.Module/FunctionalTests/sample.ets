;#DropDB StudentPortalEasyTest

#Application StudentPortal.Win
#Application StudentPortal.Web

*FillForm
 User Name = Admin
*Action Log In

#IfDef StudentPortal.Win

*Action About...
 
*Action OK

#EndIf

#IfDef StudentPortal.Web
*Action Navigation(My Details)
#EndIf
