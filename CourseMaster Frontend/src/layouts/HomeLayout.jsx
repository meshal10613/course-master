import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router';

const HomeLayout = () => {
	return (
		<>
			<Navbar/>
			<div>
				<Outlet/>
			</div>
			<Footer/>
		</>
	);
};

export default HomeLayout;