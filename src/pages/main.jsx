import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="bg-pink-200 min-h-screen flex flex-col justify-center items-center">
      <div className="text-6xl font-bold">이상형 월드컵</div>
      <Link to="/worldcup">
        <button className="bg-pink-400 text-white px-4 py-2 rounded-lg mt-8">
          시작
        </button>
      </Link>
    </div>
  );
};

export default Main;
