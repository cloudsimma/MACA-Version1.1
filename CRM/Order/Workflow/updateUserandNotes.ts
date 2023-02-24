//crm log in - Remarks - Add note
createnote = Map();
createnote.put("Note_Content","Order Created by:" + zoho.loginuser + ",Action : Direct Creation(It was restricted),Time : " + zoho.currenttime);
createnote.put("Parent_Id",orderId);
createnote.put("se_module","Orders_New");
createnotelist = List();
createnotelist.add(createnote);
finalcreatenote = Map();
finalcreatenote.put("data",createnotelist);
//info finalcreatenote;
respcreatenote = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/Orders_New/" + orderId + "/Notes"
	type :POST
	parameters:finalcreatenote.tostring()
	connection:"zohooauth"
];
info "dev log - " + respcreatenote;
// dev log ends
dmap = Map();
dmap.put("Order_Generated_By",zoho.loginuser);
updateStatus = zoho.crm.updateRecord("Orders_New",orderId,dmap);