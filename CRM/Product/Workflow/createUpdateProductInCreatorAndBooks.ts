//Time tracking - Add start time to notes - startes here
createnote = Map();
createnote.put("Note_Content","Execution Start Time " + zoho.currenttime);
createnote.put("Parent_Id",productID);
createnote.put("se_module","ProductNew");
//info createnote;
createnotelist = List();
createnotelist.add(createnote);
finalcreatenote = Map();
finalcreatenote.put("data",createnotelist);
//info finalcreatenote;
respcreatenote = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/ProductNew/" + productID + "/Notes"
	type :POST
	parameters:finalcreatenote.tostring()
	connection:"zohooauth"
];
//Time tracking - Add start time to notes - Ends here
getProduct1 = zoho.crm.getRecordById("ProductNew",productID);
CreatorProductID1 = if(getProduct1.get("CreatorProductID") != null && getProduct1.get("CreatorProductID") != "",getProduct1.get("CreatorProductID"),"");
if(CreatorProductID1 == "")
{
	// Update books product code and name in crm
	descmap = Map();
	if(getProduct1.get("Description") == null)
	{
		productDescription = "Couleur du produit:\nMéthode de décoration:\nEmplacement de décoration:\nCouleur du logo :\nDélai de production:\nGrandeurs:\nS:\nM:\nL:\nXL:\nXXL";
		descmap.put("Description",productDescription);
	}
	info "test" + getProduct1.get("prod_code");
	if(getProduct1.get("prod_code") == null)
	{
		constcode = getProduct1.get("Name").subString(0,2) + productID.tostring().subString(13,18);
		//info ";constcode" + constcode;
		descmap.put("prod_code",constcode);
	}
	else
	{
		constcode = getProduct1.get("prod_code");
		// 		if(!getProduct1.get("prod_code").contains("NP-"))
		// 		{
		//constcode = getProduct1.get("prod_code");
		// 		}
		// 		else
		// 		{
		//constcode = getProduct1.get("prod_code");
		// 		}
		descmap.put("prod_code",constcode);
	}
	supplierForBooks = zoho.crm.getRecordById("Vendors",getProduct1.get("Supplier").get("id"));
	SuppNO = "";
	if(supplierForBooks.get("Num_ro_fournisseur") != null || supplierForBooks.get("Num_ro_fournisseur") != "")
	{
		SuppNO = supplierForBooks.get("Num_ro_fournisseur");
	}
	descmap.put("Num_ro_Fournisseur",SuppNO);
	supplierCode = supplierForBooks.get("Num_ro_fournisseur");
	if(!getProduct1.get("Name").contains("["))
	{
		descmap.put("Name","[" + constcode + "] " + getProduct1.get("Name"));
		descmap.put("Books_Prod_Name",getProduct1.get("Name") + "-" + constcode + "-" + supplierCode + "-NP");
	}
	descmap.put("Books_Prod_Code",constcode + "-" + supplierCode + "-NP");
	updateprod = zoho.crm.updateRecord("ProductNew",productID,descmap);
	info updateprod;
}
getProduct = zoho.crm.getRecordById("ProductNew",productID);
info "Product Details" + getProduct;
productName = getProduct.get("Name");
BooksPName = getProduct.get("Books_Prod_Name");
BooksPCode = getProduct.get("Books_Prod_Code");
info "Product Name " + productName;
CreatorProductID = if(getProduct.get("CreatorProductID") != null && getProduct.get("CreatorProductID") != "",getProduct.get("CreatorProductID"),"");
productCode = getProduct.get("prod_code");
unitPrice = if(getProduct.get("Prix_unitaire") != null,getProduct.get("Prix_unitaire"),0);
discountCode = if(getProduct.get("Code_escompte") != null,getProduct.get("Code_escompte"),"");
info "creator id " + CreatorProductID;
if(CreatorProductID == "")
{
	info "Creator product";
	data_map = Map();
	ownerName = "vanessa68";
	formName = "Product_Details";
	appName = "order-management";
	baseUrl = "creatorapp.zoho.com";
	orgID = "328433160";
	data_map.put("Zoho_CRM_ID",productID);
	data_map.put("Product_Name",productName);
	data_map.put("English_Prod_Name",getProduct.get("Eng_Prod_Name"));
	data_map.put("Product_Code",productCode);
	// 	data_map.put("Product_Description",productDes);
	data_map.put("Unit_Price",unitPrice);
	data_map.put("Discount_Code",discountCode);
	creatorSupplierID = "";
	supplierIDlookup = getProduct.getJSON("Supplier");
	info supplierIDlookup;
	if(supplierIDlookup != null)
	{
		supplierID = supplierIDlookup.getJSON("id");
	}
	//supplierID = 449573000102967001;
	info "supplierID" + supplierID;
	getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + supplierID + "\"",1,200,"zohocreatorcon");
	info getCreatorVendor;
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
				vendor_data_map = Map();
				vendor_data_map.put("Zoho_CRM_ID",supplierID);
				vendor_data_map.put("Supplier_Name",getCRMVendor.get("Vendor_Name"));
				vendor_data_map.put("Supplier_No",getCRMVendor.get("Num_ro_fournisseur"));
				vendor_data_map.put("Supplier_Email",getCRMVendor.get("Email"));
				vendor_data_map.put("Supplier_Phone",getCRMVendor.get("Phone"));
				// 	//data_map.put("Supplier Address.Address Line 2","Street");
				vendor_data_map.put("Supplier_ID_Internal",getCRMVendor.get("Num_ro_fournisseur"));
				info vendor_data_map;
				creatorSupplierResp = zoho.creator.createRecord(ownerName,appName,"Supplier_Details",vendor_data_map,Map(),"zohocreatorcon");
				info "creator rec" + creatorSupplierResp;
				info creatorSupplierResp.get("code");
				if(creatorSupplierResp.get("code") == 3000)
				{
					creatorIDUpdateMap = Map();
					creatorIDUpdateMap.put("CreatorSupplierID",creatorSupplierResp.get("data").get("ID").toString());
					updateCreatorID = zoho.crm.updateRecord("Vendors",supplierID.toLong(),creatorIDUpdateMap);
					creatorSupplierID = creatorSupplierResp.get("data").get("ID");
					data_map.put("Supplier_Name",creatorSupplierResp.get("data").get("ID"));
				}
			}
		}
	}
	// 	getCreatorProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + productID + "\"",1,200,"zohocreatorcon");
	// 	info "getCreatorProduct" + getCreatorProduct;
	// 	if(getCreatorProduct.get("code") == 3000)
	// 	{
	// 		if(getCreatorProduct.get("data").size() > 0)
	// 		{
	// 			info "getCreatorProduct " + getCreatorProduct.get("data");
	// 			creatorProductMap = Map();
	// 			// Zoho_Books_ID
	// 			creatorProductMap.put("Books_Product_ID",getCreatorProduct.get("data").get(0).get("Zoho_Books_ID"));
	// 			creatorProductMap.put("CreatorProductID",getCreatorProduct.get("data").get(0).get("ID"));
	// 			updateCreatorID = zoho.crm.updateRecord("ProductNew",productID,creatorProductMap);
	// 			updateProduct = Map();
	// 			updateProduct.put("Supplier_Name",creatorSupplierID);
	// 			updateProduct.put("Zoho_Books_ID",getCreatorProduct.get("data").get(0).get("Zoho_Books_ID"));
	// 			updaterec = zoho.creator.updateRecord(ownerName,appName,"Product_Details_Report",getCreatorProduct.get("data").get(0).get("ID"),updateProduct,Map(),"zohocreatorcon");
	// 		}
	// 	}
	// 	else
	// 	{
	info "First Else";
	creatorIDUpdateMap = Map();
	productMap = Map();
	productMap.put("name",BooksPName);
	productMap.put("rate",if(unitPrice != null,unitPrice,0.0));
	productMap.put("item_type","sales_and_purchases");
	productMap.put("sku",BooksPCode);
	productMap.put("item_type","sales_and_purchases");
	info productMap;
	createItemResponse = zoho.books.createRecord("items",orgID,productMap,"books");
	info "Books Response " + createItemResponse;
	//info "data_map -- " + data_map;
	if(createItemResponse.get("code") == 1001)
	{
		// 		getBooksItem = invokeurl
		// 		[
		// 			url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&name=" + BooksPName
		// 			type :GET
		// 			connection:"books"
		// 		];
		searchParam = {"name":BooksPName};
		getBooksItem = zoho.books.getRecords("items",orgID,searchParam,"books");
		info "getBooksItem :" + getBooksItem;
		if(getBooksItem.get("code") == 0)
		{
			data_map.put("Zoho_Books_ID",getBooksItem.get("items").get(0).get("item_id"));
			creatorIDUpdateMap.put("Books_Product_ID",getBooksItem.get("items").get(0).get("item_id"));
		}
	}
	if(createItemResponse.get("code") == 0)
	{
		data_map.put("Zoho_Books_ID",createItemResponse.get("item").get("item_id"));
		creatorIDUpdateMap.put("Books_Product_ID",createItemResponse.get("item").get("item_id"));
	}
	creatorProductResp = zoho.creator.createRecord(ownerName,appName,formName,data_map,Map(),"zohocreatorcon");
	info creatorProductResp;
	if(creatorProductResp.get("code") == 3000)
	{
		creatorIDUpdateMap.put("CreatorProductID",creatorProductResp.get("data").get("ID").toString());
	}
	if(creatorProductResp.get("code") == 3002)
	{
		getCreatoritemRes = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + productID + "\"",1,200,"zohocreatorcon");
		info getCreatoritemRes.get("data");
		if(getCreatoritemRes.get("code") == 3000)
		{
			creatorIDUpdateMap.put("CreatorProductID",getCreatoritemRes.get("data").get(0).get("ID").toString());
		}
		//info "getCreatorProduct :" + getCreatorProduct;
	}
	info creatorIDUpdateMap;
	updateCreatorID = zoho.crm.updateRecord("ProductNew",productID,creatorIDUpdateMap);
	info "updateCreatorID" + updateCreatorID;
	// 	}
	// 		}
}
else
{
	info "Else";
	data_map = Map();
	ownerName = "vanessa68";
	ReportName = "Product_Details_Report";
	appName = "order-management";
	baseUrl = "creatorapp.zoho.com";
	orgID = "328433160";
	data_map.put("Zoho_CRM_ID",productID);
	data_map.put("Product_Name",productName);
	data_map.put("English_Prod_Name",getProduct.get("Eng_Prod_Name"));
	data_map.put("Product_Code",productCode);
	//data_map.put("Product_Description",productDes);
	data_map.put("Unit_Price",unitPrice);
	data_map.put("Discount_Code",discountCode);
	info "Data Map " + data_map;
	getCRMProductInfo = zoho.crm.getRecordById("ProductNew",productID);
	info "CRM Product " + getCRMProductInfo;
	getBooksID = getCRMProductInfo.get("Books_Product_ID");
	info getBooksID;
	productMap = Map();
	productMap.put("name",productName);
	productMap.put("rate",if(unitPrice != null,unitPrice,0.0));
	getBooksInfo = zoho.books.getRecordsByID("items",orgID,getBooksID);
	info getBooksInfo;
	if(getBooksInfo.get("code") == 0)
	{
		updateBooks = zoho.books.updateRecord("items",orgID,getBooksID,productMap);
		if(updateBooks.get("code") == 0)
		{
			getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + supplierID + "\"",1,200,"zohocreatorcon");
			if(getCreatorVendor.get("code") == 3000)
			{
				data_map.put("Supplier_Name",getCreatorVendor.get("data").get(0).get("ID"));
			}
			data_map.put("Zoho_Books_ID",getBooksID);
			updaterec = zoho.creator.updateRecord(ownerName,appName,ReportName,CreatorProductID,data_map,Map(),"zohocreatorcon");
		}
	}
}
//Time tracking - Add End time to notes - startes here
createnote = Map();
createnote.put("Note_Content","Function End Time " + zoho.currenttime);
createnote.put("Parent_Id",productID);
createnote.put("se_module","ProductNew");
createnotelist = List();
createnotelist.add(createnote);
finalcreatenote = Map();
finalcreatenote.put("data",createnotelist);
respcreatenote = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/ProductNew/" + productID + "/Notes"
	type :POST
	parameters:finalcreatenote.tostring()
	connection:"zohooauth"
];
//Time tracking - Add End time to notes - startes here