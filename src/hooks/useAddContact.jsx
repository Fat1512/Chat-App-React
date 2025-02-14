import { useMutation } from "@tanstack/react-query";
import { addContactAPI } from "../services/contactAPI";

function useAddContact() {
  const { isLoading, mutate: addContact } = useMutation({
    mutationFn: ({ username, name }) => addContactAPI({ username, name }),
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoading, addContact };
}

export default useAddContact;
