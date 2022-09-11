const { mockRequest, mockResponse } = require("../mocker");
const jestMock = require("jest-mock");
const categoryModel = require("../../SRC/models/category");
const categoryController = require("../../SRC/controllers/categoryController");



const testPayload = [
    {
        "categoryId": 1,
        "name": "Electronics"
    },
    {
        "categoryId": 2,
        "name": "Fashion"
    },
    {
        "categoryId": 3,
        "name": "Mobiles"
    }
];

describe('All Category controller', () => {
    it('should return error', async () => {
        const spy = jestMock.spyOn(categoryModel, 'listCategories').mockImplementation(cb => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        
        await categoryController.listCategories(req,res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        // expect(res.send).toHaveBeenCalledWith({
		// 	success: false,
		// 	msg: "Error in fetching categories"
		// });
    })
})

describe('All Category controller', () => {
    it('should return all categories', async () => {
        
        const spy = jestMock.spyOn(categoryModel, 'listCategories').mockImplementation(cb => cb(null, testPayload));
        const req = mockRequest();
        const res = mockResponse();
        
        await categoryController.listCategories(req,res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
       
    })
});


