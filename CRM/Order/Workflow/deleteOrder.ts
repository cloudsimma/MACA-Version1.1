//Param : OrderID , creatorID
appName = "order-management";
ownerName = "vanessa68";
if(CreatorID != null && CreatorID != "")
{
	getCreatorQuote = zoho.creator.getRecords(ownerName,appName,"All_Orders","Zoho_CRM_ID == \"" + OrderID + "\"",1,200,"zohocreatorcon");
	//info getCreatorQuote;
	if(getCreatorQuote.get("code") == "3000" && getCreatorQuote.get("data").size() > 0)
	{
		getBooksID = getCreatorQuote.get("data").get(0).get("Zoho_Books_ID");
		if(getBooksID != null && getBooksID != "")
		{
			respBook = invokeurl
			[
				url :"https://books.zoho.com/api/v3/salesorders/" + getBooksID + "?organization_id=328433160"
				type :DELETE
				connection:"books"
			];
			info respBook;
		}
	}
	respCreator = invokeurl
	[
		url :"https://creator.zoho.com/api/v2/vanessa68/order-management/report/All_Orders/" + CreatorID
		type :DELETE
		connection:"zohocreatorcon"
	];
	info respCreator;
}