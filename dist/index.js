// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  cities;
  routes;
  newsletters;
  searches;
  currentUserId;
  currentCityId;
  currentRouteId;
  currentNewsletterId;
  currentSearchId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.cities = /* @__PURE__ */ new Map();
    this.routes = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
    this.searches = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentCityId = 1;
    this.currentRouteId = 1;
    this.currentNewsletterId = 1;
    this.currentSearchId = 1;
    const initialCities = [
      { name: "S\xE3o Paulo", state: "SP" },
      { name: "Rio de Janeiro", state: "RJ" },
      { name: "Belo Horizonte", state: "MG" },
      { name: "Curitiba", state: "PR" },
      { name: "Salvador", state: "BA" },
      { name: "Bras\xEDlia", state: "DF" },
      { name: "Porto Alegre", state: "RS" },
      { name: "Recife", state: "PE" },
      { name: "Fortaleza", state: "CE" },
      { name: "Manaus", state: "AM" }
    ];
    initialCities.forEach((city) => this.createCity(city));
    const initialRoutes = [
      {
        originId: 1,
        destinationId: 2,
        price: "89.90",
        duration: "6:00",
        frequency: "Sa\xEDdas di\xE1rias",
        distance: "429km",
        amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"]
      },
      {
        originId: 1,
        destinationId: 3,
        price: "110.50",
        duration: "8:00",
        frequency: "Sa\xEDdas di\xE1rias",
        distance: "586km",
        amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"]
      },
      {
        originId: 1,
        destinationId: 4,
        price: "79.90",
        duration: "5:30",
        frequency: "Sa\xEDdas di\xE1rias",
        distance: "408km",
        amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"]
      },
      {
        originId: 2,
        destinationId: 3,
        price: "99.90",
        duration: "7:00",
        frequency: "Sa\xEDdas di\xE1rias",
        distance: "434km",
        amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"]
      },
      {
        originId: 2,
        destinationId: 5,
        price: "149.90",
        duration: "12:00",
        frequency: "Ter\xE7as e Quintas",
        distance: "1649km",
        amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado", "Refei\xE7\xE3o"]
      },
      {
        originId: 3,
        destinationId: 6,
        price: "89.90",
        duration: "7:00",
        frequency: "Sa\xEDdas di\xE1rias",
        distance: "716km",
        amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"]
      }
    ];
    initialRoutes.forEach((route) => this.createRoute(route));
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // City methods
  async getCities() {
    return Array.from(this.cities.values());
  }
  async getCityById(id) {
    return this.cities.get(id);
  }
  async getCityByName(name) {
    const normalizedName = name.toLowerCase();
    return Array.from(this.cities.values()).find(
      (city) => city.name.toLowerCase().includes(normalizedName)
    );
  }
  async createCity(insertCity) {
    const id = this.currentCityId++;
    const city = { ...insertCity, id };
    this.cities.set(id, city);
    return city;
  }
  // Route methods
  async getRoutes() {
    return Array.from(this.routes.values());
  }
  async getRouteById(id) {
    return this.routes.get(id);
  }
  async getRoutesByOriginDestination(originId, destinationId) {
    return Array.from(this.routes.values()).filter(
      (route) => route.originId === originId && route.destinationId === destinationId
    );
  }
  async createRoute(insertRoute) {
    const id = this.currentRouteId++;
    const route = { ...insertRoute, id };
    this.routes.set(id, route);
    return route;
  }
  // Newsletter methods
  async subscribeToNewsletter(insertNewsletter) {
    const id = this.currentNewsletterId++;
    const newsletter = { ...insertNewsletter, id };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  // Search methods
  async saveSearch(insertSearch) {
    const id = this.currentSearchId++;
    const search = { ...insertSearch, id };
    this.searches.set(id, search);
    return search;
  }
  async getPopularSearches(limit) {
    return Array.from(this.searches.values()).sort((a, b) => new Date(b.searchDate).getTime() - new Date(a.searchDate).getTime()).slice(0, limit);
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/cities", async (req, res) => {
    try {
      const cities = await storage.getCities();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cities" });
    }
  });
  app2.get("/api/cities/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      const cities = await storage.getCities();
      const filteredCities = cities.filter(
        (city) => city.name.toLowerCase().includes(query.toLowerCase()) || city.state.toLowerCase().includes(query.toLowerCase())
      );
      res.json(filteredCities);
    } catch (error) {
      res.status(500).json({ message: "Error searching cities" });
    }
  });
  app2.get("/api/routes", async (req, res) => {
    try {
      const originId = parseInt(req.query.originId);
      const destinationId = parseInt(req.query.destinationId);
      if (originId && destinationId) {
        const routes2 = await storage.getRoutesByOriginDestination(originId, destinationId);
        const enrichedRoutes = await Promise.all(routes2.map(async (route) => {
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
  app2.get("/api/routes/popular", async (req, res) => {
    try {
      const routes = await storage.getRoutes();
      const enrichedRoutes = await Promise.all(routes.map(async (route) => {
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
  app2.post("/api/search", async (req, res) => {
    try {
      const searchSchema = z.object({
        originId: z.number({
          required_error: "Origin is required",
          invalid_type_error: "Origin must be a number"
        }),
        destinationId: z.number({
          required_error: "Destination is required",
          invalid_type_error: "Destination must be a number"
        }),
        departureDate: z.string({
          required_error: "Departure date is required"
        })
      });
      const parsedData = searchSchema.parse(req.body);
      const searchData = {
        ...parsedData,
        searchDate: (/* @__PURE__ */ new Date()).toISOString()
      };
      await storage.saveSearch(searchData);
      const routes = await storage.getRoutesByOriginDestination(
        parsedData.originId,
        parsedData.destinationId
      );
      if (routes.length === 0) {
        return res.status(404).json({
          message: "No routes found for the selected origin and destination"
        });
      }
      const origin = await storage.getCityById(parsedData.originId);
      const destination = await storage.getCityById(parsedData.destinationId);
      const enrichedRoutes = routes.map((route) => ({
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
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const emailSchema = z.object({
        email: z.string().email({ message: "Invalid email address" })
      });
      const { email } = emailSchema.parse(req.body);
      const subscriptionData = {
        email,
        subscriptionDate: (/* @__PURE__ */ new Date()).toISOString()
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
    assetsDir: "assets"
    // Pasta dos assets
  },
  base: "/busdriver/"
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "localhost"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
