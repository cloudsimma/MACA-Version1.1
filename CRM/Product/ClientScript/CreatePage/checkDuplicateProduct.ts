
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

var productsku = ZDK.Page.getField("prod_code").getValue();
var prodsku = encodeURI(productsku);
var response = ZDK.Apps.CRM.Functions.execute("bookssku", { "prosku": prodsku });
console.log("response ", response);
var result_value = response.details.output;
console.log("Result Value :", result_value);
if (result_value >= 1)
{
ZDK.Client.showMessage("Already you have products with same SKU", { type: "Warning" });
ZDK.Page.getField(prod_code).setValue("");
return false;
}
else
{
return true;
}
