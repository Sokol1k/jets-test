import jwt from 'jsonwebtoken'
import config from 'config'

import { Request, Response} from 'express'

export default (req : Request | any, res : Response, next : Function) : void => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).send({ message: 'Access Denied' })
      return
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch(error) {
    res.status(403).send({ message: 'Invalid Token' });
  }
}