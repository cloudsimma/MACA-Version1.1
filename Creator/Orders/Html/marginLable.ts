<%{
	QuoteInfoCreator = Quotations[ID == CreatorQuoteID.toLong()];
	QuoteItemsCreator = Quotation_Items[Quotation_ID == CreatorQuoteID.toLong()];
	margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
	margin_map_b = {"A":0.5,"B":0.45,"C":0.40,"D":0.35,"E":0.30,"F":0.25,"G":0.20,"H":0.19,"I":0.18,"J":0.17,"K":0.16,"L":0.15,"X":1};
	productMap = List();
	extraProduct = List();
	totalNetProfit = 0;
	totalNetVal = 0;
	netCostPriceTotal = 0;
	netTotal = 0;
	netUnitPrice = 0;
	totalSellerPrice = 0;
	for each  prod_item in QuoteItemsCreator
	{
		tempImage1 = "";
		tempImage2 = "";
		if(prod_item.Upload_Image != "" && prod_item.Upload_Image != null)
		{
			tempImage1 = tempImage1 + "<img src='" + prod_item.Image_URL + "' width='200' alt='' />";
		}
		if(prod_item.Upload_Image_2 != "" && prod_item.Upload_Image_2 != null)
		{
			tempImage2 = tempImage2 + "<img src='" + prod_item.Image_URL_2 + "' width='200' alt='' />";
		}
		net = 0;
		netVal = "";
		productSellerPrice = 0;
		if(prod_item.Unit_Price != null)
		{
			if(prod_item.Margin != null && prod_item.Margin_B != null)
			{
				productSellerPrice = (prod_item.Unit_Price * margin_map.get(prod_item.Margin)).round(2);
				productPriceWithMargin = prod_item.Unit_Price + " " + "(" + prod_item.Margin + ")";
				net = (prod_item.Unit_Price * margin_map.get(prod_item.Margin) / margin_map.get(prod_item.Margin_B)).round(2);
				netVal = net + " " + "(" + prod_item.Margin_B + ")";
			}
		}
		quantity = if(prod_item.Quantity == null || prod_item.Quantity == 0,0,prod_item.Quantity);
		prodUnitPrice = if(prod_item.Unit_Price == null || prod_item.Unit_Price == 0,0,prod_item.Unit_Price);
		if(quantity != 0 && prodUnitPrice != 0)
		{
			st = (quantity * net).round(2);
			gt = st;
			prodProfit = net - prodUnitPrice;
			netUnitPrice = prodUnitPrice;
			unitaire = (gt / quantity).round(2);
			/*prodNetTotal = prodProfit * quantity;*/
			prodNetTotal = st - productSellerPrice * quantity;
			prodCostPriceTotal = (prodUnitPrice * quantity).round(2);
			/*prodProfitPercentage = if(prodNetTotal > 0,(prodNetTotal / st * 100).round(0),0);*/
			prodProfitPercentage = if(prodNetTotal > 0,((prodNetTotal * 100) / st).round(0),0);
			prodNetVal = net;
		}
		else
		{
			st = 0;
			gt = 0;
			prodNetTotal = 0;
			prodProfitPercentage = 0;
			prodCostPriceTotal = 0;
			prodNetVal = 0;
			unitaire = 0;
			netUnitPrice = 0;
			prodProfit = 0;
		}
		%>
<div align='center'>
	<br>
<%
		if(prod_item.Product_Name != null)
		{
			%>
<h2><%=prod_item.Product_Name.Product_Name%></h2>
<%
		}
		%>
<p><%=tempImage1%><%=tempImage2%></p>
	<table border='1'>
	<tr>
	<td width='200px' bgcolor='gainsboro'><b>Produit</b></td>
	<td width='50px' align='right' bgcolor='gainsboro'><b>Quantité</b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>Prix Catalogue</b></td>
	<!--<td width='100px' align='right' bgcolor='gainsboro'><b>Margin</b></td>-->
	<td width='100px' align='right' bgcolor='gainsboro'><b>Prix Net </b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>Vendant par item</b></td>	
	<!--<td width='100px' align='right' bgcolor='gainsboro'><b> Net Profit</b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>Coûtant Total</b></td>-->
	<td width='100px' align='right' bgcolor='gainsboro'><b>sous total vendu</b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>Profit Total</b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>Total Profit Percentage</b></td>
	</tr>
	<tr>
		<td><%=prod_item.Product_Name.Product_Name%></td>
		<td align='right'><%=quantity%></td>
		<td align='right'><%=productPriceWithMargin%></td>
        <td align='right'><%=productSellerPrice%></td> 
		<td align='right'><%=netVal%></td>
		<!--<td align='right'><%=prodProfit%></td>
		<td align='right'><%=prodCostPriceTotal%></td>-->
		<td align='right'><%=st%></td>
		<td align='right'><%=prodNetTotal%></td>	
		<td align='right'><%=prodProfitPercentage%> %</td>
	</tr>
<%
		extraProfit = 0;
		extraNetValue = 0;
		extraNetTotal = 0;
		totalCost = 0;
		extraTotal = 0;
		extraSubTotal = 0;
		profitTotal = 0;
		netProfitPercentage = 0;
		extraSellerPrice = 0;
		if(!productMap.contains(prod_item.Product_Name))
		{
			productMap.add(prod_item.Product_Name);
			for each  a in Extras[Quotation_ID == QuoteInfoCreator.ID && Product == prod_item.Product_Name && Prix_total > 0]
			{
				extraNet = 0;
				extraNetVal = "";
				extraSellerPriceWithMargin = "";
				extraQuantity = if(a.Quantit == null || a.Quantit == 0,0,a.Quantit);
				extraCostPrice = if(a.Prix_co_tant == null || a.Prix_co_tant == 0,0,a.Prix_co_tant);
				if(extraQuantity != 0 && extraCostPrice != 0)
				{
					if(a.Code_co_tant != null && a.Margin_B != null)
					{
						extraSellerPrice = (a.Prix_co_tant * margin_map.get(a.Code_co_tant)).round(2);
						extraPriceWithMargin = a.Prix_co_tant + " " + "(" + a.Code_co_tant + ")";
						extraNet = (a.Prix_co_tant * margin_map.get(a.Code_co_tant) / margin_map.get(a.Margin_B)).round(2);
						extraNetVal = extraNet + " " + "(" + a.Margin_B + ")";
					}
					extra_st = (a.Quantit * extraNet).round(2);
					extraTotal = extra_st;
					extraSubTotal = extraSubTotal + extraTotal;
					netUnitPrice = netUnitPrice + a.Prix_co_tant;
					extraProfit = extraNet - a.Prix_co_tant;
					// 					ext = extraProfit * a.Quantit;
					ext = extra_st - extraSellerPrice * a.Quantit;
					profitTotal = profitTotal + extraProfit;
					extraNetTotal = extraNetTotal + ext;
					/*extraProfitPercentage = if(ext > 0,(ext / extra_st * 100).round(0),0);*/
					extraProfitPercentage = if(ext > 0,(ext * 100 / extra_st).round(0),0);
					extraCostPriceTotal = (a.Prix_co_tant * a.Quantit).round(2);
					totalCost = totalCost + extraCostPriceTotal;
					extraNetValue = extraNetValue + extraNet;
				}
				else
				{
					extraTotal = 0;
					extraNetVal = 0;
					extraProfit = 0;
					extraCostPriceTotal = 0;
					extra_st = 0;
					ext = 0;
					extraProfitPercentage = 0;
					extraSubTotal = 0;
					extraNetTotal = 0;
				}
				%>
<tr>
		<td><%=a.Product.Product_Name%></td>
		<td align='right'><%=a.Quantit%></td>
		<td align='right'><%=extraPriceWithMargin%></td>
		<td align='right'><%=extraSellerPrice%></td>
		<td align='right'><%=extraNetVal%></td>
		<!--<td align='right'><%=extraProfit%></td>
		<td align='right'><%=extraCostPriceTotal%></td>-->
		<td align='right'><%=extra_st%></td>
		<td align='right'><%=ext%></td>
		<td align='right'><%=extraProfitPercentage%> %</td>
        </tr>
<%
			}
		}
		gt = gt + extraSubTotal;
		netTotal = extraNetTotal + prodNetTotal;
		totalNetVal = extraNetValue + prodNetVal;
		totalNetProfit = prodProfit + profitTotal;
		netCostPriceTotal = totalCost + prodCostPriceTotal;
		// 		unitaire = (gt / prod_item.Quantity).round(2);
		/*netProfitPercentage = if(netTotal > 0,(netTotal / gt * 100).round(0),0);*/
		netProfitPercentage = if(netTotal > 0,(netTotal * 100 / gt).round(0),0);
		totalSellerPrice = productSellerPrice + extraSellerPrice;
		%>
<tr>
		<td align='right'>Total </td>
		<td align='right'> </td>
		<td align='right'><%=netUnitPrice%></td>
		<td align='right'><%=totalSellerPrice%></td>
		<td align='right'><%=totalNetVal%></td>
		<!--<td align='right'><%=totalNetProfit%></td>
		<td align='right'><%=netCostPriceTotal%></td>-->
		<td align='right'><%=gt%></td>
		<td align='right'><%=netTotal%></td>
		<td align='right'><%=netProfitPercentage%> %</td>
     </tr>

	</table>
<br><br>
<%
		if(prodUnitPrice > 0)
		{
			%>
<table width='500px' height='50'><tr><td bgcolor='black' valign='center' >
		<b><div align='center'>
		<font size='5' color="white">Prix vendu : <%=net%>$ * <%=quantity%> = <%=st%>$</font><br>
		<font size='5' color="white">Coutant : <%=productSellerPrice%>$ * <%=quantity%> =  <%=(productSellerPrice * quantity).round(2)%>$</font><br>
		<font size='5' color="white">Profit : <%=st%>$ - <%=productSellerPrice * quantity%>$ = <%=prodNetTotal%>$</font>
		</div></b>
		</td></tr></table>
		
		<table border='1' width='500'>
		<tr>
		<td width='20%' bgcolor='gainsboro'> </td>
		<td width='30%'align='right' bgcolor='gainsboro'><b>Prix unitaire suggéré</b></td>
		<!--<td width='30%'align='right' bgcolor='gainsboro'><b>Profit</b></td>
		<td width='20%'align='right' bgcolor='gainsboro'><b>Bénéfice total</b></td>-->
		</tr>
		
	
		<tr>
			<td width='20%' bgcolor='lawngreen'><b>A / 50</b></td>
			<td width='30%'align='right'><%=if(prod_item.Unit_Price > 0,(prod_item.Unit_Price * margin_map.get(prod_item.Margin) / 0.50).round(2),0)%></td>
		</tr>
		
		
		<tr>
			<td width='20%' bgcolor='lawngreen'><b>B / 45</b></td>
			<td width='30%'align='right'><%=if(prod_item.Unit_Price > 0,(prod_item.Unit_Price * margin_map.get(prod_item.Margin) / 0.55).round(2),0)%></td>
		</tr>
		
		<tr>
			<td width='20%' bgcolor='orange'><b>C / 40</b></td>
			<td width='30%'align='right'><%=if(prod_item.Unit_Price > 0,(prod_item.Unit_Price * margin_map.get(prod_item.Margin) / 0.60).round(2),0)%></td>
		</tr>		
		<tr>
			<td width='20%' bgcolor='orange'><b>D / 35</b></td>
			<td width='30%'align='right'><%=if(prod_item.Unit_Price > 0,(prod_item.Unit_Price * margin_map.get(prod_item.Margin) / 0.65).round(2),0)%></td>
		</tr>
		<tr>
			<td width='20%' bgcolor='yellow'><b>E / 30</b></td>
			<td width='30%'align='right'><%=if(prod_item.Unit_Price > 0,(prod_item.Unit_Price * margin_map.get(prod_item.Margin) / 0.70).round(2),0)%></td>
		</tr>
		<tr>
			<td width='20%' bgcolor='yellow'><b>F / 25</b></td>
			<td width='30%'align='right'><%=if(prod_item.Unit_Price > 0,(prod_item.Unit_Price * margin_map.get(prod_item.Margin) / 0.75).round(2),0)%></td>
		</tr>
		<tr>
			<td width='20%' bgcolor='red'><b>G / 20</b></td>
			<td width='30%'align='right'><%=if(prod_item.Unit_Price > 0,(prod_item.Unit_Price * margin_map.get(prod_item.Margin) / 0.80).round(2),0)%></td>
		</tr>		
		</table>
<%
		}
		if(!extraProduct.contains(prod_item.Product_Name))
		{
			extraProduct.add(prod_item.Product_Name);
			for each  a in Extras[Quotation_ID == QuoteInfoCreator.ID && Product == prod_item.Product_Name && Prix_total > 0]
			{
				quantit = if(a.Quantit == null || a.Quantit == 0,0,a.Quantit);
				net = a.Prix_co_tant.round(4);
				extra_st = (quantit * net).round(2);
				Extra_Prix = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / margin_map.get(a.Margin_B)).round(2),0);
				Extra_Coutant = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant)).round(2),0);
				Extra_prof = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / margin_map.get(a.Margin_B)).round(2),0);
				Extra_Profit = (quantit * Extra_prof).round(2);
				%>
<table width='500px' height='50'><tr><td bgcolor='black' valign='center' >
		<b><div align='center'>
		<font size='5' color="white">Prix vendu : <%=Extra_Prix%>$ * <%=quantit%> = <%=Extra_Prix * quantit%>$   </font><br>
		<font size='5' color="white">Coutant : <%=Extra_Coutant%>$ * <%=quantit%> = <%=Extra_Coutant * quantit%>$</font><br>
		<font size='5' color="white">Profit :  <%=Extra_Profit%>$  - <%=Extra_Coutant * quantit%>$ =  <%=Extra_Profit - Extra_Coutant * quantit%>$</font>
	
		</div></b>
		
		</td></tr></table>
		
		<table border='1' width='500'>
		<tr>
		<td width='20%' bgcolor='gainsboro'> </td>
		<td width='30%'align='right' bgcolor='gainsboro'><b>Prix unitaire suggéré</b></td>
		<!--<td width='30%'align='right' bgcolor='gainsboro'><b>Profit</b></td>
		<td width='20%'align='right' bgcolor='gainsboro'><b>Bénéfice total</b></td>-->
		</tr>
		
	
		<tr>
			<td width='20%' bgcolor='lawngreen'><b>A / 50</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.50).round(2),0)%></td>
		</tr>
		
		
		<tr>
			<td width='20%' bgcolor='lawngreen'><b>B / 45</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.55).round(2),0)%></td>
		</tr>
		
		<tr>
			<td width='20%' bgcolor='orange'><b>C / 40</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.60).round(2),0)%></td>
		</tr>		
		<tr>
			<td width='20%' bgcolor='orange'><b>D / 35</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.65).round(2),0)%></td>
		</tr>
		<tr>
			<td width='20%' bgcolor='yellow'><b>E / 30</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.70).round(2),0)%></td>
		</tr>
		<tr>
			<td width='20%' bgcolor='yellow'><b>F / 25</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.75).round(2),0)%></td>
		</tr>
		<tr>
			<td width='20%' bgcolor='red'><b>G / 20</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.80).round(2),0)%></td>
		</tr>
		
		</table>
<%
			}
		}
		%>
</div>
<%
	}

}%>