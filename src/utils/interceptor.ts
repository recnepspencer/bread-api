export const createRequest = (body: any = {}, params: any = {}, query: any = {}): any => ({
    body,
    params,
    query,
});

export const createResponse = (): any => {
    const res: any = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    res.send = jest.fn().mockReturnThis();
    return res;
};
