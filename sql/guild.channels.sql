CREATE TABLE channels (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	created_on			DATETIME,
	channel_id			TEXT UNIQUE ON CONFLICT FAIL,
	flags				TEXT
);
