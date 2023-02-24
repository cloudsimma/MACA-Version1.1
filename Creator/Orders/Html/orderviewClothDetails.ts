<%{
	// 	orderrec = Orders[Zoho_CRM_ID == OrderID];
	// 	Itemsrec = Order_Items[Zoho_CRM_ID == OrderID && Product_Type == "Product" && Custom_Pix_Unitaire == null || Custom_Pix_Unitaire > 0];
	//CreatorOrderID = 2712865000031764686;
	orderrec = Orders[ID == CreatorOrderID.toLong()];
	Itemsrec = Order_Items[Order_ID == CreatorOrderID.toLong()] sort by Sequence_No;
	OrderNo = orderrec.Order_No;
	OrderDate = orderrec.French_Order_Date;
	geQuote = Quotations[ID == orderrec.Quotation_ID.tolong()];
	orderOwner = Owner;
	logoURL = "";
	returnval = null;
	if(openForm == "Add/Edit")
	{
		returnval = thisapp.Cloth_Details.add_or_edit_ClothDetails(itemId.tolong());
	}
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
.clothFormDiv
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
  width: 100%;
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
// #zc_inner_nav_menu{
//     display: none;
// }
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
			if(line_rec.Product_Description != null && line_rec.Product_Description != "")
			{
				ProdName = if(line_rec.Product.Product_Name.contains("-NP"),line_rec.Product.Product_Name.getPrefix("-NP"),line_rec.Product.Product_Name);
				//ProdName = if(ProdName.contains("-"),ProdName.getPrefix("-"),ProdName);
				//Old Line				ProdName = if(ProdName.contains("["),ProdName.getPrefix("["),ProdName);
				ProdName = if(ProdName.contains("["),ProdName.getSuffix("]"),ProdName);
				productName = "<br><br>" + if(line_rec.Product_Description != null,if(line_rec.Product_Description.contains("\n"),line_rec.Product_Description.replaceAll("\n","<br>"),line_rec.Product_Description)," ");
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
    	<tr >
			<td style="text-align:center;">
<%
			if(showImage != "")
			{
				%>
<p class="product-image" style="text-align:center; width: 100%;"><%=showImage%></p>
<%
			}
			%>
<!----Inner Table Start Here - Items---->
				   <table style="width:100%; margin:auto; background-color: #f2f2f2;" cellpadding="5" cellspacing="5">
				    
				      <tbody>
					       <tr>
						        <td style="width:30%; text-align:left;"><font size="3">Produit</font></td>
								<td style="width:10%; text-align:right;"><font size="3">Cloth Details</font></td>
								<td style="width:20%;text-align:right;"><font size="3">Quantité</font></td>
								<td style="width:20%;text-align:right;"><font size="3">Coût unitaire</font></td>			
								<td style="width:20%;text-align:right;"><font size="3">Total</font></td>			
						   </tr>
						   
						   
						   <div class="row">
<%
			if(line_rec.Product_Type == "Product")
			{
				addReditUrl = "https://creatorapp.zoho.com/vanessa68/order-management/#Page:Order_View_Cloth_Details?OrderID=" + orderrec.Zoho_CRM_ID.toLong() + "&CreatorOrderID=" + CreatorOrderID.toLong() + "&itemId=" + line_rec.ID + "&openForm=Add/Edit";
				%>
<tr>
						        <td style="text-align:left;" valign="top"><font size="3"><br><b><%=ProdName%></b></font></td>
								<td><div class="column">
  
						<p style="text-align:center;"> <button style="border:none;"> <a href="https://creatorapp.zoho.com/vanessa68/order-management/#Form:Cloth_size_Details"> </a> 
						
						
						<a href=<%=addReditUrl%>> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg></a></button></p></div></td>


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
								<td></td>
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
<%
			clothdet = Cloth_size_Details[Order_Items == line_rec.ID];
			if(clothdet.count() > 0)
			{
				%>
<table style ="width:100%; border: 1px solid black;" >
				  <tbody>
				  <tr>
					  <th style="width:20%;text-align:Center;"><font size="3">Size</font></th>
					  <th style="width:20%;text-align:Center;"><font size="3">Quantity</font></th>
					  <th style="width:30%;text-align:Center;"><font size="3">Quantity Received</font></th>
					  <th style="width:20%;text-align:Center;"><font size="3">Back Order</font></th>
				  </tr>
<%
				for each  clothinfo in Cloth_size_Details[Order_Items == line_rec.ID]
				{
					%>
<tr>
					  <td style="width:20%;text-align:Center;"><font size="3"><%=clothinfo.Size.Size%></font></td>
					  <td style="width:20%;text-align:Center;"><font size="3"><%=clothinfo.Quantity%></font></td>
					  <td style="width:30%;text-align:Center;"><font size="3"><%=clothinfo.Quantity_received%></font></td>
					  <td style="width:20%;text-align:Center;"><font size="3"><%=clothinfo.Back_Order_Quantity%></font></td>
				  	</tr>
<%
				}
				%>
</tbody>
				  </table>
<%
			}
			%>
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
</td>
</tr>
</table>

</div>
</div>
</div>
<div class="clothFormDiv">
<%
	if(returnval == 1)
	{
		openFormUrl = "https://creatorapp.zoho.com/vanessa68/order-management/#Form:Order_cloth_details?Order_Items=" + itemId.tolong();
		%>
<iframe height='500px' width='100%' frameborder='0' allowTransparency='true' scrolling='auto' src=<%=openFormUrl%>></iframe>
<%
	}
	if(returnval > 1)
	{
		clothinfoID = Order_cloth_details[Order_Items == itemId.toLong()];
		if(clothinfoID.count() != 0)
		{
			editFormUrl = "https://creatorapp.zoho.com/vanessa68/order-management/Order_cloth_details/record-edit/All_Order_Cloth_Details/" + clothinfoID.ID;
			%>
<iframe height='500px' width='100%' frameborder='0' allowTransparency='true' scrolling='auto' src=<%=editFormUrl%>></iframe>
<%
		}
	}
	%>
</div>
<%

}%>