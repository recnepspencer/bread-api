import { createRequest, createResponse } from '../../utils/interceptor';
import { createTag, getTags, getTag, updateTag, deleteTag } from './tagController';
import Tag from '../../models/Tag';
import { isMongoError } from '../../utils/validation';
import { MongoError } from 'mongodb';

jest.mock('../../models/Tag');
jest.mock('../../utils/validation', () => ({
    isMongoError: jest.fn(),
}));

describe('Tag Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /tag', () => {
        test('should return 201 and create a new tag', async () => {
            const req: any = createRequest({ body: { name: 'New Tag' } });
            const res: any = createResponse();

            const savedTag = { _id: 'someId', name: 'New Tag' };
            jest.spyOn(Tag.prototype, 'save').mockResolvedValue(savedTag);

            await createTag(req, res);

            expect(Tag.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedTag);
        });

        test('should return 400 and error message on MongoError', async () => {
            const req: any = createRequest({ body: { name: 'New Tag' } });
            const res: any = createResponse();

            const mongoError = new MongoError('Duplicate key error');
            jest.spyOn(Tag.prototype, 'save').mockRejectedValue(mongoError);
            (isMongoError as any).mockReturnValue(true);

            await createTag(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating tag', error: 'Duplicate key error' });
        });
    });

    describe('GET /tag', () => {
        test('should return 200 and all tags', async () => {
            const req: any = createRequest();
            const res: any = createResponse();

            const tags = [{ name: 'tag1' }, { name: 'tag2' }];
            const execMock = jest.fn().mockResolvedValue(tags);
            jest.spyOn(Tag, 'find').mockReturnValue({ exec: execMock } as any);

            await getTags(req, res);

            expect(Tag.find).toHaveBeenCalled();
            expect(execMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(tags);
        });

        test('should return 500 and error message on MongoError', async () => {
            const req: any = createRequest();
            const res: any = createResponse();

            const mongoError = new MongoError('Database error');
            jest.spyOn(Tag, 'find').mockReturnValue({ exec: jest.fn().mockRejectedValue(mongoError) } as any);
            (isMongoError as any).mockReturnValue(true);

            await getTags(req, res);

            expect(Tag.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving tags', error: 'Database error' });
        });
    });

    describe('GET /tag/:id', () => {
        test('should return 200 and the tag', async () => {
            const req: any = createRequest({}, { id: 'tagId' });
            const res: any = createResponse();

            const tag = { _id: 'tagId', name: 'Test Tag' };
            const execMock = jest.fn().mockResolvedValue(tag);
            jest.spyOn(Tag, 'findById').mockReturnValue({ exec: execMock } as any);

            await getTag(req, res);

            expect(Tag.findById).toHaveBeenCalledWith('tagId');
            expect(execMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(tag);
        });

        test('should return 404 if tag not found', async () => {
            const req: any = createRequest({}, { id: 'nonExistentId' });
            const res: any = createResponse();

            const execMock = jest.fn().mockResolvedValue(null);
            jest.spyOn(Tag, 'findById').mockReturnValue({ exec: execMock } as any);

            await getTag(req, res);

            expect(Tag.findById).toHaveBeenCalledWith('nonExistentId');
            expect(execMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tag not found' });
        });
    });
    describe('PUT /tag/:id', () => {
        test('should return 200 and update the tag', async () => {
            const req: any = createRequest(
                { name: 'Updated Tag' },
                { id: 'tagId' }
            );
            const res: any = createResponse();
    
            const tag = { name: 'Old Tag', save: jest.fn().mockResolvedValue(null) };
            jest.spyOn(Tag, 'findById').mockResolvedValue(tag as any);
    
            await updateTag(req, res);
    
            expect(Tag.findById).toHaveBeenCalledWith('tagId');
            expect(tag.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(tag);
        });
    
        test('should return 404 if tag not found', async () => {
            const req: any = createRequest(
                { name: 'Updated Tag' },
                { id: 'nonExistentId' }
            );
            const res: any = createResponse();
    
            jest.spyOn(Tag, 'findById').mockResolvedValue(null);
    
            await updateTag(req, res);
    
            expect(Tag.findById).toHaveBeenCalledWith('nonExistentId');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tag not found' });
        });
    
        test('should return 400 and error message on MongoError', async () => {
            const req: any = createRequest(
                { name: 'Updated Tag' },
                { id: 'tagId' }
            );
            const res: any = createResponse();
    
            const mongoError = new MongoError('MongoDB error');
            jest.spyOn(Tag, 'findById').mockImplementation(() => {
                throw mongoError;
            });
    
            (isMongoError as any).mockReturnValue(true);
    
            await updateTag(req, res);
    
            expect(Tag.findById).toHaveBeenCalledWith('tagId');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating tag', error: 'MongoDB error' });
        });
    });    
    
    describe('DELETE /tag/:id', () => {
        test('should return 200 and delete the tag', async () => {
            const req: any = createRequest({}, { id: 'tagId' });
            const res: any = createResponse();

            const deletedTag = { _id: 'tagId', name: 'Deleted Tag' };
            const execMock = jest.fn().mockResolvedValue(deletedTag);
            jest.spyOn(Tag, 'findByIdAndDelete').mockReturnValue({ exec: execMock } as any);

            await deleteTag(req, res);

            expect(Tag.findByIdAndDelete).toHaveBeenCalledWith('tagId');
            expect(execMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tag deleted successfully' });
        });

        test('should return 404 if tag not found', async () => {
            const req: any = createRequest({}, { id: 'nonExistentId' });
            const res: any = createResponse();

            const execMock = jest.fn().mockResolvedValue(null);
            jest.spyOn(Tag, 'findByIdAndDelete').mockReturnValue({ exec: execMock } as any);

            await deleteTag(req, res);

            expect(Tag.findByIdAndDelete).toHaveBeenCalledWith('nonExistentId');
            expect(execMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tag not found' });
        });
    });
});