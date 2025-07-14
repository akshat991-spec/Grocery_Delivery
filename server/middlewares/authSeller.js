import jwt from 'jsonwebtoken';

const authSeller = async(req, res, next)=>
{
    const { sellerToken } = req.cookies;

    if(!sellerToken)
    {
        return res.json({ success: false, message: 'Not Authorized' })
    }
    try //if present we will decode this to token to extract the id
        {
            const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
    
            if(tokenDecode.email === process.env.SELLER_EMAIL)
            {
                next();
            } 
            else{
                return res.json({ success: false, message: 'Not Authorized' })
            }
            
        }catch (error) {
            return res.json({ success: false, message: error.mesage })
    
        }
}

export default authSeller