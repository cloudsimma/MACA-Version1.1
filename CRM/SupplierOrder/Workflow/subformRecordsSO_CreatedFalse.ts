// GetSO = zoho.crm.getRecordById("Supplier_orders_new",SO_ID);
// //449573000125426160
// //info GetSO;
// GetSubformID = GetSO.get("Creator_Subform_Items_ID");
// info GetSubformID;
for each  rec in CreatorItemID
{
	info rec;
	dataMap = Map();
	dataMap.put("Supplier_Order_Generated",false);
	otherParams = Map();
	response = zoho.creator.updateRecord("vanessa68","order-management","All_Order_Items",rec.tolong(),dataMap,otherParams,"zohocreatorcon");
	info response;
}
//GetExtrasCreatorID = GetSO.get("Creator_Subform_Extras_ID");
for each  eachExtra in CreatorExtrasID
{
	dataMap1 = Map();
	dataMap1.put("Supplier_Order_Generated",false);
	otherParams1 = Map();
	response = zoho.creator.updateRecord("vanessa68","order-management","Extra_Items_Report",eachExtra.tolong(),dataMap1,otherParams1,"zohocreatorcon");
}