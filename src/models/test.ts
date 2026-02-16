import { User, UserStatus, UserResponse } from "./models";

const user: User = {
  id: 1,
  name: "Landin",
  email: "landin@example.com",
};

const status: UserStatus = "active";

const response: UserResponse = {
  status: "success",
  user,
};

console.log(user, status, response);
