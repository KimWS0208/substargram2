import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        editUser: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { userName,  email, firstName, lastName, bio, avatar} = args;
            const {user} = request;
            return prisma.updateUser({
                where:{
                    id: user.id
                },
                data:{
                    userName, email, firstName, lastName, bio, avatar
                }
            })
        }
    }
}