//Param : SOID
appName = "order-management";
ownerName = "vanessa68";
if(SOID != null)
{
	getCreatorQuote = zoho.creator.getRecords(ownerName,appName,"All_Supplier_Orders","Zoho_CRM_ID == \"" + SOID + "\"",1,200,"zohocreatorcon");
	info getCreatorQuote;
	if(getCreatorQuote.get("code") == "3000" && getCreatorQuote.get("data").size() > 0 && getCreatorQuote.get("data").get(0).get("ID") != null)
	{
		getBooksID = getCreatorQuote.get("data").get(0).get("Zoho_Books_PurchaseOrder_ID");
		// 		info "getBooksID" + getBooksID;
		// 		info "creator id" +  getCreatorQuote.get("data").get(0).get("ID");
		if(getBooksID != null && getBooksID != "")
		{
			respBook = invokeurl
			[
				url :"https://books.zoho.com/api/v3/purchaseorders/" + getBooksID + "?organization_id=328433160"
				type :DELETE
				connection:"books"
			];
			info respBook;
		}
		respCreator = invokeurl
		[
			url :"https://creator.zoho.com/api/v2/vanessa68/order-management/report/All_Supplier_Orders/" + getCreatorQuote.get("data").get(0).get("ID")
			type :DELETE
			connection:"zohocreatorcon"
		];
		info respCreator;
	}
}