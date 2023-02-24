try 
{
	//Contact Module
	leadrec = zoho.crm.getRecordById("Leads",LeadID);
	info leadrec;
	loginuserid = zoho.loginuserid;
	info loginuserid;
	GetcontactId = "";
	companyID = leadrec.get("Company_ID");
	if(leadrec != null)
	{
		info "Hai";
		if(companyID == null)
		{
			info "Company ";
			accountName = leadrec.get('Company');
			getAccounts = zoho.crm.searchRecords("Accounts",'(Account_Name:equals:' + accountName + ')');
			info getAccounts.size();
			if(getAccounts.size() == 0)
			{
				//Create Accounts
				company_map = Map();
				company_map.put("Account_Name",leadrec.get("Company"));
				//-------Updating Owner fields-------//
				company_map.put("Owner",leadrec.get("Owner").get("id"));
				company_map.put("Phone",leadrec.get("Phone"));
				company_map.put("Customer_Origin",leadrec.get("Lead_Source"));
				company_map.put("Lead_Source_New",leadrec.get("Lead_Source_New"));
				company_map.put("Courriel_Facturation",leadrec.get("Email"));
				company_map.put("Billing_Street",leadrec.get("Street"));
				company_map.put("Billing_State",leadrec.get("State"));
				company_map.put("Billing_City",leadrec.get("City"));
				company_map.put("Billing_Code",leadrec.get("Zip_Code"));
				company_map.put("Account_Generated_By",zoho.loginuser);
				info company_map;
				createCompany = zoho.crm.createRecord("Accounts",company_map);
				info "CRM create company" + createCompany;
				if(createCompany.get("id") != null)
				{
					updateLead = zoho.crm.updateRecord("Leads",LeadID.toLong(),{"Company_ID":createCompany.get("id")});
					info updateLead;
					companyID = createCompany.get("id");
					data_map = Map();
					ownerName = "vanessa68";
					formName = "Company_Details";
					appName = "order-management";
					baseUrl = "creatorapp.zoho.com";
					data_map.put("Zoho_CRM_ID",createCompany.get("id"));
					data_map.put("Company_Name",leadrec.get("Company"));
					data_map.put("Customer_Origin",leadrec.get("Lead_Source"));
					data_map.put("Phone",leadrec.get("Phone"));
					billingAddress = Map();
					billingAddress.put("address_line_1",leadrec.get("Street"));
					billingAddress.put("district_city",leadrec.get("City"));
					billingAddress.put("state_province",leadrec.get("State"));
					billingAddress.put("postal_Code",leadrec.get("Zip_Code"));
					data_map.put("Billing_Address",billingAddress);
					info data_map;
					creatorCompanyResp = zoho.creator.createRecord(ownerName,appName,formName,data_map,Map(),"zohocreatorcon");
					info "Creator Acc Creation" + creatorCompanyResp;
					if(creatorCompanyResp.get("code") == 3000)
					{
						creatorIDUpdateMap = Map();
						creatorIDUpdateMap.put("CreatorCompanyID",creatorCompanyResp.get("data").get("ID").toString());
						updateCreatorID = zoho.crm.updateRecord("Accounts",createCompany.get("id").toLong(),creatorIDUpdateMap);
					}
				}
			}
			else
			{
				//Update accounts id in Lead
				updateLead = zoho.crm.updateRecord("Leads",LeadID.toLong(),{"Company_ID":getAccounts.get(0).get("id")});
				companyID = getAccounts.get(0).get("id");
			}
		}
		//Create contact
		if(leadrec.get("Is_Contact_Created") == false)
		{
			createMap = Map();
			createMap.put("Last_Name",ifnull(leadrec.get("Last_Name"),""));
			createMap.put("Email",ifnull(leadrec.get("Email"),""));
			createMap.put("First_Name",ifnull(leadrec.get("First_Name"),""));
			createMap.put("Title",ifnull(leadrec.get("Designation"),""));
			createMap.put("Phone",ifnull(leadrec.get("Phone"),""));
			createMap.put("Track_ID",ifnull(leadrec.get("id"),""));
			createMap.put("Lead_Source",ifnull(leadrec.get("Lead_Source"),""));
			createMap.put("Lead_Source_New",leadrec.get("Lead_Source_New"));
			if(companyID != null)
			{
				createMap.put("Account_Name",companyID);
			}
			createMap.put("Contact_Generated_By",zoho.loginuser);
			contact = zoho.crm.createRecord("Contacts",createMap);
			info "CRM contact" + contact;
			GetcontactId = contact.get("id");
			lead_map = Map();
			lead_map.put("Is_Contact_Created",true);
			lead_map.put("Contact_ID",contact.get("id"));
			updateLead = zoho.crm.updateRecord("Leads",LeadID.toLong(),lead_map);
			info "updateLead" + updateLead;
		}
		else
		{
			GetcontactId = leadrec.get("Contact_ID");
		}
		//Quotation Module
		getLead = zoho.crm.getRecordById("Leads",LeadID);
		info "get Lead" + getLead;
		createMaps = Map();
		createMaps.put("Name",ifnull(getLead.get("Last_Name"),""));
		createMaps.put("Email",ifnull(getLead.get("Email"),""));
		createMaps.put("Lead_Source_New",getLead.get("Lead_Source_New"));
		createMaps.put("Remark",ifnull(getLead.get("Remark"),""));
		createMaps.put("T_l_phone",ifnull(getLead.get("Phone"),""));
		createMaps.put("Currency",ifnull(getLead.get("Currency"),""));
		createMaps.put("Track_Name",ifnull(getLead.get("id"),""));
		createMaps.put("Billing_address",ifnull(getLead.get("Street"),""));
		createMaps.put("Billing_city",ifnull(getLead.get("City"),""));
		createMaps.put("Billing_postal_code",ifnull(getLead.get("Zip_Code"),""));
		createMaps.put("Billing_region",ifnull(getLead.get("State"),""));
		createMaps.put("Contact_Name",getLead.get("Contact_ID"));
		createMaps.put("Company_Name",getLead.get("Company_ID"));
		createMaps.put("Quotation_Date",zoho.currentdate.toString("yyyy-MM-dd"));
		//------Updating Owner fields Starts here-----//
		createMaps.put("Quotation_Owner",getLead.get("Owner").get("id"));
		createMaps.put("Owner",getLead.get("Owner").get("id"));
		createMaps.put("Quote_Generated_By",zoho.loginuser);
		//------Updating Owner fields ends here-----//
		createMaps.put("Company_Name",getLead.get("Company_ID"));
		createMaps.put("Track_Name",LeadID);
		getCompany = zoho.crm.getRecordById("Accounts",getLead.get("Company_ID").toLong());
		createMaps.put("Email_Billing",getCompany.get("Courriel_Facturation"));
		createMaps.put("Adresse_facture",getCompany.get("Contact_Facturation"));
		createMaps.put("Billing_address",getCompany.get("Billing_Street"));
		createMaps.put("Billing_city",getCompany.get("Billing_City"));
		createMaps.put("Billing_postal_code",getCompany.get("Billing_Code"));
		createMaps.put("Billing_region",getCompany.get("Billing_State"));
		createMaps.put("Transporter",getCompany.get("Transporteur"));
		createMaps.put("Email_Delivery",getCompany.get("Courriel_Livraison"));
		createMaps.put("Adresse_livraison",getCompany.get("Contact_Livraison"));
		createMaps.put("Delivery_street",getCompany.get("Shipping_Street"));
		createMaps.put("Delivery_city",getCompany.get("Shipping_City"));
		createMaps.put("Delivery_region",getCompany.get("Shipping_State"));
		createMaps.put("Delivery_postal_code",getCompany.get("Shipping_Code"));
		createMaps.put("Quote_Status","Proposition");
		//resp = zoho.crm.getRecords("users");
		// 		for each  user in resp.get("users")
		// 		{
		// 			if(user.get("email") == zoho.loginuserid)
		// 			{
		// 				createMaps.put("Quotation_Owner",user.get("id"));
		// 			}
		// 		}
		//------Product Details----------------------------------=-
		//Create the empty product line item while generating quote
		// 		lineItemsMap = Map();
		// 		lineItemsList = List();
		// 		productDescriptionInfo = "Couleur du produit:\nMéthode de décoration:\nEmplacement de décoration:\nCouleur du logo :\nDélai de production:\nGrandeurs:\nS:\nM:\nL:\nXL:\nXXL:";
		// 		lineItemsMap.put("Description",productDescriptionInfo);
		// 		lineItemsMap.put("Order_Conversion",true);
		// 		lineItemsList.add(lineItemsMap);
		// 		createMaps.put("Product_Details",lineItemsList);
		//info "createMaps" + "----------" + createMaps;
		//------Product Details Section End Here--------------------------
		// 		info "createMaps " + createMaps;
		quote = zoho.crm.createRecord("Quotations",createMaps);
		info "create quote" + quote;
		//----------------Add Notes -  Quote dev log starts here------------
		createnote = Map();
		createnote.put("Note_Content","Quote Created by :" + zoho.loginuser + ",Action : Button-Click,Time : " + zoho.currenttime);
		createnote.put("Parent_Id",quote.get("id"));
		createnote.put("se_module","Quotations");
		createnotelist = List();
		createnotelist.add(createnote);
		finalcreatenote = Map();
		finalcreatenote.put("data",createnotelist);
		respcreatenote = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2/Quotations/" + quote.get("id") + "/Notes"
			type :POST
			parameters:finalcreatenote.tostring()
			connection:"zohooauth"
		];
		//--------------- Add Notes -  Quote dev log Ends here--------------
		appName = "order-management";
		ownerName = "vanessa68";
		getContactDetails = zoho.crm.getRecordById("Quotations",quote.get("id"));
		getContactInfo = getContactDetails.get("Contact_Name");
		if(getContactInfo != null && getContactInfo != "")
		{
			getCreatorContact = zoho.creator.getRecords(ownerName,appName,"All_Contacts","Zoho_CRM_ID == \"" + getContactInfo.get("id") + "\"",1,200,"zohocreatorcon");
			if(getCreatorContact.get("code") == 3100)
			{
				getCRMContact = zoho.crm.getRecordById("Contacts",getContactInfo.get("id").toLong());
				ContactCreateMap = Map();
				ContactCreateMap.put("Contact_Name",getContactInfo.get("name"));
				ContactCreateMap.put("Zoho_CRM_ID",getContactInfo.get("id"));
				ContactCreateMap.put("Origin_Of_the_Track",getCRMContact.get("Lead_Source"));
				ContactCreateMap.put("Phone_Number",getCRMContact.get("Phone"));
				ContactCreateMap.put("Email",getCRMContact.get("Email"));
				getCompanyInfo = zoho.crm.getRecordById("Accounts",getContactDetails.get("Company_Name").get("id").toLong());
				ContactCreateMap.put("Company_Name",getCompanyInfo.get("CreatorCompanyID"));
				ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,"Contacts",ContactCreateMap,Map(),"zohocreatorcon");
				info ContactCreateResponse;
				if(ContactCreateResponse != null && ContactCreateResponse.get("code") == 3000)
				{
					creator_map = {"CreatorContactID":ContactCreateResponse.get("data").get("ID")};
					updateCreator = zoho.crm.updateRecord("Contacts",getContactInfo.get("id"),creator_map);
				}
			}
		}
		openUrl("https://crm.zoho.com/crm/org7626235/tab/CustomModule6/" + quote.get("id"),"same window");
	}
}
catch (e)
{
	appName = "order-management";
	ownerName = "vanessa68";
	formName = "Developer_Log";
	dataMaps = Map();
	dataMaps.put("Module","Leads");
	dataMaps.put("Process_Description"," CRM:Leads-Generate Quote and Contact");
	dataMaps.put("In_Data",LeadID);
	dataMaps.put("Out_Response",e);
	ContactCreateResponse = zoho.creator.createRecord(ownerName,appName,formName,dataMaps,Map(),"zohocreatorcon");
	//info ContactCreateResponse;
}
return "";