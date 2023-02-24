try 
{
	//Check Update Order Calculation - Starts Here//
	getOrderInfo = zoho.crm.getRecordById("Orders_New",OrderID);
	getProductList = getOrderInfo.get("Items_ordered");
	getExtras = getOrderInfo.get("Extra_Item");
	ItemTotal_Amount = 0;
	ExtraTotal_Amount = 0;
	extraItemList = List();
	extraItemsMap = Map();
	ItemList = List();
	if(getOrderInfo.get("Date_Entry") != null)
	{
		DateEntry = getOrderInfo.get("Date_Entry");
	}
	else
	{
		DateEntry = zoho.currentdate;
	}
	appName = "order-management";
	ownerName = "vanessa68";
	OrderCreatorID = getOrderInfo.get("Creator_Order_ID");
	EntryDate = DateEntry;
	day = EntryDate.day();
	month = EntryDate.month();
	year = EntryDate.year();
	DateFrenchMap = {"1":"Janvier","2":"Février","3":"Mars","4":"Avril","5":"Mai","6":"Juin","7":"Juillet","8":"Août","9":"Septembre","10":"Octobre","11":"Novembre","12":"Décembre"};
	test = month.tostring();
	getData = DateFrenchMap.get(test);
	//info getData;
	FrenchDate = day + "-" + getData + "-" + year;
	GetOrderItem = zoho.creator.getRecords(ownerName,appName,"All_Orders","ID ==" + OrderCreatorID.toLong(),1,200,"zohocreatorcon");
	info "get" + GetOrderItem.get("data");
	getOrder = GetOrderItem.get("data").get(0);
	OrderMap = Map();
	OrderMap.put("French_Order_Date",FrenchDate);
	OrderMap.put("Zoho_CRM_ID",OrderID.toLong());
	// 	quote_Data = zoho.crm.getRecordById("Quotations",getOrderInfo.get("Quotation_ID").toLong());
	// 	OrderMap.put("Quotation_ID",quote_Data.get("Creator_Quotation_ID").toLong());
	updateOrderEntryDate = zoho.creator.updateRecord(ownerName,appName,"All_Orders",getOrder.get("ID").toLong(),OrderMap,Map(),"zohocreatorcon");
	Item = Map();
	dataMap = Map();
	//margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
	margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
	for each  item in getProductList
	{
		if(item.get("Quantity") != null && item.get("Rate") != null)
		{
			disTotalItem = (item.get("Rate") * margin_map.get(item.get("Margin_A")) / margin_map.get(item.get("Margin_B"))).round(2);
			if(item.get("Custom_Pix_Unit_CA") != null)
			{
				ItemTotal_Amount = ItemTotal_Amount + item.get("Quantity") * item.get("Custom_Pix_Unit_CA");
				lineamount = item.get("Quantity") * item.get("Custom_Pix_Unit_CA");
				CustomPixUnitaire = item.get("Custom_Pix_Unit_CA");
			}
			else
			{
				ItemTotal_Amount = ItemTotal_Amount + item.get("Quantity") * disTotalItem;
				lineamount = item.get("Quantity") * disTotalItem;
			}
			disTotalItem1 = disTotalItem;
			lineamount1 = lineamount;
			ItemsMap = {"id":item.get("id"),"Total_CA":disTotalItem1,"Total_Amount":lineamount1};
			ItemList.add(ItemsMap);
		}
	}
	dataMap.put("Items_ordered",ItemList);
	//info "getExtras" + getExtras;
	for each  item in getExtras
	{
		if(item.get("Quantity") != null && item.get("Unit_Price") != null && item.get("Quantity") != 0 && item.get("Unit_Price") != 0)
		{
			disTotalItem = (item.get("Unit_Price") * margin_map.get(item.get("Margin_A")) / margin_map.get(item.get("Margin_B"))).round(2);
			if(item.get("Custom_Pix_Unit_CA") != null)
			{
				ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * item.get("Custom_Pix_Unit_CA");
				lineamount = item.get("Quantity") * item.get("Custom_Pix_Unit_CA");
			}
			else
			{
				ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * disTotalItem;
				lineamount = item.get("Quantity") * disTotalItem;
			}
			disTotalItem1 = disTotalItem;
			lineamount1 = lineamount;
			extraItemsMap = {"id":item.get("id"),"Unit_Price1":disTotalItem1,"Total_Amount_CA":lineamount1};
			extraItemList.add(extraItemsMap);
		}
		else
		{
			extraItemsMap = {"id":item.get("id")};
			extraItemList.add(extraItemsMap);
		}
	}
	dataMap.put("Extra_Item",extraItemList);
	Total = ItemTotal_Amount + ExtraTotal_Amount;
	dataMap.put("Total_Amount",Total.round(2));
	updateCrm = zoho.crm.updateRecord("Orders_New",OrderID,dataMap);
	//info updateCrm;
	//Check Update Order Calculation - Ends Here//
	if(OrderID != null && CreatorID != "")
	{
		appName = "order-management";
		ownerName = "vanessa68";
		OrderData = zoho.crm.getRecordById("Orders_New",OrderID.toLong());
		quoteData = zoho.crm.getRecordById("Quotations",OrderData.get("Quotation_ID").toLong());
		//margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
		margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
		if(OrderData.get("id") != null)
		{
			getProductInfo = OrderData.get("Items_ordered");
			getExtras = OrderData.get("Extra_Item");
			order_map = Map();
			//info getProductInfo;
			for each  itemRec in getProductInfo
			{
				//CreatorOrderItem = zoho.creator.getRecords(ownerName,appName,"All_Order_Items","Order_ID ==" +CreatorID.toLong(),1,200,"zohocreatorcon");
				CreatorOrderItem = zoho.creator.getRecords(ownerName,appName,"All_Order_Items","Order_ID ==" + CreatorID.toLong() + "&&Line_Item_ID ==\"" + itemRec.get("id") + "\"",1,200,"zohocreatorcon");
				info "item : " + itemRec.get("Product_Name");
				info "CreatorOrderItem : " + CreatorOrderItem;
				CreatorOItem = CreatorOrderItem.get("data");
				//info "CreatorOItem" + CreatorOItem;
				if(CreatorOrderItem.get("code") == "3000" && CreatorOrderItem.get("data").size() > 0)
				{
					info "item : 3000 " + itemRec.get("Product_Name");
					for each  creatorItem in CreatorOItem
					{
						if(creatorItem.get("Line_Item_ID") == itemRec.get("id").toString())
						{
							//info "CRM:"+itemRec.get("Product_Name").get("name");
							getCRMProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + itemRec.get("Product_Name").get("id") + "\"",1,200,"zohocreatorcon");
							//info "getCRMProduct" + getCRMProduct;
							getCreatorProductinfo = getCRMProduct.get("data").get(0);
							supplierPrice = 0;
							productMap = Map();
							//info "Creator : "+getCreatorProductinfo.get("Product_Name");
							productMap.put("Product",getCreatorProductinfo.get("ID").toLong());
							productMap.put("Quantity",itemRec.get("Quantity"));
							productMap.put("Product_Description",itemRec.get("Description"));
							productMap.put("Unit_Price",itemRec.get("Rate"));
							productMap.put("Margin",itemRec.get("Margin_A"));
							productMap.put("Margin_B",itemRec.get("Margin_B"));
							productMap.put("Pix_unitaire",itemRec.get("Total_CA"));
							productMap.put("Custom_Pix_Unitaire",itemRec.get("Custom_Pix_Unit_CA"));
							productMap.put("Amount",itemRec.get("Total_Amount"));
							productMap.put("Sequence_No",itemRec.get("Item_Seq_No"));
							info getCreatorProductinfo;
							productMap.put("Vendor_Name",getCreatorProductinfo.get("Supplier_Name").get("ID").toLong());
							if(itemRec.get("Rate") != null && itemRec.get("Margin_A") != null)
							{
								supplierPrice = (itemRec.get("Rate") * margin_map.get(itemRec.get("Margin_A"))).round(2);
							}
							productMap.put("Supplier_Price",supplierPrice);
							info "line 151" + productMap;
							updateOrderItems = zoho.creator.updateRecord(ownerName,appName,"All_Order_Items",creatorItem.get("ID").toLong(),productMap,Map(),"zohocreatorcon");
							//info "Creator Update" + updateOrderItems;
						}
					}
				}
				// Create New Order Item
				if(CreatorOrderItem.get("code") == "3100")
				{
					info "item : 3001" + itemRec.get("Product_Name");
					NewproductMap = Map();
					if(itemRec.get("Product_Name") != null && itemRec.get("Product_Name") != "")
					{
						getCRMProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + itemRec.get("Product_Name").get("id") + "\"",1,200,"zohocreatorcon");
						info "error item :" + itemRec.get("Product_Name").get("id");
						info "error " + getCRMProduct;
						getCreatorExtraProductinfo = getCRMProduct.get("data").get(0);
						//info "getCreatorExtraProductinfo line 63" + getCreatorExtraProductinfo;
						supplierPrice = 0;
						NewproductMap = Map();
						NewproductMap.put("Product",getCreatorExtraProductinfo.get("ID").toLong());
						NewproductMap.put("Quantity",itemRec.get("Quantity"));
						NewproductMap.put("Product_Description",getCreatorExtraProductinfo.get("Product_Description"));
						NewproductMap.put("Unit_Price",itemRec.get("Rate"));
						NewproductMap.put("Margin",itemRec.get("Margin_A"));
						NewproductMap.put("Margin_B",itemRec.get("Margin_B"));
						NewproductMap.put("Pix_unitaire",itemRec.get("Total_CA"));
						NewproductMap.put("Custom_Pix_Unitaire",itemRec.get("Custom_Pix_Unit_CA"));
						NewproductMap.put("Amount",itemRec.get("Total_Amount"));
						NewproductMap.put("Sequence_No",itemRec.get("Item_Seq_No"));
						if(itemRec.get("Rate") != null && itemRec.get("Margin_A") != null)
						{
							supplierPrice = (itemRec.get("Rate") * margin_map.get(itemRec.get("Margin_A"))).round(2);
						}
						NewproductMap.put("Supplier_Price",supplierPrice);
						NewproductMap.put("Product_Type",'Product');
						NewproductMap.put("Line_Item_ID",itemRec.get("id"));
						NewproductMap.put("Zoho_CRM_ID",OrderID.toLong());
						NewproductMap.put("Order_ID",CreatorID.toLong());
						NewproductMap.put("Vendor_Name",getCreatorExtraProductinfo.get("Supplier_Name").get("ID").toLong());
						createOrderItem = zoho.creator.createRecord(ownerName,appName,"Order_Items",NewproductMap,Map(),"zohocreatorcon");
						//info "createOrderItem" + createOrderItem;
					}
				}
			}
			if(getExtras.size() > 0)
			{
				for each  ExtrasRec in getExtras
				{
					if(ExtrasRec.get("Product_Name") != null)
					{
						CreatorExtras = zoho.creator.getRecords(ownerName,appName,"Extra_Items_Report","Order_ID ==" + CreatorID.toLong() + "&&Line_Item_ID ==\"" + ExtrasRec.get("id") + "\"",1,200,"zohocreatorcon");
						CreatorOrderExtras = CreatorExtras.get("data");
						if(CreatorExtras.get("code") == "3000" && CreatorExtras.get("data").size() > 0)
						{
							//info "Update Extra";
							for each  creatorExtrasRec in CreatorOrderExtras
							{
								info "extra 1";
								if(creatorExtrasRec.get("Line_Item_ID") == ExtrasRec.get("id").toString())
								{
									getCRMProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + ExtrasRec.get("Product_Name").get("id") + "\"",1,200,"zohocreatorcon");
									getProduct = getCRMProduct.get("data").get(0);
									supplierPrice = 0;
									extraMap = Map();
									extraMap.put("Product",getProduct.get("ID").toLong());
									extraMap.put("Product_Description",getProduct.get("Product_Description"));
									//info "hiii" + getProduct;
									getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + ExtrasRec.get("Supplier").get("id") + "\"",1,200,"zohocreatorcon");
									//info getCreatorVendor;
									if(getCreatorVendor.get("code") == 3000)
									{
										if(getCreatorVendor.get("data").size() > 0)
										{
											extraMap.put("Vendor_Name",getCreatorVendor.get("data").get(0).get("ID"));
										}
									}
									extraMap.put("Quantity",ExtrasRec.get("Quantity"));
									extraMap.put("Unit_Price",ExtrasRec.get("Unit_Price"));
									extraMap.put("Margin",ExtrasRec.get("Margin_A"));
									extraMap.put("Margin_B",ExtrasRec.get("Margin_B"));
									extraMap.put("Pix_unitaire",ExtrasRec.get("Unit_Price1"));
									extraMap.put("Custom_Pix_Unitaire",ExtrasRec.get("Custom_Pix_Unit_CA"));
									extraMap.put("Amount",ExtrasRec.get("Total_Amount_CA"));
									extraMap.put("S_No",ExtrasRec.get("Extras_Seq_No"));
									extraMap.put("Zoho_CRM_ID",OrderID.toLong());
									supplierPrice = 0;
									if(ExtrasRec.get("Unit_Price") != null && ExtrasRec.get("Margin_A") != null && ExtrasRec.get("Unit_Price") != 0)
									{
										supplierPrice = (ExtrasRec.get("Unit_Price") * margin_map.get(ExtrasRec.get("Margin_A"))).round(2);
									}
									extraMap.put("Supplier_Price",supplierPrice);
									info "extra items 240:" + extraMap;
									info "ID :" + creatorExtrasRec.get("ID");
									updateOrderExtras = zoho.creator.updateRecord(ownerName,appName,"Extra_Items_Report",creatorExtrasRec.get("ID").toLong(),extraMap,Map(),"zohocreatorcon");
									//info "extras Update" + updateOrderExtras;
								}
							}
						}
						//Create New Extras
						if(CreatorExtras.get("code") == "3100")
						{
							//info "Create New Extra"; 449573000117719432
							info ExtrasRec.get("Product_Name").get("id");
							getCRMProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + ExtrasRec.get("Product_Name").get("id") + "\"",1,200,"zohocreatorcon");
							getProduct = getCRMProduct.get("data").get(0);
							//info "getProduct line 140" + getProduct; 
							supplierPrice = 0;
							NewextraMap = Map();
							NewextraMap.put("Product",getProduct.get("ID").toLong());
							NewextraMap.put("Product_Description",getProduct.get("Product_Description"));
							NewextraMap.put("Quantity",ExtrasRec.get("Quantity"));
							NewextraMap.put("Unit_Price",ExtrasRec.get("Unit_Price"));
							NewextraMap.put("Margin",ExtrasRec.get("Margin_A"));
							NewextraMap.put("Margin_B",ExtrasRec.get("Margin_B"));
							NewextraMap.put("Pix_unitaire",ExtrasRec.get("Unit_Price1"));
							NewextraMap.put("Custom_Pix_Unitaire",ExtrasRec.get("Custom_Pix_Unit_CA"));
							NewextraMap.put("Amount",ExtrasRec.get("Total_Amount_CA"));
							NewextraMap.put("S_No",ExtrasRec.get("Extras_Seq_No"));
							supplierPrice = 0;
							if(ExtrasRec.get("Unit_Price") != null && ExtrasRec.get("Margin_A") != null && ExtrasRec.get("Unit_Price") != 0)
							{
								supplierPrice = (ExtrasRec.get("Unit_Price") * margin_map.get(ExtrasRec.get("Margin_A"))).round(2);
							}
							NewextraMap.put("Supplier_Price",supplierPrice);
							NewextraMap.put("Line_Item_ID",ExtrasRec.get("id"));
							NewextraMap.put("Product_Type",'Extra');
							NewextraMap.put("Order_ID",CreatorID.toLong());
							NewextraMap.put("Zoho_CRM_ID",OrderID.toLong());
							getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + ExtrasRec.get("Supplier").get("id") + "\"",1,200,"zohocreatorcon");
							//info getCreatorVendor;
							if(getCreatorVendor.get("code") == 3000)
							{
								if(getCreatorVendor.get("data").size() > 0)
								{
									NewextraMap.put("Vendor_Name",getCreatorVendor.get("data").get(0).get("ID"));
								}
							}
							createOrderExtrasNew = zoho.creator.createRecord(ownerName,appName,"Extra_Items",NewextraMap,Map(),"zohocreatorcon");
							//info "createOrderExtrasNew" + createOrderExtrasNew;
						}
					}
				}
			}
			//Delete Extra Items
			DeletCreatorOrderExtras = zoho.creator.getRecords(ownerName,appName,"Extra_Items_Report","Order_ID ==" + CreatorID.toLong(),1,200,"zohocreatorcon");
			extrasCountCreator = DeletCreatorOrderExtras.get("data").size();
			//info "DeletCreatorOrderExtras : " + DeletCreatorOrderExtras;
			extrasProdCreator = DeletCreatorOrderExtras.get("data");
			extrasCountCRM = getExtras.size();
			//Check Missing ID 
			CrmExtraIDs = list();
			for each  crmExtra in getExtras
			{
				CrmExtraIDs.add(crmExtra.get("id"));
			}
			// Detete Extra Items
			for each  ExtraRecCreator in extrasProdCreator
			{
				info "ExtraRecCreator :" + ExtraRecCreator;
				if(ExtraRecCreator.get("Order_ID") != null && ExtraRecCreator.get("Line_Item_ID") != "")
				{
					info "CRM Line ID list " + CrmExtraIDs;
					info "Creator ID " + ExtraRecCreator.get("Line_Item_ID");
					checkDeletedId = CrmExtraIDs.contains(ExtraRecCreator.get("Line_Item_ID"));
					if(checkDeletedId != true)
					{
						info "delete";
						DeletExtarsmap = Map();
						DeletExtarsmap.put("Line_Item_ID","Item Deleted");
						DeletExtarsmap.put("Order_ID",null);
						DeletExtarsmap.put("S_No","Deleted");
						//info ExtraRecCreator.get("Line_Item_ID").toLong();
						SofDeleteOrderExtras = zoho.creator.updateRecord(ownerName,appName,"Extra_Items_Report",ExtraRecCreator.get("ID").toLong(),DeletExtarsmap,Map(),"zohocreatorcon");
						info "SofDeleteOrderExtras" + SofDeleteOrderExtras;
					}
				}
			}
			//----------- Strat Delete Prod Items----------------//
			DeletCreatorOrder = zoho.creator.getRecords(ownerName,appName,"All_Order_Items","Order_ID ==" + CreatorID.toLong(),1,200,"zohocreatorcon");
			ProdCreator = DeletCreatorOrder.get("data");
			//info "ProdCreator" + ProdCreator;
			//Check Missing Prod ID 
			CrmProdIDs = list();
			for each  crmProd in getProductInfo
			{
				CrmProdIDs.add(crmProd.get("id"));
			}
			// Detete Extra Items
			for each  ProdRecCreator in ProdCreator
			{
				if(ProdRecCreator.get("Order_ID") != null && ProdRecCreator.get("Line_Item_ID") != "")
				{
					// 					info "CRM Line ID list " + CrmProdIDs;
					// 					info "Creator ID " + ProdRecCreator.get("Line_Item_ID");
					checkProdDeletedId = CrmProdIDs.contains(ProdRecCreator.get("Line_Item_ID"));
					// 					info "checkDeletedId" + checkProdDeletedId;
					if(checkProdDeletedId != true)
					{
						//info "delete";
						DeleteProdmap = Map();
						DeleteProdmap.put("Line_Item_ID","Item Deleted");
						DeleteProdmap.put("Order_ID",null);
						DeleteProdmap.put("Sequence_No","Deleted");
						SofDeleteOrderItems = zoho.creator.updateRecord(ownerName,appName,"All_Order_Items",ProdRecCreator.get("ID").toLong(),DeleteProdmap,Map(),"zohocreatorcon");
						//info "SofDeleteOrderItems" + SofDeleteOrderItems;
					}
				}
			}
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
	dataMap.put("Module","Orders New");
	dataMap.put("Process_Description"," CRM:Update Order Test");
	dataMap.put("In_Data",OrderID);
	dataMap.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMap,Map(),"zohocreatorcon");
}