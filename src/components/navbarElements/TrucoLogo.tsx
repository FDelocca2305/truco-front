import React, { useContext } from 'react';
import logo from '../../../public/LOGO.png';
import { Link } from 'react-router-dom';
import { GameContext } from '../../context/gameContext';

const TrucoLogo: React.FC = () => {
  const { closeSideBar } = useContext(GameContext)
  return (
    <Link to={"/"} className='w-full relative flex justify-center text-text'
      onClick={closeSideBar}>
      <img src={logo} alt='Logo' className='w-[115px] h-[115px] rotate-6' />
    </Link>
  );
};

export default TrucoLogo;
