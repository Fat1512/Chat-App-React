import { useMutation } from "@tanstack/react-query";
import { addcontactService } from "../services/contactService";
import toast from "react-hot-toast";

function useAddContact() {
  const { isLoading, mutate: addContact } = useMutation({
    mutationFn: ({ username, name }) => addcontactService({ username, name }),
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { isLoading, addContact };
}

export default useAddContact;
