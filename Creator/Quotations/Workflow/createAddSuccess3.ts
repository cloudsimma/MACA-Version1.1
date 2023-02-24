// if(input.Extras.count() > 0)
// {
// 	for each  row in input.Extras
// 	{
// 		if(row.S_No != "")
// 		{
// 			row.Sequence_No=Quotation_Items[Quotation_ID == input.ID && Sequence_No == row.S_No].ID;
// 		}
// 	}
// }
if(input.Extras.count() > 0)
{
	for each  row in input.Extras
	{
		row.Sequence_No=Quotation_Items[Quotation_ID == input.ID && Sequence_No == row.Seq_No_New].ID;
	}
}
