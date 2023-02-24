for each  recData in input.Line_Items
{
	if(recData.Upload_Image != null && recData.Upload_Image != "")
	{
		recData.Image_URL="https://creator.zohopublic.com/vanessa68/order-management/All_Order_Items/" + recData.ID + "/Upload_Image/image-download/EHRgvwmXyS5h3pEQPFrMvx7Ze5jxk7TMTEDgMQP6DehfGq5MPhj8T4SNZdKTvY8pX4uuad39UjBCC9yCPD2tDM9NNWAEv0Jfs6Tg/" + recData.Upload_Image;
	}
	else
	{
		recData.Image_URL="";
	}
	if(recData.Upload_Image_2 != null && recData.Upload_Image_2 != "")
	{
		recData.Image_URL_2="https://creator.zohopublic.com/vanessa68/order-management/All_Order_Items/" + recData.ID + "/Upload_Image_2/image-download/EHRgvwmXyS5h3pEQPFrMvx7Ze5jxk7TMTEDgMQP6DehfGq5MPhj8T4SNZdKTvY8pX4uuad39UjBCC9yCPD2tDM9NNWAEv0Jfs6Tg/" + recData.Upload_Image_2;
	}
	else
	{
		recData.Image_URL_2="";
	}
}
