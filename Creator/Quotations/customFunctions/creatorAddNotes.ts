string creator.addNotes(string Title, string Content, string ParentId, string Module, string Owner)
{
	data_map = Map();
	dataList = List();
	notes_map = Map();
	notes_map.put("Note_Title",Title);
	notes_map.put("Note_Content",Content);
	notes_map.put("Parent_Id",ParentId);
	notes_map.put("se_module",Module);
	dataList.add(notes_map);	
	data_map.put("data",dataList);
	notecreate = zoho.crm.createRecord("Notes",notes_map);
	return notecreate;
}