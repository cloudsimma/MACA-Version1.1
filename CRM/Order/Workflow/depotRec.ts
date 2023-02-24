orderinfo = zoho.crm.getRecordById("Orders_New",OrderID);
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
	if(orderinfo.get("Stratege") != null && orderinfo.get("Stratege") != "")
	{
		if(user.get("id") == orderinfo.get("Stratege").get("id"))
		{
			Stratege_Mailid = user.get("email");
		}
	}
}
orderurl = "https://creatorapp.zohopublic.com/vanessa68/order-management/page-perma/View_Order_New/p4bvSO5e7X66ytMBTsGU1apO0mMe2d0821NSgS3NvyQX9UzzxqRFBTJtOWGGxJOCb1tKF03S3qWGmG5ujGW7wqN7FtCCQPfz6Jp9?OrderID=" + OrderID + "&CreatorOrderID=" + creatorID + "&Owner=" + Owner;
subj = "New Dépot recu";
content = "Bonjour, <br><br>Nous avons recu le dépot de ce client : " + orderinfo.get("Company_Name").get("name") + "<br><br> Au montant de : " + orderinfo.get("Deposit_amount_received") + "<br><h3>#Order Num : " + orderinfo.get("No_Commande_Maca") + "<br>Pour : " + orderinfo.get("Name") + "</h3>La livraison de cette commande est prévue pour le: " + orderinfo.get("Customer_delivery_date") + ".<br> <a href=" + orderurl + "> Click here</a> to view the Order";
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
if(Stratege_Mailid != "")
{
	sendmail
	[
		from :zoho.adminuserid
		to :Stratege_Mailid
		subject :subj
		message :content
	]
}