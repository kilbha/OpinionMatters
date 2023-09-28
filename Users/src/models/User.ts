export interface User {
  id?: string; // You might have an optional id field
  firstName: string | null;
  lastName: string | null; // Use null for optional fields
  email: string;
  password: string;
}

// ? Optional field
