import { ErrorRequestHandler } from "express";

// Catch Global Error
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {


  console.log('error',err.message)

 if(err.message && err.message.startsWith('SQLITE_CONSTRAINT')){
   err.message='Opps somthing went wrong!'
 }
  err.statusCode =err.statusCode || 500;
  err.status = err.status || 'error'
  
  res.status(err.statusCode).json({
    status:err.status,
    message: err.message
  })
};
export default globalErrorHandler
