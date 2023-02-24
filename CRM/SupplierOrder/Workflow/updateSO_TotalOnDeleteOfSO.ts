/*
	Update Total supplier price in "order" based on order Id 
	get Orderid for Supplier order and get all supplier details and update total supplier field in order
	*/
    searchparam = "(No_Commande_Maca:equals:C" + OrderNo + ")";
    orderinfo = zoho.crm.searchRecords("Orders_New",searchparam);
    //info orderinfo;
    if(orderinfo.size() > 0)
    {
        supplierPriceMap = Map();
        totalSupplierPrice = 0;
        orderID = orderinfo.get(0).get("id");
        info orderID;
        supplierOrderDetails = zoho.crm.getRelatedRecords("Related_List_Name_3","Orders_New",orderID);
        info supplierOrderDetails;
        if(supplierOrderDetails.size() > 0)
        {
            for each  supplierOrder in supplierOrderDetails
            {
                info supplierOrder.get("Total_Amount");
                supplierOrderPrice = if(supplierOrder.get("Total_Amount") != null,supplierOrder.get("Total_Amount"),0);
                totalSupplierPrice = totalSupplierPrice + supplierOrderPrice;
            }
        }
        else
        {
            totalSupplierPrice = 0;
        }
        supplierPriceMap.put("Supplier_Price",totalSupplierPrice);
        info supplierPriceMap;
        orderUpdateResponse = zoho.crm.updateRecord("Orders_New",orderID,supplierPriceMap,{"trigger":{"workflow"}});
        info orderUpdateResponse;
    }