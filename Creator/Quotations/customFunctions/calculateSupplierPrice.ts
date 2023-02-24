float creator.calculateSupplierPrice(float Unit_Price, string Margin)
{
	supplierPrice = 0;
	//margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
	margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1};
	if(Unit_Price != null && Margin != null)
	{
		supplierPrice = (Unit_Price * margin_map.get(Margin)).round(2);
	}
	return supplierPrice;
}