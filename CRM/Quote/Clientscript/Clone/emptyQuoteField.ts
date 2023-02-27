
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/
// Single line:

if(ZDK.Page.getField("Creator_Quotation_ID") != null)
{
  var qid = ZDK.Page.getField("Creator_Quotation_ID").getValue();
  console.log("quoteID - ", qid); 
  ZDK.Page.getField("Clone_From").setValue(qid);
}
ZDK.Page.getField("Creator_Quotation_ID").setValue(Null);
ZDK.Page.getField("Quote_Status").setValue("Proposition");     
ZDK.Page.getField("Quote_Created_Through").setValue("Clone"); 
// var QNo = ZDK.Page.getField("Quote_No").getValue();
// var getObj = ZDK.Page.getField("Name").getValue();
// var addObj = getObj + " [" + QNo + "]";
// console.log("Add Obj - ", QNo);
//ZDK.Page.getField("Name").setValue(addObj);  

console.log("Test TEst");     