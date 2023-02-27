var Email = ZDK.Page.getField("Email_Billing").getValue();
ZDK.Page.getField("Email_Delivery").setValue(Email);

var AdresseFacture = ZDK.Page.getField("Adresse_facture").getValue();
ZDK.Page.getField("Adresse_livraison").setValue(AdresseFacture);

var BillingAddress = ZDK.Page.getField("Billing_address").getValue();
ZDK.Page.getField("Delivery_street").setValue(BillingAddress);

var BillingCity = ZDK.Page.getField("Billing_city").getValue();
ZDK.Page.getField("Delivery_city").setValue(BillingCity);

var BillingRegion = ZDK.Page.getField("Billing_region").getValue();
ZDK.Page.getField("Delivery_region").setValue(BillingRegion);

var BillingPostalCode = ZDK.Page.getField("Billing_postal_code").getValue();
ZDK.Page.getField("Delivery_postal_code").setValue(BillingPostalCode);






