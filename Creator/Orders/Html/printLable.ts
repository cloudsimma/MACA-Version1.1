<%{
	boxCount = "2";
	if(input.boxCount != "")
	{
		box_count = boxCount.tolong();
	}
	else
	{
		box_count = 1;
	}
	boxList = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};
	OrderID = "449573000100872098";
	if(input.OrderID != null && input.OrderID != "")
	{
		// 		logoURL = thisapp.Images.logoURL();
		orderrec = Orders[Zoho_CRM_ID == OrderID];
		Itemsrec = Order_Items[Zoho_CRM_ID == OrderID];
		//logoURL
		getImage = Images[Image_Name == "MACCA Logo"];
		logoURL = "";
		if(getImage.count() > 0)
		{
			logoURL = getImage.Image_URL;
		}
		company = orderrec.Company_Name;
		getCompany = Company_Details[ID == company];
		clientAddress = "";
		city = "";
		province = "";
		postalCode = "";
		companyName = "";
		if(getCompany.count() > 0)
		{
			companyName = getCompany.Company_Name;
			if(getCompany.Delivery_Address != null)
			{
				clientAddress = getCompany.Delivery_Address.address_line_11;
				city = getCompany.Delivery_Address.district_city1;
				province = getCompany.Delivery_Address.state_province1;
				postalCode = getCompany.Delivery_Address.postal_Code1;
			}
		}
	}
	%>
<style>
.main_div_center
{
	padding:10px 0;
	width:50%;
	margin:auto;
}
td,th
{
	border: 1px solid #ddd;
	padding:3px;
}
table
{
	border-collapse: collapse;
}
@media print {
// 	 @page { 
// 		size: auto;
// 		margin: 0mm 0 0mm 0;
// 		border: 2px solid;
//     }
	.main_div_center
	{
	   margin-left:50px;
	   width:100%;
	}
	.product-item-table{
width:600px;
background-color: #ddd;
border:none	
}
}
.adress{
	font-size: 16px;
    font-weight: bold;
    padding: 3px 0px;
}
.company-name{
	font-weight: bold;
    font-size: 18px;
}
.product-item
{
	text-align:center;
	font-weight: bold;
}
.address-section td, th
{
	border:none;
	width:600px;
}
.product-item-table{
width:600px;
background-color: #ddd;
border:none	
}
</style>
<%
	for each  Boxrec in boxList
	{
		if(Boxrec <= box_count)
		{
			%>
<div class="main_div_center" style="page-break-after: always;">
    <table class="address-section">
	  <tr>
	   <td style="width:35%;">
	   <img src=<%=logoURL%> ></img>
	   </td>
	    <td style="width:70%;">
		   <div class="adress">825, boul.Lebourgneuf, porte 117</div>
		   <div class="adress">Quebec QC G2J 0B9</div>
		   <div class="adress">418 628-6222 | 800 665.6220</div>
	   </td>
	  </tr>
	</table>
	<br>
	<table style="width:600px;background-color: #ddd;border:none">
	<tr>
	<td>
     <div class="company-name"><%=companyName%></div>
	 <div class="contact">Contact</div>
	 <div class="client-address"><%=clientAddress%></div>
	 <div class="client-address">
<%
			if(city != "")
			{
				%>
<%=city%>,<%=" "%>
<%
			}
			if(province != "")
			{
				%>
<%=province%>,<%=" "%>
<%
			}
			if(city != "")
			{
				%>
<%=postalCode%>
<%
			}
			%>
</div>
	 </td>
	</tr>
	</table>
	<br>
	<table class="product-item-table">
        <tr>                            
			<th><font size="2">No.</font></th>
			<th><font size="2">Produit</font></th>
			<th><font size="2">Qte</font></th>
        </tr>
<%
			count = 0;
			totalAmount = 0.0;
			for each  rec in Itemsrec
			{
				count = count + 1;
				totalAmount = ifnull(totalAmount,0.0) + ifnull(rec.Amount,0.0);
				%>
<tr>                            
                                <td class="product-item"><font size="2"><%=count%></font></td>
						        <td class="product-item"><font size="2"><%=rec.Product.Product_Name%></font></td>
                                <td class="product-item"><font size="2"><%=rec.Quantity%></font></td>
						   </tr>
<%
			}
			%>
</table>
	<br>
	<table class="address-section" style="width:600px">
	<tr>
	  <td style="width: 90%;">#PO Client: <%=orderrec.Order_No%></td>
	  <td style="font-weight: bold;font-size:16px;"><%=Boxrec%> de <%=box_count%></td>
	<tr>
	</table>
</div>
<%
		}
	}

}%>