<%{
	QuoteInfoCreator = Quotations[ID == CreatorQuoteID.toLong()];
	QuoteItemsCreator = Quotation_Items[Quotation_ID == CreatorQuoteID.toLong()];
	margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
	//margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
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
		overAll_profitPercent = 0;
		itemCount = 0;
		customTotal = 0;
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
				//productSellerPriceWithMargin = productSellerPrice + " " + "(" + prod_item.Margin + ")";
				productSellerPriceWithMargin = productSellerPrice;
				productPriceWithMargin = prod_item.Unit_Price + " ";
				MarginPinkColor = "(" + prod_item.Margin + ")";
				PrixNet = (prod_item.Unit_Price * margin_map.get(prod_item.Margin) / margin_map.get(prod_item.Margin_B)).round(2);
				netVal = " " + "(" + prod_item.Margin_B + ")";
				if(prod_item.Custom_Pix_Unitaire != null)
				{
					CustomNet = prod_item.Custom_Pix_Unitaire;
					net = prod_item.Custom_Pix_Unitaire;
					customTotal = customTotal + prod_item.Custom_Pix_Unitaire;
				}
				else
				{
					CustomNet = "-";
					net = PrixNet;
				}
			}
		}
		quantity = if(prod_item.Quantity == null || prod_item.Quantity == 0,0,prod_item.Quantity);
		prodUnitPrice = if(prod_item.Unit_Price == null || prod_item.Unit_Price == 0,0,prod_item.Unit_Price);
		if(quantity != 0 && prodUnitPrice != 0)
		{
			productSellerPriceWithQty = productSellerPrice * quantity;
			st = (quantity * net).round(2);
			gt = st;
			prodProfit = net - prodUnitPrice;
			netUnitPrice = prodUnitPrice;
			unitaire = (gt / quantity).round(2);
			/*prodNetTotal = prodProfit * quantity;*/
			prodNetTotal = prod_item.Total - productSellerPrice * quantity;
			prodCostPriceTotal = (prodUnitPrice * quantity).round(2);
			/*prodProfitPercentage = if(prodNetTotal > 0,(prodNetTotal / st * 100).round(0),0);*/
			//prodProfitPercentage = if(prodNetTotal > 0,((prodNetTotal * 100) / st).round(0),0);
			prodProfitPercentage = ((prodNetTotal * 100) / st).round(0);
			prodNetVal = PrixNet;
			if(prodNetTotal > 0)
			{
				ProdprofitTotal = prodNetTotal;
			}
			else
			{
				ProdprofitTotal = 0;
			}
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
<style>
.pane_nav .pane_nav_menu ul {
  
    display: none;
}
</style>
<div align='center'>

	<br>
<%
		if(prod_item.Product_Name != null)
		{
			prodName = if(prod_item.Product_Name.Product_Name.contains("-NP"),prod_item.Product_Name.Product_Name.getPrefix("-NP"),prod_item.Product_Name.Product_Name);
			//Old Line			prodName = if(prodName.contains("["),prodName.getPrefix("["),prodName);
			prodName = if(prodName.contains("["),prodName.getSuffix("]"),prodName);
			%>
<h2><%=prodName%></h2>
<%
		}
		%>
<table border='1'>
	<tr>
	<td width='200px' bgcolor='gainsboro'><b>Produit</b></td>
	<td width='50px' align='right' bgcolor='gainsboro'><b>Quantité</b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>Prix Catalogue</b></td>
	<!--<td width='100px' align='right' bgcolor='gainsboro'><b>Margin</b></td>-->
	<td width='100px' align='right' bgcolor='gainsboro'><b>Prix Net </b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>Vendant par item</b></td>	
	<td width='100px' align='right' bgcolor='gainsboro'><b>Custom Prix</b></td>
	<td width='100px' align='right' bgcolor='gainsboro'><b>sous total vendu</b></td>
<%
		// 		if(zoho.loginuserid == "gabrielle@publicitemaca.ca" || zoho.loginuserid == "caroline@publicitemaca.ca" || zoho.loginuserid == "tanya@macamarketing.com")
		// 		{
		%>
<!---<td width='100px' align='right' bgcolor='gainsboro'><b>Profit Total</b></td>-->
	<td width='100px' align='right' bgcolor='gainsboro'><b>Total Profit Percentage</b></td>
<%
		// 		}
		%>
</tr>
	<tr>
		<td><%=prodName%></td>
		<td align='right'><%=quantity%></td>
<%
		itemQtyForNewCal = quantity;
		%>
<td align='right' ><%=productPriceWithMargin%><span><%=MarginPinkColor%></span></td>
        <td align='right'><%=productSellerPriceWithMargin%></td> 
		<td align='right'><%=PrixNet%><%=netVal%></td>
		<td align='right'><%=CustomNet%></td>
		<td align='right'><%=st%></td>
<%
		// 		if(zoho.loginuserid == "gabrielle@publicitemaca.ca" || zoho.loginuserid == "caroline@publicitemaca.ca" || zoho.loginuserid == "tanya@macamarketing.com")
		// 		{
		%>
<!----<td align='right'><%=ProdprofitTotal%></td>--->
		<td align='right'><%=prodProfitPercentage%> %</td>
<%
		// 		}
		if(prodProfitPercentage != 0)
		{
			overAll_profitPercent = overAll_profitPercent + prodProfitPercentage;
			itemCount = itemCount + 1;
		}
		%>
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
		livItem = 0;
		GraphismeItem = 0;
		ManutentionItem = 0;
		test = list();
		detuctionAmount1 = 0;
		detuctionAmount2 = 0;
		detuctionAmount3 = 0;
		// 		if(!productMap.contains(prod_item.Product_Name))
		// 		{
		productMap.add(prod_item.Product_Name);
		totalextraSellerPrice = 0;
		for each  a in Extras[Quotation_ID == QuoteInfoCreator.ID && Sequence_No == prod_item.ID]
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
					extraSellerPriceWithQty = extraSellerPrice * extraQuantity;
					totalextraSellerPrice = totalextraSellerPrice + extraSellerPriceWithQty;
					//extraSellerPricewithmargin = extraSellerPrice + " " + "(" + a.Code_co_tant + ")";
					extraSellerPricewithmargin = extraSellerPrice;
					extraPriceWithMargin = a.Prix_co_tant + " ";
					extraMarginPinkColor = "(" + a.Code_co_tant + ")";
					PrixextraNet = (a.Prix_co_tant * margin_map.get(a.Code_co_tant) / margin_map.get(a.Margin_B)).round(2);
					extraNetVal = " " + "(" + a.Margin_B + ")";
				}
				if(a.Custom_Pix_Unitaire != null)
				{
					extraCustom = a.Custom_Pix_Unitaire;
					customTotal = customTotal + a.Custom_Pix_Unitaire;
					extraNet = a.Custom_Pix_Unitaire;
				}
				else
				{
					extraCustom = "-";
					extraNet = PrixextraNet;
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
				extraNetValue = extraNetValue + PrixextraNet;
				ExtraprofitTotal = 0;
				if(ext > 0)
				{
					ExtraprofitTotal = ext;
				}
				else
				{
					ExtraprofitTotal = 0;
				}
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
			ExtraProdName = if(a.Product.Product_Name.contains("-NP"),a.Product.Product_Name.getPrefix("-NP"),a.Product.Product_Name);
			//Old Line			ExtraProdName = if(ExtraProdName.contains("["),ExtraProdName.getPrefix("["),ExtraProdName);
			ExtraProdName = if(ExtraProdName.contains("["),ExtraProdName.getSuffix("]"),ExtraProdName);
			%>
<tr>
		<td><%=ExtraProdName%></td>
<%
			if(ExtraProdName.contains("Livraison estimée"))
			{
				livItem = 1;
				LivPrice = if(extraCostPrice != null,extraCostPrice,0);
				LivQty = if(a.Quantit != null,a.Quantit,0);
				detuctionAmount1 = LivPrice * LivQty;
			}
			if(ExtraProdName.contains("Manutention"))
			{
				ManutentionItem = 1;
				ManutentionPrice = if(extraCostPrice != null,extraCostPrice,0);
				ManutentionQty = if(a.Quantit != null,a.Quantit,0);
				detuctionAmount2 = ManutentionPrice * ManutentionQty;
			}
			if(ExtraProdName.contains("Graphisme"))
			{
				GraphismeItem = 1;
				GraphismePrice = if(extraCostPrice != null,extraCostPrice,0);
				GraphismeQty = if(a.Quantit != null,a.Quantit,0);
				detuctionAmount3 = GraphismePrice * GraphismeQty;
			}
			%>
<td align='right'><%=a.Quantit%></td>
		<td align='right'><%=extraPriceWithMargin%><span><%=extraMarginPinkColor%></span></td>
		<td align='right'><%=extraSellerPricewithmargin%></td>
		<td align='right'><%=PrixextraNet%><%=extraNetVal%></td>
		<td align='right'><%=extraCustom%></td>
		<td align='right'><%=extra_st%></td>
<%
			// 			if(zoho.loginuserid == "gabrielle@publicitemaca.ca" || zoho.loginuserid == "caroline@publicitemaca.ca" || zoho.loginuserid == "tanya@macamarketing.com")
			// 			{
			%>
<!---<td align='right'><%=ExtraprofitTotal%></td>--->
		<td align='right'><%=extraProfitPercentage%> %</td>
<%
			if(extraProfitPercentage != 0)
			{
				if(!ExtraProdName.contains("Livraison estimée"))
				{
					overAll_profitPercent = overAll_profitPercent + extraProfitPercentage;
					itemCount = itemCount + 1;
				}
			}
			// 			}
			%>
</tr>
<%
		}
		// 		}
		gt = gt + extraSubTotal;
		netTotal = extraNetTotal + prodNetTotal;
		totalNetVal = extraNetValue + prodNetVal;
		totalNetProfit = prodProfit + profitTotal;
		netCostPriceTotal = totalCost + prodCostPriceTotal;
		// 		unitaire = (gt / prod_item.Quantity).round(2);
		/*netProfitPercentage = if(netTotal > 0,(netTotal / gt * 100).round(0),0);*/
		netProfitPercentage = if(netTotal > 0,(netTotal * 100 / gt).round(0),0);
		totalSellerPrice = productSellerPriceWithQty + totalextraSellerPrice;
		Overall_Profit = (overAll_profitPercent / itemCount).round(0);
		%>
<tr>
		<td align='right'>Total </td>
		<td align='right'> </td>
		<!---<td align='right'><%=netUnitPrice%></td>--->
		<td align='right'></td>
		<td align='right'><%=totalSellerPrice%></td>
		<!---<td align='right'><%=totalNetVal%></td>---->
		<td align='right'></td>
		<!---<td align='right'><%=customTotal%></td>--->
		<td align='right'></td>
		<td align='right'><%=gt%></td>
<%
		// 		if(zoho.loginuserid == "gabrielle@publicitemaca.ca" || zoho.loginuserid == "caroline@publicitemaca.ca" || zoho.loginuserid == "tanya@macamarketing.com")
		// 		{
		%>
<!---<td align='right'><%=netTotal%></td>--->
		<!---<td align='right'>****<%=netProfitPercentage%> %</td>--->
		<td align='right'><%=Overall_Profit%>% </td>
<%
		// 		}
		%>
</tr>

	</table>
	<p><%=tempImage1%><%=tempImage2%></p>
<br><br>
<%
		if(prodUnitPrice > 0)
		{
			if(livItem == 1 || ManutentionItem == 1 || GraphismeItem = 1)
			{
				totalDetuctionAmount = detuctionAmount1 + detuctionAmount2 + detuctionAmount3;
				ProdDetPrice = totalSellerPrice - totalDetuctionAmount;
				fProdLivPrice = ProdDetPrice / itemQtyForNewCal;
				FItemPrice = fProdLivPrice.round(2);
			}
			else
			{
				FItemPrice = prod_item.Unit_Price;
			}
			margin = Map();
			marginvalue1 = Map();
			Amount_a = if(FItemPrice > 0,(FItemPrice / 0.50).round(2),0);
			margin.put(Amount_a,"A");
			marginvalue1.put("A",Amount_a);
			Amount_b = if(FItemPrice > 0,(FItemPrice / 0.55).round(2),0);
			margin.put(Amount_b,"B");
			marginvalue1.put("B",Amount_b);
			Amount_c = if(FItemPrice > 0,(FItemPrice / 0.60).round(2),0);
			margin.put(Amount_c,"C");
			marginvalue1.put("C",Amount_c);
			Amount_d = if(FItemPrice > 0,(FItemPrice / 0.65).round(2),0);
			margin.put(Amount_d,"D");
			marginvalue1.put("D",Amount_d);
			Amount_e = if(FItemPrice > 0,(FItemPrice / 0.70).round(2),0);
			margin.put(Amount_e,"E");
			marginvalue1.put("E",Amount_e);
			Amount_f = if(FItemPrice > 0,(FItemPrice / 0.75).round(2),0);
			margin.put(Amount_f,"F");
			marginvalue1.put("F",Amount_f);
			Amount_g = if(FItemPrice > 0,(FItemPrice / 0.80).round(2),0);
			margin.put(Amount_g,"G");
			marginvalue1.put("G",Amount_g);
			Amount_h = if(FItemPrice > 0,(FItemPrice / 0.81).round(2),0);
			margin.put(Amount_h,"H");
			marginvalue1.put("H",Amount_h);
			Amount_x = if(FItemPrice > 0,(FItemPrice / 1).round(2),0);
			margin.put(Amount_x,"X");
			marginvalue1.put("X",Amount_x);
			//Color Code
			marginColor = Map();
			marginColor.put(Amount_a,"lawngreen");
			marginColor.put(Amount_b,"lawngreen");
			marginColor.put(Amount_c,"orange");
			marginColor.put(Amount_d,"orange");
			marginColor.put(Amount_e,"yellow");
			marginColor.put(Amount_f,"yellow");
			marginColor.put(Amount_g,"red");
			marginColor.put(Amount_h,"red");
			marginColor.put(Amount_x,"white");
			%>
<table width='500px' height='50'><tr><td bgcolor='black' valign='center' >
		<b><div align='center'>
<%
			if(prod_item.Custom_Pix_Unitaire != null)
			{
				lessvalue = List();
				for each  catalog in marginvalue1
				{
					if(catalog <= prod_item.Custom_Pix_Unitaire)
					{
						lessvalue.add(catalog);
					}
				}
				valuemap = {1:"X",2:"H",3:"G",4:"F",5:"E",6:"D",7:"C",8:"B",9:"A"};
				lastlesser = lessvalue.size();
				getMarginval_Alpha = valuemap.get(lastlesser);
				getmarginVal_Int = marginvalue1.get(getMarginval_Alpha);
				if(getmarginVal_Int == prod_item.Custom_Pix_Unitaire)
				{
					margVariable = getMarginval_Alpha;
				}
				else
				{
					margVariable = getMarginval_Alpha + "+";
				}
				%>
<font size='5' color='white'>Custom Prix: <%=prod_item.Custom_Pix_Unitaire%>$ (<%=margVariable%>)</font><br>
<%
			}
			else
			{
				livNet = FItemPrice;
				%>
<font size='5' color=<%=marginColor.get(livNet)%> > Prix vendu : <%=livNet%>$ (<%=margin.get(livNet)%>)</font><br>
<%
			}
			%>
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
			<td width='30%'align='right'><%=Amount_a%></td>
        </tr>
		<tr>
            <td width='20%' bgcolor='lawngreen'><b>B / 45</b></td>
            <td width='30%'align='right'><%=Amount_b%></td>
        </tr>
        <tr>
            <td width='20%' bgcolor='orange'><b>C / 40</b></td>
            <td width='30%'align='right'><%=Amount_c%></td>
        </tr>       
        <tr>
            <td width='20%' bgcolor='orange'><b>D / 35</b></td>
            <td width='30%'align='right'><%=Amount_d%></td>
        </tr>
        <tr>
            <td width='20%' bgcolor='yellow'><b>E / 30</b></td>
            <td width='30%'align='right'><%=Amount_e%></td>
        </tr>
        <tr>
            <td width='20%' bgcolor='yellow'><b>F / 25</b></td>
            <td width='30%'align='right'><%=Amount_f%></td>
        </tr>
        <tr>
            <td width='20%' bgcolor='red'><b>G / 20</b></td>
            <td width='30%'align='right'><%=Amount_g%></td>
        </tr> 
		<tr>
            <td width='20%' bgcolor='red'><b>H / 15</b></td>
            <td width='30%'align='right'><%=Amount_h%></td>
        </tr>
		<tr>
            <td width='20%' bgcolor='white'><b>X / 1</b></td>
            <td width='30%'align='right'><%=Amount_x%></td>
        </tr>
		
		</table>
<%
		}
		//<%=if(prod_item.Custom_Pix_Unitaire != null,(a.Custom_Pix_Unitaire / 1).round(2),"-")%>
		// 		if(!extraProduct.contains(prod_item.Product_Name))
		// 		{
		extraProduct.add(prod_item.Product_Name);
		Display = "True";
		if(Display == "False")
		{
			for each  a in Extras[Quotation_ID == QuoteInfoCreator.ID && Sequence_No == prod_item.ID]
			{
				quantit = if(a.Quantit == null || a.Quantit == 0,0,a.Quantit);
				net = a.Prix_co_tant.round(4);
				extra_st = (quantit * net).round(2);
				Extra_Prix = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / margin_map.get(a.Margin_B)).round(2),0);
				Extra_Coutant = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant)).round(2),0);
				Extra_prof = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / margin_map.get(a.Margin_B)).round(2),0);
				Extra_Profit = (quantit * Extra_prof).round(2);
				Extrasmargin = Map();
				Amount_a = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.50).round(2),0);
				Extrasmargin.put(Amount_a,"A");
				Amount_b = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.55).round(2),0);
				Extrasmargin.put(Amount_b,"B");
				Amount_c = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.60).round(2),0);
				Extrasmargin.put(Amount_c,"C");
				Amount_d = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.65).round(2),0);
				Extrasmargin.put(Amount_d,"D");
				Amount_e = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.70).round(2),0);
				Extrasmargin.put(Amount_e,"E");
				Amount_f = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.75).round(2),0);
				Extrasmargin.put(Amount_f,"F");
				Amount_g = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.80).round(2),0);
				Extrasmargin.put(Amount_g,"G");
				Amount_h = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.81).round(2),0);
				Extrasmargin.put(Amount_h,"H");
				Amount_x = if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 1).round(2),0);
				Extrasmargin.put(Amount_x,"X");
				//Color Code
				marginColor = Map();
				marginColor.put(Amount_a,"lawngreen");
				marginColor.put(Amount_b,"lawngreen");
				marginColor.put(Amount_c,"orange");
				marginColor.put(Amount_d,"orange");
				marginColor.put(Amount_e,"yellow");
				marginColor.put(Amount_f,"yellow");
				marginColor.put(Amount_g,"red");
				marginColor.put(Amount_h,"red");
				marginColor.put(Amount_x,"white");
				if(a.Custom_Pix_Unitaire != 0)
				{
					%>
<table width='500px' height='50'><tr><td bgcolor='black' valign='center' >
		<b><div align='center'>
<%
					if(a.Custom_Pix_Unitaire != null)
					{
						%>
<font size='5' color='white'>Custom Prix: <%=a.Custom_Pix_Unitaire%>$</font><br>
<%
					}
					else
					{
						%>
<font size='5' color=<%=marginColor.get(Extra_Prix)%> >Extras - Prix vendu : <%=Extra_Prix%>$ (<%=Extrasmargin.get(Extra_Prix)%>)</font><br>
<%
					}
					%>
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
		<tr>
			<td width='20%' bgcolor='red'><b>H / 15</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 0.81).round(2),0)%></td>
		</tr>
		<tr>
			<td width='20%' bgcolor='white'><b>X / 1</b></td>
			<td width='30%'align='right'><%=if(a.Prix_co_tant > 0,(a.Prix_co_tant * margin_map.get(a.Code_co_tant) / 1).round(2),0)%></td>
		</tr>
		<tr>
            <td width='20%' bgcolor='white'><b>Custom Prix</b></td>
            <td width='30%'align='right'><%=if(a.Custom_Pix_Unitaire != null,(a.Custom_Pix_Unitaire / 1).round(2),"-")%></td>
        </tr>
		</table>
<%
				}
			}
		}
		// 		}
		%>
</div>
<%
	}
	// <tr>
	// 		<%
	// 			custPrix = if(prod_item.Custom_Pix_Unitaire != null,(prod_item.Custom_Pix_Unitaire / 1).round(2),"-");
	// 			if(prod_item.Custom_Pix_Unitaire > 0)
	// 			{
	// 				%>
	// <td width='20%' bgcolor='white'><b>Custom Prix</b></td>
	//             <td width='30%'align='right'><%=custPrix%></td>
	// <%
	// 			}
	// 			%>
	// </tr>

}%>