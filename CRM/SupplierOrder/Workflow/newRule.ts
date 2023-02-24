//----------------Add Notes -  SO dev log starts here------------
createnote = Map();
createnote.put("Note_Content","SO Created by :" + zoho.loginuser + ",Action:Direct-Flow,Time :" + zoho.currenttime);
createnote.put("Parent_Id",SOID);
createnote.put("se_module","Supplier_orders_new");
createnotelist = List();
createnotelist.add(createnote);
finalcreatenote = Map();
finalcreatenote.put("data",createnotelist);
respcreatenote = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/Supplier_orders_new/" + SOID + "/Notes"
	type :POST
	parameters:finalcreatenote.tostring()
	connection:"zohooauth"
];
info respcreatenote;
//--------------- Add Notes -  SO dev log Ends here--------------
dmap = Map();
dmap.put("SO_Generated_By",zoho.loginuser);
updateStatus = zoho.crm.updateRecord("Supplier_orders_new",SOID,dmap);