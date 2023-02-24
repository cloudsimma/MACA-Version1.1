<%{
	// 	logoURL = "https://static.wixstatic.com/media/7fe6ad_535ed3bb96c94e188563b47e556373d4~mv2.png/v1/fill/w_600,h_127,al_c,q_85,usm_0.66_1.00_0.01/Bandeau-signature_Sylvie.webp";
	vv = "https://images-na.ssl-images-amazon.com/images/I/81awsX5xajL._SL1500_.jpg";
	showImage = "<a target='' href=''><img src='" + vv + "' width='400' height='300' alt='' /></a>";
	QuoteInfoCreator = Quotations[ID == CreatorQuoteID.tolong()];
	QuoteItemsCreator = Quotation_Items[Quotation_ID == CreatorQuoteID.tolong() && Order_Conversion == true] sort by Sequence_No;
	QuoteNo = if(QuoteInfoCreator.Quotation_No.contains("QT"),QuoteInfoCreator.Quotation_No.getSuffix("QT"),QuoteInfoCreator.Quotation_No);
	Qname = QuoteInfoCreator.Object;
	QuoteDate = QuoteInfoCreator.Quote_Date;
	getOwnerID = QuoteInfoCreator.Quotation_Owner;
	getUser = Users[Zoho_CRM_ID = getOwnerID];
	logoURL = "";
	if(getUser.count() > 0)
	{
		logoURL = getUser.Image_URL;
	}
	contactEmail = "";
	contactPhone = "";
	if(QuoteInfoCreator.Contact_Name != null)
	{
		contactEmail = QuoteInfoCreator.Contact_Name.Email;
		contactPhone = QuoteInfoCreator.Contact_Name.Phone_Number;
		customerName = QuoteInfoCreator.Contact_Name.Contact_Name;
	}
	//Company Billing Address
	billingAddress = "";
	billingState = "";
	billingCity = "";
	billingCountry = "";
	billingCode = "";
	if(QuoteInfoCreator.Company_Name != null && QuoteInfoCreator.Company_Name.Billing_Address != null)
	{
		billingAddress = QuoteInfoCreator.Company_Name.Billing_Address.address_line_1;
		billingState = QuoteInfoCreator.Company_Name.Billing_Address.state_province;
		billingCity = QuoteInfoCreator.Company_Name.Billing_Address.district_city;
		billingCountry = QuoteInfoCreator.Company_Name.Billing_Address.country;
		billingCode = QuoteInfoCreator.Company_Name.Billing_Address.postal_Code;
	}
	getCRMSODetails = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2.1/Quotations/" + QuoteInfoCreator.Zoho_CRM_ID.toLong()
		type :GET
		connection:"zohocrmcon"
	];
	COMPANYData = getCRMSODetails.get("data");
	%>
<style>
.product-image img:hover {
    -webkit-transform:scale(1.7); /* or some other value */
    transform:scale(1.7);
}
.main_div_center
{
   margin: auto;
   width: 50%;
}
.cust_button
{
	height:20px;
	width:25px;
	background:black;
	color:white;
}
@media print {
    .pagebreak { page-break-before: always; } /* page-break-after works, as well */
//     @page { 
// 		size: auto;
// 		margin: 0mm 0 0mm 0;
// 		border: 2px solid;
//     }
	.main_div_center
	{
	   margin: 0;
	   width: 100%;
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


</style>	<!----Main Div Start Here-------->
<div class="main_div_center">

<!------Outer Table start here------>
<table style="width:100%;">
<tr>
<td>
   <!----Table 1 - Header Table Start here--->
  
   
    <table>
<%
	if(RemoveButton != "Yes")
	{
		// 		 <a href=""><span style="float:left;padding:5px 5px;font-size:12px;background:black;align-items: center;display: flex;justify-content: center;" class="zc-formbutton">Item Detail</span></a>
		// 		 <a href=""><span style="float:left;padding:5px 5px;font-size:12px;background:black;align-items: center;display: flex;justify-content: center;" class="zc-formbutton">Convert to Order</span></a>
		%>
<tr>
	     <td>
		 <!--<a href="https://creatorapp.zohopublic.com/vanessa68/order-management/form-perma/Alert/8e9sAzZPvgStvTBsndChnmAWxrNjjQ56FSzaZVYAt5wZjSnsVpTt5wTTNJdrVztsWkmt32kUffBPdOehkCMN6rAD8DV1dOUR8AvR?zc_LoadIn=dialog&zc_Header=false&DataFrom=SendEmailQuote&CreatorRecID=<%=CreatorQuoteID%>&CRMRecID=<%=QuoteID%>"><span style="float:left;padding:5px 5px;font-size:12px;background:black;align-items: center;display: flex;justify-content: center;" class="zc-formbutton">To Send</span></a>
		 <a href="https://creatorapp.zohopublic.com/vanessa68/order-management/print/Quotation/Mx6ypB1r5n9sKy9au7TUvg7ez1gyMTrBen8Dz4Y7WC2qaU0JpT81ndGN2XGsZhsGYEfhNpXWwhuqFUmPBHSj8MF83n2HrZFwu87x?RemoveButton=Yes&CreatorQuoteID=<%=CreatorQuoteID%>&QuoteID=<%=QuoteID%>"><span style="float:left;padding:5px 5px;font-size:12px;background:black;align-items: center;display: flex;justify-content: center;" class="zc-formbutton">To Print</span></a>-->
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
	
	<tr><td><hr></td></tr>
	</table>
	
	<!----Table 1 - Header Table End here--->
	
	<!----Table 2 - Address Table Start here--->
	 <table style="width:97%;align:center">
            <tr>
				<td style="vertical-align:top;">
				FACTURATION : <br>
<%
	if(COMPANYData != "" && COMPANYData != null)
	{
		//
		%>
<%=COMPANYData.get(0).get("Company_Name").get("name")%><br>
<%
	}
	if(COMPANYData.get(0).get("Adresse_facture") != "" && COMPANYData.get(0).get("Adresse_facture") != null)
	{
		%>
<%=COMPANYData.get(0).get("Adresse_facture")%><br>
<%
	}
	if(COMPANYData.get(0).get("Billing_address") != "" && COMPANYData.get(0).get("Billing_address") != null)
	{
		%>
<%=COMPANYData.get(0).get("Billing_address")%><br>
<%
	}
	if(COMPANYData.get(0).get("Billing_city") != "" && COMPANYData.get(0).get("Billing_city") != null)
	{
		%>
<%=COMPANYData.get(0).get("Billing_city")%>,
<%
	}
	if(COMPANYData.get(0).get("Billing_region") != "" && COMPANYData.get(0).get("Billing_region") != null)
	{
		%>
<%=COMPANYData.get(0).get("Billing_region")%>,
<%
	}
	if(COMPANYData.get(0).get("Billing_postal_code") != "" && COMPANYData.get(0).get("Billing_postal_code") != "")
	{
		%>
<%=COMPANYData.get(0).get("Billing_postal_code")%><br>
<%
	}
	%>
</td>
<!-- <td style="vertical-align:top;padding-bottom: 10px;">-->
<!--	  LIVRAISON:  <br> -->
<!--  <%=COMPANYData.get(0).get("Account_Name")%><br> -->
<!--	  <%=COMPANYData.get(0).get("Contact_Livraison")%><br> -->
<!--	  <%=COMPANYData.get(0).get("Shipping_Street")%><br> -->
<!--	  <%=COMPANYData.get(0).get("Shipping_City")%> -->
<!-- <%=COMPANYData.get(0).get("Shipping_State")%> -->
<!-- <%=COMPANYData.get(0).get("Shipping_Code")%><br> -->
<!-- </td> -->
	   <td style="text-align:right;vertical_align:top;padding-bottom: 40px;">
		Date : <%=QuoteDate%><br>Proposition No : <%=QuoteNo%><br>Réf : <%=Qname%>
				   
				</td>
			</tr>
	  </table>
	<!----Table 2 - Address Table End here--->
	
	<!----Table 3 - Item Outer Table Start here--->
<%
	tet = {0};
	c = 0;
	//order_total = 0;
	for each  rec in tet
	{
		// 		Product_total = 0;
		// 		extra_total = 0;
		productmap = List();
		allIds = list();
		for each  line_rec in Quotation_Items[Quotation_ID == CreatorQuoteID.tolong() && Order_Conversion == true]
		{
			number = line_rec.Sequence_No;
			allIds.add(number.tolong());
			sortOrder = allIds.sort(true);
		}
		//<p><%=sortOrder%></p>
		for each  seqno_sort in sortOrder
		{
			for each  line_rec in Quotation_Items[Quotation_ID == CreatorQuoteID.tolong() && Order_Conversion == true && Sequence_No == seqno_sort]
			{
				order_total = 0;
				Product_total = 0;
				extra_total = 0;
				prodName = if(line_rec.Product_Name.Product_Name.contains("-NP"),line_rec.Product_Name.Product_Name.getPrefix("-NP"),line_rec.Product_Name.Product_Name);
				//prodName = if(prodName.contains("-"),prodName.getPrefix("-"),prodName);
				//Old Line			prodName = if(prodName.contains("["),prodName.getPrefix("["),prodName);
				prodName = if(prodName.contains("["),prodName.getSuffix("]"),prodName);
				productDesc = "<br><br>" + if(line_rec.Product_Description != null,if(line_rec.Product_Description.contains("\n"),line_rec.Product_Description.replaceAll("\n","<br>"),line_rec.Product_Description)," ");
				product_unitaire = if(line_rec.Custom_Pix_Unitaire != null,line_rec.Custom_Pix_Unitaire,line_rec.Pix_unitaire);
				line_rec_Total = line_rec.Quantity * product_unitaire;
				Product_total = Product_total + line_rec_Total;
				if(line_rec.Image_URL != null && line_rec.Image_URL_2 != null)
				{
					showImage = "<span><a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Quotation&Image=Image1'><img src='" + line_rec.Image_URL + "' width='250' alt='' /></a>";
					showImage = showImage + "</span><a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Quotation&Image=Image2'><img src='" + line_rec.Image_URL_2 + "' width='250' alt='' /></a></span>";
				}
				else if(line_rec.Image_URL != null && line_rec.Image_URL_2 == null)
				{
					showImage = "<a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D/itemID=" + line_rec.ID + "&DataFrom=Quotation&Image=Image1'><img src='" + line_rec.Image_URL + "' width='400' alt='' /></a>";
				}
				else if(line_rec.Image_URL == null && line_rec.Image_URL_2 != null)
				{
					showImage = "<a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D/itemID=" + line_rec.ID + "&DataFrom=Quotation&Image=Image2'><img src='" + line_rec.Image_URL_2 + "' width='400' alt='' /></a>";
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
			      <p class="product-image" style="text-align:center;"><%=showImage%></p>
				  
				  <!----Inner Table Start Here - Items---->
				   <table style="width:100%; background-color: #f2f2f2;">
				    
				      <tbody>
					       <tr>
						        <th style="width:40%; text-align:left;"><font size="3">Produit</font></th>
								<th style="width:20%;text-align:right;"><font size="3">Quantité</font></th>
								<th style="width:20%;text-align:right;"><font size="3">Coût unitaire</font></th>			
								<th style="width:20%;text-align:right;"><font size="3">Total</font></th>		
						   </tr>
<%
				if(product_unitaire == 0)
				{
					product_unitaire = "";
				}
				else
				{
					product_unitaire = product_unitaire + "$";
				}
				if(line_rec_Total < 1)
				{
					line_rec_Total = "";
					ItemQty = "";
				}
				else
				{
					ItemQty = line_rec.Quantity;
					line_rec_Total = line_rec_Total + "$";
				}
				%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><br><b><%=prodName%></b><%=productDesc%><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=ItemQty%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=product_unitaire%></font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=line_rec_Total%></font></td>		
						   </tr>
<%
				ExtrsItemDet = Extras[Sequence_No == line_rec.ID && Quotation_ID == QuoteInfoCreator.ID && Prix_total > 0];
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
					ExtrasTotal = ExtraProduct_unitaire * extraItem.Quantit;
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
						ExtraQty = extraItem.Quantit;
						ExtrasTotal = ExtrasTotal + "$";
					}
					ExtraProdName = if(extraItem.Product.Product_Name.contains("-NP"),extraItem.Product.Product_Name.getPrefix("-NP"),extraItem.Product.Product_Name);
					//ExtraProdName = if(ExtraProdName.contains("-"),ExtraProdName.getPrefix("-"),ExtraProdName);
					//Old Line				ExtraProdName = if(ExtraProdName.contains("["),ExtraProdName.getPrefix("["),ExtraProdName);
					ExtraProdName = if(ExtraProdName.contains("["),ExtraProdName.getSuffix("]"),ExtraProdName);
					%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><b><%=ExtraProdName%></b><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtraQty%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtraProduct_unitaire%></font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtrasTotal%></font></td>		
						   </tr>
<%
				}
				if(!productmap.contains(line_rec.Product_Name))
				{
					productmap.add(line_rec.Product_Name);
					getExtrasInfo = Extras[Quotation_ID == QuoteInfoCreator.ID && Product == line_rec.Product_Name && Custom_Pix_Unitaire == null || Custom_Pix_Unitaire > 0 && Prix_total > 0];
					showHeading = false;
					for each  extra_rec in getExtrasInfo
					{
						if(extra_rec.Prix_total > 0)
						{
							showHeading = true;
						}
					}
					if(getExtrasInfo.count() > 0 && showHeading == true)
					{
						%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><%="Extras :"%><br></font></td>
								<td style="text-align:right;" valign="center"></td>
								<td style="text-align:right;" valign="center"></td>			
								<td style="text-align:right;" valign="center"></td>		
						</tr>
<%
						for each  extra_rec in getExtrasInfo
						{
							extra_total = extra_total + extra_rec.Prix_total;
							if(extra_rec.Prix_total != null && extra_rec.Custom_Pix_Unitaire != 0)
							{
								extra_unitaire = if(extra_rec.Custom_Pix_Unitaire > 0,extra_rec.Custom_Pix_Unitaire,extra_rec.Pix_unitaire);
								%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><%=extra_rec.Item%><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=extra_rec.Quantit%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=extra_unitaire%> $</font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=extra_rec.Prix_total%> $</font></td>
</tr>
<%
							}
						}
					}
				}
				order_total = Product_total + extra_total;
				%>
</tbody>
				   </table>
				  <!-----Inner Table End Here- Items------->
			</td>
		</tr>
	  </tbody>
	</table>
<table style="width:97%; background-color: #f2f2f2; margin-bottom: 10px;">
<tr>
						       <th style="width:60%;text-align:left;"><font size="2">Prix valide pour un délai de 15 jours, Transport et Taxes en sus</font></th>
								<th style="width:25%;text-align:right;"><font size="3">Sous-Total</font></th>
								<th style="width:25%;text-align:right;"><font size="3"><%=order_total%> $</font></th>	
</tr>
</table>
<%
			}
		}
	}
	// 	order_total = Product_total + extra_total;
	// 	gst = (order_total * 5 / 100).round(2);
	// 	qst = (order_total * 9.975 / 100).round(2);
	// 	GrandTotal = order_total + gst + qst;
	%>
<!----Table 3 - Item Outer Table ENd here--->
<!----- <table style="width:97%; background-color: #f2f2f2;">
// <tr>
// 						       <th style="width:50%;text-align:right;"><font size="3"></font></th>
// 								<th style="width:25%;text-align:right;"><font size="3">Sub Total</font></th>
// 								<th style="width:25%;text-align:right;"><font size="3"><%=order_total%> $</font></th>	
// </tr>

// <tr>
// 						       <th style="width:40%;text-align:right;"><font size="3"></font></th>
// 								<th style="width:35%;text-align:right;"><font size="3">GST-R104343603 (5%)</font></th>
// 								<th style="width:25%;text-align:right;"><font size="3"><%=gst%> $</font></th>	
// </tr>
// <tr>
// 						       <th style="width:40%;text-align:right;"><font size="3"></font></th>
// 								<th style="width:35%;text-align:right;"><font size="3">QST-10-01252671-001 (9.975%)</font></th>
// 								<th style="width:25%;text-align:right;"><font size="3"><%=qst%> $</font></th>	
// </tr>
// <tr>
// 						       <th style="width:50%;text-align:right;"><font size="3"></font></th>
// 								<th style="width:25%;text-align:right;"><font size="3">Total</font></th>
// 								<th style="width:25%;text-align:right;"><font size="3"><%=GrandTotal%> $</font></th>	
// </tr>
 </table> ----->
<%
	getCRMorderDetails = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v2.1/Quotations/" + QuoteInfoCreator.Zoho_CRM_ID.toLong()
		type :GET
		connection:"zohocrmcon"
	];
	QuoteCrmData = getCRMorderDetails.get("data").get(0).get("Notes_Externe_visible");
	%>
<table style="width:90%;">
	     <tbody>
		        <tr>
				    <td>
					<!--<p style="text-align:left;"><b><font size="2">Notes:</font></b></p>-->
<%
	if(QuoteCrmData != "" && QuoteCrmData != null)
	{
		%>
<p style="text-align:left;"><b><font size="2">Notes :</font></b></p>
<div align="left">
<font size="2">
<ul><%=QuoteCrmData%> </ul>
</font>
</div>
<%
	}
	%>
</td>
				</tr>
		 </tbody>
	</table>
	<!-----Terms and conditions section Start here----->
	
	<table style="width:90%;">
	     <tbody>
		        <tr>
				    <td>
					<p style="text-align:left;"><b><font size="2">Termes et conditions</font></b></p>
<div align="left">
<font size="2">
<ul>
<li>Un dépot de 50% est exigible pour toute première commande et la balance payable sur réception de la marchandise.</li>
<li>Vous pouvez recevoir 5 % de plus ou moins en marchandise et serez facturé pour la quantité livrée.</li>
<li>Toute réclamation doit être faite dans les 2 jours ouvrables suivant la livraison.</li>
<!--<li>Le soussigné déclare être autorisé à utiliser et/ou à se servir du signe, cliché ou de la marque de commerce requise pour ce contrat.</li>-->
<li>Le soussigné déclare être autorisé à utiliser et/ou à se servir du logo, ou de la marque de commerce requise pour ce contrat.</li>
<li>Frais de manutention si applicable au coût de 25$/h.</li>
<li>Frais de graphisme si applicable au coût de 50$/h.</li>
</ul>
</font>
</div>
					
					</td>
				</tr>
		 </tbody>
	</table>
	<!----Terms and conditions section End here------->
	
</td>
</tr>
</table>
<!------Outer Table End here---------->

</div>
<!----Main Div End Here-------->
<%

}%>