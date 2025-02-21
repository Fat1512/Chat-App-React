import { useMutation } from "@tanstack/react-query";
import {
  addcontactService,
  deletecontactService,
} from "../services/contactService";
import toast from "react-hot-toast";

function useDeleteContact() {
  const { isLoading, mutate: deleteContact } = useMutation({
    mutationFn: (contactId) => deletecontactService(contactId),
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { isLoading, deleteContact };
}

export default useDeleteContact;
