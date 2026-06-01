import Spinner from "../_components/Spinner";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Spinner />
      <p>Loading Cabins...</p>
    </div>
  );
};

export default Loading;
