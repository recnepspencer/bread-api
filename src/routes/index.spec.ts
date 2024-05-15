// import request from "supertest";
// import { Request, Response } from "express";
// import app from "../server";
// import * as contactController from "../controllers/ContactController";

// describe("API Routes", () => {
//   test('GET /spencer should return "Spencer is cool"', async () => {
//     const response = await request(app).get("/");
//     expect(response.status).toBe(200);
//     expect(response.text).toContain("Spencer is cool");
//   });
// });

// jest.mock("../controllers/ContactController");

// describe("Contact routes", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("POST /contacts creates a contact", async () => {
//     const mockCreateContact =
//       contactController.createContact as jest.MockedFunction<
//         typeof contactController.createContact
//       >;
//     mockCreateContact.mockImplementation(
//       async (req: Request, res: Response) => {
//         return res.status(201).json({
//           id: "123",
//           ...req.body,
//         });
//       }
//     );

//     const newContact = {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//       favoriteColor: "blue",
//       birthday: "1990-05-15",
//     };

//     const response = await request(app).post("/contacts").send(newContact);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       id: "123",
//       ...newContact,
//     });
//   });

//   test("GET /contacts retrieves all contacts", async () => {
//     const mockGetContacts =
//       contactController.getContacts as jest.MockedFunction<
//         typeof contactController.getContacts
//       >;
//     mockGetContacts.mockImplementation(
//       async (req: Request, res: Response): Promise<void> => {
//         res.status(200).json([
//           {
//             id: "123",
//             firstName: "Alice",
//             lastName: "Smith",
//             email: "alice.smith@example.com",
//             favoriteColor: "green",
//             birthday: "1985-09-15",
//           },
//         ]);
//         return; // Explicitly return void
//       }
//     );

//     const response = await request(app).get("/contacts");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([
//       {
//         id: "123",
//         firstName: "Alice",
//         lastName: "Smith",
//         email: "alice.smith@example.com",
//         favoriteColor: "green",
//         birthday: "1985-09-15",
//       },
//     ]);
//   });
// });
// test("GET /contacts/:id retrieves a single contact", async () => {
//   const mockGetContact = contactController.getContact as jest.MockedFunction<
//     typeof contactController.getContact
//   >;
//   mockGetContact.mockImplementation(async (req: Request, res: Response) => {
//     if (req.params.id === "123") {
//       return res.status(200).json({
//         id: "123",
//         firstName: "Bob",
//         lastName: "Brown",
//         email: "bob.brown@example.com",
//         favoriteColor: "red",
//         birthday: "1992-08-10",
//       });
//     } else {
//       return res.status(404).json({ message: "Contact not found." });
//     }
//   });

//   const response = await request(app).get("/contacts/123");
//   expect(response.status).toBe(200);
//   expect(response.body).toEqual({
//     id: "123",
//     firstName: "Bob",
//     lastName: "Brown",
//     email: "bob.brown@example.com",
//     favoriteColor: "red",
//     birthday: "1992-08-10",
//   });
// });
// test("PUT /contacts/:id updates a contact", async () => {
//   const mockUpdateContact =
//     contactController.updateContact as jest.MockedFunction<
//       typeof contactController.updateContact
//     >;
//   mockUpdateContact.mockImplementation(async (req: Request, res: Response) => {
//     if (req.params.id === "123") {
//       return res.status(204).send();
//     } else {
//       return res.status(404).json({ message: "Contact not found." });
//     }
//   });
//   const updatedContact = {
//     firstName: "Robert",
//     email: "bob.newemail@example.com",
//     favoriteColor: "blue",
//   };

//   const response = await request(app).put("/contacts/123").send(updatedContact);

//   // Check only the status, expect no content.
//   expect(response.status).toBe(204);
//   expect(response.body).toEqual({});
// });
// test("DELETE /contacts/:id deletes a contact", async () => {
//   const mockDeleteContact =
//     contactController.deleteContact as jest.MockedFunction<
//       typeof contactController.deleteContact
//     >;
//   mockDeleteContact.mockImplementation(async (req: Request, res: Response) => {
//     if (req.params.id === "123") {
//       return res.status(200).json({});
//     } else {
//       return res.status(404).json({ message: "Contact not found." });
//     }
//   });

//   const response = await request(app).delete("/contacts/123");
//   expect(response.status).toBe(200);
//   expect(response.body).toEqual({});
// });
