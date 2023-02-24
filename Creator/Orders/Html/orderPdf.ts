<%{
	orderrec = Orders[ID == CreatorOrderID.toLong()];
	Itemsrec = Order_Items[Order_ID == CreatorOrderID.toLong() && Amount > 0 && Product_Type == "Product" && Custom_Pix_Unitaire == null || Custom_Pix_Unitaire > 0];
	OrderNo = orderrec.Order_No;
	OrderDate = orderrec.Added_Time.todate();
	geQuote = Quotations[ID == orderrec.Quotation_ID.tolong()];
	orderOwner = Owner;
	logoURL = "";
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
	if(geQuote.Company_Name != null && geQuote.Company_Name.Billing_Address != null)
	{
		billingAddress = geQuote.Company_Name.Billing_Address.address_line_1;
		billingState = geQuote.Company_Name.Billing_Address.state_province;
		billingCity = geQuote.Company_Name.Billing_Address.district_city;
		billingCountry = geQuote.Company_Name.Billing_Address.country;
		billingCode = geQuote.Company_Name.Billing_Address.postal_Code;
	}
	image = "";
	status = "";
	notes = "";
	approval = false;
	if(orderrec.Status == "En correction" || orderrec.Status == "Approuvé")
	{
		approval = true;
		getImage = Images[Image_Name == "Approved"];
		image = getImage.Image_URL;
		status = orderrec.Status;
		notes = orderrec.Reason;
	}
	notes = Notes;
	userSignature = Signature;
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
<tr>
	   <td>
	   <div style="width:70px;display: inline;float: left;"><img src=<%=image%> height="50"></img></div>
	   <div style="width:400px;display: inline;float: left;padding:10px;"><font size="4">Votre commande est Approuvée </font></div>
	   </td>
</tr>
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
				  Commande No : <%=OrderNo%><br>
				   Date : <%=OrderDate%>
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
			if(line_rec.Product_Description != null && line_rec.Product_Description != "")
			{
				productName = line_rec.Product.Product_Name + "<br><br>" + if(line_rec.Product_Description != null,if(line_rec.Product_Description.contains("\n"),line_rec.Product_Description.replaceAll("\n","<br>"),line_rec.Product_Description)," ");
			}
			product_unitaire = if(line_rec.Custom_Pix_Unitaire > 0,line_rec.Custom_Pix_Unitaire,line_rec.Pix_unitaire);
			if(line_rec.Image_URL != null && line_rec.Image_URL_2 != null)
			{
				showImage = "<span><a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image1'><img src='" + line_rec.Image_URL + "' width='200' alt='' /> </a></span>";
				showImage = showImage + "<span style='margin-left:5px;'><a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image2'><img src='" + line_rec.Image_URL_2 + "' width='200' alt='' /></a></span>";
			}
			else if(line_rec.Image_URL != null && line_rec.Image_URL_2 == null)
			{
				showImage = "<a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image1'><img src='" + line_rec.Image_URL + "' width='400' alt='' /></a>";
			}
			else if(line_rec.Image_URL == null && line_rec.Image_URL_2 != null)
			{
				showImage = "<a target='_blank' href='https://creatorapp.zohopublic.com/vanessa68/order-management/view-perma/previewImage/gYsO6FmXH9kyebkpD5A8dNMj4sxZPTZt3gpyzvBgyQsaaEtW5FdqJtefrV474JYh3FmD07NtedwWknxmfeUVHOSjw5e05mzDzh4D?itemID=" + line_rec.ID + "&DataFrom=Order&Image=Image2'><img src='" + line_rec.Image_URL_2 + "' width='400' alt='' /></a>";
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
				   <table style="width:100%; margin:auto; background-color: #f2f2f2;" cellpadding="5" cellspacing="5">
				    
				      <tbody>
					       <tr>
						        <th style="width:40%; text-align:left;"><font size="3">Produit</font></th>
								<th style="width:20%;text-align:right;"><font size="3">Quantité</font></th>
								<th style="width:20%;text-align:right;"><font size="3">Coût unitaire</font></th>			
								<th style="width:20%;text-align:right;"><font size="3">Total</font></th>		
						   </tr>
<%
			if(line_rec.Product_Type == "Product")
			{
				%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><b><%=productName%></b><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=line_rec.Quantity%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=product_unitaire%> $</font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=line_rec.Amount%> $</font></td>		
						   </tr>
<%
				ExtrsItemDet = Extra_Items[Sequence_No == line_rec.ID];
				for each  extraItem in ExtrsItemDet
				{
					ExtraProduct_unitaire = if(extraItem.Custom_Pix_Unitaire > 0,extraItem.Custom_Pix_Unitaire,extraItem.Pix_unitaire);
					ExtrasTotal = ExtraProduct_unitaire * extraItem.Quantity;
					Product_total = Product_total + ExtrasTotal;
					%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3">Extras : <b><%=extraItem.Product.Product_Name%></b><br></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=extraItem.Quantity%></font></td>
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtraProduct_unitaire%> $</font></td>			
								<td style="text-align:right;" valign="center"><font size="3"><%=ExtrasTotal%> $</font></td>		
						   </tr>
<%
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
	gst = (order_total * 5 / 100).round(2);
	qst = (order_total * 9.975 / 100).round(2);
	GrandTotal = order_total + gst + qst;
	%>
<!----Table 3 - Item Outer Table ENd here--->
<table style="width:98%; background-color: #f2f2f2;">
<tr>
						       <th style="width:50%;text-align:right;"><font size="3"></font></th>
								<th style="width:25%;text-align:right;"><font size="3">Sub Total</font></th>
								<th style="width:25%;text-align:right;"><font size="3"><%=order_total%> $</font></th>	
</tr>
<tr>
						       <th style="width:40%;text-align:right;"><font size="3"></font></th>
								<th style="width:35%;text-align:right;"><font size="3">GST-R104343603 (5%)</font></th>
								<th style="width:25%;text-align:right;"><font size="3"><%=gst%> $</font></th>	
</tr>
<tr>
						       <th style="width:40%;text-align:right;"><font size="3"></font></th>
								<th style="width:35%;text-align:right;"><font size="3">QST-10-01252671-001 (9.975%)</font></th>
								<th style="width:25%;text-align:right;"><font size="3"><%=qst%> $</font></th>	
</tr>
<tr>
						       <th style="width:50%;text-align:right;"><font size="3"></font></th>
								<th style="width:25%;text-align:right;"><font size="3">Total</font></th>
								<th style="width:25%;text-align:right;"><font size="3"><%=GrandTotal%> $</font></th>	
</tr>
</table>
	<!-----Terms and conditions section Start here----->
	<table style="width:98%;">
	 <tbody>
		        <tr>
				    <td>
					<p style="text-align:left;background-color:grey;color: white; padding:5px; margin: 3px;"><b><font size="3">*TERMS</font></b></p>
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
		 </table>
	
	<!----Terms and conditions section End here------->
<table style="width:98%">
<tbody>
<input type="checkbox" id="checkbox1" checked>
<label for="checkbox1"> Je confirme que le vêtement /produit (couleur et quantité) sont exact.</label><br>
<input type="checkbox" id="checkbox2" checked>
<label for="checkbox2"> Je confirme que toutes les illustrations et tous les emplacements de logo sont corrects .</label><br>
<input type="checkbox" id="checkbox3" checked>
<label for="checkbox3"> Je confirme que l'adresse d'expédition et la facturation sont correctes.</label><br>
<input type="checkbox" id="checkbox4" checked>
<label for="checkbox4">Le soussigné déclare être autorisé à utiliser et/ou à se servir du signe, cliché ou de la marque de commerce requise pour ce contrat.</label><br>
<input type="checkbox" id="checkbox5" checked>
<label for="checkbox5">Vous pouvez recevoir 5 % de plus ou moins en marchandise et serez facturé pour la quantité livrée.</label><br>
<br>
Notes: <%=notes%>
<br>
<div style="float:right;">
Signed By,<br>
<%=userSignature%>
</div>
</tbody>
</table>
	<!----To approve section ends here------->	
</td>
</tr>
</table>
<!------Outer Table End here---------->
</div>
</div>
</div>
</div>
<%

}%>