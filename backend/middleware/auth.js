const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});
// const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");

// const app = require("../app");

// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

// app.use(express.json())
// app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(fileUpload({useTempFiles: true}))

// //config
// if(process.env.NODE_ENV !=="PRODUCTION"){ 
//   require("dotenv").config({
//     path:"backend/config/.env"
//   })
// }

// //it's for ErrorHandling
// app.use(ErrorHandler)
 
// module.exports = app;