Unit_Price = ZDK.Page.getField("Unit_Price").getValue();
log(Unit_Price);
// Qty = ZDK.Page.getField("Quantity").getValue();
// log(Unit_Price);
// if(Unit_Price != null && Qty != null )
// {  
//     ZDK.Page.getField("Net_Price").setValue(Unit_Price*Qty);
// }
// if(Unit_Price == null && Qty == null)
// {
//      ZDK.Page.getField("Net_Price").setValue(null);
// }
// if(Unit_Price == null && Qty != null)
// {
//     ZDK.Page.getField("Net_Price").setValue(null);
// }


Discount = ZDK.Page.getField("Code_escompte").getValue();
log(Discount);
if(Unit_Price != null && Discount != null )
{
   // margin_map = {"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.81,"I":0.82,"J":0.83,"K":0.84,"L":0.85,"X":1};
   if(Discount == "A")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.5);
   }
   if(Discount == "B")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.55);
   }
   if(Discount == "C")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.60);
   }
   if(Discount == "D")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.65);
   }
   if(Discount == "E")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.70);
   }
   if(Discount == "F")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.75);
   }
   if(Discount == "G")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.80);
   }
   if(Discount == "H")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.81);
   }
   if(Discount == "I")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.82);
   }
   if(Discount == "J")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.83);
   }
   if(Discount == "K")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.84);
   }
   if(Discount == "L")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*0.85);
   }
   if(Discount == "X")
   {
       ZDK.Page.getField("Net_Price").setValue(Unit_Price*1);
   }
}
if(Unit_Price == null && Discount == null)
{
     ZDK.Page.getField("Net_Price").setValue(null);
}
if(Unit_Price != null && Discount == null)
{
    ZDK.Page.getField("Net_Price").setValue(Unit_Price);
}
