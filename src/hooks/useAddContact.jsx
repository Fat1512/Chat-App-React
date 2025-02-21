import { useMutation } from "@tanstack/react-query";
import { addContactAPI } from "../services/contactAPI";
import toast from "react-hot-toast";

function useAddContact() {
  const { isLoading, mutate: addContact } = useMutation({
    mutationFn: ({ username, name }) => addContactAPI({ username, name }),
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { isLoading, addContact };
}

export default useAddContact;
