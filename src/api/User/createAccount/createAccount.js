import { prisma } from "../../../../generated/prisma-client"

export default {
    Mutation: {
        createAccount: async(_, args, {request}) => {
            const { userName, email, firstName="", lastName="", bio="", avatar=""} = args;
            const exists = await prisma.$exists.user({userName});
            if(exists){
                throw Error("This userName is already token")
            }
            await prisma.createUser({
                userName,
                email,
                firstName,
                lastName,
                bio,
                avatar
            });
            return true
        }
    }
}