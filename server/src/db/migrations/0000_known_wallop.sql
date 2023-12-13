CREATE TABLE `cart` (
	`cart_id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'Shopping List' NOT NULL,
	`status` text DEFAULT 'ongoing' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `cart_item` (
	`cart_id` text,
	`item_id` text,
	`quantity` integer NOT NULL,
	PRIMARY KEY(`cart_id`, `item_id`),
	FOREIGN KEY (`cart_id`) REFERENCES `cart`(`cart_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
	FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON UPDATE no action ON DELETE cascade
);
