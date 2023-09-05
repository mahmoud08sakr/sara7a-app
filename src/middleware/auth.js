import jwt  from "jsonwebtoken"

export const auth = (req, res, next) => {

    let token = req.header("token")

    jwt.verify(token, "sakr", (err, decoded) => {

        if (err) return res.json({ message: "token invalid", err })

        req.userId = decoded.id
        next()

    })

}