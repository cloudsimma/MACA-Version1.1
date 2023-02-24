//----------------Add Notes -  Quote dev log starts here------------
createnote = Map();
createnote.put("Note_Content","Quote Created by :" + zoho.loginuser + ",Action :Normal-Flow,Time :" + zoho.currenttime);
createnote.put("Parent_Id",QuoteID);
createnote.put("se_module","Quotations");
createnotelist = List();
createnotelist.add(createnote);
finalcreatenote = Map();
finalcreatenote.put("data",createnotelist);
respcreatenote = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/Quotations/" + QuoteID + "/Notes"
	type :POST
	parameters:finalcreatenote.tostring()
	connection:"zohooauth"
];
info respcreatenote;
//--------------- Add Notes -  Quote dev log Ends here--------------
quote_map = Map();
quote_map.put("Quote_Generated_By",zoho.loginuser);
updateStatus = zoho.crm.updateRecord("Quotations",QuoteID,quote_map);