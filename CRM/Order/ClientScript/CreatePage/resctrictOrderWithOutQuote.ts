
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

var Quote = ZDK.Page.getField("Quotation_Name").getValue();
if (Quote == null || Quotation_ID == null)
    {
        ZDK.Client.showAlert("Direct order creation was not allowed...!"); 
        return false;
    }

