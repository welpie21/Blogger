DEFINE TABLE tag SCHEMAFULL
PERMISSIONS FOR
	select, update, delete WHERE $auth;

-- the name of the tag
DEFINE FIELD name ON tag TYPE string;

-- the friendly url of the tag
DEFINE FIELD slug ON tag TYPE string
	VALUE string::slug($value)
	READONLY;

-- the description of the tag
DEFINE FIELD description ON tag TYPE string;

-- the user who created the tag
DEFINE FIELD creator ON tag TYPE record<author>;

-- the date the tag was created
DEFINE FIELD created_at ON tag TYPE date;

-- the user who last updated the tag
DEFINE FIELD updated_at ON tag TYPE date;