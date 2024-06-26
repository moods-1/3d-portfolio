import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

import { styles } from '../styles';
import { projects } from '../constants';
import ProjectCard from './ProjectCard';


const Works = () => {
	const [mobile, setMobile] = useState(window.innerWidth < 800);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setMobile(window.innerWidth < 800);
		});
		return window.removeEventListener('resize', () => {});
	}, []);

	return (
		<div id='Projects' className='intersector'>
			<div className='px-6 sm:px-16 max-w-7xl mx-auto relative z-0'>
				<div>
					<p className={`${styles.sectionSubText} `}>My work</p>
					<h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
				</div>
				<div className='w-full flex'>
					<p className='mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px]'>
						Following projects showcases my skills and experience through
						real-world examples of my work. Each project is briefly described
						with links to code repositories and live demos in it. It reflects my
						ability to solve complex problems, work with different technologies,
						and manage projects effectively.
					</p>
				</div>
			</div>

			{mobile ? (
				<div className='mt-20 flex flex-wrap justify-center gap-7 px-6'>
					{projects.slice(0, 3).map((project, index) => (
						<ProjectCard key={`project-${index}`} index={index} {...project} />
					))}
				</div>
			) : (
				<Marquee
					gradient={false}
					className='overflow-y-visible py-10'
					pauseOnHover
					autoFill
					speed={70}
				>
					{projects.map((project, index) => (
						<ProjectCard key={`project-${index}`} index={index} {...project} />
					))}
				</Marquee>
			)}
		</div>
	);
};

export default Works;
