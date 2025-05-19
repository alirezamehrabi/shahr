export function Loading() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.18)] text-white flex justify-center items-center z-50">
      <div className="border-4 border-white bg-transparent !border-l-blue-500 animate-spin w-6 h-6 rounded-full shadow-md" />
    </div>
  );
}
