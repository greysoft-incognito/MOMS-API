/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from '../helpers/response';
import mg from '../helpers/mailgun';

export default {
  mail: {
    newMailingList: async (data: { listName: string }) => {
      const listName = data.listName;

      if (!listName) {
        throw new ErrorResponse('list name cannot be empty', 400);
      }

      const list = await mg.lists.create({ address: listName });
      return list;
    },
    removeFromWaitingList: async (data: {
      email: string;
      listName: string;
    }) => {
      try {
        const result = await mg.lists.members.destroyMember(
          data.listName,
          data.email
        );
        return result; // data about user  message
      } catch (error: any) {
        throw new Error(error);
      }
    },
    getMailingListMembers: async (data: { listName: string }) => {
      try {
        const list = await mg.lists.members.listMembers(data.listName);
        return list;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    getOneMailingList: async (data: { listName: string }) => {
      const listName = data.listName;

      try {
        const list = await mg.lists.get(listName);
        return list;
      } catch (error: any) {
        if (error.status === 404) {
          throw new ErrorResponse(`${listName} is not a valid mailing List`);
        }
        throw new Error(error);
      }
    },
    addToMailing: async (data: {
      email: string;
      listName: string;
      name: string;
    }) => {
      try {
        const result = await mg.lists.members.createMember(data.listName, {
          address: data.email,
          name: data.name,
        });
        return result;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    getAllMailingList: async () => {
      try {
        const result = await mg.lists.list();
        return result;
      } catch (error: any) {
        if (error.status === 404)
          throw new ErrorResponse('mail list is empty', 404);

        throw new Error(error);
      }
    },
  },
  deleteMailingList: async (data: { listName: string }) => {
    try {
      const result = await mg.lists.destroy(data.listName);
      return result;
    } catch (error: any) {
      if (error.status === 404)
        throw new ErrorResponse(
          `${data.listName} is not a valid mailing List`,
          404
        );

      throw new Error(error);
    }
  },

  users: {
    //     getAll: async (req,res)=>{
    //         await UserModel.find({})
    //             .then(users=>{
    //                 res.send(users)
    //             })
    //             .catch(err=>res.send(err))
  },
};
