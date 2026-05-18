declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "admin" | "sales";
        email: string;
      };
    }
  }
}

export {};
