// //New Module - Update Vendor
getCRMQuoteInfo = zoho.crm.getRecordById("Quotations",input.Zoho_CRM_ID.toLong(),Map(),"zohocrmcon");
getCRMProductList = getCRMQuoteInfo.get("Product_Details");
getCRMExtraItemList = getCRMQuoteInfo.get("Extra_Items");
quotationItems = Quotation_Items[Quotation_ID == input.ID];
for each  item in quotationItems
{
	for each  product in getCRMProductList
	{
		if(item.Line_Item_ID == product.get("id"))
		{
			item.Vendor_Name=Product_Details[Zoho_CRM_ID == product.get("Product").get("id")].Supplier_Name;
		}
	}
}
// getExtrasInfo = Extras[Quotation_ID == input.ID];
// for each  extraItem in getExtrasInfo
// {
// 	for each  crmExtraItem in getCRMExtraItemList
// 	{
// 		if(extraItem.Line_Item_ID == crmExtraItem.get("id"))
// 		{
// 			if(crmExtraItem.get("Supplier") != null)
// 			{
// 				getVendor = Supplier_Details[Zoho_CRM_ID == crmExtraItem.get("Supplier").get("id")];
// 				if(getVendor.count() > 0)
// 				{
// 					extraItem.Supplier=getVendor.ID;
// 				}
// 				else
// 				{
// 					getCRMVendor = zoho.crm.getRecordById("Vendors",crmExtraItem.get("Supplier").get("id").toLong());
// 					if(getCRMVendor.get("id") != null)
// 					{
// 						createSupplierResp = insert into Supplier_Details
// 						[
// 							Added_User=zoho.loginuser
// 							Zoho_CRM_ID=crmExtraItem.get("Supplier").get("id")
// 							Supplier_Name=getCRMVendor.get("Vendor_Name")
// 							Supplier_No=getCRMVendor.get("Num_ro_fournisseur")
// 							Supplier_Email=getCRMVendor.get("Email")
// 							Supplier_Phone=getCRMVendor.get("Phone")
// 						];
// 						if(createSupplierResp != null && createSupplierResp > 0)
// 						{
// 							extraItem.Supplier=createSupplierResp;
// 							getVendor = Supplier_Details[ID == createSupplierResp];
// 							if(getVendor.Zoho_Books_ID == "")
// 							{
// 								orgID = thisapp.books.OrgDetails();
// 								vendorInfo = getVendor.Supplier_Name;
// 								getVendorInfo = invokeurl
// 								[
// 									url :"https://books.zoho.com/api/v3/contacts?organization_id=" + orgID + "&contact_name=" + vendorInfo + "&contact_type=vendor"
// 									type :GET
// 									connection:"zohobookscon"
// 								];
// 								if(getVendorInfo.get("code") == 0 && getVendorInfo.get("message") = "success" && getVendorInfo.get("contacts").size() > 0)
// 								{
// 									getVendor.Zoho_Books_ID=getVendorInfo.get("contacts").get(0).get("contact_id");
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 			else
// 			{
// 				extraItem.Supplier=Product_Details[Zoho_CRM_ID == crmExtraItem.get("Extras_Products").get("id")].Supplier_Name;
// 			}
// 		}
// 	}
// }
