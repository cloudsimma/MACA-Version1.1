getQuoteInfo = zoho.crm.getRecordById("Quotations",QuoteID);
getProductList = getQuoteInfo.get("Product_Details");
getExtras = getQuoteInfo.get("Extra_Items");
ItemTotal_Amount = 0;
ExtraTotal_Amount = 0;
extraItemList = List();
extraItemsMap = Map();
ItemList = List();
//Item = Map();
dataMap = Map();
//margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
for each  item in getProductList
{
	if(item.get("Quantity") != null && item.get("Unit_Price_CA") != null)
	{
		disTotalItem = (item.get("Unit_Price_CA") * margin_map.get(item.get("Margin")) / margin_map.get(item.get("Margin_B"))).round(2);
		info item.get("Custom_Pix_Unitaire");
		if(item.get("Custom_Pix_Unitaire") != null)
		{
			info "yes";
			ItemTotal_Amount = ItemTotal_Amount + item.get("Quantity") * item.get("Custom_Pix_Unitaire");
			lineamount = item.get("Quantity") * item.get("Custom_Pix_Unitaire");
			CustomPixUnitaire = item.get("Custom_Pix_Unitaire");
		}
		else
		{
			ItemTotal_Amount = ItemTotal_Amount + item.get("Quantity") * disTotalItem;
			lineamount = item.get("Quantity") * disTotalItem;
		}
		disTotalItem1 = disTotalItem;
		lineamount1 = lineamount;
		ItemsMap = {"id":item.get("id"),"Pix_unitaire":disTotalItem1,"Total_Amount":lineamount1};
		ItemList.add(ItemsMap);
		info ItemList;
	}
}
dataMap.put("Product_Details",ItemList);
for each  item in getExtras
{
	if(item.get("Extras_Products") != null)
	{
		if(item.get("Quantity") != null && item.get("Unit_Price") != null && item.get("Quantity") != 0 && item.get("Unit_Price") != 0)
		{
			disTotalItem = (item.get("Unit_Price") * margin_map.get(item.get("Cost_Code")) / margin_map.get(item.get("Margin_B"))).round(2);
			if(item.get("Custom_Pix_Unitaire") != null)
			{
				ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * item.get("Custom_Pix_Unitaire");
				lineamount = item.get("Quantity") * item.get("Custom_Pix_Unitaire");
				CustomPixUnitaire = item.get("Custom_Pix_Unitaire");
			}
			else
			{
				ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * disTotalItem;
				lineamount = item.get("Quantity") * disTotalItem;
			}
			disTotalItem1 = disTotalItem;
			lineamount1 = lineamount;
			// 			if(item.get("Supplier") == null)
			// 			{
			// 				getExtraprodDetail = zoho.crm.getRecordById("Extras_New",item.get("Extras_Products").get("id"));
			// 				ExtrasSupplier = getExtraprodDetail.get("Supplier").get("id");
			// 				extraItemsMap = {"id":item.get("id"),"Supplier":ExtrasSupplier,"Prix_Total":disTotalItem1,"Total_Amount":lineamount1};
			// 			}
			// 			else
			// 			{
			extraItemsMap = {"id":item.get("id"),"Prix_Total":disTotalItem1,"Total_Amount":lineamount1};
			// 			}
			extraItemList.add(extraItemsMap);
			info extraItemList;
		}
	}
}
dataMap.put("Extra_Items",extraItemList);
Total = ItemTotal_Amount + ExtraTotal_Amount;
dataMap.put("Total_Amount",Total.round(2));
companyinfo = zoho.crm.getRecordById("Accounts",getQuoteInfo.get("Company_Name").get("id"));
if(getQuoteInfo.get("Quotation_Owner") != null)
{
	dataMap.put("Owner",getQuoteInfo.get("Quotation_Owner").get("id"));
}
else
{
	dataMap.put("Quotation_Owner",companyinfo.get("Owner").get("id"));
	dataMap.put("Owner",companyinfo.get("Owner").get("id"));
}
info dataMap;
updateCrmQuote = zoho.crm.updateRecord("Quotations",QuoteID,dataMap);
//code to handle when quote owner account closed  
if(updateCrmQuote.get("code") == "INVALID_DATA")
{
	if(updateCrmQuote.get("details").get("api_name") == "Quotation_Owner")
	{
		dataMap = Map();
		companyinfo = zoho.crm.getRecordById("Accounts",getQuoteInfo.get("Company_Name").get("id"));
		if(getQuoteInfo.get("Quotation_Owner") != null)
		{
			dataMap.put("Owner",getQuoteInfo.get("Quotation_Owner").get("id"));
		}
		else
		{
			dataMap.put("Quotation_Owner",449573000000099001);
			dataMap.put("Owner",449573000000099001);
		}
		updateCrmQuote = zoho.crm.updateRecord("Quotations",QuoteID,dataMap,{"trigger":{"workflow"}});
	}
}
openUrl("https://crm.zoho.com/crm/org7626235/tab/CustomModule6/" + QuoteID,"same window");