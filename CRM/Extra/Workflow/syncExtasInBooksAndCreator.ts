//Time tracking - Add start time to notes - startes here
createnote = Map();
createnote.put("Note_Content","Execution Start Time " + zoho.currenttime);
createnote.put("Parent_Id",ExtrasID);
createnote.put("se_module","Extras_New");
//info createnote;
createnotelist = List();
createnotelist.add(createnote);
finalcreatenote = Map();
finalcreatenote.put("data",createnotelist);
//info finalcreatenote;
respcreatenote = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/Extras_New/" + ExtrasID + "/Notes"
	type :POST
	parameters:finalcreatenote.tostring()
	connection:"zohooauth"
];
//Time tracking - Add start time to notes - Ends here
try 
{
	getProduct1 = zoho.crm.getRecordById("Extras_New",ExtrasID);
	CreatorProductID1 = if(getProduct1.get("CreatorProductID") != null && getProduct1.get("CreatorProductID") != "",getProduct1.get("CreatorProductID"),"");
	if(CreatorProductID1 == "")
	{
		descmap = Map();
		info "test" + getProduct1.get("prod_code");
		if(getProduct1.get("Product_Code") == null)
		{
			constcode = getProduct1.get("Name").subString(0,2) + ExtrasID.tostring().subString(13,18);
			descmap.put("Product_Code",constcode);
		}
		else
		{
			constcode = getProduct1.get("Product_Code");
			descmap.put("Product_Code",constcode);
		}
		if(getProduct1.get("Supplier") != null)
		{
			getSupplier = zoho.crm.getRecordById("Vendors",getProduct1.get("Supplier").get("id"));
			getSupplierCode = getSupplier.get("Num_ro_fournisseur");
			booksprodname = getProduct1.get("Name") + "-" + constcode + "-" + getSupplierCode + "-" + "NP";
			booksprodcode = constcode + "-" + getSupplierCode + "-" + "NP";
		}
		else
		{
			getSupplierCode = "";
			booksprodname = getProduct1.get("Name") + "-" + constcode + "-" + "NP";
			booksprodcode = constcode + "-" + "NP";
		}
		descmap.put("Books_Prod_Name",booksprodname);
		descmap.put("Books_Prod_Code",booksprodcode);
		if(!getProduct1.get("Name").contains("["))
		{
			descmap.put("Name"," [" + constcode + "] " + getProduct1.get("Name"));
		}
		updateprod = zoho.crm.updateRecord("Extras_New",ExtrasID,descmap);
		info updateprod;
	}
	getProduct = zoho.crm.getRecordById("Extras_New",ExtrasID);
	//info "Product Details" + getProduct;
	productName = getProduct.get("Name");
	CreatorProductID = if(getProduct.get("CreatorProductID") != null && getProduct.get("CreatorProductID") != "",getProduct.get("CreatorProductID"),"");
	productCode = getProduct.get("Product_Code");
	unitPrice = if(getProduct.get("Unit_Price") != null,getProduct.get("Unit_Price"),0);
	Description = getProduct.get("Description");
	discountCode = if(getProduct.get("Code_escompte") != null,getProduct.get("Code_escompte"),"");
	info "creator id " + CreatorProductID;
	if(CreatorProductID == "")
	{
		info "hiii";
		//info "Creator product";
		data_map = Map();
		ownerName = "vanessa68";
		formName = "Product_Details";
		appName = "order-management";
		baseUrl = "creatorapp.zoho.com";
		orgID = "328433160";
		data_map.put("Zoho_CRM_ID",ExtrasID);
		data_map.put("Product_Name",productName);
		data_map.put("English_Prod_Name",getProduct.get("Eng_Extras_Name"));
		data_map.put("Product_Code",productCode);
		data_map.put("Product_Description",Description);
		data_map.put("Discount_Code",discountCode);
		data_map.put("Unit_Price",unitPrice);
		supplierIDlookup = getProduct.getJSON("Supplier");
		//info "Supplier " + supplierIDlookup;
		if(supplierIDlookup != null)
		{
			supplierID = supplierIDlookup.getJSON("id");
			getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + supplierID + "\"",1,200,"zohocreatorcon");
			//info "supplierID" + supplierIDlookup;
			//info getCreatorVendor;
			if(getCreatorVendor.get("code") == 3000)
			{
				if(getCreatorVendor.get("data").size() > 0)
				{
					data_map.put("Supplier_Name",getCreatorVendor.get("data").get(0).get("ID"));
					creatorSupplierID = getCreatorVendor.get("data").get(0).get("ID");
				}
			}
			else
			{
				// Create Vendor in creator
				if(supplierID != null)
				{
					getCRMVendor = zoho.crm.getRecordById("Vendors",supplierID.toLong());
					if(getCRMVendor.get("id") != null)
					{
						data_map = Map();
						data_map.put("Zoho_CRM_ID",supplierID);
						data_map.put("Supplier_Name",getCRMVendor.get("Vendor_Name"));
						data_map.put("Supplier_No",getCRMVendor.get("Num_ro_fournisseur"));
						data_map.put("Supplier_Email",getCRMVendor.get("Email"));
						data_map.put("Supplier_Phone",getCRMVendor.get("Phone"));
						data_map.put("Supplier_ID_Internal",getCRMVendor.get("Num_ro_fournisseur"));
						//info "Vendor data_map:" + data_map;
						creatorSupplierResp = zoho.creator.createRecord(ownerName,appName,"Supplier_Details",data_map,Map(),"zohocreatorcon");
						// 						info "creator Supplier Rsp: " + creatorSupplierResp;
						// 						info creatorSupplierResp.get("code");
						if(creatorSupplierResp.get("code") == 3000)
						{
							creatorIDUpdateMap = Map();
							creatorIDUpdateMap.put("CreatorSupplierID",creatorSupplierResp.get("data").get("ID").toString());
							updateCreatorID = zoho.crm.updateRecord("Vendors",supplierID.toLong(),creatorIDUpdateMap);
							creatorSupplierID = creatorSupplierResp.get("data").get("ID");
						}
					}
				}
			}
		}
		else
		{
			creatorSupplierID = null;
		}
		productMap = Map();
		productMap.put("name",getProduct.get("Books_Prod_Name"));
		productMap.put("rate",if(unitPrice != null,unitPrice,0.0));
		productMap.put("item_type","sales_and_purchases");
		productMap.put("sku",getProduct.get("Books_Prod_Code"));
		productMap.put("item_type","sales_and_purchases");
		createItemResponse = zoho.books.createRecord("items",orgID,productMap,"books");
		info "books rep :" + createItemResponse;
		data_map.put("Zoho_Books_ID",createItemResponse.get("item").get("item_id"));
		creatorProductResp = zoho.creator.createRecord(ownerName,appName,formName,data_map,Map(),"zohocreatorcon");
		info "creator res" + creatorProductResp;
		creatorIDUpdateMap = Map();
		if(createItemResponse.get("code") == 0)
		{
			creatorIDUpdateMap.put("Books_Product_ID",createItemResponse.get("item").get("item_id"));
		}
		if(creatorProductResp.get("code") == 3000)
		{
			creatorIDUpdateMap.put("CreatorProductID",creatorProductResp.get("data").get("ID").toString());
		}
		updateCreatorID = zoho.crm.updateRecord("Extras_New",ExtrasID,creatorIDUpdateMap);
	}
	else
	{
		data_map = Map();
		ownerName = "vanessa68";
		ReportName = "Product_Details_Report";
		appName = "order-management";
		baseUrl = "creatorapp.zoho.com";
		orgID = "328433160";
		data_map.put("Zoho_CRM_ID",ExtrasID);
		data_map.put("Product_Name",productName);
		data_map.put("English_Prod_Name",getProduct.get("Eng_Extras_Name"));
		data_map.put("Product_Code",productCode);
		data_map.put("Product_Description",Description);
		data_map.put("Unit_Price",unitPrice);
		data_map.put("Discount_Code",discountCode);
		getCRMProductInfo = zoho.crm.getRecordById("Extras_New",ExtrasID);
		getBooksID = getCRMProductInfo.get("Books_Product_ID");
		//info getBooksID;
		productMap = Map();
		productMap.put("name",getProduct.get("Books_Prod_Name"));
		productMap.put("rate",if(unitPrice != null,unitPrice,0.0));
		supplierIDlookup = getProduct.getJSON("Supplier");
		//info "Supplier " + supplierIDlookup;
		if(supplierIDlookup != null)
		{
			supplierID = supplierIDlookup.getJSON("id");
			getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + supplierID + "\"",1,200,"zohocreatorcon");
			//info "supplierID" + supplierIDlookup;
			//info getCreatorVendor;
			if(getCreatorVendor.get("code") == 3000)
			{
				if(getCreatorVendor.get("data").size() > 0)
				{
					data_map.put("Supplier_Name",getCreatorVendor.get("data").get(0).get("ID"));
					creatorSupplierID = getCreatorVendor.get("data").get(0).get("ID");
				}
			}
			else
			{
				// Create Vendor in creator
				if(supplierID != null)
				{
					getCRMVendor = zoho.crm.getRecordById("Vendors",supplierID.toLong());
					if(getCRMVendor.get("id") != null)
					{
						data_map = Map();
						data_map.put("Zoho_CRM_ID",supplierID);
						data_map.put("Supplier_Name",getCRMVendor.get("Vendor_Name"));
						data_map.put("Supplier_No",getCRMVendor.get("Num_ro_fournisseur"));
						data_map.put("Supplier_Email",getCRMVendor.get("Email"));
						data_map.put("Supplier_Phone",getCRMVendor.get("Phone"));
						data_map.put("Supplier_ID_Internal",getCRMVendor.get("Num_ro_fournisseur"));
						info "Vendor data_map:" + data_map;
						creatorSupplierResp = zoho.creator.createRecord(ownerName,appName,"Supplier_Details",data_map,Map(),"zohocreatorcon");
						info "creator Supplier Rsp: " + creatorSupplierResp;
						info creatorSupplierResp.get("code");
						if(creatorSupplierResp.get("code") == 3000)
						{
							creatorIDUpdateMap = Map();
							creatorIDUpdateMap.put("CreatorSupplierID",creatorSupplierResp.get("data").get("ID").toString());
							updateCreatorID = zoho.crm.updateRecord("Vendors",supplierID.toLong(),creatorIDUpdateMap);
							creatorSupplierID = creatorSupplierResp.get("data").get("ID");
							data_map.put("Supplier_Name",creatorSupplierID);
						}
					}
				}
			}
		}
		else
		{
			creatorSupplierID = null;
			//data_map.put("Supplier_Name",creatorSupplierID);
		}
		getBooksInfo = zoho.books.getRecordsByID("items",orgID,getBooksID);
		info "data map 208" + data_map;
		updaterec = zoho.creator.updateRecord(ownerName,appName,ReportName,CreatorProductID,data_map,Map(),"zohocreatorcon");
		info "update Creator rec line 212" + updaterec;
		if(getBooksInfo.get("code") == 0)
		{
			updateBooks = zoho.books.updateRecord("items",orgID,getBooksID,productMap);
		}
	}
}
catch (e)
{
	info "Error -- " + e;
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMap = Map();
	dataMap.put("Module","Extras");
	dataMap.put("Process_Description"," CRM:Create Extras");
	dataMap.put("In_Data",ExtrasID);
	dataMap.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMap,Map(),"zohocreatorcon");
}
//Time tracking - Add End time to notes - startes here
createnote = Map();
createnote.put("Note_Content","Function End Time " + zoho.currenttime);
createnote.put("Parent_Id",ExtrasID);
createnote.put("se_module","Extras_New");
createnotelist = List();
createnotelist.add(createnote);
finalcreatenote = Map();
finalcreatenote.put("data",createnotelist);
respcreatenote = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/Extras_New/" + ExtrasID + "/Notes"
	type :POST
	parameters:finalcreatenote.tostring()
	connection:"zohooauth"
];
//Time tracking - Add End time to notes - startes here