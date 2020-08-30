CREATE TABLE IF NOT EXISTS messages (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	channel_name TEXT NOT NULL,
	server_name TEXT NOT NULL,
	content TEXT NOT NULL,
	human_time TEXT NOT NULL,
	utc INTEGER NOT NULL,
	utc_offset INTEGER NOT NULL,
	author_id INTEGER NOT NULL,
	author_username TEXT NOT NULL,
	discriminator TEXT NOT NULL,
	message_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS channels (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	channel_name TEXT NOT NULL,
	server_name TEXT NOT NULL,
	human_time TEXT NOT NULL,
	utc INTEGER NOT NULL,
	utc_offset INTEGER NOT NULL,
	author_id INTEGER NOT NULL,
	author_username TEXT NOT NULL,
	discriminator TEXT NOT NULL,
	channel_type TEXT NOT NULL,
	channel_event TEXT NOT NULL
);
