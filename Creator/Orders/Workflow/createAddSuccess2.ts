QuoteProd = Quotation_Items[Quotation_ID == input.Quotation_ID.toLong()];
//alert QuoteProd;
QuoteExtras = Extras[Quotation_ID == input.Quotation_ID.toLong()];
//alert QuoteExtras ;
for each  item in input.Line_Items
{
	// 	if(item.Sequence_No == "" || item.Sequence_No == null)
	// 	{
	for each  Qprod in QuoteProd
	{
		if(Qprod.Product_Name == item.Product)
		{
			item.Sequence_No=Qprod.Sequence_No;
			item.Upload_Image=Qprod.Upload_Image;
			item.Upload_Image_2=Qprod.Upload_Image_2;
			item.Image_URL=Qprod.Image_URL;
			item.Image_URL_2=Qprod.Image_URL_2;
		}
	}
	// 	}
}
// for each  ExtraItem in input.Order_Extra_Items
// {
// 	if(ExtraItem.S_No1234 == "" || ExtraItem.S_No1234 == null)
// 	{
// 		for each  QExtra in QuoteExtras
// 		{
// 			if(QExtra.Product == ExtraItem.Product)
// 			{
// 				ExtraItem.S_No1234=QExtra.Seq_No_New;
// 				for each  item in input.Line_Items
// 				{
// 					if(item.Sequence_No == ExtraItem.S_No1234)
// 					{
// 						ExtraItem.Sequence_No=item.ID;
// 						// Sequence_No look up(from Line item ) mapping
// 					}
// 				}
// 			}
// 		}
// 	}
// }
