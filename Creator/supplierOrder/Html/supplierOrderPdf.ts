<%{
	//449573000112633001 
	//449573000113149001
	//SOID.toLong()
	getCRMSODetails = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2.1/Supplier_orders_new/" + SOID.toLong()
		type :GET
		connection:"zohocrmcon"
	];
	SOData = getCRMSODetails.get("data");
	SupData = "";
	if(SOData.getJson("livraison_vers") != null)
	{
		supid = SOData.getJson("livraison_vers").getJson("id");
		getSupDetails = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2.1/Vendors/" + supid.toLong()
			type :GET
			connection:"zohocrmcon"
		];
		SupData = getSupDetails.get("data");
	}
	getImage = Images[Image_Name == "MACCA Logo"];
	logoURL = "";
	if(getImage.count() > 0)
	{
		logoURL = getImage.Image_URL;
	}
	%>
<style>
.main_div_center
{
   margin: auto;
   width: 50%;
}
.button {
  border: none;
  color: white;
  text-align: center;
  border-radius: 20px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  vertical-align: top;
  transition-duration: 0.4s;
}
// .button:hover {
//   background-color: #728FCE;
//   color: #ffffff;
// }

@media print {
	.main_div_center
	{
	   margin: 0;
	   width: 100%;
	}
	.button{
		display: none;
	}
}
@media only screen and (max-width: 600px) {
  /* For mobile phones: */
	.main_div_center
	{
	   margin: auto;
	   width: 100% !important;
	}
	
}

</style>
<div class="main_div_center">
<table style="background:#fff;padding:2px;" border="0" cellpadding="0" cellspacing="0" width="100%">
	<tbody>
	<tr>
	<td>
	<table style="border-left:0px solid #dadada;border-right:0px solid #dadada;border-top:0px solid #dadada;border-bottom:0px solid #dadada;padding:10px;background-color:white;" border="0" cellpadding="0" cellspacing="0" width="100%">
	<tbody>
	<tr>
	<td valign="top"><table style="" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left" valign="top"><font size="2" face="Verdana, Geneva, sans-serif">
	<font style="vertical-align: inherit;">
	<font style="vertical-align: inherit;">
	 <img src=<%=logoURL%> width="150px" height="75px"></img>
	</font></font><br><br></font>
	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="">
	<tbody>
	<tr>
	<td align="left" valign="Bottom"><font size="2" face="Verdana, Geneva, sans-serif">
	<br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SOData.getJson("Order_managed_by")%></font></font><br><font style="vertical-align: inherit;">
	<font style="vertical-align: inherit;">Phone / Phone: 418-628-2920&nbsp;</font></font></font>
	</td></tr>
	</tbody>
	</table>
	</td>
	<td align="left" valign="Bottom"></td>
<%
	pdfLink = "https://creatorapp.zohopublic.com/vanessa68/order-management/pdf/Test_SO_Template/f7OVDT9XRVwGheJ1MmNR8Seg2MYVZ8WdjsMJj9fCN4rskH4DwQ4jaCknTM9dqsv0EMgCQeTse7sbsGMBXh07hbmmqGr1vQFKZeq8?SOID=" + SOID.toLong() + "&isc5page=true&zc_FileName=Purchase Order No. " + FileName;
	if(SOData.getJson("Date_of_purchase") != null)
	{
		EntryDate = SOData.getJson("Date_of_purchase").todate();
		day = EntryDate.day();
		month = EntryDate.month();
		year = EntryDate.year();
		DateFrenchMap = {"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"};
		test = month.tostring();
		getData = DateFrenchMap.get(test);
		//info getData;
		FrenchDate = day + "-" + getData + "-" + year;
		//order_map.put("French_Order_Date",FrenchDate);
	}
	else
	{
		FrenchDate = "";
	}
	%>
<td valign="top"><table style="" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left" valign="top"><font size="2" face="Verdana, Geneva, sans-serif">
	<font style="vertical-align: inherit;">
	<font style="vertical-align: inherit;">
	<td align="right" valign="top"><button class="button button1"><a href="<%=pdfLink%>" > Download Pdf</a></button></td>
	</font></font><br><br></font>
	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="">
	<tbody>
	<tr>
	<br>
<td align="right" valign="Bottom"><font size="2" face="Verdana, Geneva, sans-serif"><br><span style="color: black;"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Achat/Order Date: <%=FrenchDate%>
<%
	if(SOData.getJson("COMMANDE_Client") != null)
	{
		%>
<br> Réf : <%=SOData.getJson("COMMANDE_Client").getJson("name")%>
<%
	}
	%>
<br> COMMANDE - ORDER
<%
	PO_No = SOData.getJson("Purchase_order_number").getSuffix("C");
	%>
</font></font></span><br><b style=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=PO_No%></font></font></b></font></td>
</tr></tbody></table><font size="2" face="Verdana, Geneva, sans-serif"><br></font></tr></tbody></table></td></tr></tbody></table></td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
   <tbody>
      <tr>
         <td style="border: 0px solid rgb(232, 232, 232);" valign="top" width="50%"><font size="2" face="Verdana, Geneva, sans-serif"><b style="color: rgb(0, 0, 0);"><br><font style="vertical-align: inherit;">
		 <font style="vertical-align: inherit;">FACTURÉ À - BILL TO: </font></font></b><br><br><b style="color: rgb(0, 0, 0);"><font style="vertical-align: inherit;">
		 <font style="vertical-align: inherit;">MACA Marketing corporatif</font></font></b><br><font style="vertical-align: inherit;">
		 <font style="vertical-align: inherit;"> 825 Boulevard Lebourgneuf </font></font><br><font style="vertical-align: inherit;">
		 <font style="vertical-align: inherit;"> Québec, ca, </font></font><br><font style="vertical-align: inherit;">
		 <font style="vertical-align: inherit;">G2J 0B9 </font></font><br><font style="color: rgb(0, 0, 0);"><br>
<%
	if(SupData == "")
	{
		%>
<br>
<%
	}
	%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Ref: <%=SOData.getJson("Profil_client").getJson("name")%></font></font>		</font></font>
		 </td>
<%
	if(SupData == "")
	{
		SStreet = "";
		SCity = "";
		SState = "";
		SZip_Code = "";
		SCountry = "";
	}
	else
	{
		SStreet = SupData.getJson("Street");
		SCity = SupData.getJson("City");
		SState = SupData.getJson("State");
		SZip_Code = SupData.getJson("Zip_Code");
		SCountry = SupData.getJson("Country");
	}
	Cus_No = SOData.getJson("Attention_of");
	if(Cus_No != "" && Cus_No != null)
	{
		Customer_No = "Attention/ No ordre client : " + Cus_No;
	}
	else
	{
		Customer_No = "";
	}
	if(SupData != "")
	{
		//ContactName = SOData.getJson("Contact_Livraison");
		ContactName = SupData.getJson("Vendor_Name");
		%>
<td style="border: 0px solid rgb(232, 232, 232);" valign="top" width="50%"><font size="2" face="Verdana, Geneva, sans-serif"><b><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">LIVRÉ À - SHIP TO: </font></font><br></b><br>
<%
		if(ContactName != "")
		{
			%>
<b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=ContactName%></font></font></b><br>
<%
		}
		if(SStreet != "")
		{
			%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SStreet%></font></font><br>
<%
		}
		if(SCity != "" && SState != "")
		{
			%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SCity%>, <%=SState%> </font></font><br>
<%
		}
		if(SZip_Code != "" && SCountry != "")
		{
			%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SZip_Code%>, <%=SCountry%> </font></font><br><br>
<%
		}
		%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=Customer_No%> </font></font></td>
<%
	}
	else
	{
		%>
<td style="border: 0px solid rgb(232, 232, 232);" valign="top" width="50%"><font size="2" face="Verdana, Geneva, sans-serif"><b><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">LIVRÉ À - SHIP TO: </font></font><br></b><br>
<%
		if(SOData.getJson("Print_Livraison_enterprise") == "true")
		{
			if(SOData.getJson("Livraison_Enterprise") != "")
			{
				%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><b><%=SOData.getJson("Livraison_Enterprise")%></b><br><%=SOData.getJson("Contact_Livraison")%></font></font><br>
<%
			}
		}
		else
		{
			if(SOData.getJson("Contact_Livraison") != "")
			{
				%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><b><%=SOData.getJson("Profil_client").getJson("name")%></b><br><%=SOData.getJson("Contact_Livraison")%></font></font><br>
<%
			}
		}
		if(SOData.getJson("Delivery_street") != "")
		{
			%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SOData.getJson("Delivery_street")%></font></font><br>
<%
		}
		if(SOData.getJson("City_of_delivery") != "")
		{
			%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SOData.getJson("City_of_delivery")%> </font></font><br>
<%
		}
		if(SOData.getJson("Country_of_delivery") != "" && SOData.getJson("Postal_code_of_delivery") != "")
		{
			%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SOData.getJson("Country_of_delivery")%>, <%=SOData.getJson("Postal_code_of_delivery")%> </font></font><br><br>
<%
		}
		%>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=Customer_No%> </font></font></td>
<%
	}
	%>
</tr>
   </tbody>
</table>
<font size="2" face="Verdana, Geneva, sans-serif"><br><br></font>
<table style="color: rgb(0, 0, 0);" border="0" cellpadding="0" cellspacing="0" width="100%">
   <tbody>
      <tr>
         <td style="text-align: left; border-top: 2px solid gray; width: 20%; background-color: rgb(242, 242, 242);"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Fournisseur/Supplier:</font></font></font></td>
         <td style="border-top-width: 2px; border-top-style: solid; border-top-color: gray; width: 30%; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(234, 234, 234);">
		 
		 <font size="2" face="Verdana, Geneva, sans-serif"><font style="font-weight: bold;"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SOData.getJson("Supplier_Name1")%>&nbsp; </font></font></font><b style=""><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> </font></font></b></font></td>
         <td style="text-align: left; border-top: 2px solid gray; width: 20%; background-color: rgb(242, 242, 242);"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Transporteur/Carrier:</font></font></font></td>
         <td style="border-top-width: 2px; border-top-style: solid; border-top-color: gray; width: 30%; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(234, 234, 234);"><b><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SOData.getJson("Customer_s_carrier")%></font></font></font></b></td>
      </tr>
      <tr>
         <td style="text-align: left; width: 20%; background-color: rgb(242, 242, 242);"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Expédition/Ship Date:&nbsp;</font></font></font></td>
<%
	if(SOData.getJson("Date_d_exp_dition_du_fournisseur") != null)
	{
		EntryDate = SOData.getJson("Date_d_exp_dition_du_fournisseur").todate();
		day = EntryDate.day();
		month = EntryDate.month();
		year = EntryDate.year();
		DateFrenchMap = {"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"};
		test = month.tostring();
		getData = DateFrenchMap.get(test);
		//info getData;
		FrenchDate = day + "-" + getData + "-" + year;
		//order_map.put("French_Order_Date",FrenchDate);
	}
	else
	{
		FrenchDate = "";
	}
	%>
<td style="width: 30%; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(234, 234, 234);"><b style=""><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=FrenchDate%></font></font></font></b></td>
         <td style="text-align: left; width: 30%; background-color: rgb(242, 242, 242);"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Date en main / In hands date:</font></font></font></td>
<%
	if(SOData.getJson("Fixed_date_event") == true || SOData.getJson("Evenement") == "oui" || SOData.getJson("Evenement") == "Oui")
	{
		if(SOData.getJson("Customer_delivery_date") != null)
		{
			Customer_delivery_date = SOData.getJson("Customer_delivery_date").todate();
		}
		else
		{
			Customer_delivery_date = "";
		}
		%>
<td style="width:30%;font-weight:bold;font-color:gray;border-bottom:1px solid #eaeaea;"><b style="color: rgb(153, 0, 0);"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
<%=Customer_delivery_date%></font></font></font></b></td>
<%
	}
	else
	{
		if(SOData.getJson("Customer_delivery_date") != null)
		{
			Customer_delivery_date = SOData.getJson("Customer_delivery_date").todate();
		}
		else
		{
			Customer_delivery_date = "";
		}
		%>
<td style="width:30%;font-weight:bold;font-color:gray;border-bottom:1px solid #eaeaea;"><b style=""><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
<%=Customer_delivery_date%></font></font></font></b></td>
<%
	}
	%>
</tr>
   </tbody>
</table>
<%
	if(SOData.getJson("Fixed_date_event") == true || SOData.getJson("Evenement") == "oui" || SOData.getJson("Evenement") == "Oui")
	{
		%>
<h4 style="color: rgb(153, 0, 0); ">ATTENTION: Notre client a un événement svp respecter DATE EN MAIN / Our Client has an Event please assure IN HANDS DATE</h4>
<%
	}
	%>
<font size="2" face="Verdana, Geneva, sans-serif">
</font> 
<table style="color: rgb(0, 0, 0);margin-bottom:0px;" border="0" cellpadding="0" cellspacing="0" width="100%">
<thead><tr>
<td width="15%" style="background-color: rgb(234, 234, 234); border-top: 2px solid gray; padding-bottom: 1%; padding-top: 1%;"><font style="" size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Code</font></font></b></font></td>

<td width="15%" style="background-color: rgb(234, 234, 234); border-top: 2px solid gray; padding-bottom: 1%; padding-top: 1%;"><font size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Description</font></font></b></font></td>

<td width="20%" style="text-align: left; border-top: 2px solid gray; background-color: rgb(234, 234, 234); padding-bottom: 1%; padding-top: 1%;"><font size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Qty/Qty</font></font></b></font></td>

<td width="20%" style="text-align: left; border-top: 2px solid gray; background-color: rgb(234, 234, 234); padding-bottom: 1%; padding-top: 1%;" align="right"><font size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Prix/Price</font></font></b></font></td>

<td width="30%" style="text-align: center; border-top: 2px solid gray; background-color: rgb(234, 234, 234); padding-bottom: 1%; padding-top: 1%;" align="right"><font style="" size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Total</font></font></b></font></td></tr></thead>

<tbody id="subform_1" class="PurchaseItems">
<%
	productlist_pi = SOData.getJson("Purchased_items");
	for each  rec2 in productlist_pi
	{
		product_id1 = rec2.getJson("Product_Name").getJson("id");
		getCRMPetails = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2.1/ProductNew/" + product_id1
			type :GET
			connection:"zohocrmcon"
		];
		SOData2 = getCRMPetails.get("data");
		prodCode = if(SOData2.getJson("prod_code").contains("NP-"),SOData2.getJson("prod_code").getSuffix("NP-"),SOData2.getJson("prod_code"));
		ProdName1 = rec2.getJson("Product_Name").getJson("name");
		ProdName = if(ProdName1.contains("-NP"),ProdName1.getPrefix("-NP"),ProdName1);
		//Old Line		ProdName = if(ProdName.contains("["),ProdName.getPrefix("["),ProdName);
		ProdName = if(ProdName.contains("["),ProdName.getSuffix("]"),ProdName);
		if(SOData.getJSON("Language_Format") == "French" || SOData.getJSON("Language_Format") == "")
		{
			ProdName = ProdName;
		}
		else if(SOData.getJSON("Language_Format") == "English")
		{
			//	GetCRMProduct = zoho.crm.getRecordById("ProductNew",rec2.getJson("Product_Name").getJson("id"));
			ProdName = SOData2.getJSON("Eng_Prod_Name");
		}
		else if(SOData.getJSON("Language_Format") == "French/English")
		{
			//	GetCRMProduct = zoho.crm.getRecordById("ProductNew",rec2.getJson("Product_Name").getJson("id"));
			ProdName = ProdName + "/ " + SOData2.getJSON("Eng_Prod_Name");
		}
		desc = rec2.getJson("Description");
		desc = if(desc.contains("\n"),desc.replaceAll("\n","<br>"),desc);
		%>
<br><tr>
<td width="10%" style="padding-top: 1%; border-bottom:2px dotted #dadada" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=prodCode%>&nbsp;&nbsp;</font></font></b></font></td>

<td width="20%" style="padding-top: 1%; border-bottom:2px dotted #dadada"><font size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=ProdName%></font></font><br></b></font>
<pre style="width:500px" wrap="soft"><span style="white-space: normal;"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=desc%></font></font></font></span>
</pre>
</td>

<td width="20%" style="padding-top: 1%; text-align: left; border-bottom-width: 2px; border-bottom-style: dotted; border-bottom-color: rgb(218, 218, 218);" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=rec2.getJson("Quantity")%></font></font></font></td>

<td width="20%" style="padding-top: 1%; text-align: left; border-bottom: 2px dotted rgb(218, 218, 218);" align="right" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=rec2.getJson("Rate")%>$</font></font></font></td>

<td width="30%" style="padding-top: 1%; border-bottom:2px dotted #dadada" align="right" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=rec2.getJson("Amount_CA").round(2)%>$</font></font></font></td></tr>
<%
	}
	productlist = SOData.getJson("Extras_Item");
	for each  rec in productlist
	{
		product_id = rec.getJson("Product").getJson("id");
		getCRMPetails3 = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2.1/Extras_New/" + product_id
			type :GET
			connection:"zohocrmcon"
		];
		SOData3 = getCRMPetails3.get("data");
		prodCode = if(SOData3.getJson("Product_Code").contains("NP-"),SOData3.getJson("Product_Code").getSuffix("NP-"),SOData3.getJson("Product_Code"));
		ExtraProd1 = rec.getJson("Product").getJson("name");
		ExtraProd = if(ExtraProd1.contains("-NP"),ExtraProd1.getPrefix("-NP"),ExtraProd1);
		//Old Line		ExtraProd = if(ExtraProd.contains("["),ExtraProd.getPrefix("["),ExtraProd);
		ExtraProd = if(ExtraProd.contains("["),ExtraProd.getSuffix("]"),ExtraProd);
		/*****For English name add ******/
		if(SOData.getJSON("Language_Format") == "French" || SOData.getJSON("Language_Format") == "")
		{
			ExtraProd = ExtraProd;
		}
		else if(SOData.getJSON("Language_Format") == "English")
		{
			//	GetCRMProduct = zoho.crm.getRecordById("Extras_New",product_id.toLong());
			ExtraProd = SOData3.getJSON("Eng_Extras_Name");
		}
		else if(SOData.getJSON("Language_Format") == "French/English")
		{
			//	GetCRMProduct = zoho.crm.getRecordById("Extras_New",product_id.toLong());
			ExtraProd = ExtraProd + "/ " + SOData3.getJSON("Eng_Extras_Name");
		}
		/*******End Here *****/
		// 		if(ExtraProd == "Frais de livraison ")
		// 		{
		// 			ExtraProd = ExtraProd + "/ Freight charge ";
		// 		}
		desc = if(rec.getJson("Description").contains("-NP"),rec.getJson("Description").replaceAll("-NP",""),rec.getJson("Description"));
		desc = if(desc.contains("\n"),desc.replaceAll("\n","<br>"),desc);
		%>
<tr>
<td width="10%" style="padding-top: 1%; border-bottom:2px dotted #dadada" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=prodCode%>&nbsp;&nbsp;</font></font></b></font></td>

<td width="20%" style="padding-top: 1%; border-bottom:2px dotted #dadada"><font size="2" face="Verdana, Geneva, sans-serif"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=ExtraProd%></font></font><br></b></font>
<pre style="width:500px" wrap="soft"><span style="white-space: normal;"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=desc%></font></font></font></span>
</pre>
</td>

<td width="20%" style="padding-top: 1%; text-align: left; border-bottom-width: 2px; border-bottom-style: dotted; border-bottom-color: rgb(218, 218, 218);" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=rec.getJson("Quantity")%></font></font></font></td>

<td width="20%" style="padding-top: 1%; text-align: left; border-bottom: 2px dotted rgb(218, 218, 218);" align="right" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=rec.getJson("Unit_Price")%>$</font></font></font></td>

<td width="30%" style="padding-top: 1%; border-bottom:2px dotted #dadada" align="right" valign="top"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=rec.getJson("Total_Amount")%>$</font></font></font></td></tr>
<%
	}
	%>
</tbody>


</table>
<table width="100%">
<tbody><tr>
<td align="right" width="80%"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Total</font></font></font></td>
<td align="right" width="20%"><font size="2" face="Verdana, Geneva, sans-serif"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><%=SOData.getJson("Total_Amount")%>$</font></font></font></td>
</tr>

</tbody>
</table>

<font size="2" face="Verdana, Geneva, sans-serif"><font color="#990000"><br>
<b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Notes</font></font><br>
<font style="vertical-align: inherit;"><%=SOData.getJson("External_note_visible")%></font><br><br>
<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">FOR DECORATED PRODUCTS -&nbsp;</font></font></b><font style="vertical-align: inherit;">
<font style="vertical-align: inherit;">PLEASE SEND A PAPER PROOF FOR APPROVAL.   </font></font><br><font style="vertical-align: inherit;"><br>
</font></font><br><br>
</font><table border="0" cellpadding="5" cellspacing="0" width="100%"><tbody>
<tr>
<td style="color:gray;border-top:2px solid gray;"><font face="Verdana, Geneva, sans-serif" size="1">
<b style=""><br>
<font style="vertical-align: inherit;">
<font style="vertical-align: inherit;">Conditions</font></font></b><br></font></td></tr><tr><td><pre style="color:gray" wrap="soft"><font face="Verdana, Geneva, sans-serif" size="1"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">NO CHANGES TO THIS ORDER WILL BE ACCEPTED WITHOUT APPROVAL FROM MACA INC.&nbsp;</font></font></font></pre><pre style="color:gray" wrap="soft"><font face="Verdana, Geneva, sans-serif" size="1"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">AUCUNE MODIFICATION SANS L'APPROBATION DE MACA INC.</font></font></font></pre><pre style="color:gray" wrap="soft"><font face="Verdana, Geneva, sans-serif" size="1"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">TVQ - PST: 10-01252671-0001 TPS - GST: R104343603</font></font></font></pre></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>
<%

}%>