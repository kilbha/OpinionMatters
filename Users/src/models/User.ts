export interface User {
  id?: string; // You might have an optional id field
  firstName: string;
  lastName?: string | null; // Use null for optional fields
  email: string;
}
