<%{
	if(input.SupplierOrderID != null && input.SupplierOrderID != "")
	{
		Supplier_rec = Supplier_Orders[Zoho_CRM_ID == SupplierOrderID];
		suppliername = Supplier_rec.Suppliers.Supplier_Name;
		supplierno = Supplier_rec.Suppliers.Supplier_No;
		supplierphone = Supplier_rec.Suppliers.Supplier_Phone;
		supplierInfo = Supplier_Order_Items[ID == Supplier_rec.Line_items];
		for each  supplierdata in supplierInfo
		{
			Product = supplierdata.Product.Product_Name;
			Quantity = supplierdata.Quantity;
			Amount = supplierdata.Amount;
			TotalPrice = supplierdata.Total;
		}
	}
	%>
<style>
.main_div_center
{
	width:90%;
	padding:20px;
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

</style>	<!----Main Div Start Here-------->
<div class="main_div_center">
	<table style="width:600px">
<tr>
 <td>Supplier Name :<%=suppliername%><br></td>
</tr>
<tr>
<td>Supplier No : <%=supplierno%></td>
</tr>
<tr>
<td>Supplier Phone : <%=supplierphone%></td>
</tr>
 <!----Inner Table Start Here - Items---->
</table>
<div style="height:5px"></div>
<table style="width:600px">
<tr>
<td colspan=5 style="text-align:center;font-size:14px;font-weight:700;">
Product Details
</td>
</tr>
<tr>
						        <th><font size="2">Product</font></th>
								<th><font size="2">Quantity</font></th>
								<th><font size="2">Amount</font></th>			
								<th><font size="2">Total Price</font></th>

						 </tr>
						 <tr>
						        <td><font size="2"><%=Product%></font></td>
                                <td><font size="2"><%=Quantity%></font></td>
								<td><font size="2"><%=Amount%>$</font></td>			
								<td><font size="2"><%=TotalPrice%>$</font></td>

						   </tr>
</table>
</div>
<%

}%>