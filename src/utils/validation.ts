import { MongoError } from 'mongodb';

export const isMongoError = (error: any): error is MongoError => {
    return error instanceof MongoError;
};
