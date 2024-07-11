import { createRequest, createResponse } from "../../utils/interceptor";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./UserController";
import User from "../../models/User";
import { isMongoError } from "../../utils/validation";
import { MongoError } from "mongodb";

jest.mock("../../models/User");
jest.mock("../../utils/validation", () => ({
  isMongoError: jest.fn(),
}));

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /user", () => {
    test("should return 200 and all users", async () => {
      const req: any = createRequest();
      const res: any = createResponse();

      const users = [{ name: "user1" }, { name: "user2" }];
      const execMock = jest.fn().mockResolvedValue(users);
      const populateMock = jest.fn().mockReturnThis();

      jest.spyOn(User, "find").mockReturnValue({
        populate: populateMock,
        exec: execMock,
      } as any);

      await getUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    test("should return 500 and error message on MongoError", async () => {
      const req: any = createRequest();
      const res: any = createResponse();

      const mongoError = new MongoError("MongoDB error");
      jest.spyOn(User, "find").mockImplementation(() => {
        throw mongoError;
      });

      (isMongoError as any).mockReturnValue(true);

      await getUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving users", error: "MongoDB error" });
    });
  });

  describe("POST /user", () => {
    test("should return 201 and create a new user", async () => {
      const req: any = createRequest({
        username: "user1",
        email: "user1@example.com",
        password: "password",
        firstName: "First",
        lastName: "Last",
        preferences: [],
        madeRecipes: [],
      });
      const res: any = createResponse();

      const newUser = req.body;
      jest.spyOn(User.prototype, "save").mockImplementation(() => Promise.resolve(newUser));

      await createUser(req, res);

      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });

    test("should return 400 and error message on MongoError", async () => {
      const req: any = createRequest();
      const res: any = createResponse();

      const mongoError = new MongoError("MongoDB error");
      jest.spyOn(User.prototype, "save").mockImplementation(() => {
        throw mongoError;
      });

      (isMongoError as any).mockReturnValue(true);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Error creating user", error: "MongoDB error" });
    });
  });

  describe("GET /user/:id", () => {
    test("should return 200 and the user", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();
    
      const user = { username: "user1" };
      const execMock = jest.fn().mockResolvedValue(user);
      const populateMock = jest.fn().mockReturnThis();
    
      jest.spyOn(User, "findById").mockReturnValue({
        populate: populateMock,
        exec: execMock,
      } as any);
    
      await getUser(req, res);
    
      expect(User.findById).toHaveBeenCalledWith("userId");
      expect(populateMock).toHaveBeenCalledWith('preferences');
      expect(populateMock).toHaveBeenCalledWith('madeRecipes');
      expect(execMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    test("should return 404 if user not found", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();
    
      const execMock = jest.fn().mockResolvedValue(null);
      const populateMock = jest.fn().mockReturnThis();
    
      jest.spyOn(User, "findById").mockReturnValue({
        populate: populateMock,
        exec: execMock,
      } as any);
    
      await getUser(req, res);
    
      expect(User.findById).toHaveBeenCalledWith("userId");
      expect(populateMock).toHaveBeenCalledWith('preferences');
      expect(populateMock).toHaveBeenCalledWith('madeRecipes');
      expect(execMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
    test("should return 500 and error message on MongoError", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();

      const mongoError = new MongoError("MongoDB error");
      jest.spyOn(User, "findById").mockImplementation(() => {
        throw mongoError;
      });

      (isMongoError as any).mockReturnValue(true);

      await getUser(req, res);

      expect(User.findById).toHaveBeenCalledWith("userId");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving user", error: "MongoDB error" });
    });
  });

  describe("PUT /user/:id", () => {
    test("should return 200 and update the user", async () => {
      const req: any = createRequest(
        {
          username: "updatedUser",
          email: "updatedUser@example.com",
        },
        { id: "userId" }
      );
      const res: any = createResponse();

      const user = { username: "user1", email: "user1@example.com", save: jest.fn().mockResolvedValue(null) };
      jest.spyOn(User, "findById").mockResolvedValue(user as any);

      await updateUser(req, res);

      expect(User.findById).toHaveBeenCalledWith("userId");
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    test("should return 404 if user not found", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();

      jest.spyOn(User, "findById").mockResolvedValue(null);

      await updateUser(req, res);

      expect(User.findById).toHaveBeenCalledWith("userId");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test("should return 400 and error message on MongoError", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();

      const mongoError = new MongoError("MongoDB error");
      jest.spyOn(User, "findById").mockImplementation(() => {
        throw mongoError;
      });

      (isMongoError as any).mockReturnValue(true);

      await updateUser(req, res);

      expect(User.findById).toHaveBeenCalledWith("userId");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Error updating user", error: "MongoDB error" });
    });
  });

  describe("DELETE /user/:id", () => {
    test("should return 204 and delete the user", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();

      const user = { name: "user1" };
      jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(user as any);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("userId");
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });
    });

    test("should return 404 if user not found", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();

      jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(null);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("userId");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test("should return 500 and error message on MongoError", async () => {
      const req: any = createRequest({}, { id: "userId" });
      const res: any = createResponse();

      const mongoError = new MongoError("MongoDB error");
      jest.spyOn(User, "findByIdAndDelete").mockImplementation(() => {
        throw mongoError;
      });

      (isMongoError as any).mockReturnValue(true);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("userId");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error deleting user", error: "MongoDB error" });
    });
  });
});
