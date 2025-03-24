import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User authentication schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Cities schema for search functionality
export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
});

export const insertCitySchema = createInsertSchema(cities).pick({
  name: true,
  state: true,
});

// Routes schema
export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  originId: integer("originId").notNull(),
  destinationId: integer("destinationId").notNull(),
  price: text("price").notNull(),
  duration: text("duration").notNull(),
  frequency: text("frequency").notNull(),
  distance: text("distance"),
  amenities: text("amenities").array(),
});

export const insertRouteSchema = createInsertSchema(routes).pick({
  originId: true,
  destinationId: true,
  price: true,
  duration: true,
  frequency: true,
  distance: true,
  amenities: true,
});

// Newsletter subscription schema
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscriptionDate: timestamp("subscriptionDate").notNull(),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
  subscriptionDate: true,
});

// Search history schema
export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  originId: integer("originId").notNull(),
  destinationId: integer("destinationId").notNull(),
  departureDate: text("departureDate").notNull(),
  searchDate: timestamp("searchDate").notNull(),
});

export const insertSearchSchema = createInsertSchema(searches).pick({
  originId: true,
  destinationId: true,
  departureDate: true,
  searchDate: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCity = z.infer<typeof insertCitySchema>;
export type City = typeof cities.$inferSelect;

export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Route = typeof routes.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Search = typeof searches.$inferSelect;
