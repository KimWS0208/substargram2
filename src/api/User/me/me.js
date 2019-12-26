import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragment";
import { request } from "express";


export default {
    Query: {
        me: async(_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            const userProfile = await prisma.user({id:user.id});
            const posts = await prisma.user({id:user.id}).post();
            return {
                user: userProfile, 
                posts
            }

        }
    }
    
}