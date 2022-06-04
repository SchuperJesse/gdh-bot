CREATE TABLE points_log (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	award_date			DATETIME NOT NULL ON CONFLICT FAIL,
	points				BIGINT NOT NULL ON CONFLICT FAIL DEFAULT (0),
	user_id				TEXT NOT NULL ON CONFLICT FAIL
);
