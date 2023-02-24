try 
{
	//thisapp.creator.OrderVendorMapping(input.Quotation_ID.tolong(),input.ID);
	thisapp.books.createSalesOrder(input.ID);
	getOrder = Orders[Order_No == input.Order_No];
	getOrderItems = Order_Items[Order_ID == getOrder.ID];
	getExtraItems = Extra_Items[Order_ID == getOrder.ID];
	// 	info getOrderItems;
	i = 0;
	for each  item in getOrderItems
	{
		// 		if(item.Product_Type == "Product")
		// 		{
		item.Vendor_Name=Product_Details[ID == item.Product].Supplier_Name;
		if(item.CRM_Quotation_Item_ID != "")
		{
			getQuoteInfo = Quotation_Items[Line_Item_ID == item.CRM_Quotation_Item_ID];
			if(getQuoteInfo.count() > 0)
			{
				item.Image_URL=getQuoteInfo.Image_URL;
				item.Image_URL_2=getQuoteInfo.Image_URL_2;
			}
		}
		item.Zoho_CRM_ID=getOrder.Zoho_CRM_ID;
		// 		}
	}
	for each  Ex_item in getExtraItems
	{
		// 		if(item.Product_Type == "Extra")
		// 		{
		if(Ex_item.CRM_Quotation_Item_ID != "")
		{
			getExtra = Extras[Line_Item_ID == Ex_item.CRM_Quotation_Item_ID];
			if(getExtra.count() > 0 && getExtra.Supplier != null)
			{
				Ex_item.Vendor_Name=getExtra.Supplier;
			}
			else
			{
				//Ex_item.Vendor_Name=Product_Details[ID == Ex_item.Product].Supplier_Name;
			}
		}
		Ex_item.Zoho_CRM_ID=getOrder.Zoho_CRM_ID;
		// 		}
	}
	thisapp.books.createSalesOrder(input.ID);
}
catch (e)
{
	thisapp.Developer.addDeveloperLog("Orders","Creator-Create Order",input.ID.toString(),e);
}
// thisapp.creator.createSupplierOrders(input.ID);
// data = Orders[ID == input.ID];
// info data;
// 	// 	for each productRec in input.Product_Details
// 	for each  productRec in getPPP
// 	{
// 		lineItemMap = Map();
// 		if(productRec.Product_Name.Zoho_Books_ID != null && productRec.Product_Name.Zoho_Books_ID != "")
// 		{
// 			lineItemMap.put("item_id",productRec.Product_Name.Zoho_Books_ID);
// 			lineItemMap.put("name",productRec.Product_Name.Product_Name);
// 		}
// 		else
// 		{
// 			getProductInfo = invokeurl
// [
// 	url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&name=" + productRec.Product_Name.Product_Name
// 	type :GET
// 	connection:"zohobookscon"
// ];
// 			if(getProductInfo.get("code") == 0)
// 			{
// 				for each  itemRec in getProductInfo.get("items")
// 				{
// 					lineItemMap.put("item_id",itemRec.get("item_id"));
// 					lineItemMap.put("name",itemRec.get("name"));
// 					updateProductID = Product_Details[ID == productRec.Product_Name];
// 					updateProductID.Zoho_Books_ID=itemRec.get("item_id");
// 				}
// 			}
// 		}
// 		lineItemMap.put("quantity",productRec.Quantity);
// 		lineItemMap.put("rate",productRec.Unit_Price);
// 		lineItemMap.put("item_total",productRec.Total);
// 		lineItemList.add(lineItemMap);
// 	}
// 	dataMap.put("line_items",lineItemList);
// 	createEstimate = invokeurl
// [
// 	url :"https://books.zoho.com/api/v3/estimates?organization_id=" + orgID + "&JSONString=" + dataMap
// 	type :POST
// 	connection:"zohobookscon"
// ];
