CREATE TABLE `wedding_inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`wedding_date` text,
	`location` text,
	`message` text
);
--> statement-breakpoint
CREATE INDEX `wedding_inquiries_email_created` ON `wedding_inquiries` (`email`,`created_at`);