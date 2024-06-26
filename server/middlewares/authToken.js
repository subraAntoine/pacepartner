const jwt = require('jsonwebtoken');
const authToken = (req, res, next) => {
    const token = req.cookies.jwt;


    if(!token){
        res.status(401).json({message: "Vous devez être connecté pour accéder à cette page"});

    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (error) {

        res.status(401).json({message: "Vous devez être connecté pour accéder à cette page"});

    }
}

module.exports = authToken;