<%{
	//boxCount = "2";
	if(input.boxCount != "")
	{
		box_count = boxCount.tolong();
		if(box_count == 1)
		{
			boxheight = "100vh";
		}
		else
		{
			boxheight1 = 567 * box_count;
			boxheight = boxheight1 + "px";
		}
	}
	else
	{
		box_count = 1;
		boxheight = "100vh";
	}
	boxList1 = thisapp.ListGeneration.generate_list(box_count.toLong(),{});
	boxList = boxList1.sort(true);
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
		GetCRMRec = zoho.crm.getRecordById("Orders_New",OrderID.toLong());
		ContactID = GetCRMRec.get("Contact_Name").get("id");
		GetContact = zoho.crm.getRecordById("Contacts",ContactID.toLong());
		GetDate = GetCRMRec.get("Customer_delivery_date");
		if(GetDate != null)
		{
			EntryDate = GetDate.todate();
			day = EntryDate.day();
			month = EntryDate.month();
			year = EntryDate.year();
			DateFrenchMap = {"1":"Janvier","2":"Février","3":"Mars","4":"Avril","5":"Mai","6":"Juin","7":"Juillet","8":"Août","9":"Septembre","10":"Octobre","11":"Novembre","12":"Décembre"};
			test = month.tostring();
			getData = DateFrenchMap.get(test);
			//info getData;
			FrenchDate = getData + " " + year;
			//order_map.put("French_Order_Date",FrenchDate);
		}
		else
		{
			FrenchDate = "";
		}
	}
	%>
<style>
.main_div_center
{
	//padding:10px 0;
	//height:576px;
	width:440px;
	margin:auto;
}
td,th
{
	border: 1px solid #fff;
	padding:3px;
}
table
{
	border-collapse: collapse;
}
@media print {
	 html, body {
      height:<%=boxheight%>; 
      overflow: hidden;
    }
	 .pagebreak { page-break-after: always; } /* page-break-after works, as well */ //page-break-before
// 	 @page { 
// 		size: auto;
// 		margin: 0mm 0 0mm 0;
// 		border: 2px solid;
//     }
	@page { 
		//size: A6;
		margin: 0mm 0 0mm 0;
    }
	.main_div_center
	{
	   height:567px;
	   width:378px;
	   margin:auto;
	}
	
// 	.main_div_center
// 	{
// 	   height:576px;
// 	   width:440px;
// 	   margin:0px;
// 	   Padding:10%;
// 	}
// 	.product-item-table{
// 	width:600px;
// 	background-color: #ddd;
// 	border:none	
// 	}
}
.adress{
	font-size: 15px;
    font-weight: bold;
     padding: 2px 0px;
}
.Clientadress{
	font-size: 15px;
     padding: 1px 0px;
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
width:100%;
background-color: #ddd;
border:none	
}
</style>
<body>
<%
	a = 0;
	for each  Boxrec in boxList
	{
		a = a + 1;
		if(Boxrec <= box_count)
		{
			//page-break-after:always;
			%>
<div class="main_div_center" style="border: 1px solid #edeef0;">
<table class="address-section">
	  <tr>
	   <td style="width: 40%; text-align: center;">
	   <img src=<%=logoURL%> width="160px" height="80px"></img>
	   </td>
	   </tr>
	   <tr>
	    <td style="width: 50%;margin-top:3px;text-align: center;">
		   <div class="adress" style="font-size:15px;">825,Boul,Lebourgneuf, Porte 117</div>
		   <div class="adress" style="font-size:15px;">Quebec QC G2J 0B9</div>
		   <div class="adress" style="font-size:15px;">418-628-6222 | 1-800-665-6220</div>
	   </td>
	  </tr>
	</table> 
	<br>
	<table>
	  <tr style="border: 1px solid black;">
	   <td style="width: 40%;">
	<h3 style="margin: 0%;">#Maca : <%=orderrec.Order_No%></h3>
	<h3 style="margin: 0%;">Objet : <%=GetCRMRec.get("Name")%></h3>
<%
			if(GetCRMRec.get("Delivery_Contact") != null && GetCRMRec.get("Delivery_Contact") != "")
			{
				%>
<h3 style="margin: 0%;">ATT/#Order client : <%=GetCRMRec.get("Delivery_Contact")%> </h3>
<%
			}
			%>
<br>
<p class="adress" style="margin: 0%; font-size: 20px;font-family:Sans-serif;"> <%=GetCRMRec.get("Company_Name").get("name")%> </p>
<p class="Clientadress" style="margin: 0%; font-size: large;"> <%=GetCRMRec.get("Contact_Name").get("name")%></p>
	<p class="Clientadress" style="margin: 0%; font-size: large;"> <%=GetCRMRec.get("Delivery_street")%><br>
<%
			if(GetCRMRec.get("City_of_delivery") != "" && GetCRMRec.get("City_of_delivery") != null)
			{
				%>
<%=GetCRMRec.get("City_of_delivery")%>,<%=" "%><br>
<%
			}
			if(GetCRMRec.get("Delivery_region") != "" && GetCRMRec.get("Delivery_region") != null)
			{
				%>
<%=GetCRMRec.get("Delivery_region")%>,<%=" "%>
<%
			}
			if(GetCRMRec.get("Postal_code_of_delivery") != "" && GetCRMRec.get("Postal_code_of_delivery") != "")
			{
				%>
<%=GetCRMRec.get("Postal_code_of_delivery")%>
<%
			}
			%>
</p>
</td>
	  </tr>
	</table>
	<br>
	<table class="address-section" style="width:80%">
	<tr>
	<!-- <td style="width: 75%;">#PO Client: <%=orderrec.Order_No%></td> -->
	  <td style="font-weight: bold;font-size:22px;text-align: right;"><%=Boxrec%> de <%=box_count%></td>
	<tr>
	</table>
</div>
</body>
<%
		}
	}

}%>