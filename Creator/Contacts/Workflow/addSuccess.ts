try 
{
	if(input.CRM_Company_ID_Internal != null && input.CRM_Company_ID_Internal != "")
	{
		getCompanyInfo = Company_Details[Zoho_CRM_ID == input.CRM_Company_ID_Internal];
		if(getCompanyInfo.count() > 0)
		{
			input.Company_Name = getCompanyInfo.ID;
		}
	}
	if(input.CRM_Supplier_ID_Internal != null && input.CRM_Supplier_ID_Internal != "")
	{
		getSupplierInfo = Supplier_Details[Zoho_CRM_ID == input.CRM_Supplier_ID_Internal];
		if(getSupplierInfo.count() > 0)
		{
			input.Supplier_Name = getSupplierInfo.ID;
		}
	}
	info input.CRM_Company_ID_Internal;
}
catch (e)
{
	thisapp.Developer.addDeveloperLog("Contact","Update Field in Creator",input.CRM_Company_ID_Internal.toString() + input.CRM_Supplier_ID_Internal.toString(),e);
	info e;
}
