void creator.createProductsNew(string ProductId)
{
	getCRMProduct = zoho.crm.getRecordById("ProductNew",ProductId.toLong());
	vedorId = 0;
	if(getCRMProduct.get("id") != null)
	{
		if(getCRMProduct.get("Supplier") != null)
		{
			getVendor = Supplier_Details[Zoho_CRM_ID == getCRMProduct.get("Supplier").get("id")];
			if(getVendor.ID != null)
			{
				vedorId = getVendor.ID;
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
			else
			{
				getCRMVendor = zoho.crm.getRecordById("Vendors",getCRMProduct.get("Supplier").get("id").toLong());
				if(getCRMVendor.get("id") != null)
				{
					createSupplierResp = insert into Supplier_Details
					[
						Added_User=zoho.loginuser
						Zoho_CRM_ID=getCRMProduct.get("Supplier").get("id")
						Supplier_Name=getCRMVendor.get("Vendor_Name")
						Supplier_No=getCRMVendor.get("Num_ro_fournisseur")
						Supplier_Email=getCRMVendor.get("Email")
						Supplier_Phone=getCRMVendor.get("Phone")
					];
					if(createSupplierResp != null && createSupplierResp > 0)
					{
						vedorId = createSupplierResp;
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
		addProductDetailsResp = insert into Product_Details
		[
			Added_User=zoho.loginuser
			Product_Name=getCRMProduct.get("Name")
			Zoho_CRM_ID=getCRMProduct.get("id")
			Supplier_Name=vedorId
		];
	}
}