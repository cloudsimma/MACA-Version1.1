appName = "order-management";
ownerName = "vanessa68";
//margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
order = zoho.crm.getRecordById("Orders_New",OrderID.toLong());
// respsrec = zoho.crm.searchRecords("Orders_New","(Name:equals:" + order.get("Name") + ")");
// //info respsrec;
// for each  recorderidex in respsrec
// {
// 	orderidex = recorderidex.get("id");
// }
// if(orderidex == null)
// {
if(order.get("id") != null)
{
	getProductInfo = order.get("Items_ordered");
	getExtras = order.get("Extra_Item");
	order_map = Map();
	ExtraItemProductList = List();
	Total_Supplier_Price = 0.00;
	order_map.put("Object",order.get("Name"));
	order_map.put("Order_Date",zoho.currentdate);
	Quoteinfo = zoho.crm.getRecordById("Quotations",order.get("Quotation_ID").toLong());
	order_map.put("Quotation_ID",Quoteinfo.get("Creator_Quotation_ID"));
	order_map.put("State","Nouvelle");
	order_map.put("Total_Amount",order.get("Total_Amount"));
	order_map.put("Zoho_CRM_ID",OrderID);
	order_map.put("Order_No",order.get("No_Commande_Maca"));
	if(order.get("Date_Entry") != null)
	{
		DateEntry = order.get("Date_Entry");
	}
	else
	{
		DateEntry = zoho.currentdate;
	}
	EntryDate = DateEntry;
	day = EntryDate.day();
	month = EntryDate.month();
	year = EntryDate.year();
	DateFrenchMap = {"1":"Janvier","2":"Février","3":"Mars","4":"Avril","5":"Mai","6":"Juin","7":"Juillet","8":"Août","9":"Septembre","10":"Octobre","11":"Novembre","12":"Décembre"};
	test = month.tostring();
	getData = DateFrenchMap.get(test);
	info getData;
	FrenchDate = day + "-" + getData + "-" + year;
	order_map.put("French_Order_Date",FrenchDate);
	getCreatorOrder = zoho.creator.getRecords(ownerName,appName,"All_Quotations","Zoho_CRM_ID == \"" + Quoteinfo.get("id").toLong() + "\"",1,200,"zohocreatorcon");
	// info getCreatorOrder;
	if(getCreatorOrder.get("code") == 3000)
	{
		if(getCreatorOrder.get("data").size() > 0)
		{
			getCreatorData = getCreatorOrder.get("data").get(0);
			if(getCreatorData.get("Company_Name") != null)
			{
				order_map.put("Company_Name",getCreatorData.get("Company_Name").get("ID"));
				//enterprise date updated
				Enterprisedate_map = Map();
				Enterprisedate_map.put("Date_de_la_derni_re_commande",zoho.currentdate);
				info "Enterprisedate_map " + Enterprisedate_map;
				Enterprise_date = zoho.crm.updateRecord("Accounts",order.get("Company_Name").get("id").toLong(),Enterprisedate_map);
				info Enterprise_date;
				//end	449573000122432065
			}
			if(getCreatorData.get("Contact_Name") != null)
			{
				order_map.put("Contact_Name",getCreatorData.get("Contact_Name").get("ID"));
			}
			order_map.put("Quote_Owner",getCreatorData.get("Quotation_Owner"));
		}
	}
	//info "getProductInfo" + getProductInfo;
	if(getProductInfo.size() > 0)
	{
		productList = List();
		prodSeqList = List();
		for each  productRec in getProductInfo
		{
			if(productRec.get("Product_Name") != null && productRec.get("Product_Name") != "")
			{
				getCRMProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + productRec.get("Product_Name").get("id") + "\"",1,200,"zohocreatorcon");
				//getLineItem = zoho.creator.getRecords(ownerName,appName,"All_Quotation_Items","Line_Item_ID == \"" + productRec.get("id") + "\"",1,200,"zohocreatorcon");
				//info "getLineItem line 48" + getLineItem;
				//convertOrder = getLineItem.get("data").get(0).get("Order_Conversion");
				if(getCRMProduct.get("code") == 3000 && getCRMProduct.get("data").size() > 0)
				{
					prodSeqList.add(productRec.get("Item_Seq_No"));
					info "Item_Seq_No" + prodSeqList;
					getproductinfo = getCRMProduct.get("data").get(0);
					supplierPrice = 0;
					if(getproductinfo.get("ID") != "")
					{
						productMap = Map();
						productMap.put("Product",getproductinfo.get("ID").toLong());
						productMap.put("Vendor_Name",getproductinfo.get("Supplier_Name").get("ID"));
						productMap.put("Quantity",productRec.get("Quantity"));
						productMap.put("Product_Description",productRec.get("Description"));
						productMap.put("Unit_Price",productRec.get("Rate"));
						productMap.put("Margin",productRec.get("Margin_A"));
						productMap.put("Margin_B",productRec.get("Margin_B"));
						productMap.put("Pix_unitaire",productRec.get("Total_CA"));
						productMap.put("Custom_Pix_Unitaire",productRec.get("Custom_Pix_Unit_CA"));
						productMap.put("Amount",productRec.get("Total_Amount"));
						productMap.put("Product_Type",'Product');
						productMap.put("Line_Item_ID",productRec.get("id"));
						//productMap.put("CRM_Quotation_Item_ID",productRec.get("id"));
						productMap.put("Sequence_No",productRec.get("Item_Seq_No"));
						if(productRec.get("Rate") != null && productRec.get("Margin_A") != null)
						{
							supplierPrice = (productRec.get("Rate") * margin_map.get(productRec.get("Margin_A"))).round(2);
						}
						Total_Supplier_Price = Total_Supplier_Price + supplierPrice * productRec.get("Quantity");
						productMap.put("Supplier_Price",supplierPrice);
						productList.add(productMap);
					}
				}
			}
		}
	}
	extraProductList = List();
	//info "getExtras" + getExtras;
	//extraProductList.add(productRec.get("Product").get("id"));
	if(getExtras.size() > 0)
	{
		for each  extraItem in getExtras
		{
			//info "Extra Seq :" + prodSeqList.contains(extraItem.get("Extras_Seq_No")) + "-" + extraItem.get("Extras_Seq_No");
			if(prodSeqList.contains(extraItem.get("Extras_Seq_No")))
			{
				getCRMExtraProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + extraItem.get("Product_Name").get("id") + "\"",1,200,"zohocreatorcon");
				if(getCRMExtraProduct.get("code") == 3000 && getCRMExtraProduct.get("data").size() > 0)
				{
					//info "Extras... line 80" + extraItem;
					getProduct = getCRMExtraProduct.get("data");
					if(getProduct.size() > 0 && getProduct.get(0).get("ID") != "")
					{
						info "Extra Prod line 93..." + getProduct.get(0);
						extraMap = Map();
						extraMap.put("Product",getProduct.get(0).get("ID").toLong());
						extraMap.put("Product_Description",getProduct.get(0).get("Product_Description"));
						info "supplier line 119" + getProduct.get(0);
						/******* New code for Vendor *****/
						getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + extraItem.get("Supplier").get("id") + "\"",1,200,"zohocreatorcon");
						//info getCreatorVendor;
						if(getCreatorVendor.get("code") == 3000)
						{
							if(getCreatorVendor.get("data").size() > 0)
							{
								extraMap.put("Vendor_Name",getCreatorVendor.get("data").get(0).get("ID"));
							}
						}
						//	extraMap.put("Vendor_Name",getProduct.get(0).get("Supplier_Name").get("ID").toLong());
						//extraMap.put("Unit_Price1",extraItem.get("Unit_Price"));
						extraMap.put("Quantity",extraItem.get("Quantity"));
						extraMap.put("Unit_Price",extraItem.get("Unit_Price"));
						extraMap.put("Margin_A",extraItem.get("Margin_A"));
						extraMap.put("Margin",extraItem.get("Margin_A"));
						extraMap.put("Margin_B",extraItem.get("Margin_B"));
						extraMap.put("Pix_unitaire",extraItem.get("Unit_Price1"));
						extraMap.put("Custom_Pix_Unitaire",extraItem.get("Custom_Pix_Unit_CA"));
						extraMap.put("Amount",extraItem.get("Total_Amount_CA"));
						extraMap.put("Line_Item_ID",extraItem.get("id"));
						extraMap.put("Product_Type",'Extra');
						//extraMap.put("CRM_Quotation_Item_ID",extraItem.get("id"));
						extraMap.put("S_No",extraItem.get("Extras_Seq_No"));
						supplierPrice = 0;
						if(extraItem.get("Unit_Price") != null && extraItem.get("Margin_A") != null)
						{
							supplierPrice = (extraItem.get("Unit_Price") * margin_map.get(extraItem.get("Margin_A"))).round(2);
						}
						Total_Supplier_Price = Total_Supplier_Price + supplierPrice * extraItem.get("Quantity");
						//info "extra supplierPrice" + supplierPrice;
						extraMap.put("Supplier_Price",supplierPrice);
						ExtraItemProductList.add(extraMap);
						info "line 109...";
						info "ExtraItemProductList" + extraMap;
					}
				}
			}
		}
	}
	order_map.put("Line_Items",productList);
	order_map.put("Order_Extra_Items",ExtraItemProductList);
	info "line no 116" + order_map;
	creatorOrder = zoho.creator.createRecord(ownerName,appName,"Orders",order_map,Map(),"zohocreatorcon");
	info "creatorResp : " + creatorOrder;
	createMap = Map();
	createMap.put("Creator_Order_ID",creatorOrder.get("data").get("ID"));
	createMap.put("Order_Generated_By",zoho.loginuser);
	UpdatecrmOrder = zoho.crm.updateRecord("Orders_New",OrderID,createMap);
	info "UpdatecrmOrder: " + UpdatecrmOrder;
	//crm log in - Remarks - Add note
	createnote = Map();
	createnote.put("Note_Content","Order Created by:" + zoho.loginuser + ",Action : Clone,Time : " + zoho.currenttime);
	createnote.put("Parent_Id",OrderID);
	createnote.put("se_module","Orders_New");
	createnotelist = List();
	createnotelist.add(createnote);
	finalcreatenote = Map();
	finalcreatenote.put("data",createnotelist);
	//info finalcreatenote;
	respcreatenote = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2/Orders_New/" + OrderID + "/Notes"
		type :POST
		parameters:finalcreatenote.tostring()
		connection:"zohooauth"
	];
	info "dev log - " + respcreatenote;
	// dev log ends
}