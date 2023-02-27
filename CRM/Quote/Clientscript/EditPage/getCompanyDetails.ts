var enterprisesdet=ZDK.Page.getField("Company_Name").getValue();
console.log(enterprisesdet);
console.log("hiii");
var enterprises= ZDK.Apps.CRM.Accounts.fetchById(enterprisesdet.id);
console.log(enterprises);
ZDK.Page.getField("Email_Billing").setValue(enterprises.Courriel_Facturation);
ZDK.Page.getField("Adresse_facture").setValue(enterprises.Contact_Facturation);
ZDK.Page.getField("Billing_address").setValue(enterprises.Billing_Street);
ZDK.Page.getField("Billing_city").setValue(enterprises.Billing_City);
ZDK.Page.getField("Billing_postal_code").setValue(enterprises.Billing_Code);
ZDK.Page.getField("Billing_region").setValue(enterprises.Billing_State);
console.log("hello" + enterprises.Billing_State);//Courriel_Livraison 
ZDK.Page.getField("Transporter").setValue(enterprises.Transporteur);
ZDK.Page.getField("Email_Delivery").setValue(enterprises.Courriel_Livraison);
ZDK.Page.getField("Adresse_livraison").setValue(enterprises.Contact_Livraison);
ZDK.Page.getField("Delivery_street").setValue(enterprises.Shipping_Street);
ZDK.Page.getField("Delivery_city").setValue(enterprises.Shipping_City);
ZDK.Page.getField("Delivery_region").setValue(enterprises.Shipping_State);
ZDK.Page.getField("Delivery_postal_code").setValue(enterprises.Shipping_Code);
console.log(enterprises.Shipping_Code);
//console.log("owner"+ enterprises.Owner_Lookup_Id);
//ZDK.Page.getField("Quotation_Owner").setValue(enterprises.Owner_Lookup_Id);Company_Name
console.log(enterprises.Transporteur);
