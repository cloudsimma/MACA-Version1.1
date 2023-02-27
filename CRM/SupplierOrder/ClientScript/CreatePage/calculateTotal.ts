
var prodItems = ZDK.Page.getField("Purchased_items").getValue();
var prodExtras = ZDK.Page.getField("Extras_Item").getValue(); 
console.log(quotesdet);
console.log(quotesItem);

var ItemTotal_Amount = 0;
for (var j = 0; j < prodItems.length; j++)
{
    if (prodItems[j].Amount_CA != null)
    {
        var ItemTotal_Amount = ItemTotal_Amount + prodItems[j].Amount_CA;
        console.log(ItemTotal_Amount);
    }
   
}
//Extras Total Calculation
var ExtrasTotal_Amount = 0;
for (var i = 0; i < prodExtras.length; i++)
{
   if (prodItems[i].Total_Amount != null)
    {
        var ItemTotal_Amount = ItemTotal_Amount + prodItems[i].Total_Amount ;
        console.log(ItemTotal_Amount);
    }
}
 //Final grand Total
Total = ItemTotal_Amount + ExtrasTotal_Amount
var upd = ZDK.Page.getForm().setValues({'Total_Amount': Total}, {'Calculate_Total':false}); 
