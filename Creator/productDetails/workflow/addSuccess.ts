try 
{
	if(input.CRM_Supplier_ID_Internal != null && input.CRM_Supplier_ID_Internal != "")
	{
		getSupplierInfo = Supplier_Details[Zoho_CRM_ID == input.CRM_Supplier_ID_Internal];
		if(getSupplierInfo.ID != null)
		{
			input.Supplier_Name = getSupplierInfo.ID;
		}
		else
		{
		}
	}
}
catch (e)
{
	thisapp.Developer.addDeveloperLog("Product Details","Update Supplier field in Creator",input.CRM_Supplier_ID_Internal.toString(),e);
	//info e;
}
