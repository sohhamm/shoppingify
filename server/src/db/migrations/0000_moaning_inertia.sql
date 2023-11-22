CREATE TABLE `item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text DEFAULT 'No Category' NOT NULL,
	`image` text,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
