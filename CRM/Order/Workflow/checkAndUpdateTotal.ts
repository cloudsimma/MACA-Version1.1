try 
{
	getOrderInfo = zoho.crm.getRecordById("Orders_New",OrderID);
	getProductList = getOrderInfo.get("Items_ordered");
	getExtras = getOrderInfo.get("Extra_Item");
	ItemTotal_Amount = 0;
	ExtraTotal_Amount = 0;
	Total_Supplier_Price = 0.00;
	extraItemList = List();
	extraItemsMap = Map();
	ItemList = List();
	//Item = Map();
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
			if(item.get("Rate") != null && item.get("Margin_A") != null)
			{
				supplierPrice = (item.get("Rate") * margin_map.get(item.get("Margin_A"))).round(2);
			}
			Total_Supplier_Price = Total_Supplier_Price + supplierPrice * item.get("Quantity");
			disTotalItem1 = disTotalItem;
			lineamount1 = lineamount;
			ItemsMap = {"id":item.get("id"),"Total_CA":disTotalItem1,"Total_Amount":lineamount1};
			ItemList.add(ItemsMap);
		}
		else
		{
			ItemsMap = {"id":item.get("id")};
			ItemList.add(ItemsMap);
		}
	}
	//info ItemList;
	dataMap.put("Items_ordered",ItemList);
	//info "getExtras" + getExtras;
	for each  item in getExtras
	{
		if(item.get("Quantity") != null && item.get("Unit_Price") != null && item.get("Unit_Price") != 0 && item.get("Quantity") != 0)
		{
			disTotalItem = (item.get("Unit_Price") * margin_map.get(item.get("Margin_A")) / margin_map.get(item.get("Margin_B"))).round(2);
			if(item.get("Custom_Pix_Unit_CA") != null)
			{
				ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * item.get("Custom_Pix_Unit_CA");
				lineamount = item.get("Quantity") * item.get("Custom_Pix_Unit_CA");
				CustomPixUnitaire = item.get("Custom_Pix_Unit_CA");
			}
			else
			{
				ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * disTotalItem;
				lineamount = item.get("Quantity") * disTotalItem;
			}
			if(item.get("Unit_Price") != null && item.get("Margin_A") != null)
			{
				supplierPrice = item.get("Unit_Price") * margin_map.get(item.get("Margin_A"));
			}
			Total_Supplier_Price = Total_Supplier_Price + supplierPrice * item.get("Quantity");
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
	//info extraItemList;
	dataMap.put("Extra_Item",extraItemList);
	Total = ItemTotal_Amount + ExtraTotal_Amount;
	related_record = zoho.crm.getRelatedRecords("Related_List_Name_3","Orders_New",OrderID);
	// check and Update Supplier Price only if Supplier Order is not Craeted
	rel_json = related_record.toJsonList();
	if(rel_json.isEmpty() != False)
	{
		dataMap.put("Supplier_Price",Total_Supplier_Price);
		//profit cal
		profit_percent1 = (Total.round(2) - Total_Supplier_Price) / Total.round(2);
		profit_percent2 = (profit_percent1 * 100).round(2);
		dataMap.put("Profit",profit_percent2);
		dataMap.put("Supplier_Price",Total_Supplier_Price);
	}
	else
	{
		totalSupplierPrice = 0;
		orderno = getOrderInfo.get("No_Commande_Maca").remove("C");
		supplierOrderSearchCriteria = "Order_Number:equals:" + orderno;
		supplierOrderDetails = zoho.crm.searchRecords("Supplier_orders_new",supplierOrderSearchCriteria);
		if(supplierOrderDetails.size() > 0)
		{
			for each  supplierOrder in supplierOrderDetails
			{
				info supplierOrder.get("Total_Amount");
				supplierOrderPrice = if(supplierOrder.get("Total_Amount") != null,supplierOrder.get("Total_Amount"),0);
				totalSupplierPrice = totalSupplierPrice + supplierOrderPrice;
			}
		}
		Total_Supplier_Price = totalSupplierPrice;
		profit_percent1 = (Total.round(2) - Total_Supplier_Price) / Total.round(2);
		profit_percent2 = (profit_percent1 * 100).round(2);
		dataMap.put("Profit",profit_percent2);
		dataMap.put("Supplier_Price",totalSupplierPrice);
	}
	dataMap.put("Total_Amount",Total.round(2));
	//invoice amount cal
	order_total = Total.round(2);
	gst = (order_total * 5 / 100).round(2);
	qst = (order_total * 9.975 / 100).round(2);
	GrandTotal = order_total + gst + qst;
	invoceAmount = GrandTotal;
	dataMap.put("Amount_invoiced",invoceAmount);
	updateCrm = zoho.crm.updateRecord("Orders_New",OrderID,dataMap);
	info updateCrm;
}
catch (e)
{
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMaps = Map();
	dataMaps.put("Module","Orders New");
	dataMaps.put("Process_Description"," CRM:Total Calculation");
	dataMaps.put("In_Data",OrderID);
	dataMaps.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMap,Map(),"zohocreatorcon");
}