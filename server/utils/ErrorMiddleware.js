const errorMiddleware = (err, req, res, next) => {
   
    console.log("yeah the error middleware is working like mad")
   
    try {
      let error = { ...err };
  
      error.message = err.message;
  
      console.error(err);
  
      // Mongoose bad ObjectId
      if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new Error(message);
        error.statusCode = 404;
      }
  
      // Mongoose duplicate key
      if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new Error(message);
        error.statusCode = 400;
      }
  
      // Mongoose validation error
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new Error(message.join(', '));
        error.statusCode = 400;
      }
  
     return res.status(error.statusCode || 500).json({ error: error.message || 'Server Error', details : error.details || "No details" });
    } catch (error) {
      next(error);
    }
  };
  
  
  module.exports = {
    errorMiddleware
  }