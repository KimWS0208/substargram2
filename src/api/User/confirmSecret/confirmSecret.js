import { prisma } from "../../../../generated/prisma-client";
import { EROFS } from "constants";
import { generateToken } from "../../../utils";


export default {
    Mutation: {
        confirmSecret: async(_, args ) => {
            const { email,secret } = args;
            const user = await prisma.user({email})
            if(user.loginSecret === secret){
                await prisma.updateUser({where: {id:user.id}, data:{loginSecret:""}})
                // JWT
                return generateToken(user.id);
            } else {
                throw Error("이메일과 비밀번호가 달라요~")
            }
        }
    }
}