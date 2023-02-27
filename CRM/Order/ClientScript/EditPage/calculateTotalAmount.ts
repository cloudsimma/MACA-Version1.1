
var prodItems = ZDK.Page.getField("Items_ordered").getValue();
var prodExtras = ZDK.Page.getField("Extra_Item").getValue(); 
console.log(prodItems);
console.log(prodExtras);

//mapping Discount value
var margin_map = '{ "A": 0.5, "B": 0.55, "C": 0.60, "D": 0.65, "E": 0.70,"F": 0.75, "G": 0.80, "H": 0.81, "I": 0.82, "J": 0.83, "K": 0.84, "L": 0.85, "X": 1 }';
var marginmp = JSON.parse(margin_map);
let lineItemsPayload = [];
let lineExtrasPayload = [];
//Item Total Calculation
var ItemTotal_Amount = 0;
for (var j = 0; j < prodItems.length; j++)
{
    var Prix_Total = (prodItems[j].Rate * marginmp[prodItems[j].Margin_A] / marginmp[prodItems[j].Margin_B]).toFixed(2);
    disTotalItem = (prodItems[j].Rate * marginmp[prodItems[j].Margin_A] / marginmp[prodItems[j].Margin_B]).toFixed(2);
    if (prodItems[j].Custom_Pix_Unit_CA != null)
    {
        var ItemTotal_Amount = ItemTotal_Amount + prodItems[j].Quantity * prodItems[j].Custom_Pix_Unit_CA;
        lineamount = prodItems[j].Quantity * prodItems[j].Custom_Pix_Unit_CA;
        CustomPixUnitaire = prodItems[j].Custom_Pix_Unit_CA;
        console.log(ItemTotal_Amount);
    }
    else
    {
        var ItemTotal_Amount = ItemTotal_Amount + prodItems[j].Quantity * Prix_Total;
         lineamount = prodItems[j].Quantity * Prix_Total;
         console.log("ItemTotal_Amount " + ItemTotal_Amount);
    }
    //Collect Sub Form Data
      lineItem = {
        "id": prodItems[j].id,
        "Total_CA": disTotalItem,
        "Total_Amount": lineamount
    };

        lineItemsPayload.push(lineItem);
}
ZDK.Page.getField('Items_ordered').setValue(lineItemsPayload);

//Extras Total Calculation
var ExtrasTotal_Amount = 0;
console.log("prodExtras.length :" + prodExtras.length);
for (var i = 0; i < prodExtras.length; i++)
{
    console.log("prodExtras[i].Unit_Price" + prodExtras[i].Unit_Price);
    var Prix_Total = (prodExtras[i].Unit_Price * marginmp[prodExtras[i].Margin_A] / marginmp[prodExtras[i].Margin_B]).toFixed(2);
    disTotalExtras = (prodExtras[i].Unit_Price * marginmp[prodExtras[i].Margin_A] / marginmp[prodExtras[i].Margin_B]).toFixed(2);
    console.log("Prix_Total" + Prix_Total);
    if (prodExtras[i].Custom_Pix_Unit_CA != null)
    {
        console.log("calculation custom" + prodExtras[i].Quantity * prodExtras[i].Custom_Pix_Unit_CA);
        var ExtrasTotal_Amount = ExtrasTotal_Amount + prodExtras[i].Quantity * prodExtras[i].Custom_Pix_Unit_CA;
        lineExtrasamount = prodExtras[i].Quantity * prodExtras[i].Custom_Pix_Unit_CA;
        CustomPixUnitaire = prodExtras[i].Custom_Pix_Unit_CA;
        console.log("ExtrasTotal_Amount custom : " + ExtrasTotal_Amount);
    }
    else
    {
        console.log("hi....");
        console.log("calculation prix" +  prodExtras[i].Quantity * Prix_Total);
        var ExtrasTotal_Amount = ExtrasTotal_Amount + prodExtras[i].Quantity * Prix_Total;
        lineExtrasamount = prodExtras[i].Quantity * Prix_Total;
         console.log("ExtrasTotal_Amount " + ExtrasTotal_Amount);
    }
      lineItem2 = {
        "id": prodExtras[i].id,
        "Unit_Price1": Prix_Total,
        "Total_Amount_CA": lineExtrasamount
        };
        lineExtrasPayload.push(lineItem2);
        console.log("lineItem2 ", lineItemsPayload);
}
ZDK.Page.getField('Extra_Item').setValue(lineExtrasPayload);
 //Final grand Total
Total = ItemTotal_Amount + ExtrasTotal_Amount
var upd = ZDK.Page.getForm().setValues({'Total_Amount': Total , 'Calculate_Total':false}); 