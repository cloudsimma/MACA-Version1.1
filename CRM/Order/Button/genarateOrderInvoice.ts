try 
{
	returnResp = "";
	getCRMOrderDetails = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2.1/Orders_New/" + SoID
		type :GET
		connection:"zohooauth"
	];
	info getCRMOrderDetails;
	if(getCRMOrderDetails.get("data") != null && getCRMOrderDetails.get("data").get(0).size() > 0)
	{
		resInvoice = getCRMOrderDetails.get("data").get(0);
	}
	else
	{
		resInvoice = null;
	}
	info "resInvoice: " + resInvoice;
	resPO = zoho.crm.searchRecords("Supplier_orders_new","(COMMANDE_Client.id:equals:" + SoID + ")");
	info "resPO" + resPO;
	for each  commande in resPO
	{
		info "commande: " + commande;
		updatePO = zoho.crm.updateRecord("Supplier_orders_new",commande.get("id").tolong(),{"Status":"Facturée"});
		info updatePO;
	}
	info "resInvoice: " + resInvoice;
	resAccount = zoho.crm.getRecordById("Accounts",resInvoice.get("Company_Name").get("id").toLong());
	termePaiement = resAccount.get("Termes_de_paiement");
	account = resInvoice.get("Company_Name").get("name");
	orgID = "328433160";
	getUrl = invokeurl
	[
		url :"https://books.zoho.com/api/v3/contacts?organization_id=" + orgID + "&contact_name=" + encodeUrl(account)
		type :GET
		connection:"books"
	];
	info "--------getUrl------" + getUrl;
	response = getUrl.get("contacts");
	customer_id = response.get(0).get("contact_id");
	////Fin code
	products = resInvoice.get("Items_ordered");
	itemsList = List:String();
	info "products line 45 :" + products;
	for each  productMap in products
	{
		info productMap;
		if(productMap.get("Product_Name") != null && productMap.get("Custom_Pix_Unit_CA") != 0)
		{
			productName = productMap.get("Product_Name").get("name");
			//info productName;
			productName = if(productName.contains("-NP"),productName.replaceAll("-NP",""),productName);
			//Old Line			productName = if(productName.contains("["),productName.getPrefix("["),productName);
			productName = if(productName.contains("["),productName.getSuffix("]"),productName);
			//info "line 49...:" + productName.trim();
			if(productName.trim() != "ITEMS EN PROPOSITION")
			{
				//info "line 50...:" + productName.trim();
				//CODE to get product id with his name 
				resProduct = zoho.crm.getRecordById("ProductNew",productMap.get("Product_Name").get("id").toLong());
				//info "****resProduct: " + resProduct;
				productCode = resProduct.get("prod_code");
				//info "product code = " + productCode;
				item_id = "";
				//info "encodeUrl:" + encodeUrl(productCode);
				itemGR = zoho.books.getRecords("Items","328433160","sku=" + encodeUrl(productCode));
				//info "itemsGR: " + itemGR;
				itemsGR = itemGR.get("items");
				//info "itemsGR: " + itemsGR;
				itemGRList = itemsGR.toList();
				for each  igrl in itemGRList
				{
					if(igrl.contains("item_id"))
					{
						item_id = igrl.get("item_id");
					}
				}
				//FIN DU CODE
				tempProductName = productName.replaceAll("/"," ").replaceAll("\""," ").replaceAll(","," ");
				//info "tempProductName : " + tempProductName;
				if(productMap.get("Rate").toDecimal() > 0)
				{
					pixUnitaire = 0;
					margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
					if(productMap.get("Quantity") != null && productMap.get("Rate") != null)
					{
						if(productMap.get("Margin_A") != null && productMap.get("Margin_B"))
						{
							pixUnitaire = (productMap.get("Rate") * margin_map.get(productMap.get("Margin_A")) / margin_map.get(productMap.get("Margin_B"))).round(2);
						}
						else
						{
							pixUnitaire = productMap.get("Rate");
						}
					}
					//info "pixUnitaire" + pixUnitaire;
					if(productCode.contains("008-H"))
					{
						item_map1 = Map();
						if(productMap.get("Description").contains(" estimé"))
						{
							if(productMap.get("Description").contains(" estimée"))
							{
								item_map1.put("name",productMap.get("Description").replaceAll(" estimée",""));
							}
							else
							{
								item_map1.put("name",productMap.get("Description").replaceAll(" estimé",""));
							}
						}
						else
						{
							item_map1.put("name",productMap.get("Description"));
						}
						if(productMap.get("Custom_Pix_Unit_CA") == 0)
						{
							item_map1.put("rate",0);
						}
						else
						{
							item_map1.put("rate",if(productMap.get("Custom_Pix_Unit_CA") > 0,productMap.get("Custom_Pix_Unit_CA"),pixUnitaire));
						}
						item_map1.put("quantity",productMap.get("Quantity"));
						item_map1.put("tax_id","281171000002974939");
						itemsList.add(item_map1);
					}
					else
					{
						item_map2 = Map();
						if(tempProductName.contains(" estimé"))
						{
							if(tempProductName.contains(" estimée"))
							{
								item_map2.put("name",tempProductName.replaceAll(" estimée",""));
							}
							else
							{
								item_map2.put("name",tempProductName.replaceAll(" estimé",""));
							}
						}
						else
						{
							item_map2.put("name",tempProductName);
						}
						if(productMap.get("Custom_Pix_Unit_CA") == 0)
						{
							item_map2.put("rate",0);
						}
						else
						{
							info productMap.get("Custom_Pix_Unit_CA");
							item_map2.put("rate",if(productMap.get("Custom_Pix_Unit_CA") > 0,productMap.get("Custom_Pix_Unit_CA"),pixUnitaire));
						}
						item_map2.put("quantity",productMap.get("Quantity"));
						item_map2.put("tax_id","281171000002974939");
						itemsList.add(item_map2);
					}
				}
				//info "itemsList: " + itemsList;
			}
		}
	}
	Extras = resInvoice.get("Extra_Item");
	//info "Extras line 124 :" + Extras;
	for each  ExtrasMap in Extras
	{
		if(ExtrasMap.get("Product_Name") != null && ExtrasMap.get("Custom_Pix_Unit_CA") != 0)
		{
			productName = ExtrasMap.get("Product_Name").get("name");
			productName = if(productName.contains("-NP"),productName.replaceAll("-NP",""),productName);
			//Old Line			productName = if(productName.contains("["),productName.getPrefix("["),productName);
			productName = if(productName.contains("["),productName.getSuffix("]"),productName);
			if(productName.trim() != "ITEMS EN PROPOSITION")
			{
				//CODE to get product id with his name 
				resProduct = zoho.crm.getRecordById("Extras_New",ExtrasMap.get("Product_Name").get("id").toLong());
				//info "resExtraProduct: " + resProduct;
				productCode = resProduct.get("Product_Code");
				//info "product code = " + productCode;
				item_id = "";
				itemGR = zoho.books.getRecords("Items","328433160","sku=" + encodeUrl(productCode));
				//info "itemsGR: " + itemGR;
				itemsGR = itemGR.get("items");
				itemGRList = itemsGR.toList();
				for each  igrl in itemGRList
				{
					if(igrl.contains("item_id"))
					{
						item_id = igrl.get("item_id");
					}
				}
				//FIN DU CODE
				tempProductName = productName.replaceAll("/"," ").replaceAll("\""," ").replaceAll(","," ");
				if(ExtrasMap.get("Unit_Price1").toDecimal() > 0)
				{
					pixUnitaire = 0;
					margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
					if(ExtrasMap.get("Quantity") != null && ExtrasMap.get("Unit_Price1") != null && ExtrasMap.get("Quantity") != 0 && ExtrasMap.get("Unit_Price1") != 0)
					{
						if(ExtrasMap.get("Margin_A") != null && ExtrasMap.get("Margin_B") != null)
						{
							pixUnitaire = ExtrasMap.get("Unit_Price1");
						}
						else
						{
							pixUnitaire = ExtrasMap.get("Unit_Price");
						}
					}
					//info "pixUnitaire" + pixUnitaire;
					if(productCode.contains("008-H"))
					{
						Extraitem_map1 = Map();
						ExtrasDesc = zoho.crm.getRecordById("Extras_New",ExtrasMap.get("Product_Name").get("id").toLong());
						if(ExtrasDesc.get("Description") != "")
						{
							if(ExtrasDesc.get("Description").contains(" estimé"))
							{
								if(ExtrasDesc.get("Description").contains(" estimée"))
								{
									Extraitem_map1.put("name",ExtrasDesc.get("Description").replaceAll(" estimée",""));
								}
								else
								{
									Extraitem_map1.put("name",ExtrasDesc.get("Description").replaceAll(" estimé",""));
								}
							}
							else
							{
								Extraitem_map1.put("name",ExtrasDesc.get("Description"));
							}
						}
						else
						{
							Extraitem_map1.put("name",ExtrasDesc.get("Name"));
						}
						if(ExtrasMap.get("Custom_Pix_Unit_CA") == 0)
						{
							Extraitem_map1.put("rate",0);
						}
						else
						{
							Extraitem_map1.put("rate",if(ExtrasMap.get("Custom_Pix_Unit_CA") > 0,ExtrasMap.get("Custom_Pix_Unit_CA"),pixUnitaire));
						}
						Extraitem_map1.put("quantity",ExtrasMap.get("Quantity"));
						Extraitem_map1.put("tax_id","281171000002974939");
						itemsList.add(Extraitem_map1);
					}
					else
					{
						//info "else line 188..";
						Extraitem_map2 = Map();
						if(tempProductName.contains(" estimé"))
						{
							if(tempProductName.contains(" estimée"))
							{
								Extraitem_map2.put("name",tempProductName.replaceAll(" estimée",""));
							}
							else
							{
								Extraitem_map2.put("name",tempProductName.replaceAll(" estimé",""));
							}
						}
						else
						{
							Extraitem_map2.put("name",tempProductName);
						}
						//info "else line 191..";
						if(ExtrasMap.get("Custom_Pix_Unit_CA") == 0)
						{
							Extraitem_map2.put("rate",0);
						}
						else
						{
							Extraitem_map2.put("rate",if(ExtrasMap.get("Custom_Pix_Unit_CA") > 0,ExtrasMap.get("Custom_Pix_Unit_CA"),pixUnitaire));
							info "prix: " + pixUnitaire;
						}
						Extraitem_map2.put("quantity",ExtrasMap.get("Quantity"));
						Extraitem_map2.put("tax_id","281171000002974939");
						itemsList.add(Extraitem_map2);
					}
				}
			}
		}
	}
	info "itemsList: " + itemsList;
	organizationID = "328433160";
	paramMap = Map();
	JSONStringMap = Map();
	JSONStringMap.put("customer_id",customer_id);
	JSONStringMap.put("line_items",itemsList.toList());
	// I need to fill No ordre (In Books Invoice custom field) with resInvoice.get("Numéro d'ordre")
	custom_field_list = List();
	custom_field_map = Map();
	custom_field_map.put("customfield_id","281171000000270001");
	custom_field_map.put("value",resInvoice.get("Delivery_Contact"));
	custom_field_map.put("label","No ordre");
	custom_field_list.add(custom_field_map);
	if(resInvoice.get("Quotation_Name") != null)
	{
		// 
		custom_field_map2 = Map();
		custom_field_map2.put("customfield_id","281171000032052307");
		custom_field_map2.put("value",resInvoice.get("Name"));
		custom_field_map2.put("label","Objet");
		custom_field_list.add(custom_field_map2);
	}
	JSONStringMap.put("custom_fields",custom_field_list);
	JSONStringMap.put("reference_number",resInvoice.get("No_Commande_Maca"));
	JSONStringMap.put("salesperson_name",resInvoice.get("Owner").get("name"));
	info "JSONStringMap -" + JSONStringMap;
	if(termePaiement = "Net 30 jours")
	{
		JSONStringMap.put("payment_terms_label","Net 30 jours");
		JSONStringMap.put("payment_terms",30);
	}
	else if(termePaiement = "Carte de crédit/5 jours")
	{
		JSONStringMap.put("payment_terms_label","Carte de crédit");
		JSONStringMap.put("payment_terms",5);
	}
	else
	{
		JSONStringMap.put("payment_terms_label","Payable à réception");
		JSONStringMap.put("payment_terms",0);
	}
	JSONStringMap.put("date",zoho.currentdate);
	info "JSONStringMap----------" + JSONStringMap;
	// // book_url = "https://creator.zoho.com/vanessa68/connecteur-zoho-crm/view-perma/Rapport_Commission/SO_ID=" + resInvoice.get("id");
	// info "JSONStringMap: " + JSONStringMap;
	//resp = zoho.books.createRecord("Invoices",orgID,JSONStringMap);
	params = Map();
	params.put("JSONString",JSONStringMap);
	resp = invokeurl
	[
		url :"https://www.zohoapis.com/books/v3/invoices?organization_id=" + organizationID
		type :POST
		parameters:params
		connection:"books"
	];
	info "resp books: " + resp;
	if(resp.get("code") == 0 && resp.get("message") == "La facture a été créée.")
	{
		invoice_id = resp.get("invoice").get("invoice_id");
		invoice_number = resp.get("invoice").get("invoice_number");
		returnResp = "Invoice has been created successfully";
	}
	else
	{
		returnResp = "Somthing Went wrong.Please Contact Application Owner...!";
	}
	info invoice_number;
	updateSO = zoho.crm.updateRecord("Orders_New",SoID,{"No_invoice_Books":invoice_number + " " + zoho.currentdate,"Books_invoice_URL":"https://books.zoho.com/app#/invoices/" + invoice_id,"Status":"Facturée"});
	info "updateSO " + updateSO;
}
catch (e)
{
	info e;
	returnResp = "Somthing Went wrong.Please Contact Application Owner...!";
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMaps = Map();
	dataMaps.put("Module","Orders New");
	dataMaps.put("Process_Description"," CRM:Order Invoice Creation by button click - " + zoho.loginuser);
	dataMaps.put("In_Data",SoID);
	dataMaps.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMaps,Map(),"zohocreatorcon");
	//info ContactCreateResponse;
}
return returnResp;