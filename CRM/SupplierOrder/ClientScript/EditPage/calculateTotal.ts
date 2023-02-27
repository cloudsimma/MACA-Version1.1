
var prodItems = ZDK.Page.getField("Purchased_items").getValue();
var prodExtras = ZDK.Page.getField("Extras_Item").getValue(); 

var ItemTotal_Amount = 0;
for (var j = 0; j < prodItems.length; j++)
{
    console.log("hiii");

    if (prodItems[j].Amount_CA != null)
    {
        console.log("hiiiiiii");
        var ItemTotal_Amount = ItemTotal_Amount + prodItems[j].Amount_CA;
        console.log(ItemTotal_Amount);
    }
   
}
//Extras Total Calculation
var ExtrasTotal_Amount = 0;
for (var i = 0; i < prodExtras.length; i++)
{
    console.log(prodExtras[i].Total_Amount);

   if (prodExtras[i].Total_Amount != null)
    {
        console.log("Ehiiiiii");
        var ExtrasTotal_Amount = ExtrasTotal_Amount + prodExtras[i].Total_Amount;
        console.log(ExtrasTotal_Amount);
    }
}
 //Final grand Total
Total = ItemTotal_Amount + ExtrasTotal_Amount
var upd = ZDK.Page.getForm().setValues({'Total_Amount': Total,'Calculate_Total':false}); 
