try 
{
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMaps1 = Map();
	dataMaps1.put("Module","Orders New");
	dataMaps1.put("Process_Description"," CRM:SO generation started from crm button click by-" + zoho.loginuser);
	dataMaps1.put("In_Data",orderId);
	dataMaps1.put("Out_Response","Button Click");
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMaps1,Map(),"zohocreatorcon");
	returnResp = "";
	supplierID = "";
	dataMap = Map();
	dataMap.put("CRM_Order_ID",orderId);
	dataMap.put("Module_name","New_Module");
	dataMap.put("CRM_Added_User",zoho.loginuser);
	//getOrderInfo = zoho.crm.getRecordById("Orders_New",orderId);
	CreatorResponse = zoho.creator.createRecord(ownerName,appName,"Supplier_Order_Creation_From_CRM",dataMap,Map(),"zohocreatorcon");
	info "CreatorResponse :" + CreatorResponse;
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMaps = Map();
	dataMaps.put("Module","Orders New");
	dataMaps.put("Process_Description"," Supplier order generation is started! ");
	dataMaps.put("In_Data",orderId);
	dataMaps.put("Out_Response",creatorOrderId);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMaps,Map(),"zohocreatorcon");
	openUrl("https://crm.zoho.com/crm/org7626235/tab/CustomModule10/custom-view/449573000108717018/canvas/449573000111760059","new window");
	if(CreatorResponse != null && CreatorResponse.get("code") == 3000)
	{
		returnResp = "Supplier Order Creation Started , You will be redirected automatically when the generation is completed.";
		// 		update_map = Map();
		// 		update_map.put("Status","En approbation vendeur");
		// 		updateOrder = zoho.crm.updateRecord("Orders_New",orderId,update_map);
		// 		info updateOrder;
	}
	else
	{
		returnResp = "Something Went Wrong";
	}
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMap,Map(),"zohocreatorcon");
	// 	}
}
catch (e)
{
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMaps = Map();
	dataMaps.put("Module","Orders New");
	dataMaps.put("Process_Description"," CRM:Sales Orders-Supplier Order T");
	dataMaps.put("In_Data",orderId);
	dataMaps.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMaps,Map(),"zohocreatorcon");
	//info ContactCreateResponse;
}
return returnResp;