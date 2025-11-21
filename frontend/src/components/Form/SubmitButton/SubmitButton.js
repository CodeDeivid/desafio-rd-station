function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="inline-flex transform items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md transition duration-150 ease-out hover:scale-105 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 active:bg-blue-800"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
