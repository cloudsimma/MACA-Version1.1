void books.createSalesOrder(int creatorOrderID)
{
	try 
	{
		getCreatorOrderInfo = Orders[ID == input.creatorOrderID];
		if(getCreatorOrderInfo.count() > 0)
		{
			orgID = thisapp.books.OrgDetails();
			dataMap = Map();
			lineItemList = List();
			if(getCreatorOrderInfo.Company_Name != null)
			{
				if(getCreatorOrderInfo.Company_Name.Zoho_Books_ID != null && getCreatorOrderInfo.Company_Name.Zoho_Books_ID != "")
				{
					dataMap.put("customer_id",getCreatorOrderInfo.Company_Name.Zoho_Books_ID);
					info "dataMap" + dataMap;
				}
				else
				{
					getCustomerInfo = invokeurl
					[
						url :"https://books.zoho.com/api/v3/contacts?organization_id=" + orgID + "&contact_name=" + getCreatorOrderInfo.Company_Name.Company_Name
						type :GET
						connection:"zohobookscon"
					];
					info "getCustomerInfo" + getCustomerInfo;
					if(getCustomerInfo.get("code") == 0)
					{
						for each  contactRec in getCustomerInfo.get("contacts")
						{
							dataMap.put("customer_id",contactRec.get("contact_id"));
							UpdateCompanyID = Company_Details[ID == getCreatorOrderInfo.Company_Name];
							UpdateCompanyID.Zoho_Books_ID=contactRec.get("contact_id");
						}
					}
				}
			}
			//===========For order Line Items=======================
			OrderItemsInfo = Order_Items[Order_ID == getCreatorOrderInfo.ID];
			//info "OrderItemsInfo" + OrderItemsInfo;
			for each  orderRec in OrderItemsInfo
			{
				lineItemMap = Map();
				if(orderRec.Product.Zoho_Books_ID != null && orderRec.Product.Zoho_Books_ID != "")
				{
					lineItemMap.put("item_id",orderRec.Product.Zoho_Books_ID);
					lineItemMap.put("name",orderRec.Product.Product_Name);
					info "lineItemMap1" + lineItemMap;
				}
				else
				{
					getProductInfo = invokeurl
					[
						url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&name=" + orderRec.Product.Product_Name
						type :GET
						connection:"zohobookscon"
					];
					if(getProductInfo.get("code") == 0)
					{
						for each  itemRec in getProductInfo.get("items")
						{
							lineItemMap.put("item_id",itemRec.get("item_id"));
							lineItemMap.put("name",itemRec.get("name"));
							updateProductID = Product_Details[ID == orderRec.Product];
							updateProductID.Zoho_Books_ID=itemRec.get("item_id");
						}
					}
					info "lineItemMap2" + lineItemMap;
				}
				lineItemMap.put("quantity",orderRec.Quantity);
				//info "orderRec.Custom_Pix_Unitaire" + orderRec.Custom_Pix_Unitaire;
				if(orderRec.Custom_Pix_Unitaire != null)
				{
					lineItemMap.put("rate",orderRec.Custom_Pix_Unitaire);
					ltotal = orderRec.Custom_Pix_Unitaire * orderRec.Quantity;
					lineItemMap.put("item_total",ltotal);
				}
				else
				{
					lineItemMap.put("rate",orderRec.Pix_unitaire);
				}
				//info "lineItemMap4" + lineItemMap;
				lineItemMap.put("item_total",orderRec.Amount);
				lineItemList.add(lineItemMap);
			}
			dataMap.put("line_items",lineItemList);
			//info "dataMap" + dataMap;
			//===========For order Extra Items=======================
			OrderExtraItemsInfo = Extra_Items[Order_ID == getCreatorOrderInfo.ID];
			//info OrderExtraItemsInfo;
			for each  orderRec1 in OrderExtraItemsInfo
			{
				ExtraItemMap = Map();
				if(orderRec1.Product.Zoho_Books_ID != null && orderRec1.Product.Zoho_Books_ID != "")
				{
					ExtraItemMap.put("item_id",orderRec1.Product.Zoho_Books_ID);
					ExtraItemMap.put("name",orderRec1.Product.Product_Name);
				}
				else
				{
					getProductInfo = invokeurl
					[
						url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&name=" + orderRec1.Product.Product_Name
						type :GET
						connection:"zohobookscon"
					];
					if(getProductInfo.get("code") == 0)
					{
						for each  itemRec in getProductInfo.get("items")
						{
							ExtraItemMap.put("item_id",itemRec.get("item_id"));
							ExtraItemMap.put("name",itemRec.get("name"));
							updateProductID = Product_Details[ID == orderRec1.Product];
							updateProductID.Zoho_Books_ID=itemRec.get("item_id");
						}
					}
				}
				ExtraItemMap.put("quantity",orderRec1.Quantity);
				if(orderRec.Custom_Pix_Unitaire != null)
				{
					ExtraItemMap.put("rate",orderRec1.Custom_Pix_Unitaire);
				}
				else
				{
					ExtraItemMap.put("rate",orderRec1.Pix_unitaire);
				}
				ExtraItemMap.put("item_total",orderRec1.Amount);
				// 				}
				lineItemList.add(ExtraItemMap);
			}
			dataMap.put("line_items",lineItemList);
			createSalesOrderResp = invokeurl
			[
				url :"https://books.zoho.com/api/v3/salesorders?organization_id=" + orgID
				type :POST
				parameters:dataMap.toString()
				connection:"zohobookscon"
			];
			info "createSalesOrderResp" + createSalesOrderResp;
			if(createSalesOrderResp != null && createSalesOrderResp.get("code") == 0)
			{
				getCreatorOrderInfo.Zoho_Books_No=createSalesOrderResp.get("salesorder").get("salesorder_number");
				getCreatorOrderInfo.Zoho_Books_ID=createSalesOrderResp.get("salesorder").get("salesorder_id");
				getCreatorOrderInfo.Books_Order_Create_Status="Success";
			}
			else
			{
				getCreatorOrderInfo.Failure_Reason=createSalesOrderResp;
				getCreatorOrderInfo.Books_Order_Create_Status="Failure";
			}
		}
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("books-createSO","CreateSalesOrder in Books",creatorOrderID.toString(),e);
	}
}