try 
{
	createnote = Map();
	createnote.put("Note_Content","Function Start Time " + zoho.currenttime);
	createnote.put("Parent_Id",quoteID);
	createnote.put("se_module","Quotations");
	//info createnote;
	createnotelist = List();
	createnotelist.add(createnote);
	finalcreatenote = Map();
	finalcreatenote.put("data",createnotelist);
	//info finalcreatenote;
	respcreatenote = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2/Quotations/" + quoteID + "/Notes"
		type :POST
		parameters:finalcreatenote.tostring()
		connection:"zohooauth"
	];
	//info "respcreatenote" + respcreatenote;
	returnResp = "";
	getQuoteInfo = zoho.crm.getRecordById("Quotations",quoteID);
	// 	info getQuoteInfo;
	appName = "order-management";
	ownerName = "vanessa68";
	returnResponse = "";
	getProductList = getQuoteInfo.get("Product_Details");
	getExtras = getQuoteInfo.get("Extra_Items");
	// 	margin_map = {"A":0.5,"B":0.45,"C":0.40,"D":0.35,"E":0.30,"F":0.25,"G":0.20,"H":0.19,"I":0.18,"J":0.17,"K":0.16,"L":0.15,"X":1};
	margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
	//Date English to French
	getNewQuote = zoho.crm.getRecordById("Quotations",quoteID);
	quote_date = if(getNewQuote.get("Quotation_Date") != null,getNewQuote.get("Quotation_Date"),zoho.currentdate);
	//crntDate = zoho.currentdate;
	day = quote_date.day();
	month = quote_date.month();
	year = quote_date.year();
	DateFrenchMap = {"1":"Janvier","2":"Février","3":"Mars","4":"Avril","5":"Mai","6":"Juin","7":"Juillet","8":"Août","9":"Septembre","10":"Octobre","11":"Novembre","12":"Décembre"};
	dateString = month.tostring();
	getData = DateFrenchMap.get(dateString);
	// 		info getData;
	FrenchDate = day + "-" + getData + "-" + year;
	// 	Updating quote updation status
	if(creatoreQuoteID != null && creatoreQuoteID != "")
	{
		getCreatorData = Map();
		getCreatorData.put("CRM_Update_Status","true");
		getCreatorData.put("Quote_Date",FrenchDate);
		updateCreatorStatus = zoho.creator.updateRecord(ownerName,appName,"All_Quotations",creatoreQuoteID,getCreatorData,Map(),"zohocreatorcon");
		info "Update info :" + updateCreatorStatus;
	}
	else
	{
		getQuoteInfo = zoho.crm.getRecordById("Quotations",quoteID);
		getProductList = getQuoteInfo.get("Product_Details");
		getExtras = getQuoteInfo.get("Extra_Items");
		ItemTotal_Amount = 0;
		ExtraTotal_Amount = 0;
		extraItemList = List();
		extraItemsMap = Map();
		ItemList = List();
		//Item = Map();
		dataMap = Map();
		seq = 0;
		//margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
		margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
		for each  item in getProductList
		{
			if(item.get("Quantity") != null && item.get("Unit_Price_CA") != null)
			{
				//info item.get("Product");
				seq = seq + 1;
				disTotalItem = (item.get("Unit_Price_CA") * margin_map.get(item.get("Margin")) / margin_map.get(item.get("Margin_B"))).round(2);
				if(item.get("Custom_Pix_Unitaire") != null)
				{
					ItemTotal_Amount = ItemTotal_Amount + item.get("Quantity") * item.get("Custom_Pix_Unitaire");
					lineamount = item.get("Quantity") * item.get("Custom_Pix_Unitaire");
					CustomPixUnitaire = item.get("Custom_Pix_Unitaire");
				}
				else
				{
					ItemTotal_Amount = ItemTotal_Amount + item.get("Quantity") * disTotalItem;
					lineamount = item.get("Quantity") * disTotalItem;
					//	CustomPixUnitaire = 0.00;
				}
				// 		getprodDetail = zoho.crm.getRecordById("ProductNew",item.get("Product").get("id"));
				// 		info "item" + getprodDetail;
				// 		supplier = getExtraprodDetail.get(Supplier).get(id);
				disTotalItem1 = disTotalItem.round(2);
				CustomPixUnitaire1 = CustomPixUnitaire;
				lineamount1 = lineamount;
				ItemsMap = {"id":item.get("id"),"Pix_unitaire":disTotalItem1,"Total_Amount":lineamount1};
				ItemList.add(ItemsMap);
			}
		}
		dataMap.put("Product_Details",ItemList);
		//info "getProd" + ItemList;
		for each  item in getExtras
		{
			if(item.get("Extras_Products") != null)
			{
				//info "extras" + item;
				if(item.get("Quantity") != null && item.get("Unit_Price") != null)
				{
					disTotalItem = (item.get("Unit_Price") * margin_map.get(item.get("Cost_Code")) / margin_map.get(item.get("Margin_B"))).round(2);
					if(item.get("Custom_Pix_Unitaire") != null)
					{
						ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * item.get("Custom_Pix_Unitaire");
						lineamount = item.get("Quantity") * item.get("Custom_Pix_Unitaire");
						CustomPixUnitaire = item.get("Custom_Pix_Unitaire");
					}
					else
					{
						ExtraTotal_Amount = ExtraTotal_Amount + item.get("Quantity") * disTotalItem;
						lineamount = item.get("Quantity") * disTotalItem;
					}
					disTotalItem1 = disTotalItem;
					lineamount1 = lineamount;
					//info "disTotalItem1" + disTotalItem1;
					// 					if(item.get("Supplier") == null || item.get("Supplier") == "")
					// 					{
					// 						getExtraprodDetail = zoho.crm.getRecordById("Extras_New",item.get("Extras_Products").get("id"));
					// 						ExtrasSupplier = getExtraprodDetail.get("Supplier").get("id");
					// 						extraItemsMap = {"id":item.get("id"),"Supplier":ExtrasSupplier,"Prix_Total":disTotalItem1,"Total_Amount":lineamount1.round(2)};
					// 					}
					// 					else
					// 					{
					extraItemsMap = {"id":item.get("id"),"Prix_Total":disTotalItem1,"Total_Amount":lineamount1.round(2)};
					// 					}
					extraItemList.add(extraItemsMap);
					//info extraItemList;
				}
			}
		}
		dataMap.put("Extra_Items",extraItemList);
		Total = ItemTotal_Amount + ExtraTotal_Amount;
		dataMap.put("Total_Amount",Total.round(2));
		if(getNewQuote.get("Quotation_Date") == null)
		{
			dataMap.put("Quotation_Date",zoho.currentdate);
		}
		companyinfo = zoho.crm.getRecordById("Accounts",getQuoteInfo.get("Company_Name").get("id"));
		if(getQuoteInfo.get("Quotation_Owner") != null)
		{
			dataMap.put("Owner",getQuoteInfo.get("Quotation_Owner").get("id"));
		}
		else
		{
			dataMap.put("Quotation_Owner",companyinfo.get("Owner").get("id"));
			dataMap.put("Owner",companyinfo.get("Owner").get("id"));
		}
		//info dataMap;
		updateCrmQuote = zoho.crm.updateRecord("Quotations",quoteID,dataMap);
		//info "Update Quote" + updateCrmQuote;
		/////////////////////////////////////////
		getQuoteInfo = zoho.crm.getRecordById("Quotations",quoteID);
		getProductList = getQuoteInfo.get("Product_Details");
		getExtras = getQuoteInfo.get("Extra_Items");
		//info "Else";
		productDetailsMap = Map();
		if(getProductList != null && getProductList.size() > 0 && getProductList.get(0).get("Product") != null)
		{
			resp = zoho.crm.getRecords("users");
			for each  user in resp.get("users")
			{
				if(user.get("email") == zoho.loginuserid)
				{
					//productDetailsMap.put("Quotation_Owner",user.get("id"));
				}
			}
			// add extra for each product starts here
			productList = List();
			for each  product in getQuoteInfo.get("Product_Details")
			{
				product_map = Map();
				if(product.get("Product") != null)
				{
					product_map = Map();
					product_map.put("id",product.get("Product").get("id"));
					product_map.put("name",product.get("Product").get("name"));
					ProdVendor = zoho.crm.getRecordById("ProductNew",product.get("Product").get("id").toLong());
					getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + ProdVendor.get("Supplier").get("id") + "\"",1,200,"zohocreatorcon");
					//info "Vendor id :"+ getCreatorVendor;
					info "Product :" + product.get("Product").get("name");
					product_map.put("Vendor_Name",getCreatorVendor);
					productList.add(product_map);
					info product_map;
				}
			}
			//info "Extras" + getQuoteInfo.get("Extra_Items");
			getExtras = getQuoteInfo.get("Extra_Items");
			extraList = List();
			data_map = Map();
			if(getExtras.size() == 1 && getExtras.get(0).get("Extras_Products") == null)
			{
				for each  item in productList.distinct()
				{
					info "item line no 240 --------- :" + item;
					if(item.get("name") != null)
					{
						extra_map = Map();
						extra_map.put("Product",{"name":item.get("name"),"id":item.get("id")});
						extra_map.put("Cost_Code","X");
						extra_map.put("Margin_B","B");
						extraList.add(extra_map);
					}
				}
				productDetailsMap.put("Extra_Items",extraList);
			}
			else if(getExtras.size() == 0)
			{
				for each  item in productList.distinct()
				{
					extra_map = Map();
					extra_map.put("Product",{"name":item.get("name"),"id":item.get("id")});
					extra_map.put("Cost_Code","X");
					extra_map.put("Margin_B","B");
					extraList.add(extra_map);
				}
				productDetailsMap.put("Extra_Items",extraList);
			}
			else if(getExtras.size() > 0)
			{
				for each  extraItem in getExtras
				{
					extra_map = Map();
					pix_unitaire = 0;
					if(extraItem.get("Cost_Code") == null)
					{
						extraItem.put("Cost_Code","X");
					}
					if(extraItem.get("Margin_B") == null)
					{
						extraItem.put("Margin_B","X");
					}
					if(extraItem.get("Quantity") != null && extraItem.get("Unit_Price") != null)
					{
						if(extraItem.get("Cost_Code") != null && extraItem.get("Margin_B") != null)
						{
							pix_unitaire = (extraItem.get("Unit_Price") * margin_map.get(extraItem.get("Cost_Code")) / margin_map.get(extraItem.get("Margin_B"))).round(2);
						}
						else
						{
							pix_unitaire = extraItem.get("Cost_Price");
						}
					}
					extraItem.put("Pix_unitaire",extraItem.get("Prix_Total"));
					customPixUnitaire = extraItem.get("Custom_Pix_Unitaire");
					total = 0;
					pixVal = 0;
					if(customPixUnitaire != null)
					{
						info ".........";
						if(extraItem.get("Quantity") != null && extraItem.get("Unit_Price") != null)
						{
							total = (extraItem.get("Quantity") * customPixUnitaire).round(2);
						}
					}
					else
					{
						if(extraItem.get("Quantity") != null)
						{
							total = extraItem.get("Quantity") * extraItem.get("Pix_unitaire");
						}
					}
					extraItem.put("Total_Amount",total);
					extraItem.put("Vendeur",total.round(2));
					getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + extraItem.get("Supplier").get("id") + "\"",1,200,"zohocreatorcon");
					extraItem.put("Vendor_Name",getCreatorVendor);
					extraList.add(extraItem);
				}
				for each  item in productList.distinct()
				{
					if(getExtras.notContains(item.get("id")))
					{
						extra_map = Map();
						extra_map.put("Product",{"name":item.get("name"),"id":item.get("id")});
						extra_map.put("Cost_Code","X");
						extra_map.put("Margin_B","B");
						extraList.add(extra_map);
						// 						productDetailsMap.put("Extra_Items",extraList);
					}
				}
				productDetailsMap.put("Extra_Items",extraList);
			}
			// add extra for each product ends here
			//info "productDetailsMap---------------" + productDetailsMap;
			//updateDetails = zoho.crm.updateRecord("Quotations",quoteID,productDetailsMap);
			//info "updateQuote" + updateDetails;
			dataMap = Map();
			lineItemsList = List();
			dataMap.put("Zoho_CRM_ID",quoteID);
			dataMap.put("Quotation_No",quoteNo);
			dataMap.put("Object",Object);
			getQuote = zoho.crm.getRecordById("Quotations",quoteID);
			getLineItemsInfo = getQuote.get("Product_Details").tolist();
			//-----Company Information Section Start Here------------------
			getComapanyInfo = getQuoteInfo.get("Company_Name");
			if(getComapanyInfo != null && getComapanyInfo != "")
			{
				getCreatorCompany = zoho.creator.getRecords(ownerName,appName,"All_Company_Details","Zoho_CRM_ID == \"" + getComapanyInfo.get("id") + "\"",1,200,"zohocreatorcon");
				if(getCreatorCompany != null && getCreatorCompany.get("code") == 3000)
				{
					dataMap.put("Company_Name",getCreatorCompany.get("data").get(0).get("ID"));
				}
			}
			//-----Company Information Section ENd Here------------------
			//-----Contact Information Section Start Here------------------
			getContactInfo = getQuoteInfo.get("Contact_Name");
			if(getContactInfo != null && getContactInfo != "")
			{
				getCreatorContact = zoho.creator.getRecords(ownerName,appName,"All_Contacts","Zoho_CRM_ID == \"" + getContactInfo.get("id") + "\"",1,200,"zohocreatorcon");
				if(getCreatorContact != null && getCreatorContact.get("code") == 3000)
				{
					dataMap.put("Contact_Name",getCreatorContact.get("data").get(0).get("ID"));
				}
				else
				{
					ContactCreateMap = Map();
					ContactCreateMap.put("Contact_Name",getContactInfo.get("name"));
					ContactCreateMap.put("Zoho_CRM_ID",getContactInfo.get("id"));
					ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,"Contacts",ContactCreateMap,Map(),"zohocreatorcon");
					if(ContactCreateResponse != null && ContactCreateResponse.get("code") == 3000)
					{
						dataMap.put("Contact_Name",ContactCreateResponse.get("data").get("ID"));
					}
				}
			}
			//-----Contact Information Section End Here------------------
			//-----Line Items Details Starts Here------------------
			if(getLineItemsInfo.size() > 0)
			{
				for each  Linerec in getLineItemsInfo
				{
					lineItemsMap = Map();
					//------Product Details Section Start here-----------
					getProductNameInfo = Linerec.get("Product");
					// 				productDescriptionInfo = "Couleur du produit:\nMéthode de décoration:\nEmplacement de décoration:\nCouleur du logo :\nDélai de production:\nGrandeurs:\nS:\nM:\nL:\nXL:\nXXL:";
					if(getProductNameInfo != null && getProductNameInfo != "")
					{
						getCreatorProduct = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + getProductNameInfo.get("id") + "\"",1,200,"zohocreatorcon");
						if(getCreatorProduct != null && getCreatorProduct.get("code") == 3000)
						{
							lineItemsMap.put("Product_Name",getCreatorProduct.get("data").get(0).get("ID"));
							// 							lineItemsMap.put("Vendor_Name",getCreatorProduct.get("data").get(0).get("Supplier_Name.ID"));
							getCRMProductInfo = zoho.crm.getRecordById("Products",getProductNameInfo.get("id").toLong());
							if(getCRMProductInfo.get("id") != null)
							{
								if(getCRMProductInfo.get("Vendor_Name") != null)
								{
									getCreatorVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + getCRMProductInfo.get("Vendor_Name").get("id") + "\"",1,200,"zohocreatorcon");
									if(getCreatorVendor.get("code") == 3000 && getCreatorVendor.get("data").size() > 0)
									{
										lineItemsMap.put("Vendor_Name",getCreatorVendor.get("data").get(0).get("ID"));
									}
									else
									{
										getCRMVendor = zoho.crm.getRecordById("Vendors",getCRMProductInfo.get("Vendor_Name").get("id").toLong());
										if(getCRMVendor.get("id") != null)
										{
											data_map = Map();
											data_map.put("Zoho_CRM_ID",getCRMProductInfo.get("Vendor_Name").get("id"));
											data_map.put("Supplier_Name",getCRMVendor.get("Vendor_Name"));
											data_map.put("Supplier_No",getCRMVendor.get("Num_ro_fournisseur"));
											data_map.put("Supplier_Email",getCRMVendor.get("Email"));
											data_map.put("Supplier_Phone",getCRMVendor.get("Phone"));
											data_map.put("Supplier_ID_Internal",getCRMVendor.get("Num_ro_fournisseur"));
											// 													info data_map;
											creatorSupplierResp = zoho.creator.createRecord(ownerName,appName,"Supplier_Details",data_map,Map(),"zohocreatorcon");
											// 													info creatorSupplierResp;
											if(creatorSupplierResp.get("code") == 3000)
											{
												creatorIDUpdateMap = Map();
												creatorIDUpdateMap.put("CreatorSupplierID",creatorSupplierResp.get("data").get("ID").toString());
												updateCreatorID = zoho.crm.updateRecord("Vendors",getCRMProductInfo.get("Vendor_Name").get("id").toLong(),creatorIDUpdateMap);
												lineItemsMap.put("Vendor_Name",creatorSupplierResp.get("data").get("ID"));
											}
										}
									}
								}
							}
						}
					}
					//info "data_map 493" + data_map;
					//------Product Details Section End here-----------
					supplier_price = 0;
					if(Linerec.get("Unit_Price_CA") != null && Linerec.get("Margin") != null)
					{
						supplier_price = (Linerec.get("Unit_Price_CA") * margin_map.get(Linerec.get("Margin"))).round(2);
					}
					lineItemsMap.put("Supplier_Price",supplier_price);
					lineItemsMap.put("Product_Description",Linerec.get("Description_3"));
					lineItemsMap.put("Margin",Linerec.get("Margin"));
					lineItemsMap.put("Margin_B",Linerec.get("Margin_B"));
					lineItemsMap.put("Quantity",Linerec.get("Quantity"));
					lineItemsMap.put("Pix_unitaire",Linerec.get("Pix_unitaire").round(2));
					lineItemsMap.put("Unit_Price",Linerec.get("Unit_Price_CA"));
					lineItemsMap.put("Total",Linerec.get("Total_Amount").round(2));
					lineItemsMap.put("Line_Item_ID",Linerec.get("id"));
					lineItemsMap.put("Custom_Pix_Unitaire",Linerec.get("Custom_Pix_Unitaire"));
					lineItemsMap.put("Sequence_No",Linerec.get("Item_Seq_No"));
					lineItemsMap.put("Order_Conversion","true");
					lineItemsList.add(lineItemsMap);
				}
			}
			//info "getLine Item" + lineItemsList;
			//=----------Line Items End Here--------------
			dataMap.put("Product_Details",lineItemsList);
			// --------------Extra Items Starts here---------------------------------
			extraItemList = List();
			getExtrasInfo = getQuote.get("Extra_Items").tolist();
			for each  lineItem in getExtrasInfo
			{
				if(lineItem.get("Pix_Total") != 0)
				{
					extraItemsMap = Map();
					getProductDetails = zoho.creator.getRecords(ownerName,appName,"Product_Details_Report","Zoho_CRM_ID == \"" + lineItem.get("Extras_Products").get("id") + "\"",1,1000,"zohocreatorcon");
					info "getProductDetails line 531...." + getProductDetails;
					if(getProductDetails != null && getProductDetails.get("code") == 3000)
					{
						extraItemsMap.put("Product",getProductDetails.get("data").get(0).get("ID"));
						info "535";
					}
					else
					{
						productCreationMap = Map();
						productCreationMap.put("Product_Name",lineItem.get("Extras_Products").get("Name"));
						productCreationMap.put("Zoho_CRM_ID",lineItem.get("Extras_Products").get("id"));
						// 					productCreationMap.put("Product_Description",lineItem.get("Description"));
						productCreationResponse = zoho.creator.createRecord(ownerName,appName,"Product_Details",productCreationMap,Map(),"zohocreatorcon");
						if(productCreationResponse != null && productCreationResponse.get("code") == 3000)
						{
							extraItemsMap.put("Product",productCreationResponse.get("data").get("ID"));
						}
					}
					supplier_price = 0;
					if(lineItem.get("Unit_Price") != null && lineItem.get("Cost_Code") != null)
					{
						supplier_price = (lineItem.get("Unit_Price") * margin_map.get(lineItem.get("Cost_Code"))).round(2);
					}
					extraItemsMap.put("Supplier_Price",supplier_price);
					//extraItemsMap.put("Item",lineItem.get("Item"));
					extraItemsMap.put("Quantit",lineItem.get("Quantity"));
					extraItemsMap.put("Code_co_tant",lineItem.get("Cost_Code"));
					extraItemsMap.put("Margin_B",lineItem.get("Margin_B"));
					extraItemsMap.put("Prix_total",lineItem.get("Total_Amount"));
					extraItemsMap.put("Pix_unitaire",lineItem.get("Pix_unitaire"));
					extraItemsMap.put("Prix_co_tant",lineItem.get("Unit_Price"));
					extraItemsMap.put("Line_Item_ID",lineItem.get("id"));
					extraItemsMap.put("Vendeur",lineItem.get("Total_Amount"));
					extraItemsMap.put("Custom_Pix_Unitaire",lineItem.get("Custom_Pix_Unitaire"));
					if(lineItem.get("Supplier") != null)
					{
						getVendor = zoho.creator.getRecords(ownerName,appName,"All_Vendor_Details","Zoho_CRM_ID == \"" + lineItem.get("Supplier").get("id") + "\"",1,200,"zohocreatorcon");
						if(getVendor != null && getVendor.get("code") == 3000)
						{
							if(getVendor.get("data").size() > 0)
							{
								info "VendorID 571" + getVendor.get("data").get(0).get("ID");
								extraItemsMap.put("Supplier",getVendor.get("data").get(0).get("ID").toLong());
							}
						}
						else
						{
							getCRMVendor = zoho.crm.getRecordById("Vendors",lineItem.get("Supplier").get("id").toLong());
							if(getCRMVendor.get("id") != null)
							{
								data_map = Map();
								data_map.put("Zoho_CRM_ID",lineItem.get("Supplier").get("id"));
								data_map.put("Supplier_Name",getCRMVendor.get("Vendor_Name"));
								data_map.put("Supplier_No",getCRMVendor.get("Num_ro_fournisseur"));
								data_map.put("Supplier_Email",getCRMVendor.get("Email"));
								data_map.put("Supplier_Phone",getCRMVendor.get("Phone"));
								// 	//data_map.put("Supplier Address.Address Line 2","Street");
								data_map.put("Supplier_ID_Internal",getCRMVendor.get("Num_ro_fournisseur"));
								info data_map;
								creatorSupplierResp = zoho.creator.createRecord(ownerName,appName,"Supplier_Details",data_map,Map(),"zohocreatorcon");
								info creatorSupplierResp;
								if(creatorSupplierResp.get("code") == 3000)
								{
									creatorIDUpdateMap = Map();
									creatorIDUpdateMap.put("CreatorSupplierID",creatorSupplierResp.get("data").get("ID").toString());
									updateCreatorID = zoho.crm.updateRecord("Vendors",lineItem.get("Supplier").get("id"),creatorIDUpdateMap);
									// 										lineItemsMap.put("Vendor_Name",creatorSupplierResp.get("data").get("ID"));
									extraItemsMap.put("Supplier",creatorSupplierResp.get("data").get("ID").toLong());
								}
							}
						}
					}
					extraItemsMap.put("Seq_No_New",lineItem.get("Extras_Seq_No"));
					extraItemsMap.put("Pix_unitaire",lineItem.get("Prix_Total").round(2));
					extraItemList.add(extraItemsMap);
				}
			}
			dataMap.put("Extras",extraItemList);
			// --------------Extra Items Ends here---------------------------------
			//info "545...";
			info getQuote.get("Quotation_Owner");
			//info "Quote Owner line 653" + getQuote.get("Quotation_Owner").get("id");
			dataMap.put("Quotation_Owner",getQuote.get("Quotation_Owner").get("id"));
			dataMap.put("Quote_Date",FrenchDate);
			//info "dataMap line 655.." + dataMap;
			dataMap.put("CRM_Quote_Status","Create");
			info "653" + dataMap;
			//info "654";
			response = zoho.creator.createRecord(ownerName,appName,"Quotations",dataMap,Map(),"zohocreatorcon");
			info "Create Quote response" + response;
			if(response.get("code") == 3000)
			{
				creatorIDUpdateMap = Map();
				creatorIDUpdateMap.put("Creator_Quotation_ID",response.get("data").get("ID").tostring());
				updateCreatorID = zoho.crm.updateRecord("Quotations",quoteID,creatorIDUpdateMap);
			}
		}
		else
		{
			quotation_date = getQuoteInfo.get("Quotation_Date");
			if(quotation_date == null)
			{
				productDetailsMap = Map();
				productDetailsMap.put("Quotation_Date",zoho.currentdate.toString("yyyy-MM-dd"));
				updateDetails = zoho.crm.updateRecord("Quotations",quoteID,productDetailsMap);
				info "updateQuote" + updateDetails;
			}
		}
	}
	createnote = Map();
	createnote.put("Note_Content","Function End Time " + zoho.currenttime);
	createnote.put("Parent_Id",quoteID);
	createnote.put("se_module","Quotations");
	createnotelist = List();
	createnotelist.add(createnote);
	finalcreatenote = Map();
	finalcreatenote.put("data",createnotelist);
	respcreatenote = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2/Quotations/" + quoteID + "/Notes"
		type :POST
		parameters:finalcreatenote.tostring()
		connection:"zohooauth"
	];
	openurl("https://crm.zoho.com/crm/org7626235/tab/CustomModule6/" + quoteID,"same window");
}
catch (e)
{
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMap = Map();
	dataMap.put("Module","Quotations");
	dataMap.put("Process_Description"," CRM:Quotations New-Create records in Creator");
	dataMap.put("In_Data",quoteID);
	dataMap.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMap,Map(),"zohocreatorcon");
	info "689" + ContactCreateResponse;
}