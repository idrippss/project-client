import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
<header className="bg-gradient-to-b from-[#0f1d16] via-[#0f1d16]/90 to-transparent h-20 sticky top-0 left-0 w-full z-10">
<div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <img 
            src="/src/assets/images/logo blanc.png" 
            className="h-11 w-32" 
            alt="Logo" 
          /> 
        </Link>
        
       

        <ul className='flex gap-16'> 
          <Link to='/produits'>
            <li className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2'>
              Produits
            </li>
          </Link>
          <Link to='/modal'>
            <li className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2'>
              Articles
            </li>
          </Link>
          <Link to='/expertise'>
            <li className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2'>
              Expertise
            </li>
          </Link>
          <Link to='/durabilite'>
            <li className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2'>
              Durabilité
            </li>
          </Link>
          <Link to='/about'>
            <li className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold mt-2'>
              A propos
            </li>
          </Link>

          {currentUser ? (
            <Link to='/profile'>
              <img className='rounded-full h-9 w-9 object-cover transition-transform duration-300 hover:scale-110' src={currentUser.avatar} alt='profile' />
            </Link>
          ) : (
            <Link to='/profile'>
 <li className='relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125 text-white font-bold'>
    Sign in
  </li></Link>
          )}
        </ul>
      </div>
    </header>
  );
}
