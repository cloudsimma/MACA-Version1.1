<%{
	// 	orderrec = Orders[Zoho_CRM_ID == OrderID];
	// 	Itemsrec = Order_Items[Zoho_CRM_ID == OrderID && Product_Type == "Product" && Custom_Pix_Unitaire == null || Custom_Pix_Unitaire > 0];
	//CreatorOrderID = 2712865000031764686;
	orderrec = Orders[ID == CreatorOrderID.toLong()];
	Itemsrec = Order_Items[Order_ID == CreatorOrderID.toLong() && Amount > 0] sort by Sequence_No;
	OrderNo = orderrec.Order_No;
	OrderDate = orderrec.French_Order_Date;
	geQuote = Quotations[ID == orderrec.Quotation_ID.tolong()];
	orderOwner = Owner;
	logoURL = "";
	getCRMorderDetails = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2.1/Orders_New/" + orderrec.Zoho_CRM_ID.toLong()
		type :GET
		connection:"zohocrmcon"
	];
	GetOrderinfo = getCRMorderDetails.get("data").get(0);
	if(geQuote.count() > 0)
	{
		getUser = Users[Zoho_CRM_ID = geQuote.Quotation_Owner];
		if(getUser.count() > 0)
		{
			logoURL = getUser.Image_URL;
		}
	}
	contactEmail = "";
	contactPhone = "";
	if(geQuote.Contact_Name != null)
	{
		contactEmail = geQuote.Contact_Name.Email;
		contactPhone = geQuote.Contact_Name.Phone_Number;
		customerName = geQuote.Contact_Name.Contact_Name;
	}
	//Company Billing Address
	billingAddress = "";
	billingState = "";
	billingCity = "";
	billingCountry = "";
	billingCode = "";
	// 	if(geQuote.Company_Name != null && geQuote.Company_Name.Billing_Address != null)
	// 	{
	// 		billingAddress = geQuote.Company_Name.Billing_Address.address_line_1;
	// 		billingState = geQuote.Company_Name.Billing_Address.state_province;
	// 		billingCity = geQuote.Company_Name.Billing_Address.district_city;
	// 		billingCountry = geQuote.Company_Name.Billing_Address.country;
	// 		billingCode = geQuote.Company_Name.Billing_Address.postal_Code;
	// 	}
	image = "";
	status = "";
	notes = "";
	approval = false;
	if(orderrec.Status == "Approuvé")
	{
		approval = true;
		getImage = Images[Image_Name == "Approved"];
		image = getImage.Image_URL;
		status = orderrec.Status;
		notes = orderrec.Reason;
	}
	%>
<style>
.main_div_center
{
	width: 50%;
	margin:auto;
}
.cust_button
{
	height:20px;
	width:25px;
	background:black;
	color:white;
}
.button {
  background-color: Green; 
  border: none;
  color: Black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 15px;
 }
.button-span
{
	 color : white; 
	 padding : 5px;
	 text-shadow: none;
}
.product-image img:hover {
    -webkit-transform:scale(1.7); /* or some other value */
    transform:scale(1.7);
  }
@media print {
    .pagebreak { page-break-before: always; } /* page-break-after works, as well */
	.main_div_center
	{
	   margin: 0;
	   width: 100%;
	}
}
.imgcenter{
  width: 25% !important;  
	}
 @media only screen and (max-width: 600px) {
  /* For mobile phones: */
	.main_div_center
	{
	   margin: auto;
	   width: 100% !important;
	}
	.form-label{
		padding-right:0px !important;
	}
}

</style>	<!----Main Div Start Here-------->
<div class="main_div_center">

<!------Outer Table start here------>
<table style="width:100%;">
<tr>
<td>
   <!----Table 1 - Header Table Start here--->
<table style="width:100%;align:center">
<%
	if(orderrec.Status == "Approuvé")
	{
		%>
<tr>
	   <td>
	   <div style="width:70px;display: inline;float: left;"><img src=<%=image%> height="50"></img></div>
	   <div style="width:400px;display: inline;float: left;padding:10px;"><font size="4">Votre commande est Approuvée </font></div>
	   </td>
</tr>
<%
	}
	%>
<tr>
	   <td>
	   <img style="width:100%" src=<%=logoURL%> height=""></img>
	   </td>
</tr>
<tr>
    <td> 
	<div class="Header-image">
	<hr>
	</div>
	</td>
</tr>
</table>

	<!----Table 1 - Header Table End here--->
 <div class="table-row1">	
	<!----Table 2 - Address Table Start here--->
	 <table style="width:97%;align:center">
            <tr>
				<td style="vertical-align:top;padding-bottom: 10px;width: 30%;">
							FACTURATION : <br>
<%
	if(GetOrderinfo != "" && GetOrderinfo != null)
	{
		if(GetOrderinfo.get("Company_Name") != null && GetOrderinfo.get("Company_Name").get("name") != "")
		{
			%>
<%=GetOrderinfo.get("Company_Name").get("name")%><br>
<%
		}
	}
	if(GetOrderinfo.get("Billing_Contact") != "" && GetOrderinfo.get("Billing_Contact") != null)
	{
		%>
<%=GetOrderinfo.get("Billing_Contact")%><br>
<%
	}
	if(GetOrderinfo.get("Billing_address") != "" && GetOrderinfo.get("Billing_address") != null)
	{
		%>
<%=GetOrderinfo.get("Billing_address")%><br>
<%
	}
	if(GetOrderinfo.get("Billing_city") != "" && GetOrderinfo.get("Billing_city") != null)
	{
		%>
<%=GetOrderinfo.get("Billing_city")%>,<br>
<%
	}
	if(GetOrderinfo.get("Billing_region") != "" && GetOrderinfo.get("Billing_region") != null)
	{
		%>
<%=GetOrderinfo.get("Billing_region")%>,
<%
	}
	if(GetOrderinfo.get("Billing_postal_code") != "" && GetOrderinfo.get("Billing_postal_code") != null)
	{
		%>
<%=GetOrderinfo.get("Billing_postal_code")%><br>
<%
	}
	OrderCrmData = getCRMorderDetails.get("data").get(0).get("Customer_delivery_date");
	if(OrderCrmData != null)
	{
		EntryDate = OrderCrmData.todate();
		day = EntryDate.day();
		month = EntryDate.month();
		year = EntryDate.year();
		DateFrenchMap = {"1":"Janvier","2":"Février","3":"Mars","4":"Avril","5":"Mai","6":"Juin","7":"Juillet","8":"Août","9":"Septembre","10":"Octobre","11":"Novembre","12":"Décembre"};
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
</td>
<td style="vertical-align:top;padding-bottom: 10px; width: 30%;">
				  LIVRAISON :  <br>
<%
	if(GetOrderinfo.get("Livraison_Enterprise") != "" && GetOrderinfo.get("Livraison_Enterprise") != null)
	{
		%>
<%=GetOrderinfo.get("Livraison_Enterprise")%><br>
<%
	}
	else if(GetOrderinfo.get("Livraison_Enterprise") == null)
	{
		if(GetOrderinfo.get("Company_Name") != null && GetOrderinfo.get("Company_Name").get("name") != "")
		{
			%>
<%=GetOrderinfo.get("Company_Name").get("name")%><br>
<%
		}
	}
	if(GetOrderinfo.get("Delivery_Contact") != "" && GetOrderinfo.get("Delivery_Contact") != null)
	{
		%>
<%=GetOrderinfo.get("Delivery_Contact")%><br>
<%
	}
	if(GetOrderinfo.get("Delivery_street") != "" && GetOrderinfo.get("Delivery_street") != null)
	{
		%>
<%=GetOrderinfo.get("Delivery_street")%><br>
<%
	}
	if(GetOrderinfo.get("City_of_delivery") != "" && GetOrderinfo.get("City_of_delivery") != null)
	{
		%>
<%=GetOrderinfo.get("City_of_delivery")%>,<br>
<%
	}
	if(GetOrderinfo.get("Delivery_region") != "" && GetOrderinfo.get("Delivery_region") != null)
	{
		%>
<%=GetOrderinfo.get("Delivery_region")%>,
<%
	}
	if(GetOrderinfo.get("Postal_code_of_delivery") != "" && GetOrderinfo.get("Postal_code_of_delivery") != null)
	{
		%>
<%=GetOrderinfo.get("Postal_code_of_delivery")%><br>
<%
	}
	%>
</td>
<td style="vertical-align:top;padding-bottom: 10px;text-align:right;">
				 Date  : <%=OrderDate%><br>
				 Commande No : <%=OrderNo%><br>
<%
	if(GetOrderinfo.get("Name") != "")
	{
		%>
Réf : <%=GetOrderinfo.get("Name")%> <br>
<%
	}
	if(FrenchDate != "")
	{
		%>
Livraison Demandée : <%=FrenchDate%><br>
<%
	}
	%>
</td>	   
				
			</tr>
	  </table>
	<!----Table 2 - Address Table End here--->
	
		<!----Table 3 - Item Outer Table Start here--->
<%
	tet = {0};
	c = 0;
	order_total = 0;
	for each  rec in tet
	{
		Product_total = 0;
		extra_total = 0;
		extraProductList = List();
		for each  line_rec in Itemsrec
		{
			Product_total = Product_total + line_rec.Amount;
			if(line_rec.Product != null)
			{
				ProdName = if(line_rec.Product.Product_Name.contains("-NP"),line_rec.Product.Product_Name.getPrefix("-NP"),line_rec.Product.Product_Name);
				//ProdName = if(ProdName.contains("-"),ProdName.getPrefix("-"),ProdName);
				//Old Line				ProdName = if(ProdName.contains("["),ProdName.getPrefix("["),ProdName);
				ProdName = if(ProdName.contains("["),ProdName.getSuffix("]"),ProdName);
			}
			else
			{
				ProdName = "";
			}
			if(line_rec.Product_Description != null && line_rec.Product_Description != "")
			{
				productName = "<br><br>" + if(line_rec.Product_Description != null,if(line_rec.Product_Description.contains("\n"),line_rec.Product_Description.replaceAll("\n","<br>"),line_rec.Product_Description)," ");
			}
			else
			{
				productName = "";
			}
			product_unitaire = if(line_rec.Custom_Pix_Unitaire != null,line_rec.Custom_Pix_Unitaire,line_rec.Pix_unitaire);
			if(product_unitaire == 0)
			{
				product_unitaire = "";
			}
			else
			{
				product_unitaire = product_unitaire + "$";
			}
			if(line_rec.Amount < 1)
			{
				line_rec_Amount = "";
				ItemQty = "";
			}
			else
			{
				ItemQty = line_rec.Quantity;
				line_rec_Amount = line_rec.Amount + "$";
			}
			if(line_rec.Image_URL != null && line_rec.Image_URL_2 != null)
			{
				showImage = "<span><a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image1'><img class='imgcenter' src='" + line_rec.Image_URL + "' alt='' /> </a></span>";
				showImage = showImage + "<span style='margin-left:5px;'><a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image2'><img class='imgcenter' src='" + line_rec.Image_URL_2 + "'  alt='' /></a></span>";
			}
			else if(line_rec.Image_URL != null && line_rec.Image_URL_2 == null)
			{
				showImage = "<a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image1'><img class='imgcenter' src='" + line_rec.Image_URL + "' alt='' /></a>";
			}
			else if(line_rec.Image_URL == null && line_rec.Image_URL_2 != null)
			{
				showImage = "<a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image2'><img class='imgcenter' src='" + line_rec.Image_URL_2 + "' alt='' /></a>";
			}
			else
			{
				showImage = "";
			}
			if(c == 0)
			{
				c = 1;
				%>
<table style="width:98%;" border="1" cellpadding="5" cellspacing="5">
<%
			}
			else
			{
				%>
<table style="width:98%;" border="1" cellpadding="5" cellspacing="5" class="pagebreak">
<%
			}
			%>
<tbody>
    	<tr>
			<td style="text-align:center;">
			      <p class="product-image" style="text-align:center; width: 100%;"><%=showImage%></p>
				  
				  <!----Inner Table Start Here - Items---->
				   <table style="width:100%; margin:auto; background-color: #f2f2f2;" cellpadding="5" cellspacing="5">
				    
				      <tbody>
					       <tr>
						        <td style="width:40%; text-align:left;"><font size="3">Produit</font></td>
								<td style="width:20%;text-align:right;"><font size="3">Quantité</font></td>
								<td style="width:20%;text-align:right;"><font size="3">Coût unitaire</font></td>			
								<td style="width:20%;text-align:right;"><font size="3">Total</font></td>		
						   </tr>
<%
			if(line_rec.Product_Type == "Product")
			{
				%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><br><b><%=ProdName%></b><%=productName%><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=ItemQty%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=product_unitaire%></font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=line_rec_Amount%></font></td>		
						   </tr>
<%
				ExtrsItemDet = Extra_Items[S_No == line_rec.Sequence_No && Order_ID == line_rec.Order_ID && Amount > 0];
				for each  extraItem in ExtrsItemDet
				{
					if(extraItem.Custom_Pix_Unitaire != null)
					{
						ExtraProduct_unitaire = extraItem.Custom_Pix_Unitaire;
					}
					else
					{
						ExtraProduct_unitaire = extraItem.Pix_unitaire;
					}
					ExtrasTotal = ExtraProduct_unitaire * extraItem.Quantity;
					Product_total = Product_total + ExtrasTotal;
					if(ExtraProduct_unitaire == 0)
					{
						ExtraProduct_unitaire = "";
					}
					else
					{
						ExtraProduct_unitaire = ExtraProduct_unitaire + "$";
					}
					if(ExtrasTotal < 1)
					{
						ExtrasTotal = "";
						ExtraQty = "";
					}
					else
					{
						ExtraQty = extraItem.Quantity;
						ExtrasTotal = ExtrasTotal + "$";
					}
					ExtraProdName = if(extraItem.Product.Product_Name.contains("-NP"),extraItem.Product.Product_Name.getPrefix("-NP"),extraItem.Product.Product_Name);
					//ExtraProdName = if(ExtraProdName.contains("-"),ExtraProdName.getPrefix("-"),ExtraProdName);
					//Old Line				ExtraProdName = if(ExtraProdName.contains("["),ExtraProdName.getPrefix("["),ExtraProdName);
					ExtraProdName = if(ExtraProdName.contains("["),ExtraProdName.getSuffix("]"),ExtraProdName);
					if(extraItem.Product.ID == 2712865000033727239)
					{
						ExtraProdName = ExtraProdName + "/ Freight charge";
					}
					if(ExtraProduct_unitaire != null)
					{
						%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"> <b><%=ExtraProdName%></b><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtraQty%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtraProduct_unitaire%> </font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtrasTotal%></font></td>		
						   </tr>
<%
					}
				}
			}
			if(!extraProductList.contains(line_rec.Product))
			{
				extraProductList.add(line_rec.Product);
				getExtrasInfo = Order_Items[Product_Type == "Extra" && Product == line_rec.Product && Amount > 0 && Order_ID == orderrec.ID && Custom_Pix_Unitaire == null || Custom_Pix_Unitaire > 0];
				if(getExtrasInfo.count() > 0)
				{
					%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><b><%="Extras :"%></b><br></font></td>
								<td style="text-align:right;" valign="center"></td>
								<td style="text-align:right;" valign="center"></td>			
								<td style="text-align:right;" valign="center"></td>		
							</tr>
<%
					for each  extra_rec in getExtrasInfo
					{
						extra_total = extra_total + extra_rec.Amount;
						extra_unitaire = if(extra_rec.Custom_Pix_Unitaire > 0,extra_rec.Custom_Pix_Unitaire,extra_rec.Pix_unitaire);
						%>
<tr>
										<td style="text-align:left;" valign="top"><font size="3"><b><%=extra_rec.Product_Description%></b><br></font></td>
										<td style="text-align:right;" valign="center"><font size="3"><%=extra_rec.Quantity%></font></td>
<%
						if(extra_rec.Custom_Pix_Unitaire != 0)
						{
							%>
<td style="text-align:right;" valign="center"><font size="3"><%=extra_unitaire%> $</font></td>			
										<td style="text-align:right;" valign="center"><font size="3"><%=extra_rec.Amount%> $</font></td>
<%
						}
						%>
</tr>
<%
					}
				}
			}
			%>
</tbody>
				   </table>
				  <!-----Inner Table End Here- Items------->
			</td>
		</tr>
	  </tbody>
	</table>
<%
		}
	}
	order_total = Product_total + extra_total;
	TPS = (order_total * 5 / 100).round(2);
	TVQ = (order_total * 9.975 / 100).round(2);
	GrandTotal = order_total + TPS + TVQ;
	%>
<!----Table 3 - Item Outer Table ENd here--->
<table style="width:98%; background-color: #f2f2f2;">
<tr>
						       <td style="width:50%;text-align:right;"><font size="3"></font></td>
								<td style="width:25%;text-align:right;"><font size="3">Sous-Total</font></td>
								<td style="width:25%;text-align:right;"><font size="3"><%=order_total%> $</font></td>	
</tr>
<tr>
						       <td style="width:40%;text-align:right;"><font size="3"></font></td>
								<td style="width:35%;text-align:right;"><font size="3">TPS-R104343603 (5%)</font></td>
								<td style="width:25%;text-align:right;"><font size="3"><%=TPS%> $</font></td>	
</tr>
<tr>
						       <td style="width:40%;text-align:right;"><font size="3"></font></td>
								<td style="width:35%;text-align:right;"><font size="3">TVQ-10-01252671-001 (9.975%)</font></td>
								<td style="width:25%;text-align:right;"><font size="3"><%=TVQ%> $</font></td>	
</tr>
<tr>
						       <td style="width:50%;text-align:right;"><font size="3"></font></td>
								<td style="width:25%;text-align:right;"><font size="3">Total</font></td>
								<td style="width:25%;text-align:right;"><font size="3"><%=GrandTotal%> $</font></td>	
</tr>
</table>
<!-----Notes View----->
<%
	Order_CrmData = getCRMorderDetails.get("data").get(0).get("External_notes_visible");
	if(Order_CrmData != null && Order_CrmData != "")
	{
		%>
<table style="width:90%;">
	     <tbody>
		        <tr>
				    <td>
					<p style="text-align:left;"><b><font size="2">Notes :</font></b></p>
<div align="left">
<font size="2">
<ul><%=Order_CrmData%> </ul>
</font>
</div>
					
					</td>
				</tr>
		 </tbody>
	</table>
<%
	}
	%>
<!-----Terms and conditions section Start here----->
	<table style="width:90%;">
	     <tbody>
		        <tr>
				    <td>
					<p style="text-align:left;"><b><font size="2">Termes et conditions</font></b></p>
<div align="left">
<font size="2">
<ul>
<li>Une Approbation est requise dans les plus brefs délais afin de pouvoir respecter la date de livraison demandée.</li>
<li>Un dépot de 50% est exigible pour toute première commande et la balance payable sur réception de la marchandise.</li>
<li>Toute réclamation doit être faite dans les 2 jours ouvrables suivant la livraison.</li>
<!--<li>Le soussigné déclare être autorisé à utiliser et/ou à se servir du signe, cliché ou de la marque de commerce requise pour ce contrat.</li>-->
<li>Frais de manutention si applicable au coût de 25$/h.</li>
<li>Frais de graphisme si applicable au coût de 50$/h.</li>
</ul>
</font>
</div>
					
					</td>
				</tr>
		 </tbody>
	</table>
<!---	<table style="width:98%;">
	 <tbody>
		        <tr>
				    <td>
					<p style="text-align:left;background-color:grey;color: white; padding:5px; margin: 3px;"><b><font size="3"></font></b></p>
<div align="left"> 
<p><font size="2">
TERMES : Le fait de ne pas confirmer l'approbation dans les 24 heures pourrait affecter votre date d'expédition. Un dépot de 50% est exigible pour toute première commande et la balance payable sur réception de la marchandise.
Toute réclamation doit être faite dans les 2 jours ouvrables suivant la livraison. Des frais de manutention si applicable seront facturés au cout de 25$/h. Des frais de graphisme si applicable seront facturés au cout de 50$/h.<br>Avis de non-responsabilité :Il est de la seule responsabilité du client d'approuver l'exactitude de tous les détails liés à l'œuvre d'art conformément à son bon de commande et à ses spécifications.
</font></p>
<hr style="border: 3px solid black;">
</div>
                      </td>
				</tr>
		 </tbody>
		 </table> ---->
	
	<!----Terms and conditions section End here------->
	
</td>
</tr>
</table>
<!------Outer Table End here---------->
<%
	if(approval == false)
	{
		//<iframe  height='500px' width='100%' frameborder='0' allowTransparency='true'  src='https://creatorapp.zohopublic.com/vanessa68/order-management/form-embed/Order_Submission/kx4FV7EVKwCMRw1wmvqaq0T9ANzFFUXxnwPYFbuVYQEaarSsEmfxPgNPqjJdUhORa86ff92x1egtpONh1rguU0DdguOx8Gs7tERP?CRM_Record_ID=<%=OrderID%>&Creator_Order_ID=<%=CreatorOrderID%>&Email=<%=contactEmail%>&Owner=<%=orderOwner%>&Contact_Name=<%=customerName%>&Signature=<%=logoURL%>&zc_Focus=false'></iframe>
		%>
<div elName='zc-component' formLinkName='Order_Submission' params='zc_Focus=false&zc_Header=false&amp;zc_SuccMsg=Data Added Successfully!&amp;zc_SubmitVal=Submit&amp;zc_ResetVal=Reset&amp;CRM_Record_ID=<%=OrderID%>&Creator_Order_ID=<%=CreatorOrderID%>&Email=<%=contactEmail%>&Owner=<%=orderOwner%>&Contact_Name=<%=customerName%>&Signature=<%=logoURL%>&amp;privateLink=kx4FV7EVKwCMRw1wmvqaq0T9ANzFFUXxnwPYFbuVYQEaarSsEmfxPgNPqjJdUhORa86ff92x1egtpONh1rguU0DdguOx8Gs7tERP'></div>
<%
	}
	%>
</div>
</div>
</div>
<%

}%>