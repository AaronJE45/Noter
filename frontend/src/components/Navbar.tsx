
const Navbar = () => {
  return (
    <>
      <div className="navbar bg-[#000000] rounded-3xl shadow-lg">
        <div className="navbar-start">
          <p className="btn btn-ghost text-2xl text-[#FF6500]">Noter by AJ</p>
        </div>
        
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
