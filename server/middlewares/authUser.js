//user authentication middleware

//we will get the cookies from the request api endpoints, so from those cookies, we wil lextract the token
//next will execute the controller function 
import jwt from 'jsonwebtoken';

const authUser = async(req, res, next) => 
{console.log('Cookies received:', req.cookies);
    const {token} = req.cookies;

    if(!token)
    {
        return res.json({ success: false, message: 'Not Authorized' })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if(tokenDecode.id)
        {
            req.userId = tokenDecode.id;
        } 
        else{
            return res.json({ success: false, message: 'Not Authorized' })
        }
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export default authUser;