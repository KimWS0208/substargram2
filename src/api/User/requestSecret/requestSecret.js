import { prisma } from "../../../../generated/prisma-client";
import {generateSecret, sendSecretMail, mailGunSendMail} from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args) => {
            // console.log(request.user)
            const { email } = args;
            const loginSecret = generateSecret();
            // throw Error("qesdfjjfg")
            // console.log(loginSecret)
            try {
                // throw Error()
                // await sendSecretMail(email, loginSecret);
                await mailGunSendMail(email, loginSecret);
                console.log("qwe")
                await prisma.updateUser({ data:{loginSecret}, where: {email} });
                console.log("qwetywe")
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
            
        }
    }
}