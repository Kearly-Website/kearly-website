CREATE TABLE `workshop_inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`occasion` text NOT NULL,
	`desired_date` text NOT NULL,
	`alternative_date` text,
	`participants` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`shape_world` text,
	`scent_world` text,
	`message` text,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `inquiries_email_created` ON `workshop_inquiries` (`email`,`created_at`);