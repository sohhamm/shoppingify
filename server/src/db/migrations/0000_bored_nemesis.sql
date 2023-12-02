CREATE TABLE `category` (
	`category_id` text PRIMARY KEY NOT NULL,
	`category_name` text NOT NULL,
	`category_desc` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `item` (
	`item_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `item_category` (
	`item_id` text NOT NULL,
	`category_id` text NOT NULL,
	PRIMARY KEY(`category_id`, `item_id`),
	FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON UPDATE no action ON DELETE no action
);
