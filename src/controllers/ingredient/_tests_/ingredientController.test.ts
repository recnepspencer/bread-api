import { Request, Response } from 'express';
import { createIngredient, getIngredients, getIngredient, getIngredientByName, updateIngredient, deleteIngredient } from '../ingredientController';
import Ingredient from '../../../models/Ingredient';
import { isMongoError } from '../../../utils/validation';

jest.mock('../../../models/Ingredient');
jest.mock('../../../utils/validation');

describe('Ingredient Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createIngredient', () => {
    it('should create a new ingredient and return 201 status', async () => {
      req.body = { name: 'Sugar' };
      const mockSave = jest.fn().mockResolvedValue({ name: 'Sugar' });
      (Ingredient as any).mockImplementation(() => ({
        save: mockSave,
        name: 'Sugar'
      }));

      await createIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ name: 'Sugar' });
    });

    it('should handle errors and return 400 status', async () => {
      req.body = { name: 'Sugar' };
      const mockSave = jest.fn().mockRejectedValue(new Error('Mongo error'));
      (Ingredient as any).mockImplementation(() => ({
        save: mockSave,
      }));
      (isMongoError as unknown as jest.Mock).mockReturnValue(true);

      await createIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating ingredient',
        error: 'Mongo error',
      });
    });

    it('should return 400 if ingredient name is not provided', async () => {
      req.body = {};

      await createIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Ingredient name is required',
      });
    });

    it('should handle validation errors and return 422 status', async () => {
      req.body = { name: '' };
      const mockSave = jest.fn().mockRejectedValue(new Error('Validation error'));
      (Ingredient as any).mockImplementation(() => ({
        save: mockSave,
      }));
      (isMongoError as unknown as jest.Mock).mockReturnValue(false);

      await createIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Validation error',
        error: 'Validation error',
      });
    });

    it('should return 500 if an unexpected error occurs', async () => {
      req.body = { name: 'Sugar' };
      const mockSave = jest.fn().mockRejectedValue(new Error('Unexpected error'));
      (Ingredient as any).mockImplementation(() => ({
        save: mockSave,
      }));
      (isMongoError as unknown as jest.Mock).mockReturnValue(false);

      await createIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Unexpected error',
        error: 'Unexpected error',
      });
    });
  });

  describe('getIngredients', () => {
    it('should return all ingredients', async () => {
      const mockFind = jest.fn().mockResolvedValue([{ name: 'Sugar' }, { name: 'Salt' }]);
      (Ingredient as any).find = mockFind;

      await getIngredients(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ name: 'Sugar' }, { name: 'Salt' }]);
    });

    it('should handle errors and return 500 status', async () => {
      const mockFind = jest.fn().mockRejectedValue(new Error('Unexpected error'));
      (Ingredient as any).find = mockFind;

      await getIngredients(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error retrieving ingredients',
        error: 'Unexpected error',
      });
    });
  });

  describe('getIngredient', () => {
    it('should return a specific ingredient by ID', async () => {
      req.params = { id: '123' };
      const mockFindById = jest.fn().mockResolvedValue({ name: 'Sugar' });
      (Ingredient as any).findById = mockFindById;

      await getIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: 'Sugar' });
    });

    it('should handle errors and return 500 status', async () => {
      req.params = { id: '123' };
      const mockFindById = jest.fn().mockRejectedValue(new Error('Unexpected error'));
      (Ingredient as any).findById = mockFindById;

      await getIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error retrieving ingredient',
        error: 'Unexpected error',
      });
    });
  });

  describe('getIngredientByName', () => {
    it('should return a specific ingredient by name', async () => {
      req.params = { name: 'Sugar' };
      const mockFindOne = jest.fn().mockResolvedValue({ name: 'Sugar' });
      (Ingredient as any).findOne = mockFindOne;

      await getIngredientByName(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: 'Sugar' });
    });

    it('should handle errors and return 500 status', async () => {
      req.params = { name: 'Sugar' };
      const mockFindOne = jest.fn().mockRejectedValue(new Error('Unexpected error'));
      (Ingredient as any).findOne = mockFindOne;

      await getIngredientByName(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error retrieving ingredient',
        error: 'Unexpected error',
      });
    });
  });

  describe('updateIngredient', () => {
    it('should update an ingredient and return the updated ingredient', async () => {
      req.params = { id: '123' };
      req.body = { name: 'Honey' };
      const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({ name: 'Honey' });
      (Ingredient as any).findByIdAndUpdate = mockFindByIdAndUpdate;

      await updateIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: 'Honey' });
    });

    it('should handle errors and return 500 status', async () => {
      req.params = { id: '123' };
      req.body = { name: 'Honey' };
      const mockFindByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Unexpected error'));
      (Ingredient as any).findByIdAndUpdate = mockFindByIdAndUpdate;

      await updateIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error updating ingredient',
        error: 'Unexpected error',
      });
    });
  });

  describe('deleteIngredient', () => {
    it('should delete an ingredient and return 204 status', async () => {
      req.params = { id: '123' };
      const mockFindByIdAndDelete = jest.fn().mockResolvedValue(null);
      (Ingredient as any).findByIdAndDelete = mockFindByIdAndDelete;

      await deleteIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should handle errors and return 500 status', async () => {
      req.params = { id: '123' };
      const mockFindByIdAndDelete = jest.fn().mockRejectedValue(new Error('Unexpected error'));
      (Ingredient as any).findByIdAndDelete = mockFindByIdAndDelete;

      await deleteIngredient(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error deleting ingredient',
        error: 'Unexpected error',
      });
    });
  });
});
