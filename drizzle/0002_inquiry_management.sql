ALTER TABLE `wedding_inquiries` ADD `status` text DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE `wedding_inquiries` ADD `last_contact` text;--> statement-breakpoint
ALTER TABLE `workshop_inquiries` ADD `last_contact` text;