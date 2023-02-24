try 
{
	lead_rec = zoho.crm.getRecordById("Leads",LeadID);
	//lead_email = lead_rec.get("Email");
	lead_name = lead_rec.get("Full_Name");
	sendmail
	[
		from :zoho.adminuserid
		to :"vignesh@cloudlion.org"
		subject :"Track Record Created"
		message :"Hi <br>" + lead_name + "<br> The Track Record had been Created."
	]
}
 catch (e)
{	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMap = Map();
	dataMap.put("Module","Leads");
	dataMap.put("Process_Description","CRM:Leads-Mail Notification in CRM");
	dataMap.put("In_Data",LeadID);
	dataMap.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMap,Map(),"zohocreatorcon");
	//info ContactCreateResponse;
}