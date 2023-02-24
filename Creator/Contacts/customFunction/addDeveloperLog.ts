void Developer.addDeveloperLog(string module, string process, string inData, string outData)
{
	logResponse = insert into Developer_Log
	[
		Added_User=zoho.loginuser
		Module=module
		Process_Description=process
		In_Data=inData
		Out_Response=outData
	];
}