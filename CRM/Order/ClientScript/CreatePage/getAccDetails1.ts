
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

var enterprises=ZDK.Page.getField("Company_Name").getValue();
console.log(enterprises);
if(enterprises != null && enterprises != "")
{
    var enterprisesdet= ZDK.Apps.CRM.Accounts.fetchById(enterprises.id);
    if(enterprisesdet != null && enterprisesdet != "")
    {
        ZDK.Page.getField("Email_Billing").setValue(enterprisesdet.Courriel_Facturation);
        ZDK.Page.getField("Billing_Contact").setValue(enterprisesdet.Contact_Facturation);
        ZDK.Page.getField("Billing_address").setValue(enterprisesdet.Billing_Street);
        ZDK.Page.getField("Billing_city").setValue(enterprisesdet.Billing_City);
        ZDK.Page.getField("Billing_postal_code").setValue(enterprisesdet.Billing_Code);
        ZDK.Page.getField("Billing_region").setValue(enterprisesdet.Billing_State);

        ZDK.Page.getField("Billing_Email").setValue(enterprisesdet.Courriel_Livraison);
        ZDK.Page.getField("Delivery_street").setValue(enterprisesdet.Shipping_Street);
        ZDK.Page.getField("City_of_delivery").setValue(enterprisesdet.Shipping_City);
        ZDK.Page.getField("Delivery_region").setValue(enterprisesdet.Shipping_State);
        ZDK.Page.getField("Postal_code_of_delivery").setValue(enterprisesdet.Shipping_Code);
        ZDK.Page.getField("Update_New_Address").setValue(false);
    }
}


