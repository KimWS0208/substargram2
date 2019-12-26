import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import dotenv from "dotenv";

import schema from "./schema";
import "./passport";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

import { autenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

import {sendSecretMail} from "./utils";
import {mailGunSendMail} from "./utils";


const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema,
    context: ({request}) => ({request, isAuthenticated})
});

server.express.use(logger("dev")); //미들웨어 추가
// server.express.use(passport.authenticate("jwt"));
server.express.use(autenticateJwt)

server.start({port:PORT}, () => console.log(`Server running on prot http://localhost:${PORT}`))

