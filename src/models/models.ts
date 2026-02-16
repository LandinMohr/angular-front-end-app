// models.ts

export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserStatus = "active" | "inactive" | "banned";

export type UserResponse =
  | { status: "success"; user: User }
  | { status: "error"; message: string };

/*
User is an interface because it defines a clear object structure.
UserStatus is a type because it is a fixed set of values.
UserResponse is a type because it uses a union of different shapes.
*/
