import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsletterSchema, 
  insertSearchSchema,
  newsletters,
  searches
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes should be prefixed with /api
  
  // Get all cities (for autocomplete)
  app.get("/api/cities", async (req: Request, res: Response) => {
    try {
      const cities = await storage.getCities();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cities" });
    }
  });
  
  // Search cities by name (for autocomplete)
  app.get("/api/cities/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      
      const cities = await storage.getCities();
      const filteredCities = cities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) || 
        city.state.toLowerCase().includes(query.toLowerCase())
      );
      
      res.json(filteredCities);
    } catch (error) {
      res.status(500).json({ message: "Error searching cities" });
    }
  });
  
  // Get all routes or filter by origin/destination
  app.get("/api/routes", async (req: Request, res: Response) => {
    try {
      const originId = parseInt(req.query.originId as string);
      const destinationId = parseInt(req.query.destinationId as string);
      
      if (originId && destinationId) {
        const routes = await storage.getRoutesByOriginDestination(originId, destinationId);
        
        // Enrich routes with city information
        const enrichedRoutes = await Promise.all(routes.map(async route => {
          const origin = await storage.getCityById(route.originId);
          const destination = await storage.getCityById(route.destinationId);
          return {
            ...route,
            origin,
            destination
          };
        }));
        
        return res.json(enrichedRoutes);
      }
      
      const routes = await storage.getRoutes();
      res.json(routes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching routes" });
    }
  });
  
  // Get popular routes
  app.get("/api/routes/popular", async (req: Request, res: Response) => {
    try {
      // In a real DB we'd have a more sophisticated algorithm
      // For now we'll just return all routes
      const routes = await storage.getRoutes();
      
      // Enrich routes with city information
      const enrichedRoutes = await Promise.all(routes.map(async route => {
        const origin = await storage.getCityById(route.originId);
        const destination = await storage.getCityById(route.destinationId);
        return {
          ...route,
          origin,
          destination
        };
      }));
      
      res.json(enrichedRoutes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching popular routes" });
    }
  });
  
  // Search for trips
  app.post("/api/search", async (req: Request, res: Response) => {
    try {
      const searchSchema = z.object({
        originId: z.number({
          required_error: "Origin is required",
          invalid_type_error: "Origin must be a number",
        }),
        destinationId: z.number({
          required_error: "Destination is required",
          invalid_type_error: "Destination must be a number",
        }),
        departureDate: z.string({
          required_error: "Departure date is required",
        }),
      });
      
      const parsedData = searchSchema.parse(req.body);
      
      // Save the search to history
      const searchData = {
        ...parsedData,
        searchDate: new Date().toISOString(),
      };
      
      await storage.saveSearch(searchData);
      
      // Get available routes
      const routes = await storage.getRoutesByOriginDestination(
        parsedData.originId, 
        parsedData.destinationId
      );
      
      if (routes.length === 0) {
        return res.status(404).json({ 
          message: "No routes found for the selected origin and destination" 
        });
      }
      
      // Enrich with city information
      const origin = await storage.getCityById(parsedData.originId);
      const destination = await storage.getCityById(parsedData.destinationId);
      
      const enrichedRoutes = routes.map(route => ({
        ...route,
        origin,
        destination,
        departureDate: parsedData.departureDate
      }));
      
      res.json(enrichedRoutes);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ message: "Error processing search request" });
    }
  });
  
  // Subscribe to newsletter
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const emailSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
      });
      
      const { email } = emailSchema.parse(req.body);
      
      const subscriptionData = {
        email,
        subscriptionDate: new Date().toISOString(),
      };
      
      await storage.subscribeToNewsletter(subscriptionData);
      
      res.status(201).json({ 
        message: "Thank you for subscribing to our newsletter!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ message: "Error processing newsletter subscription" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
