var contact = ZDK.Page.getField("Contact_Name").getValue();
console.log("contact " + contact);
var contactdet = ZDK.Apps.CRM.Contacts.fetchById(contact.id);
console.log(contactdet);
ZDK.Page.getField("Email").setValue(contactdet.Email);
ZDK.Page.getField("T_l_phone").setValue(contactdet.Phone);
if(contactdet._Lead_Source_New_Lookup_Id != null){
ZDK.Page.getField("Lead_Source_New").setValue(contactdet._Lead_Source_New_Lookup_Id);
}
//
