function Heading({ children, addedStyle }) {
  return <p className={`text-5xl ${addedStyle}`}>{children}</p>;
}

export default Heading;
