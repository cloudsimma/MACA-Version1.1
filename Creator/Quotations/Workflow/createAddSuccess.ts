thisapp.Test.TestQuoteBooksUpdate(input.ID);
// getQuoteItems = Quotation_Items[Quotation_ID == input.ID];
// if(getQuoteItems.count() > 0)
// {
// 	orgID = thisapp.books.OrgDetails();
// 	dataMap = Map();
// 	lineItemList = List();
// 	try 
// 	{
// 		if(input.Company_Name != null)
// 		{
// 			if(input.Company_Name.Zoho_Books_ID != null && input.Company_Name.Zoho_Books_ID != "")
// 			{
// 				dataMap.put("customer_id",input.Company_Name.Zoho_Books_ID);
// 			}
// 			else
// 			{
// 				getCustomerInfo = invokeurl
// 				[
// 					url :"https://books.zoho.com/api/v3/contacts?organization_id=" + orgID + "&contact_name=" + input.Company_Name.Company_Name
// 					type :GET
// 					connection:"zohobookscon"
// 				];
// 				if(getCustomerInfo.get("code") == 0)
// 				{
// 					for each  contactRec in getCustomerInfo.get("contacts")
// 					{
// 						dataMap.put("customer_id",contactRec.get("contact_id"));
// 						UpdateCompanyID = Company_Details[ID == input.Company_Name];
// 						UpdateCompanyID.Zoho_Books_ID=contactRec.get("contact_id");
// 					}
// 				}
// 			}
// 		}
// 		getPPP = Quotation_Items[Quotation_ID == input.ID];
// 		// 	for each productRec in input.Product_Details
// 		for each  productRec in getPPP
// 		{
// 			getProductInfo = Product_Details[ID == productRec.Product_Name];
// 			lineItemMap = Map();
// 			if(productRec.Product_Name.Zoho_Books_ID != null && productRec.Product_Name.Zoho_Books_ID != "")
// 			{
// 				lineItemMap.put("item_id",productRec.Product_Name.Zoho_Books_ID);
// 				lineItemMap.put("name",productRec.Product_Name.Product_Name);
// 			}
// 			else
// 			{
// 				getProductInfo = invokeurl
// 				[
// 					url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&name=" + productRec.Product_Name.Product_Name
// 					type :GET
// 					connection:"zohobookscon"
// 				];
// 				if(getProductInfo.get("code") == 0)
// 				{
// 					if(getProductInfo.get("items").size() > 0)
// 					{
// 						for each  itemRec in getProductInfo.get("items")
// 						{
// 							lineItemMap.put("item_id",itemRec.get("item_id"));
// 							lineItemMap.put("name",itemRec.get("name"));
// 							updateProductID = Product_Details[ID == productRec.Product_Name];
// 							if(updateProductID != null)
// 							{
// 								updateProductID.Zoho_Books_ID=itemRec.get("item_id");
// 							}
// 						}
// 					}
// 					else
// 					{
// 						productMap = Map();
// 						productMap.put("name",productRec.Product_Name.Product_Name);
// 						productMap.put("rate",if(productRec.Product_Name.Unit_Price != null,productRec.Product_Name.Unit_Price,0.0));
// 						productMap.put("description",productRec.Product_Name.Product_Description);
// 						createProductResponse = invokeurl
// 						[
// 							url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&JSONString=" + productMap
// 							type :POST
// 							connection:"zohobookscon"
// 						];
// 						if(createProductResponse != null && createProductResponse.get("code") == 0)
// 						{
// 							lineItemMap.put("item_id",createProductResponse.get("item").get("item_id"));
// 							lineItemMap.put("name",createProductResponse.get("item").get("name"));
// 							getProductInfo.Zoho_Books_ID=createProductResponse.get("item").get("item_id");
// 						}
// 					}
// 				}
// 			}
// 			lineItemMap.put("description",productRec.Product_Description);
// 			lineItemMap.put("quantity",productRec.Quantity);
// 			lineItemMap.put("rate",if(productRec.Custom_Pix_Unitaire > 0,productRec.Custom_Pix_Unitaire,productRec.Pix_unitaire));
// 			lineItemMap.put("item_total",productRec.Total);
// 			lineItemList.add(lineItemMap);
// 		}
// 		getextraPPP = Extras[Quotation_ID == input.ID];
// 		// 	for each productRec in input.Product_Details
// 		for each  productRecextra in getextraPPP
// 		{
// 			getProductInfoextra = Product_Details[ID == productRecextra.Product];
// 			extralineItemMap = Map();
// 			if(productRecextra.Product.Zoho_Books_ID != null && productRecextra.Product.Zoho_Books_ID != "")
// 			{
// 				extralineItemMap.put("item_id",productRecextra.Product.Zoho_Books_ID);
// 				extralineItemMap.put("name",productRecextra.Product.Product_Name);
// 			}
// 			else
// 			{
// 				getProductInfo = invokeurl
// 				[
// 					url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&name=" + productRecextra.Product.Product_Name
// 					type :GET
// 					connection:"zohobookscon"
// 				];
// 				if(getProductInfo.get("code") == 0)
// 				{
// 					if(getProductInfo.get("items").size() > 0)
// 					{
// 						for each  itemRec in getProductInfo.get("items")
// 						{
// 							extralineItemMap.put("item_id",itemRec.get("item_id"));
// 							extralineItemMap.put("name",itemRec.get("name"));
// 							updateProductID = Product_Details[ID == productRecextra.Product];
// 							if(updateProductID != null)
// 							{
// 								updateProductID.Zoho_Books_ID=itemRec.get("item_id");
// 							}
// 						}
// 					}
// 					else
// 					{
// 						productMap = Map();
// 						productMap.put("name",productRecextra.Product.Product_Name);
// 						productMap.put("rate",if(productRecextra.Product.Unit_Price != null,productRecextra.Product.Unit_Price,0.0));
// 						productMap.put("description",productRecextra.Product.Product_Description);
// 						createProductResponse = invokeurl
// 						[
// 							url :"https://books.zoho.com/api/v3/items?organization_id=" + orgID + "&JSONString=" + productMap
// 							type :POST
// 							connection:"zohobookscon"
// 						];
// 						if(createProductResponse != null && createProductResponse.get("code") == 0)
// 						{
// 							extralineItemMap.put("item_id",createProductResponse.get("item").get("item_id"));
// 							extralineItemMap.put("name",createProductResponse.get("item").get("name"));
// 							getProductInfo.Zoho_Books_ID=createProductResponse.get("item").get("item_id");
// 						}
// 					}
// 				}
// 			}
// 			extralineItemMap.put("description",productRecextra.Product.Product_Description);
// 			extralineItemMap.put("quantity",productRecextra.Quantit);
// 			extralineItemMap.put("rate",if(productRecextra.Custom_Pix_Unitaire > 0,productRecextra.Custom_Pix_Unitaire,productRecextra.Pix_unitaire));
// 			extralineItemMap.put("item_total",productRec.Total);
// 			lineItemList.add(extralineItemMap);
// 		}
// 		dataMap.put("line_items",lineItemList);
// 		createEstimate = invokeurl
// 		[
// 			url :"https://books.zoho.com/api/v3/estimates?organization_id=" + orgID + "&JSONString=" + dataMap
// 			type :POST
// 			connection:"zohobookscon"
// 		];
// 		info "createEstimate " + createEstimate;
// 		sendmail
// 		[
// 			from :zoho.loginuserid
// 			to :"priya.g@codecatalyst.in",input.
// 			subject :"Creator - MACA Estimate - Testing"
// 			message :"lineItemList" + lineItemList + "/nBooks Resp :" + createEstimate
// 		]
// 		//getQuoteInfo = Quotations[ID == getQuoteInfo.ID];
// 		if(createEstimate != null && createEstimate.get("code") == 0)
// 		{
// 			input.Zoho_Books_Quote_ID = createEstimate.get("estimate").get("estimate_id");
// 			input.Zoho_Books_Quote_No = createEstimate.get("estimate").get("estimate_number");
// 			input.Books_Quote_Create_Status = "Success";
// 		}
// 		else
// 		{
// 			input.Books_Quote_Create_Status = "Failure";
// 			input.Failure_Reason = createEstimate;
// 		}
// 	}
// 	catch (e)
// 	{
// 		thisapp.Developer.addDeveloperLog("Quotation","Create  Records in Books",input.ID.toString(),e);
// 	}
// }
