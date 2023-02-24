getSOInfo = zoho.crm.getRecordById("Supplier_orders_new",SOID);
getProductList = getSOInfo.get("Purchased_items");
getExtras = getSOInfo.get("Extras_Item");
ItemTotal = 0;
ExtrasTotal = 0;
livTotal = 0;
dataMap = Map();
for each  Proditem in getProductList
{
	if(Proditem.get("Amount_CA") != null && Proditem.get("Amount_CA") > 0)
	{
		ItemTotal = ItemTotal + Proditem.get("Amount_CA");
	}
}
for each  extraItem in getExtras
{
	if(extraItem.get("Total_Amount") != null && extraItem.get("Total_Amount") > 0)
	{
		ExtrasTotal = ExtrasTotal + extraItem.get("Total_Amount");
	}
	if(extraItem.get("Product").get("name") != null && extraItem.get("Product").get("name").contains("Livraison estimée"))
	{
		livTotal = livTotal + extraItem.get("Total_Amount");
	}
}
Total = ItemTotal + ExtrasTotal;
dataMap.put("Total_Amount",Total.round(2));
dataMap.put("Total_transport",livTotal);
updateCrm = zoho.crm.updateRecord("Supplier_orders_new",SOID,dataMap);