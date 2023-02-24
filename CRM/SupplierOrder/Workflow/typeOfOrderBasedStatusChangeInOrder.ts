GetSO = zoho.crm.getRecordById("Supplier_orders_new",SO_ID);
//info GetSO;
if(GetSO.get("Type_de_commande") == "Standard" || GetSO.get("Type_de_commande") == "Décorateur Final")
{
	if(GetSO.get("Type_Of_Order_Standard_Decorator") == "True")
	{
		if(GetSO.get("Order_Number").contains("C"))
		{
			OrderNo = GetSO.get("Order_Number");
		}
		else
		{
			OrderNo = "C" + GetSO.get("Order_Number");
		}
		response = zoho.crm.searchRecords("Orders_New","(No_Commande_Maca:equals:" + OrderNo + ")");
		GetAllSO = zoho.crm.searchRecords("Supplier_orders_new","(Order_Number:equals:" + GetSO.get("Order_Number") + ")");
		info GetAllSO.size();
		count = 0;
		SOList = List();
		for each  eachSO in GetAllSO
		{
			Get_SO = zoho.crm.getRecordById("Supplier_orders_new",eachSO.getJSON("id"));
			info Get_SO.get("Order_Number");
			if(Get_SO.get("Type_de_commande") == "Standard" || Get_SO.get("Type_de_commande") == "Décorateur Final")
			{
				if(Get_SO.get("Type_Of_Order_Standard_Decorator") == "True")
				{
					count = count + 1;
					SOList.add(Get_SO.get("Name"));
				}
			}
			//	info eachSO.getJSON("id");
		}
		if(count == 1)
		{
			OrderID = response.getJSON("id");
			UpdateMap = Map();
			UpdateMap.put("Status",GetSO.get("Status"));
			info UpdateMap;
			UpdateRec = zoho.crm.updateRecord("Orders_New",OrderID,UpdateMap);
			//Adding Notes for Order - Jana
			oldStatus = response.getJSON("Status");
			newStatus = GetSO.get("Status");
			supplierOrderName = Get_SO.get("Name");
			supplierOrderNumber = Get_SO.get("Order_Number");
			user = zoho.loginuser;
			dateAndTime = zoho.currenttime;
			NotesforOrder = "Order Status was updated from *" + oldStatus + " to *" + newStatus + ".Because of update in Supplier Order workflow. SO : " + supplierOrderName + " by " + user + " On " + dateAndTime + ".This Supplier Order had Original / Decorateur.";
			createnote = Map();
			createnote.put("Note_Content",NotesforOrder);
			createnote.put("Parent_Id",OrderID);
			createnote.put("se_module","Orders_New");
			info "Create Note :" + createnote;
			createnotelist = List();
			createnotelist.add(createnote);
			finalcreatenote = Map();
			finalcreatenote.put("data",createnotelist);
			info "param :" + finalcreatenote;
			respcreatenote = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v2/Orders_New/" + OrderID + "/Notes"
				type :POST
				parameters:finalcreatenote.tostring()
				connection:"zohooauth"
			];
			info respcreatenote;
		}
		else
		{
			info "Else";
			//	Msg = "Already another SO having this type (" + SOList + ")";
			//	openUrl("https://creatorapp.zoho.com/vanessa68/order-management/#Form:Alert1?plain=" + Msg,"popup window","height=400px,width=500px");
			//	openUrl("https://crm.zoho.com/crm/org7626235/tab/CustomModule10/449573000121967026","new window");
			//return "Already another SO having this type";
			// 	openUrl("https://crm.zoho.com/crm/org7626235/settings/workflow-rules?module=CustomModule10&status=All","new window");
		}
		info count;
	}
}
// if(GetSO.get("Type_de_commande") == "Standard" || GetSO.get("Type_de_commande") == "Décorateur")
// {
// 	info "hai";
// 	OrderID = response.getJSON("id");
// 	UpdateMap = Map();
// 	UpdateMap.put("Status",GetSO.get("Status"));
// 	info UpdateMap;
// //	UpdateRec = zoho.crm.updateRecord("Orders_New",OrderID,UpdateMap);
// }