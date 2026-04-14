import ApiError from "../utils/api-error.utils.js";

const validateReqData = (Dtoclass)=>{
  return (req, res, next)=>{
    const {errors, value} = Dtoclass.validate(req.body);
    
    if(errors){
      throw ApiError.badRequest(errors.join("; "))
    }

    req.body = value; //we update with validated data
    next();
  }
}


export default validateReqData;
