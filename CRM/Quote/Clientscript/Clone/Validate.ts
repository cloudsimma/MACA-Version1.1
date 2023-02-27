var extraitems = ZDK.Page.getField('Extra_Items').getValue();
var items = ZDK.Page.getField('Product_Details').getValue();
var count = 0;
var emptyQty =0;
var emptyRate = 0;
var emptySupplier = 0;
var emptyProduct = 0;
//dupExtra = 0;
prodSeq = [];
// let lineItemsPayload1 = [];
// let lineItemsPayload = [];
// Extras Sub Form
for (var i = 0; i < extraitems.length; i++)
{
    if (extraitems[i].Extras_Products != null)
    {
        // lineItemsPayload.push(extraitems[i].Extras_Products.id);
        // let uniqueChars = [new Set(lineItemsPayload)];
        // if (lineItemsPayload.length != uniqueChars[0].size)
        // {
        //     dupExtra = dupExtra + 1;
        // }
        if (extraitems[i].Extras_Seq_No == null)
        {
            count = count + 1;
        }
        else
        {
            if(extraitems[i].Extras_Seq_No > items.length )
            {
                ZDK.Client.showAlert("extras Section Sequence No "+ extraitems[i].Extras_Seq_No + " is not match with Products Sequence No,Please correct it to save the record");
                return false;
            }
        }
        if(extraitems[i].Quantity == null)
        {
            emptyQty = emptyQty + 1;
        }
        if(extraitems[i].Unit_Price == null)
        {
            emptyRate = emptyRate + 1;
        }
        if(extraitems[i].Supplier == null)
        {
            emptySupplier = emptySupplier + 1;
        }
    }
    else
    {
        if(extraitems[i].Unit_Price != null)
        {
            emptyProduct = emptyProduct + 1;
        }
    }
}
//Products Sub Form
countItem = 0;
itemQty =0;
itemrate =0;
itemdesc =0;
itemProduct = 0;
//dupProd = 0;
for (var j = 0; j < items.length; j++)
{
    if (items[j].Product != null)
    {
        // lineItemsPayload1.push(items[j].Product.id);
        // let uniqueChars1 = [new Set(lineItemsPayload1)];
        // if (lineItemsPayload1.length != uniqueChars1[0].size)
        // {
        //     dupProd = dupProd + 1;
        // }
        if (items[j].Item_Seq_No == null)
        {
            countItem = countItem + 1;
        }
        else
        {
             prodSeq.push(items[j].Item_Seq_No);
        }
        if (items[j].Quantity == null)
        {
            itemQty = itemQty + 1;
        }
        if (items[j].Unit_Price_CA == null)
        {
            itemrate = itemrate + 1;
        }
        if (items[j].Description_3 == null)
        {
            itemdesc = itemdesc + 1;
        }
    }
      else
    {
        //  if (items[j].Unit_Price_CA != null)
        // {
        //     itemProduct = itemProduct + 1;
        // }
    }
}


// warning msgs

if (count > 0)
{
ZDK.Client.showAlert("Sequence No is Empty in Extras Section,Please fill it to save the record");
return false;
}
else
{
    if(emptyQty > 0)
    {
        ZDK.Client.showAlert("Quantity is Empty in Extras Section ,Please fill it to save the record");
        return false;
    }
    else
    {
        if(emptyRate > 0)
        {
            ZDK.Client.showAlert("Unit Price is Empty in Extras Section ,Please fill it to save the record");
            return false;
        }
        else
        {
            if(emptyProduct > 0)
            {
                ZDK.Client.showAlert("Produit is Empty in Extras Section ,Please fill it to save the record");
                return false;
            }
            else
            {
                if(countItem > 0)
                {
                    ZDK.Client.showAlert("Sequence No is Empty in Product details Section,Please fill it to save the record");
                    return false;
                }
                else
                {
                    if(itemQty > 0)
                    {
                        ZDK.Client.showAlert("Quantity is Empty in Product Details Section ,Please fill it to save the record");
                        return false;
                    }
                    else
                    {
                        if(itemrate > 0)
                        {
                            ZDK.Client.showAlert("Unit Price is Empty in Product Details Section ,Please fill it to save the record");
                            return false;
                        }
                        else
                        {
                            if(itemProduct > 0)
                            {
                                ZDK.Client.showAlert("Produit is Empty in Product Details Section ,Please fill it to save the record");
                                return false;
                            }
                            else
                          {
                            if(itemdesc > 0)
                            {
                                ZDK.Client.showAlert("Item Description is Empty in Product Details Section ,Please fill it to save the record");
                                return false;
                            }
                            else
                            {
                            // toFindDuplicates();
                            var quotesItem = ZDK.Page.getField("Product_Details").getValue();
                                var quotesExtras = ZDK.Page.getField("Extra_Items").getValue(); 
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
                                
                                    // if (dupProd > 0)
                                    // {
                                    //     ZDK.Client.showAlert("Avoid Using Duplicate Items In Details Des Produits Section");
                                    //     return false;
                                    // }
                                    // else
                                    // {
                                    //     if (dupExtra > 0)
                                    //     {
                                    //         ZDK.Client.showAlert("Avoid Using Duplicate Items In Extras Section Section");
                                    //         return false;
                                    //     }
                                    //     else
                                    //     {
                                            if(emptySupplier > 0)
                                            {
                                                ZDK.Client.showAlert("Supplier is Empty in Extras Section ,Please fill it to save the record");
                                                return false;
                                            }
                                    //     }
                                    // }
                                }
                            }
                        }
                    }
                     }
                }
            }
        }
    }
}

