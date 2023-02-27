Unit_Price = ZDK.Page.getField("Unit_Price").getValue();
log(Unit_Price);
Qty = ZDK.Page.getField("Quantity").getValue();
log(Unit_Price);
if(Unit_Price != null && Qty != null )
{  
    ZDK.Page.getField("Net_Price").setValue(Unit_Price*Qty);
}
if(Unit_Price == null && Qty == null)
{
     ZDK.Page.getField("Net_Price").setValue(null);
}
if(Unit_Price == null && Qty != null)
{
    ZDK.Page.getField("Net_Price").setValue(null);
}

