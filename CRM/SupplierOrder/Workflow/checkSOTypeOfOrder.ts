GetSO = zoho.crm.getRecordById("Supplier_orders_new",SO_ID);
//info GetSO;
if(GetSO.get("Type_de_commande") == "Standard" || GetSO.get("Type_de_commande") == "Décorateur Final")
{
	GetAllSO = zoho.crm.searchRecords("Supplier_orders_new","(Order_Number:equals:" + GetSO.get("Order_Number") + ")");
	info GetAllSO.size();
	count = 0;
	SOList = List();
	SODupID_List = List();
	for each  eachSO in GetAllSO
	{
		Get_SO = zoho.crm.getRecordById("Supplier_orders_new",eachSO.getJSON("id"));
		info Get_SO.get("Order_Number");
		if(Get_SO.get("Type_de_commande") == "Standard" || Get_SO.get("Type_de_commande") == "Décorateur Final")
		{
			if(Get_SO.get("id") != GetSO.get("id"))
			{
				count = count + 1;
			}
		}
	}
	if(count == 0)
	{
		// Already Standard or Décorateur record Not Available - Unique Rec - True
		UpdateMap = Map();
		UpdateMap.put("Type_Of_Order_Standard_Decorator","True");
		info UpdateMap;
		UpdateRec = zoho.crm.updateRecord("Supplier_orders_new",SO_ID,UpdateMap);
	}
	else
	{
		// Already Standard or Décorateur record Available - Not a Unique rec - false
		UpdateMap1 = Map();
		UpdateMap1.put("Type_Of_Order_Standard_Decorator","False");
		info UpdateMap1;
		UpdateRec = zoho.crm.updateRecord("Supplier_orders_new",SO_ID,UpdateMap1);
	}
}