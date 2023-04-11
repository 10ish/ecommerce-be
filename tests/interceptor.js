//this file contains all the objects like (req,res),req.body which are common in multiple files and which are supposed to be mocked in order tp successfully test our applications
//we need it in prder tp create the dummy request and response object

module.exports = {
  mockRequest: () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.query = jest.fn().mockReturnValue(req)
    return req
  },
  mockResponse: ()=>{
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  }
};

