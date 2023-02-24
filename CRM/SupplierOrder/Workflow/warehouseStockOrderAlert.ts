orderinfo = zoho.crm.getRecordById("Supplier_orders_new",SOID);
Collaboratrice_Mailid = "";
Stratege_Mailid = "";
resp = zoho.crm.getRecords("users");
for each  user in resp.get("users")
{
	if(orderinfo.get("Order_managed_by") != null && orderinfo.get("Order_managed_by") != "")
	{
		collab_name = getPrefix(orderinfo.get("Order_managed_by")," ");
		if(user.get("full_name").contains(collab_name))
		{
			Collaboratrice_Mailid = user.get("email");
		}
	}
	// 	if(orderinfo.get("Stratege") != null && orderinfo.get("Stratege") != "")
	// 	{
	// 		if(user.get("id") == orderinfo.get("Stratege").get("id"))
	// 		{
	// 			Stratege_Mailid = user.get("email");
	// 		}
	// 	}
}
orderurl = "https://creatorapp.zohopublic.com/vanessa68/order-management/page-perma/Test_SO_Template/f7OVDT9XRVwGheJ1MmNR8Seg2MYVZ8WdjsMJj9fCN4rskH4DwQ4jaCknTM9dqsv0EMgCQeTse7sbsGMBXh07hbmmqGr1vQFKZeq8?SOID=" + SOID;
if(orderinfo.get("Status") == "Stock a l'entrepot")
{
	subj = "New Alerte Stock a l'entrepot";
	content = "Bonjour, <br><br>Votre commande pour:" + if(orderinfo.get("Profil_client") != null,orderinfo.get("Profil_client").get("name"),"-") + "<br><br>" + orderinfo.get("Name") + " : " + if(orderinfo.get("COMMANDE_Client") != null,orderinfo.get("COMMANDE_Client").get("Name"),"-") + "<br>est arrivé a notre entrepôt. S.v.p. nous aviser de la prochaine étape.<br>La livraison finale est demandée pour le :" + orderinfo.get("Customer_delivery_date") + ".<br> <a href=" + orderurl + "> Click here</a> to view the Suppier Order.";
}
if(orderinfo.get("Status") == "En livraison vers Client")
{
	subj = "New Alerte En livraison vers Client";
	content = "Bonjour, <br><br>Votre commande pour:" + orderinfo.get("Profil_client").get("name") + "<br><br>" + orderinfo.get("Name") + " : " + orderinfo.get("COMMANDE_Client").get("Name") + "<br>est arrivé a notre entrepôt. S.v.p. nous aviser de la prochaine étape.<br>La livraison finale est demandée pour le :" + orderinfo.get("Customer_delivery_date") + ".<br> <a href=" + orderurl + "> Click here</a> to view the Suppier Order.";
}
// sendmail
// 	[
// 		from :zoho.adminuserid
// 		to :"priya.g@cloudlion.org"
// 		subject :subj
// 		message :content +","+zoho.adminuserid +","+zoho.loginuserid +","+Stratege_Mailid
// 	]
if(Collaboratrice_Mailid != "")
{
	sendmail
	[
		from :zoho.adminuserid
		to :Collaboratrice_Mailid
		subject :subj
		message :content
	]
}
// if(Stratege_Mailid != "")
// {
// 	sendmail
// 	[
// 		from :zoho.adminuserid
// 		to :Stratege_Mailid
// 		subject :subj
// 		message :content
// 	]
// }