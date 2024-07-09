import request from 'supertest';
import express, { Application } from 'express';
import mongoose, { mongo } from 'mongoose';
import { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes/recipeController';
import Recipe from '../models/Recipe';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { isMongoError } from '../utils/validation';

jest.mock('../models/Recipe');
jest.mock('../utils/validation');

const app: Application = express();
app.use(express.json());
app.use('/recipe', createRecipe);
app.use('/recipe', getRecipes);
app.use('/recipe', getRecipe);
app.use('/recipe', updateRecipe);
app.use('/recipe', deleteRecipe);

let mongoServer: MongoMemoryServer;

describe('Recipe Router', () => {
    beforeAll(async () => {
        // Mock connection to database
        mongoServer = await MongoMemoryServer.create();
        // mongoose.set('strictQuery', false);
        // mongoose.Promise = global.Promise;
        const uri = mongoServer.getUri();

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } as any);
    });

    afterAll(async () => {
        // Close connection to database
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    afterEach(async () => {
        jest.clearAllMocks();
        await mongoose.connection.db.dropDatabase();
    });

    it('should create a new recipe', async () => {
        const mockRecipe = {
            _id: '1',
            name: 'Test Recipe',
            description: 'Test Description',
            ingredients: [],
            instructions: 'Test Instructions',
            tools: [],
            tags: [],
            imagePath: 'test/path',
            difficulty: 'easy'
        };
        (Recipe.prototype.save as jest.Mock).mockResolvedValue(mockRecipe);

        const response = await request(app)
            .post('/recipe')
            .send({
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: [],
                instructions: 'Test Instructions',
                tools: [],
                tags: [],
                imagePath: 'test/path',
                difficulty: 'easy'
            });

        expect(response.status).toBe(201);
    });

    it('should get all recipes', async () => {
        const mockRecipes = [
            {
                _id: '1',
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: [],
                instructions: 'Test Instructions',
                tools: [],
                tags: [],
                imagePath: 'test/path',
                difficulty: 'easy'
            },
            {
                _id: '2',
                name: 'Test Recipe 2',
                description: 'Test Description 2',
                ingredients: [],
                instructions: 'Test Instructions 2',
                tools: [],
                tags: [],
                imagePath: 'test/path',
                difficulty: 'easy'
            }
        ];
        (Recipe.find as jest.Mock).mockResolvedValue(mockRecipes);

        const response = await request(app).get('/recipe');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRecipes);
    });

    it('should get a single recipe using the ID', async () => {
        const mockRecipe = {
            _id: '1',
            name: 'Test Recipe',
            description: 'Test Description',
            ingredients: [],
            instructions: 'Test Instructions',
            tools: [],
            tags: [],
            imagePath: 'test/path',
            difficulty: 'easy'
        };

        (Recipe.findById as jest.Mock).mockResolvedValue(mockRecipe);
        (Recipe.prototype.save as jest.Mock).mockResolvedValue(mockRecipe);
        
        const response = await request(app).put('/recipe/1').send(mockRecipe);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRecipe);
    });

    it('should delete a single recipe using the ID', async () => {
        const mockRecipe = {
            _id: '1',
            name: 'Test Recipe',
            description: 'Test Description',
            ingredients: [],
            instructions: 'Test Instructions',
            tools: [],
            tags: [],
            imagePath: 'test/path',
            difficulty: 'easy'
        };

        (Recipe.findByIdAndDelete as jest.Mock).mockResolvedValue(mockRecipe);
        (Recipe.prototype.save as jest.Mock).mockResolvedValue(mockRecipe);

        const response = await request(app).delete('/recipe/1').send(mockRecipe);
        expect(response.status).toBe(201);
        // expect(response.body.message).toBe("Recipe deleted successfully");
    });
});
