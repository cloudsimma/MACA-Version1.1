GetOrder = zoho.crm.getRecordById("Orders_New",OrderID);
OrderNo = GetOrder.get("No_Commande_Maca").getSuffix("C");
info OrderNo;
response = zoho.crm.searchRecords("Supplier_orders_new","(Order_Number:equals:" + OrderNo + ")");
info response.size();
for each  supOrder in response
{
	GetSO = zoho.crm.getRecordById("Supplier_orders_new",supOrder.get("id"));
	info supOrder.get("id");
	UpdateMap = Map();
	if(GetOrder.get("State") == "Livrée.")
	{
		info "Liver";
		UpdateMap.put("Status","Livrée.");
	}
	else if(GetOrder.get("State") == "Facturée")
	{
		info "Facturee";
		UpdateMap.put("Status","Facturée");
	}
	CRMupdateRec = zoho.crm.updateRecord("Supplier_orders_new",supOrder.get("id").toLong(),UpdateMap);
	info CRMupdateRec;
}