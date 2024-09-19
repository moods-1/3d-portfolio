import { useState } from 'react';
import { motion } from 'framer-motion';

import { ComputersCanvas } from './canvas';
import { Rotate360 } from '../assets';

const image360Variants = {
	visible: {
		opacity: [0, 0.5, 1, 0.5, 0],
		transition: { duration: 2, repeat: Infinity },
	},
};

const Hero = () => {
	const [showGuide, setShowGuide] = useState(true);
	return (
		<div
			className={`pt-20 bg-hero-pattern bg-cover bg-no-repeat bg-center relative w-full max-w-[1920px] h-screen mx-auto`}
		>
			<div
				className={`absolute inset-0 top-[70px]  max-w-7xl mx-auto sm:px-16 px-6 flex flex-row items-start gap-5`}
			>
				<div className='flex flex-col justify-center items-center mt-5'>
					<div className='w-5 h-5 rounded-full bg-purple' />
					<div className='w-1 sm:h-80 h-40 violet-gradient' />
				</div>
				<div>
					<h1 className='hero-head-text'>
						Hi, I'm <span className='text-purple'>Carl</span>
					</h1>
					<p className='hero-sub-text'>
						I develop full-stack web applications{' '}
						<br className='sm:block hidden' /> that generate memorable UI/UX
						experiences.
					</p>
					{showGuide && (
						<motion.div
							variants={image360Variants}
							animate='visible'
							className='text-center w-full my-5'
						>
							<img
								src={Rotate360}
								alt='rotate-360'
								className='w-12 h-12 mx-auto'
							/>
							<p className='text-purple text-[12px] mt-[-10px]'>
								Click and rotate
							</p>
						</motion.div>
					)}
				</div>
			</div>
			<ComputersCanvas downAction={() => setShowGuide(false)} />
		</div>
	);
};

export default Hero;
