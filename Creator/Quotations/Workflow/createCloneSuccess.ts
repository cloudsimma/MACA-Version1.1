try 
{
	getCRMQuote = zoho.crm.getRecordById("Quotations",input.Zoho_CRM_ID.toLong());
	if(getCRMQuote != null && getCRMQuote.get("id") != null)
	{
		if(getCRMQuote.get("Clone_From") != null && getCRMQuote.get("Clone_From") != "")
		{
			for each  item in Quotation_Items[Quotation_ID = input.ID]
			{
				for each  cloneItem in Quotation_Items[Quotation_ID == getCRMQuote.get("Clone_From").toLong()]
				{
					if(item.Total == cloneItem.Total && item.Product_Name == cloneItem.Product_Name)
					{
						item.Image_URL=cloneItem.Image_URL;
						item.Image_URL_2=cloneItem.Image_URL_2;
					}
				}
			}
			getClonedQuoteInfo = Quotations[ID == getCRMQuote.get("Clone_From").toLong()];
			if(getClonedQuoteInfo.count() > 0)
			{
				content = "Repeat Quotation \n";
				content = content + "Cloned From - Quote #" + getClonedQuoteInfo.Quotation_No;
				thisapp.creator.addNotes("Clone",content,input.Zoho_CRM_ID,"Quotations",input.Quotation_Owner);
			}
		}
	}
}
catch (e)
{
	res = insert into Developer_Log
	[
		Added_User=zoho.loginuser
		Out_Response=e
		Process_Description="Clone from"
		In_Data=input.Zoho_CRM_ID
		Module="Quotation new"
	];
}
