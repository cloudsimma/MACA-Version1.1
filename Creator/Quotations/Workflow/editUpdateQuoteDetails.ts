// Update Quote Details New Module
try 
{
	getCRMQuoteInfo = zoho.crm.getRecordById("Quotations",input.Zoho_CRM_ID.toLong(),Map(),"zohocrmcon");
	quoteDetails = Quotations[ID == input.ID];
	quoteDetails.Object=getCRMQuoteInfo.get("Name");
	quoteDetails.Quotation_No=getCRMQuoteInfo.get("Quote_No");
	//updating Sub Form Details
	getCRMProductList = getCRMQuoteInfo.get("Product_Details");
	getCRMExtraItemList = getCRMQuoteInfo.get("Extra_Items");
	if(getCRMQuoteInfo.get("Company_Name") != null)
	{
		getCompanyInfo = getCRMQuoteInfo.get("Company_Name").get("id");
		input.Company_Name = Company_Details[Zoho_CRM_ID == getCompanyInfo].ID;
	}
	if(getCRMQuoteInfo.get("Contact_Name") != null)
	{
		getContactInfo = getCRMQuoteInfo.get("Contact_Name").get("id");
		input.Contact_Name = Contacts[Zoho_CRM_ID == getContactInfo].ID;
	}
	if(getCRMQuoteInfo.get("Quotation_Owner") != null)
	{
		input.Quotation_Owner = getCRMQuoteInfo.get("Quotation_Owner").get("id");
	}
	// Add and update Quote Items
	quotationItems = Quotation_Items[Quotation_ID == input.ID];
	for each  item in quotationItems
	{
		for each  product in getCRMProductList
		{
			if(item.Line_Item_ID == product.get("id"))
			{
				productDetailsInfo = Product_Details[Zoho_CRM_ID == product.get("Product").get("id")].ID;
				if(productDetailsInfo == null)
				{
					thisapp.creator.createProductsNew(product.get("Product").get("id"));
				}
				item.Vendor_Name=Product_Details[Zoho_CRM_ID == product.get("Product").get("id")].Supplier_Name;
				item.Product_Name=Product_Details[Zoho_CRM_ID == product.get("Product").get("id")].ID;
				item.Product_Description=product.get("Description_3");
				item.Pix_unitaire=product.get("Pix_unitaire");
				item.Unit_Price=product.get("Unit_Price_CA");
				item.Quantity=product.get("Quantity");
				item.Margin=product.get("Margin");
				item.Margin_B=product.get("Margin_B");
				item.Total=product.get("Total_Amount");
				item.Quotation_ID=input.ID;
				item.Sequence_No=product.get("Item_Seq_No");
				//item.Order_Conversion=product.get("Order_Conversion");
				item.Custom_Pix_Unitaire=product.get("Custom_Pix_Unitaire");
				item.Supplier_Price=thisapp.creator.calculateSupplierPrice(product.get("Unit_Price_CA"),product.get("Margin"));
			}
		}
		if(getCRMProductList.notContains(item.Line_Item_ID))
		{
			getDeletedQuoteItem = Quotation_Items[Line_Item_ID == item.Line_Item_ID];
			if(getDeletedQuoteItem.count() > 0)
			{
				getDeletedQuoteItem.Quotation_ID=null;
			}
		}
	}
	for each  product in getCRMProductList
	{
		quotationLineItem = Quotation_Items[Line_Item_ID == product.get("id") && Quotation_ID == input.ID];
		if(!quotationLineItem.count() > 0)
		{
			productDetailsInfo = Product_Details[Zoho_CRM_ID == product.get("Product").get("id")].ID;
			if(productDetailsInfo == null)
			{
				thisapp.creator.createProductsNew(product.get("Product").get("id"));
			}
			createQuoteItemResponse = insert into Quotation_Items
			[
				Added_User=zoho.loginuser
				Product_Name=Product_Details[Zoho_CRM_ID == product.get("Product").get("id")].ID
				Vendor_Name=Product_Details[Zoho_CRM_ID == product.get("Product").get("id")].Supplier_Name
				Product_Description=product.get("Description_3")
				Unit_Price=product.get("Unit_Price_CA")
				Pix_unitaire=product.get("Pix_unitaire")
				Quantity=product.get("Quantity")
				Margin=product.get("Margin")
				Margin_B=product.get("Margin_B")
				Total=product.get("Total_Amount")
				Line_Item_ID=product.get("id")
				Quotation_ID=input.ID
				Sequence_No=product.get("Item_Seq_No")
				Custom_Pix_Unitaire=product.get("Custom_Pix_Unitaire")
				Supplier_Price=thisapp.creator.calculateSupplierPrice(product.get("Unit_Price_CA"),product.get("Margin"))
			];
		}
		//Order_Conversion=product.get("Order_Conversion")
	}
	// Add, Update and Delete Extra Items in creator
	getExtrasInfo = Extras[Quotation_ID == input.ID];
	for each  extraItem in getExtrasInfo
	{
		for each  crmExtraItem in getCRMExtraItemList
		{
			if(extraItem.Line_Item_ID == crmExtraItem.get("id"))
			{
				productDetailsInfo = Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].ID;
				if(productDetailsInfo == null)
				{
					thisapp.creator.createProductsNew(crmExtraItem.get("Extras_Products").get("id"));
				}
				if(crmExtraItem.get("Supplier") != null)
				{
					getVendor = Supplier_Details[Zoho_CRM_ID == crmExtraItem.get("Supplier").get("id")];
					if(getVendor.count() > 0)
					{
						extraItem.Supplier=getVendor.ID;
					}
					else
					{
						getCRMVendor = zoho.crm.getRecordById("Vendors",crmExtraItem.get("Supplier").get("id").toLong());
						if(getCRMVendor.get("id") != null)
						{
							createSupplierResp = insert into Supplier_Details
							[
								Added_User=zoho.loginuser
								Zoho_CRM_ID=crmExtraItem.get("Supplier").get("id")
								Supplier_Name=getCRMVendor.get("Vendor_Name")
								Supplier_No=getCRMVendor.get("Num_ro_fournisseur")
								Supplier_Email=getCRMVendor.get("Email")
								Supplier_Phone=getCRMVendor.get("Phone")
							];
							if(createSupplierResp != null && createSupplierResp > 0)
							{
								extraItem.Supplier=createSupplierResp;
								getVendor = Supplier_Details[ID == createSupplierResp];
								if(getVendor.Zoho_Books_ID == "")
								{
									orgID = thisapp.books.OrgDetails();
									vendorInfo = getVendor.Supplier_Name;
									getVendorInfo = invokeurl
									[
										url :"https://books.zoho.com/api/v3/contacts?organization_id=" + orgID + "&contact_name=" + vendorInfo + "&contact_type=vendor"
										type :GET
										connection:"zohobookscon"
									];
									if(getVendorInfo.get("code") == 0 && getVendorInfo.get("message") = "success" && getVendorInfo.get("contacts").size() > 0)
									{
										getVendor.Zoho_Books_ID=getVendorInfo.get("contacts").get(0).get("contact_id");
									}
								}
							}
						}
					}
				}
				else
				{
					extraItem.Supplier=Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].Supplier_Name;
				}
				extraItem.Product=Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].ID;
				extraItem.Code_co_tant=crmExtraItem.get("Cost_Code");
				extraItem.Margin_B=crmExtraItem.get("Margin_B");
				extraItem.Quantit=crmExtraItem.get("Quantity");
				extraItem.Prix_co_tant=crmExtraItem.get("Unit_Price");
				extraItem.Item=crmExtraItem.get("Item");
				extraItem.Pix_unitaire=crmExtraItem.get("Prix_Total");
				extraItem.Prix_total=crmExtraItem.get("Total_Amount");
				extraItem.Custom_Pix_Unitaire=crmExtraItem.get("Custom_Pix_Unitaire");
				extraItem.Seq_No_New=crmExtraItem.get("Extras_Seq_No");
				extraItem.S_No=crmExtraItem.get("Extras_Seq_No");
				extraItem.Sequence_No=Quotation_Items[Quotation_ID == input.ID && Sequence_No == crmExtraItem.get("Extras_Seq_No")].ID;
				extraItem.Supplier_Price=thisapp.creator.calculateSupplierPrice(crmExtraItem.get("Unit_Price"),crmExtraItem.get("Cost_Code"));
			}
		}
		if(getCRMExtraItemList.notContains(extraItem.Line_Item_ID))
		{
			getDeletedExtraItem = Extras[Line_Item_ID == extraItem.Line_Item_ID];
			if(getDeletedExtraItem.count() > 0)
			{
				getDeletedExtraItem.Quotation_ID=null;
			}
		}
	}
	for each  crmExtraItem in getCRMExtraItemList
	{
		creatorItems = Extras[Line_Item_ID == crmExtraItem.get("id")];
		if(!creatorItems.count() > 0)
		{
			productDetailsInfo = Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].ID;
			if(productDetailsInfo == null)
			{
				thisapp.creator.createProductsNew(crmExtraItem.get("Product").get("id"));
			}
			ExtrasSupplier = Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].Supplier_Name;
			createExtraItemResponse = insert into Extras
			[
				Added_User=zoho.loginuser
				Product=Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].ID
				Line_Item_ID=crmExtraItem.get("id")
				Code_co_tant=crmExtraItem.get("Cost_Code")
				Margin_B=crmExtraItem.get("Margin_B")
				Quantit=crmExtraItem.get("Quantity")
				Item=crmExtraItem.get("Item")
				Quotation_ID=input.ID
				Prix_co_tant=crmExtraItem.get("Prix_Total")
				Pix_unitaire=crmExtraItem.get("Unit_Price")
				Prix_total=crmExtraItem.get("Total_Amount")
				Seq_No_New=crmExtraItem.get("Extras_Seq_No")
				S_No=crmExtraItem.get("Extras_Seq_No")
				Sequence_No=Quotation_Items[Quotation_ID == input.ID && Sequence_No == crmExtraItem.get("Extras_Seq_No")].ID
				Custom_Pix_Unitaire=crmExtraItem.get("Custom_Pix_Unitaire")
				Supplier_Price=thisapp.creator.calculateSupplierPrice(crmExtraItem.get("Prix_Total"),crmExtraItem.get("Cost_Code"))
				Supplier=ExtrasSupplier
			];
			info "createExtraItemResponse" + createExtraItemResponse;
			if(crmExtraItem.get("Pix_Total") != 0)
			{
				supplierData = 0;
				if(crmExtraItem.get("Supplier") != null)
				{
					getVendor = Supplier_Details[Zoho_CRM_ID == crmExtraItem.get("Supplier").get("id")];
					if(getVendor.count() > 0)
					{
						supplierData = getVendor.ID;
					}
				}
				else
				{
					supplierData = Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].Supplier_Name;
				}
			}
		}
	}
	thisapp.books.updateEstimate(input.ID);
	input.CRM_Update_Status = false;
}
catch (e)
{
	sendmail
	[
		from :zoho.adminuserid
		to :"priya.g@cloudlion.org"
		subject :"Errortesting from maca quote update"
		message :e
	]
	thisapp.Developer.addDeveloperLog("Quotations","Creator: Update Quotation",input.Zoho_CRM_ID.toString(),e);
	//info e;
}
