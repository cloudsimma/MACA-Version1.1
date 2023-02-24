try 
{
	//openUrl("https://crm.zoho.com/crm/org7626235/tab/SalesOrders/" + input.Zoho_CRM_ID,"parent window"); // old module
	openUrl("https://crm.zoho.com/crm/org7626235/tab/CustomModule9/" + input.Zoho_CRM_ID,"parent window");
	// new Module
}
catch (e)
{
	thisapp.Developer.addDeveloperLog("Order","Redirect-CRM ",input.Zoho_CRM_ID.toString(),e);
	// 			info e;
}
