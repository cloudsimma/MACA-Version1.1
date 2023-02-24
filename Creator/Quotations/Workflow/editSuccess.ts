// try 
// {
    if(input.DataFrom == "AddExtra")
    {
        for each  recData in input.Product_Details
        {
            if(recData.Upload_Image != null && recData.Upload_Image != "")
            {
                // 						recData.Image_URL="https://creatorexport.zoho.com/DownloadFile.do?filepath=/" + recData.Upload_Image + "&sharedBy=vanessa68&appLinkName=order-management&viewLinkName=All_Quotation_Items";
                recData.Image_URL="https://creator.zohopublic.com/vanessa68/order-management/All_Quotation_Items/" + recData.ID + "/Upload_Image/image-download/VaERgvumB6zbdSD8vP9kyXRPa75sx0j3CNKQP4O89uua8Sy3pp1HtjKhdQTRymephK8UtHF8ssD86axKy5GyOPQ2sHv5S2kGHfz3/" + recData.Upload_Image;
            }
            if(recData.Upload_Image_2 != null && recData.Upload_Image_2 != "")
            {
                recData.Image_URL_2="https://creator.zohopublic.com/vanessa68/order-management/All_Quotation_Items/" + recData.ID + "/Upload_Image_2/image-download/VaERgvumB6zbdSD8vP9kyXRPa75sx0j3CNKQP4O89uua8Sy3pp1HtjKhdQTRymephK8UtHF8ssD86axKy5GyOPQ2sHv5S2kGHfz3/" + recData.Upload_Image_2;
            }
        }
    }
    info input.Product_Details;
    // }
    // catch (e)
    // {
    // 	thisapp.Developer.addDeveloperLog("Quotation","upload-Images",input.ID.toString(),e);
    // 	//info e;
    // }
    