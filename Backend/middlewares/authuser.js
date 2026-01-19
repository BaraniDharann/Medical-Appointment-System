import jwt from 'jsonwebtoken'
// user-authentication-middleware
const authuser = async (req,res, next) =>{
try {
const {token, atoken} = req.headers
const authToken = token || atoken
if (!authToken) {
return res.json({success: false, message: 'Not Authorized Login Again'})
}
const token_decode = jwt.verify(authToken, process.env.JWT_SECRET)

if(token_decode.id){
    req.userId = token_decode.id
}
next()
} catch (error) {
console.log(error)
res.json({success: false, message:error.message})
}
}
export default authuser;

