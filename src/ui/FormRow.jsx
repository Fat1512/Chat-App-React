import Label from "./Label";
import Row from "./Row";

function FormRow({ label, children, addedStyle }) {
  return (
    <Row addedStyle={`py-3 text-2xl ${addedStyle}`}>
      <Label>{label}</Label>
      {children}
    </Row>
  );
}

export default FormRow;
