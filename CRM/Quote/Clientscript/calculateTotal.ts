var quotesItem = ZDK.Page.getField("Product_Details").getValue();
var quotesdet = ZDK.Page.getField("Extra_Items").getValue(); 
console.log(quotesdet);
//console.log(quotesItem);
//var margin_map = '{ "A": 0.5, "B": 0.55, "C": 0.60, "D": 0.65, "E": 0.70,"F": 0.75, "G": 0.80, "H": 0.81, "I": 0.82, "J": 0.83, "K": 0.84, "L": 0.85, "X": 1 }';
var margin_map = '{"A":0.5,"B":0.55,"C":0.60,"D":0.65,"E":0.70,"F":0.75,"G":0.80,"H":0.85,"X":1}';
var marginmp = JSON.parse(margin_map);
var ExtrasTotal_Amount = 0;
var ItemTotal_Amount = 0;
let lineItemsPayload = [];
let lineExtrasPayload = [];
//Item Total Calculation
for (var j = 0; j < quotesItem.length; j++)
{
    var Prix_Total = (quotesItem[j].Unit_Price_CA * marginmp[quotesItem[j].Margin] / marginmp[quotesItem[j].Margin_B]).toFixed(2);
    disTotalItem = (quotesItem[j].Unit_Price_CA * marginmp[quotesItem[j].Margin] / marginmp[quotesItem[j].Margin_B]).toFixed(2);
    console.log("Prix unitaire vendu:" + quotesItem[j].Custom_Pix_Unitaire);
    if (quotesItem[j].Custom_Pix_Unitaire != null)
    {
        var ItemTotal_Amount = (ItemTotal_Amount + quotesItem[j].Quantity * quotesItem[j].Custom_Pix_Unitaire);
        lineamount = (quotesItem[j].Quantity * quotesItem[j].Custom_Pix_Unitaire);
        CustomPixUnitaire =  quotesItem[j].Custom_Pix_Unitaire;
        console.log("custom"+ lineamount);
    }
    else
    {
        var ItemTotal_Amount = ItemTotal_Amount + quotesItem[j].Quantity * Prix_Total;
        CustomPixUnitaire = 0.00;
        lineamount = (quotesItem[j].Quantity * Prix_Total);
        console.log("prinx - item " + lineamount);
    }
    //Collect Sub Form Data
      lineItem = {"id": quotesItem[j].id,"Pix_unitaire": disTotalItem, "Total_Amount": lineamount};
        lineItemsPayload.push(lineItem);
        console.log("lineitem ", lineItemsPayload);
}
ZDK.Page.getField('Product_Details').setValue(lineItemsPayload);
//Extras Total Calculation
for (var i = 0; i < quotesdet.length; i++)
{
    if(quotesdet[i].Unit_Price != null)
    {
        var Prix_Total = (quotesdet[i].Unit_Price * marginmp[quotesdet[i].Cost_Code] / marginmp[quotesdet[i].Margin_B]).toFixed(2);
        disTotalExtras = (quotesdet[i].Unit_Price * marginmp[quotesdet[i].Cost_Code] / marginmp[quotesdet[i].Margin_B]).toFixed(2);
        console.log("custom field-Extras " + quotesdet[i].Custom_Pix_Unitaire);
        if (quotesdet[i].Custom_Pix_Unitaire != null)
        {
            var ExtrasTotal_Amount = ExtrasTotal_Amount + quotesdet[i].Quantity * quotesdet[i].Custom_Pix_Unitaire;
            lineExtrasamount = quotesdet[i].Quantity * quotesdet[i].Custom_Pix_Unitaire;
            customPix = quotesdet[i].Custom_Pix_Unitaire;
            console.log("Custom" + ExtrasTotal_Amount);
        }
        else
        {
            var ExtrasTotal_Amount = ExtrasTotal_Amount + quotesdet[i].Quantity * Prix_Total;
            lineExtrasamount = quotesdet[i].Quantity * Prix_Total;
            console.log("ExtrasTotal_Amount pix unit" + ExtrasTotal_Amount);
        }
    }
   
        lineItem2 = { "id": quotesdet[i].id, "Prix_Total": disTotalExtras, "Total_Amount": lineExtrasamount};
        lineExtrasPayload.push(lineItem2);
        console.log("lineItem2 ", lineItemsPayload);
}
ZDK.Page.getField('Extra_Items').setValue(lineExtrasPayload);
 //Final grand Total
Total = ItemTotal_Amount + ExtrasTotal_Amount;
var upd = ZDK.Page.getForm().setValues({'Total_Amount': Total,'Calculate':false}); 
