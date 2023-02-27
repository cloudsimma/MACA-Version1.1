exeName = ZDK.Page.getField("Supplier").getValue();
if (exeName != null)
{
    var empObj = ZDK.Apps.CRM.Vendors.fetchById(exeName.id);
   ZDK.Page.getField("Num_ro_Fournisseur").setValue(empObj.Num_ro_fournisseur);
   ZDK.Page.getField("SIte_Web_fournisseur").setValue(empObj.Website);
}