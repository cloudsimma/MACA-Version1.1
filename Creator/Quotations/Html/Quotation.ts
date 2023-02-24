<%{
	// 	logoURL = "https://static.wixstatic.com/media/7fe6ad_535ed3bb96c94e188563b47e556373d4~mv2.png/v1/fill/w_600,h_127,al_c,q_85,usm_0.66_1.00_0.01/Bandeau-signature_Sylvie.webp";
	vv = "https://images-na.ssl-images-amazon.com/images/I/81awsX5xajL._SL1500_.jpg";
	showImage = "<a target='' href=''><img src='" + vv + "' width='400' height='300' alt='' /></a>";
	QuoteInfoCreator = Quotations[ID == CreatorQuoteID.tolong()];
	QuoteItemsCreator = Quotation_Items[Quotation_ID == CreatorQuoteID.tolong() && Total > 0 && Custom_Pix_Unitaire == null || Custom_Pix_Unitaire > 0];
	QuoteNo = QuoteInfoCreator.Quotation_No;
	QuoteDate = QuoteInfoCreator.Added_Time.todate();
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
				    <!--<b>GSPD CSP INTERNAL CONTROLS</b><br>-->
<%
	if(customerName != "")
	{
		%>
<%=customerName%><br>
<%
	}
	if(billingAddress != null)
	{
		%>
<%=billingAddress%><br>
<%
	}
	if(billingState != null)
	{
		%>
<%=billingState%><br>
<%
	}
	if(billingCity != null)
	{
		%>
<%=billingCity%><br>
<%
	}
	if(billingCountry != null)
	{
		%>
<%=billingCountry%><br>
<%
	}
	if(billingCode != null)
	{
		%>
<%=billingCode%><br>
<%
	}
	if(contactEmail != "")
	{
		%>
<%=contactEmail%><br>
<%
	}
	if(contactPhone != "")
	{
		%>
<%=contactPhone%>
<%
	}
	%>
</td>
	   <td style="text-align:right;vertical_align:top;padding-bottom: 65px;">
				   Quotation No : <%=QuoteNo%><br>
				   Date : <%=QuoteDate%>
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
		productmap = List();
		for each  line_rec in QuoteItemsCreator
		{
			Product_total = Product_total + line_rec.Total;
			productDesc = line_rec.Product_Name.Product_Name + "<br><br>" + if(line_rec.Product_Description != null,if(line_rec.Product_Description.contains("\n"),line_rec.Product_Description.replaceAll("\n","<br>"),line_rec.Product_Description)," ");
			product_unitaire = if(line_rec.Custom_Pix_Unitaire > 0,line_rec.Custom_Pix_Unitaire,line_rec.Pix_unitaire);
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
						   <tr>
						        <td style="text-align:left;" valign="top"><font size="3"><b><%=productDesc%></b><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=line_rec.Quantity%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=product_unitaire%> $</font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=line_rec.Total%> $</font></td>		
						   </tr>
<%
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
						        <td style="text-align:left;" valign="top"><font size="3"><b><%="Extras :"%></b><br></font></td>
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
						        <td style="text-align:left;" valign="top"><font size="3"><b><%=extra_rec.Item%></b><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=extra_rec.Quantit%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=extra_unitaire%> $</font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=extra_rec.Prix_total%> $</font></td>

</tr>
<%
						}
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
	%>
<!----Table 3 - Item Outer Table ENd here--->
<table style="width:95%; background-color: #f2f2f2;">
<tr>
						       <th style="width:50%;text-align:right;"><font size="3"></font></th>
								<th style="width:25%;text-align:right;"><font size="4">Total</font></th>
								<th style="width:25%;text-align:right;"><font size="4"><%=order_total%> $</font></th>	
</tr>
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
<li>Le soussigné déclare être autorisé à utiliser et/ou à se servir du signe, cliché ou de la marque de commerce requise pour ce contrat.</li>
<li>Frais de manutention si applicable au coût de 20$/h.</li>
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