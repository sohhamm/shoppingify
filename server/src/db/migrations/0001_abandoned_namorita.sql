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
	FOREIGN KEY (`cart_id`) REFERENCES `cart`(`cart_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON UPDATE no action ON DELETE no action
);
