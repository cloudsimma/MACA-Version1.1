try 
{
	openUrl("https://crm.zoho.com/crm/org7626235/tab/CustomModule6/" + input.Zoho_CRM_ID,"parent window");
}
catch (e)
{
	thisapp.Developer.addDeveloperLog("Quotations","Redirect-CRM ",input.Zoho_CRM_ID.toString(),e);
	// 			info e;
}
