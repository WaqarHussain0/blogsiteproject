const request = require("supertest");
const app = require("../../index");
const User = require("../../models/pgUser")
describe("Admin Registration API", () => {
  it("should return 409 if the email already exists", async () => {
    // Test data for an invalid user with existing 'email' field
    const existingUser = {
      name: "dummy user",
      email: "abdullah.akhtar@piecyfer.com",
      password: "piecyfer@786",
    };

    // Send a POST request to the registration endpoint with incomplete data
    const response = await request(app)
      .post("/register/admin")
      .send(existingUser)
      .expect(409);

    // Assert that the response contains the correct error message
    expect(response.text).toBe("This email already exists");
  });

  it("should register a new admin user", async () => {
    // Test data for a new admin user
    const newUser = {
      name: "Muneeb Khalid",
      email: "muneeb.ahmad@piecyfer.com",
      password: "password123",
    };

    // Send a POST request to the registration endpoint
    const response = await request(app)
      .post("/register/admin")
      .send(newUser)
      .expect(201);

    // Assert that the response contains the registered user data
    expect(response.body).toEqual(
      expect.objectContaining({
        userID: expect.any(String),
        name: newUser.name,
        email: newUser.email,
        role: "admin",
      })
    );

    // Assert that the user is saved in the database
    const savedUser = await User.findOne({ where: { email: newUser.email } });
    expect(savedUser).toBeTruthy();
    expect(savedUser.name).toBe(newUser.name);
    expect(savedUser.email).toBe(newUser.email);
    expect(savedUser.role).toBe("admin");
  });

  it("should return 400 if Email is missing", async () => {
    // Test data for an invalid user with missing 'email' field
    const invalidUser = {
      name: "dummy user",
      password: "password123",
    };

    // Send a POST request to the registration endpoint with incomplete data
    const response = await request(app)
      .post("/register/admin")
      .send(invalidUser)
      .expect(400);

    // Assert that the response contains the correct error message
    expect(response.text).toBe("Email is required");
  });

  it("should return 400 if Email is missing", async () => {
    // Test data for an invalid user with missing 'email' field
    const invalidPassword = {
      name: "dummy user",
      email: "usman.afzal@piecyfer.com",
      password: "pass",
    };

    // Send a POST request to the registration endpoint with incomplete data
    const response = await request(app)
      .post("/register/admin")
      .send(invalidPassword)
      .expect(400);

    // Assert that the response contains the correct error message
    expect(response.text).toBe("Password must be at least 6 characters");
  });
});
