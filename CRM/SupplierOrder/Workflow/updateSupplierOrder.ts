try 
{
	appName = "order-management";
	ownerName = "vanessa68";
	returnResp = "";
	supplierID = "";
	dataMap = Map();
	productMap = Map();
	dataMap.put("CRM_Order_ID",SOID);
	dataMap.put("Module_name","Update_from_New_Module");
	CreatorResponse = zoho.creator.createRecord(ownerName,appName,"Supplier_Order_Creation_From_CRM",dataMap,Map(),"zohocreatorcon");
	// 	info "CreatorResponse :" + CreatorResponse;
	//Update PO in Books
	orgID = "328433160";
	getCreatorSO = zoho.creator.getRecords(ownerName,appName,"All_Supplier_Orders","Zoho_CRM_ID == \"" + SOID + "\"",1,200,"zohocreatorcon");
	if(getCreatorSO.get("code") == "3000")
	{
		getBooksID = getCreatorSO.get("data").get(0).get("Zoho_Books_PurchaseOrder_ID");
		//info "getBooksID" + getBooksID;
		creatorVendorID = getCreatorSO.get("data").get(0).get("Suppliers").get("ID");
		getSupplierData = zoho.creator.getRecordById(ownerName,appName,"All_Vendor_Details",creatorVendorID,"zohocreatorcon");
		//info getSupplierData;
		if(getSupplierData.get("code") == 3000)
		{
			booksVendorID = getSupplierData.get("data").get("Zoho_Books_ID");
			productMap.put("vendor_id",booksVendorID);
		}
	}
	getSoData = zoho.crm.getRecordById("Supplier_orders_new",SOID);
	getItems = getSoData.get("Purchased_items");
	getExtras = getSoData.get("Extras_Item");
	getBooksSOInfo = zoho.books.getRecordsByID("purchaseorders",orgID,getBooksID);
	//info "getBooksSOInfo" + getBooksSOInfo.get("purchaseorder").get("line_items").get(0);
	itemList = list();
	for each  item in getItems
	{
		itemmap = Map();
		if(item.get("Product_Name") != null)
		{
			ProdID = zoho.crm.getRecordById("ProductNew",item.get("Product_Name").get("id"));
			itemmap.put("item_id",ProdID.get("Books_Product_ID"));
			itemmap.put("name",item.get("Product_Name").get("Name"));
			itemmap.put("rate",item.get("Rate"));
			itemmap.put("quantity",item.get("Quantity"));
			itemmap.put("description",item.get("Description"));
			itemList.add(itemmap);
		}
	}
	for each  extras in getExtras
	{
		extarsmap = Map();
		if(extras.get("Product") != null)
		{
			ExtrasID = zoho.crm.getRecordById("Extras_New",extras.get("Product").get("id"));
			extarsmap.put("item_id",ExtrasID.get("Books_Product_ID"));
			extarsmap.put("name",extras.get("Product").get("Name"));
			extarsmap.put("rate",extras.get("Unit_Price"));
			extarsmap.put("quantity",extras.get("Quantity"));
			extarsmap.put("description",extras.get("Description"));
			itemList.add(extarsmap);
			//	info "IDDDD " + extras.get("Product").get("id");
			if(extras.get("Product").get("id") == 449573000118906025)
			{
				//	info "IDFFFF " + extras.get("Total_Amount");
				TransportMap = Map();
				TransportMap.put("Total_transport",extras.get("Total_Amount"));
				TransportUpdate = zoho.crm.updateRecord("Supplier_orders_new",SOID,TransportMap);
			}
		}
	}
	productMap.put("line_items",itemList);
	info "productMap" + productMap;
	updateBooks = zoho.books.updateRecord("purchaseorders",orgID,getBooksID,productMap);
	info updateBooks;
}
catch (e)
{
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMaps = Map();
	dataMaps.put("Module","Orders New");
	dataMaps.put("Process_Description"," CRM:Sales Orders to Supplier Order Old Module");
	dataMaps.put("In_Data",SOID);
	dataMaps.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMap,Map(),"zohocreatorcon");
	//info ContactCreateResponse;
}