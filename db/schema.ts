import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const weddingInquiries = sqliteTable(
  "wedding_inquiries",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    weddingDate: text("wedding_date"),
    location: text("location"),
    message: text("message"),
    status: text("status").notNull().default("new"),
    lastContact: text("last_contact"),
  },
  (table) => [
    index("wedding_inquiries_email_created").on(table.email, table.createdAt),
  ],
);
export const workshopInquiries = sqliteTable(
  "workshop_inquiries",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at").notNull(),
    occasion: text("occasion").notNull(),
    desiredDate: text("desired_date").notNull(),
    alternativeDate: text("alternative_date"),
    participants: integer("participants").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    shapeWorld: text("shape_world"),
    scentWorld: text("scent_world"),
    message: text("message"),
    status: text("status").notNull().default("new"),
    lastContact: text("last_contact"),
  },
  (table) => [
    index("inquiries_email_created").on(table.email, table.createdAt),
  ],
);
