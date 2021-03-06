import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async(_, args,{request}) => {
            isAuthenticated(request);
            const {id} = args;
            const user = await prisma.user({id})
            const posts = await prisma.user({id}).post()
            return {
                user,
                posts
            }
        }
    }
}