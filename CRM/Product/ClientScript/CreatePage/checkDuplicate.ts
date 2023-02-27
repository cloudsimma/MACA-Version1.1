
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

var prodcode = ZDK.Page.getField("prod_code").getValue();
console.log(prodcode);
check = "Product_Code:equals:"+prodcode;
duplicatecode =  ZDK.Apps.CRM.Products.searchByCriteria(check);
//var duplicatecode = ZDK.Apps.CRM.Products.searchByCriteria("((Product_Code:equals:" + prodcode + "))");
console.log(duplicatecode);
//if(duplicatecode.le)
if(duplicatecode.length > 0)
{
    ZDK.Client.showAlert("Product code Already Exist Create New");
}
