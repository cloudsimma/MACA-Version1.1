Desc = ZDK.Page.getField("Description").getValue();
productDescription = "Couleur du produit:\nMéthode de décoration:\nEmplacement de décoration:\nCouleur du logo :\nDélai de production:\nGrandeurs:\nS:\nM:\nL:\nXL:\nXXL";
if(Desc == "" || Desc == null)
{
    ZDK.Page.getField("Description").setValue(productDescription);
}
