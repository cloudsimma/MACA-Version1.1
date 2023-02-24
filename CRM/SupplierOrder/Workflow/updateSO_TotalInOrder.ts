/*
	Update Total supplier price in "order" based on order Id - Added by Lakshmi 17-Feb-2023
	get Orderid for Supplier order and get all supplier details and update total supplier field in order
	*/
    getSoData = zoho.crm.getRecordById("Supplier_orders_new",SOID);
    supplierPriceMap = Map();
    //info getSoData;
    totalSupplierPrice = 0;
    orderID = "" + getSoData.get("COMMANDE_Client").get("id");
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