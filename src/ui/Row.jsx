function Row({ children, addedStyle }) {
  return <div className={`flex ${addedStyle}`}>{children}</div>;
}

export default Row;
