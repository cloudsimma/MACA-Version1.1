rec = zoho.crm.getRecordById("ProductNew",pid);
info rec;
cretorid = cid;
booksid = bid;
if(cretorid != null && cretorid != "")
{
	respCreator = invokeurl
	[
		url :"https://creator.zoho.com/api/v2/vanessa68/order-management/report/Product_Details_Report/" + cretorid
		type :DELETE
		connection:"zohocreatorcon"
	];
	info respCreator;
}
if(booksid != null && booksid != "")
{
	respBook = invokeurl
	[
		url :"https://books.zoho.com/api/v3/items/" + booksid + "?organization_id=328433160"
		type :DELETE
		connection:"books"
	];
	info respBook;
}