var prodItems = ZDK.Page.getField("Items_ordered").getValue();
var prodExtras = ZDK.Page.getField("Extra_Item").getValue(); 
var emptySeq =0;
var emptyRate = 0;
var emptyQty = 0;
var itemProduct = 0;
console.log("Item Sub form :" + prodItems);

// dupExtra = 0;
// let lineItemsPayload1 = [];
// let lineItemsPayload = [];
for (var j = 0; j < prodItems.length; j++)
{
    console.log("Qty :"+prodItems[j].Quantity);
    if (prodItems[j].Product_Name != null)
    {
        // lineItemsPayload.push(prodItems[j].Product_Name.id);
        // let uniqueChars = [new Set(lineItemsPayload)];
        // if (lineItemsPayload.length != uniqueChars[0].size)
        // {
        //     dupExtra = dupExtra + 1;
        // }
        if (prodItems[j].Item_Seq_No == null)
        {
            emptySeq = emptySeq + 1;
        }
        if (prodItems[j].Rate == null)
        {
            emptyRate = emptyRate + 1;
        }
        if (prodItems[j].Quantity == null)
        {
            emptyQty = emptyQty + 1;
        }
    }    
     else
    {
        if (prodItems[j].Rate != null)
        {
            itemProduct = itemProduct + 1;
        }
    }     
}
//console.log(dupExtra);
//return false;
var extrAmptySeq =0;
var extrAemptyRate = 0;
var extrAemptyQty = 0;
var emptySupplier = 0;
var emptyProduct = 0;
//dupProd = 0;
for (var i = 0; i < prodExtras.length; i++)
{
    if (prodExtras[i].Product_Name != null)
    {
        //  lineItemsPayload1.push(prodExtras[i].Product_Name.id);
        // let uniqueChars1 = [new Set(lineItemsPayload1)];
        // if (lineItemsPayload1.length != uniqueChars1[0].size)
        // {
        //     dupProd = dupProd + 1;
        // }
        if (prodExtras[i].Extras_Seq_No == null)
        {
            extrAmptySeq = extrAmptySeq + 1;
        }
        if (prodExtras[i].Unit_Price == null)
        {
            extrAemptyRate = extrAemptyRate + 1;
        }
        if (prodExtras[i].Quantity == null)
        {
            extrAemptyQty = extrAemptyQty + 1;
        }
        if (prodExtras[i].Supplier == null)
        {
            emptySupplier = emptySupplier + 1;
        }
    } 
     else
    {
        if (prodExtras[i].Unit_Price != null)
        {
            emptyProduct = emptyProduct + 1;
        }
    }     
}
//console.log(dupProd);

if(emptySeq > 0)
{
   ZDK.Client.showAlert("Sequence No is Empty in Items ordered Section,Please Update it to save the record"); 
   return false;
}
else
{
   if(emptyQty > 0)
    {
        ZDK.Client.showAlert("Quantity is Empty in Items ordered Section,Please Update it to save the record"); 
        return false;
    }
    else
    {
       if(emptyRate > 0)
        {
            ZDK.Client.showAlert("Unit Price is Empty in Items ordered Section,Please Update it to save the record"); 
            return false;
        } 
        else
         {
            if(itemProduct > 0)
            {
                ZDK.Client.showAlert("Produit is Empty in Items ordered Section,Please Update it to save the record"); 
                return false;
            } 
            else
        {
           if(extrAmptySeq > 0)
            {
            ZDK.Client.showAlert("Sequence No is Empty in Extra Items Section,Please Update it to save the record"); 
            return false;
            } 
            else
            {
                if(extrAemptyQty > 0)
                {
                    ZDK.Client.showAlert("Quantity is Empty in Extra Items Section,Please Update it to save the record"); 
                    return false;
                }
                else
                {
                    if(extrAemptyRate > 0)
                    {
                        ZDK.Client.showAlert("Unit Price is Empty in Extra Items Section,Please Update it to save the record"); 
                        return false;
                    } 
                    else
                    { 
                        if(emptyProduct > 0)
                        {
                        ZDK.Client.showAlert("Produit Extra is Empty in Extra Items Section,Please Update it to save the record"); 
                        return false;
                        }
                        else
                        {
                            var quotesItem = ZDK.Page.getField("Items_ordered").getValue();
                            var quotesExtras = ZDK.Page.getField("Extra_Item").getValue(); 
                            //let arry = [];
                            let prod =[];
                            proddupseq = 0;
                            for (var j = 0; j < quotesItem.length; j++)
                            {
                                if(quotesItem[j].Item_Seq_No != null)
                                {
                                    prod.push(quotesItem[j].Item_Seq_No);
                                    seqDup = 0;
                                    for (var i = 0; i < prod.length; i++)
                                    {
                                        if(quotesItem[j].Item_Seq_No == prod[i] )
                                        {
                                        seqDup = seqDup + 1;
                                        if(seqDup > 1)
                                            {
                                                proddupseq = proddupseq + 1;
                                            }   
                                        }
                                    }
                                    
                                }
                            
                            }
                                if(proddupseq > 0)
                                {
                                ZDK.Client.showAlert("Avoid Using Duplicate Sequence No In Details Des Produits Section");
                                return false;
                                } 
                                else
                                {
                                    if(emptySupplier > 0)
                                    {
                                        ZDK.Client.showAlert("Supplier is Empty in Extras Section ,Please fill it to save the record");
                                        return false;
                                    }
                                //  if (dupExtra > 0)
                                //     {
                                //         ZDK.Client.showAlert("Avoid Using Duplicate Items In Details Des Produits Section");
                                //         return false;
                                //     }
                                //     else
                                //     {
                                //         if (dupProd > 0)
                                //         {
                                //             ZDK.Client.showAlert("Avoid Using Duplicate Items In Extras Section Section");
                                //             return false;
                                //         }
                                //     }
                                }
                        }
                    }
          
                  }      }
            }
        }
    }
}