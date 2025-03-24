import { 
  users, type User, type InsertUser,
  cities, type City, type InsertCity,
  routes, type Route, type InsertRoute,
  newsletters, type Newsletter, type InsertNewsletter,
  searches, type Search, type InsertSearch 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // City methods
  getCities(): Promise<City[]>;
  getCityById(id: number): Promise<City | undefined>;
  getCityByName(name: string): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;
  
  // Route methods
  getRoutes(): Promise<Route[]>;
  getRouteById(id: number): Promise<Route | undefined>;
  getRoutesByOriginDestination(originId: number, destinationId: number): Promise<Route[]>;
  createRoute(route: InsertRoute): Promise<Route>;
  
  // Newsletter methods
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Search methods
  saveSearch(search: InsertSearch): Promise<Search>;
  getPopularSearches(limit: number): Promise<Search[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cities: Map<number, City>;
  private routes: Map<number, Route>;
  private newsletters: Map<number, Newsletter>;
  private searches: Map<number, Search>;
  
  private currentUserId: number;
  private currentCityId: number;
  private currentRouteId: number;
  private currentNewsletterId: number;
  private currentSearchId: number;

  constructor() {
    this.users = new Map();
    this.cities = new Map();
    this.routes = new Map();
    this.newsletters = new Map();
    this.searches = new Map();
    
    this.currentUserId = 1;
    this.currentCityId = 1;
    this.currentRouteId = 1;
    this.currentNewsletterId = 1;
    this.currentSearchId = 1;
    
    // Initialize with some cities
    const initialCities = [
      { name: "São Paulo", state: "SP" },
      { name: "Rio de Janeiro", state: "RJ" },
      { name: "Belo Horizonte", state: "MG" },
      { name: "Curitiba", state: "PR" },
      { name: "Salvador", state: "BA" },
      { name: "Brasília", state: "DF" },
      { name: "Porto Alegre", state: "RS" },
      { name: "Recife", state: "PE" },
      { name: "Fortaleza", state: "CE" },
      { name: "Manaus", state: "AM" },
    ];
    
    initialCities.forEach(city => this.createCity(city));
    
    // Initialize with some routes
    const initialRoutes = [
      { 
        originId: 1, destinationId: 2, price: "89.90", 
        duration: "6:00", frequency: "Saídas diárias", 
        distance: "429km", amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"] 
      },
      { 
        originId: 1, destinationId: 3, price: "110.50", 
        duration: "8:00", frequency: "Saídas diárias", 
        distance: "586km", amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"] 
      },
      { 
        originId: 1, destinationId: 4, price: "79.90", 
        duration: "5:30", frequency: "Saídas diárias", 
        distance: "408km", amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"] 
      },
      { 
        originId: 2, destinationId: 3, price: "99.90", 
        duration: "7:00", frequency: "Saídas diárias", 
        distance: "434km", amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"] 
      },
      { 
        originId: 2, destinationId: 5, price: "149.90", 
        duration: "12:00", frequency: "Terças e Quintas", 
        distance: "1649km", amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado", "Refeição"] 
      },
      { 
        originId: 3, destinationId: 6, price: "89.90", 
        duration: "7:00", frequency: "Saídas diárias", 
        distance: "716km", amenities: ["Wi-Fi", "Tomadas USB", "Ar-condicionado"] 
      },
    ];
    
    initialRoutes.forEach(route => this.createRoute(route));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // City methods
  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }
  
  async getCityById(id: number): Promise<City | undefined> {
    return this.cities.get(id);
  }
  
  async getCityByName(name: string): Promise<City | undefined> {
    const normalizedName = name.toLowerCase();
    return Array.from(this.cities.values()).find(
      city => city.name.toLowerCase().includes(normalizedName)
    );
  }
  
  async createCity(insertCity: InsertCity): Promise<City> {
    const id = this.currentCityId++;
    const city: City = { ...insertCity, id };
    this.cities.set(id, city);
    return city;
  }
  
  // Route methods
  async getRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }
  
  async getRouteById(id: number): Promise<Route | undefined> {
    return this.routes.get(id);
  }
  
  async getRoutesByOriginDestination(originId: number, destinationId: number): Promise<Route[]> {
    return Array.from(this.routes.values()).filter(
      route => route.originId === originId && route.destinationId === destinationId
    );
  }
  
  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = this.currentRouteId++;
    const route: Route = { ...insertRoute, id };
    this.routes.set(id, route);
    return route;
  }
  
  // Newsletter methods
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = { ...insertNewsletter, id };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  
  // Search methods
  async saveSearch(insertSearch: InsertSearch): Promise<Search> {
    const id = this.currentSearchId++;
    const search: Search = { ...insertSearch, id };
    this.searches.set(id, search);
    return search;
  }
  
  async getPopularSearches(limit: number): Promise<Search[]> {
    // In a real DB, we would do a GROUP BY with COUNT
    // Here we're just returning the most recent searches
    return Array.from(this.searches.values())
      .sort((a, b) => new Date(b.searchDate).getTime() - new Date(a.searchDate).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
