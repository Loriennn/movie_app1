import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? 'text-yellow-400 font-semibold'
            : 'hover:text-gray-300';

    return (
        <nav className="bg-gray-800 text-white p-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold">
                    Movie App
                </NavLink>
                <div className="space-x-4">
                    <NavLink to="/" className={linkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/top-rated" className={linkClass}>
                        Top Rated
                    </NavLink>
                    <NavLink to="/random" className={linkClass}>
                        Random
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
