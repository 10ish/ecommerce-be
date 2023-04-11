const { mockRequest, mockResponse } = require("../../interceptor");
const db = require("../../../models");
const categoryController = require("../../../controllers/category.controller");
const categoryModel = db.category;
const newCategory = require("../../mock-data/new-category.json");
const categoryUpdateInfo = require('../../mock-data/category-update-info.json')
//creating a mock request and response before each test is carried out
let req, res,queryParam,id;
beforeEach(() => {
  req = mockRequest();
  res = mockResponse();
});
//describe is used to club two or more tests in a single block
describe("Create a category/Post a category", () => {
  //we need to pass the body as well before each test
  //to mock the post request, dummy category
  beforeEach(() => {
    req.body = newCategory;
    console.log(req.body);
  });

  //positive testing
  test("CategoryController.create is called and a category is created", async () => {
    //mocking model command
    //mocking the request to add a category into db, when we want to create a category in the post request we pass an object which has name and description in it which again makes the function dependent so we mock the request
    //newCategory is accessed through the mock data that we have stored with ourselves
    const spy = jest
      .spyOn(categoryModel, "create")
      .mockImplementation((newCategory) => {
        Promise.resolve(newCategory);
      });
    console.log("spy " + spy);
    //calling the create function
    await categoryController.create(req, res);
    //testing the create function
    expect(spy).toHaveBeenCalled();
    expect(categoryModel.create).toHaveBeenCalledWith(newCategory);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  //negative testing
  test("CategoryCOntroller.create is called and an error is thrown by that function", async () => {
    //mocking the db command
    let spy = jest
      .spyOn(categoryModel, "create")
      .mockImplementation((newCategory) => Promise.reject("There is an error"));

    //making the test call
    await categoryController.create(req, res);
    expect(spy).toHaveBeenCalled();
    expect(categoryModel.create).toHaveBeenCalledWith(newCategory);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: "some Internal error" });
  });
});
//Test to find all the categories

describe("Tests to get all the categories, ", () => {
  beforeEach(() => {
     queryParam = {
      where: { name: "Electronics" },
    };
    req.query = {
      name: "Electronics",
    };
  });
  //test 1
  test("categoryController.findAll is called and categories are sent as result", async () => {
    //creating mock model request
    const spy = jest
      .spyOn(categoryModel, "findAll")
      .mockImplementation((queryParam) => {
        Promise.resolve(newCategory);
      });
    //declaring query param as it is needed in the request

    //Making the call to test
    await categoryController.findAll(req, res);

    //test
    expect(spy).toHaveBeenCalled();
    expect(categoryModel.findAll).toHaveBeenCalledWith(queryParam);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("categoryController.findAll is called but unable to get categories", async () => {
    //creating a spy object that contains information of mock implementation of Category.findAll
    const spy = jest
      .spyOn(categoryModel, "findAll")
      .mockImplementation((queryParam) => {
        return Promise.reject(newCategory);
      });
    //calling the function
    await categoryController.findAll(req, res);
    expect(spy).toHaveBeenCalled();
    expect(categoryModel.findAll).toHaveBeenCalledWith(queryParam);
    expect(res.status).toHaveBeenCalledWith(500);
    //to check res.seend 
    //expect(res.send).toHaveBeenCalledWith({message:'Internal Server Error'})
  });
});
//TEst to update the category

describe('test to update product',()=>{
  beforeEach(()=>{
    req.params.id = 1;
     id = req.params.id
    req.body = categoryUpdateInfo,
    queryParam = {
      returning:true,
      where:{id:req.params.id}}
  })

test('categoryController.update is called and the product is successfully updated',async()=>{


const spy = jest.spyOn(categoryModel,'update').mockImplementation((categoryUpdateInfo,queryParam)=>{
  Promise.resolve(queryParam,categoryUpdateInfo)
})
const spy2 = jest.spyOn(categoryModel,'findByPk').mockImplementation((id)=>{
  Promise.resolve(id);
})

await categoryController.update(req,res);
expect(spy).toHaveBeenCalled();
expect(categoryModel.update).toHaveBeenCalledWith(categoryUpdateInfo,queryParam);
expect(spy2).toHaveBeenCalled();
expect(categoryModel.findByPk).toHaveBeenCalledWith(id)
expect(res.status).toHaveBeenCalledWith(200);
});
//thid id a test to check iff our server is giving relevant error or not 
test('CategoryController.update iscalled but there eas an error in updating thr category in the database',async ()=>{

})

})

