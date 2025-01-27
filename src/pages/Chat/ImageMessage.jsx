function ImageMessage({ images }) {
  console.log;
  return (
    <div className="pb-6">
      {images.map((url) => (
        <img key={url} className="w-[200rem] object-contain" src={url} />
      ))}
    </div>
  );
}

export default ImageMessage;
