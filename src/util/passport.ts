import passport from "passport";
import passportJwt from "passport-jwt";

import User from "../models/mongoose/user.js";
import { PRIVATE_KEY } from "./private-key.js";
import { UserModel } from '../models/data_model/user.model';

const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;
const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PRIVATE_KEY,
};

// verify user token
const jwtAuthentication = new jwtStrategy(jwtOptions, (payload: UserModel, next) => {
  // payload from extracted token
  const id = payload._id;
  User.findById(id)
    .then((user) => {
      if (user) {
        next(null, user._id.toString());
      } else {
        next(null, false);
      }
    })
    .catch((err: any) => {
      next(err);
    });
});

passport.use(jwtAuthentication);

export const authMiddleware = passport.authenticate("jwt", { session: false });
