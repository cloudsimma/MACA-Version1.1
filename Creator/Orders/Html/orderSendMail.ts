<%{
	orderrec = Orders[Zoho_CRM_ID == OrderID];
	Itemsrec = Order_Items[Zoho_CRM_ID == OrderID && Product_Type == "Product"];
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
	//Company Shipping Address
	shippingAddress = "";
	if(geQuote.Company_Name != null && geQuote.Company_Name.Delivery_Address != null)
	{
		shippingAddress = geQuote.Company_Name.Delivery_Address;
	}
	%>
<style>
.main_div_center
{
	width:50%;
	margin:auto;
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
	@page { 
		size: auto;
		margin: 0mm 0 0mm 0;
		border: 2px solid;
    }
	.main_div_center
	{
	   margin: 0;
	   width: none !important;
	}
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
</style>	<!----Main Div Start Here-------->
<div class="main_div_center">

<!------Outer Table start here------>
<table>

<tr>
	     <td>
		 <a href="https://creatorapp.zohopublic.com/vanessa68/order-management/form-perma/Send_Email/PY0V37B20RJdQYqHZrZDFnZDePGXpBtEa1Kuz6FUaw27d3gSUUMj13V6f6KA4QAOzshjMQGD13ODTVttgeRpwy5ydp5RC4RsNusK?DataFrom=SendEmailOrder&&CRM_RecID=<%=OrderID%>&Creator_RecID=<%=orderrec.Quotation_ID%>&Owner=<%=Owner%>"><span style="float:left;padding:5px 5px;font-size:12px;background:black;align-items: center;display: flex;justify-content: center;" class="zc-formbutton">To Send</span></a>
		 </td>
	</tr>

<tr>
<td>
   <!----Table 1 - Header Table Start here--->
<table>
<tr>
	   <td>
	   <img src=<%=logoURL%> height="169"></img>
	   </td>
</tr>
	
	<tr><td><hr></td></tr>
</table>
</div>
	<!----Table 1 - Header Table End here--->
	
	<!----Table 2 - Address Table Start here--->
	 <table style="width:100%;align:center">
            <tr>
				<td style="vertical-align:top;">
				    <!--<b>GSPD CSP INTERNAL CONTROLS</b><br>-->
					<%=customerName%><br>
				     <%=shippingAddress%><br>
					 <%=contactEmail%><br>
					 <%=contactPhone%>
				</td>
	   
				<td style="text-align:right;vertical_align:top;">
				   Order No : <%=OrderNo%><br>
				   Date : <%=OrderDate%>
				</td>
			</tr>
	  </table>
	<!----Table 2 - Address Table End here--->
	
		<!----Table 3 - Item Outer Table Start here--->
<%
	tet = {0};
	c = 0;
	for each  rec in tet
	{
		extraProductList = List();
		for each  line_rec in Itemsrec
		{
			productName = line_rec.Product.Product_Name + "<br><br>" + line_rec.Product_Description.replaceAll("\n","<br>");
			product_unitaire = if(line_rec.Custom_Pix_Unitaire > 0,line_rec.Custom_Pix_Unitaire,line_rec.Pix_unitaire);
			if(line_rec.Image_URL != null && line_rec.Image_URL_2 != null)
			{
				showImage = "<span><a target='' href=''><img src='" + line_rec.Image_URL + "' width='200' alt='' /></a></span><span style='margin-left:5px;'><a target='' href=''><img src='" + line_rec.Image_URL_2 + "' width='200' alt='' /></a></span>";
			}
			else if(line_rec.Image_URL != null && line_rec.Image_URL_2 == null)
			{
				showImage = "<a target='' href=''><img src='" + line_rec.Image_URL + "' width='200' alt='' /></a>";
			}
			else if(line_rec.Image_URL == null && line_rec.Image_URL_2 != null)
			{
				showImage = "<a target='' href=''><img src='" + line_rec.Image_URL_2 + "' width='200' alt='' /></a>";
			}
			else
			{
				showImage = "";
			}
			if(c == 0)
			{
				c = 1;
				%>
<table style="width:100%;" border="1" cellpadding="5" cellspacing="5">
<%
			}
			else
			{
				%>
<table style="width:100%;" border="1" cellpadding="5" cellspacing="5" class="pagebreak">
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
						        <th style="width:50%; text-align:left;"><font size="3">Produit</font></th>
								<th style="text-align:right;"><font size="3">Quantité</font></th>
								<th style="text-align:right;"><font size="3">Coût unitaire</font></th>			
								<th style="text-align:right;"><font size="3">Total</font></th>		
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
			}
			if(!extraProductList.contains(line_rec.Product))
			{
				extraProductList.add(line_rec.Product);
				getExtrasInfo = Order_Items[Product_Type == "Extra" && Product == line_rec.Product && Order_ID == orderrec.ID];
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
	%>
<!----Table 3 - Item Outer Table ENd here--->

	
	<!----Terms and conditions section End here------->
	
</td>
</tr>
</table>
<!------Outer Table End here---------->

</div>
<%

}%>