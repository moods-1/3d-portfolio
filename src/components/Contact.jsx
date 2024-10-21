import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import SectionHeader from './SectionHeader';
import { formValidator2 } from '../utils/helperFunctions';
import { SlideAcross } from './Buttons';
import { Mail } from '../assets';

const guideVariants = {
	visible: {
		opacity: [0, 0.5, 1, 0.5, 0],
		transition: { duration: 2, repeat: Infinity },
	},
};

const Contact = () => {
	const [showGuide, setShowGuide] = useState(true);
	const [message, setMessage] = useState({});
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;
		let localValue;
		if (name !== 'email') {
			localValue = value.replace(/\s{2,}/g, ' ').trimStart();
		} else {
			localValue = value.replace(/\s+/g, '').trimStart();
		}
		setForm((prevState) => ({ ...prevState, [name]: localValue }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const messageHandler = (text, color) => {
			setMessage({ text, color });
			setTimeout(() => {
				setMessage({});
			}, 4000);
		};

		const validatedData = formValidator2(form);
		for (let i = 0; i < validatedData.length; i++) {
			if (!validatedData[i].returnBool) {
				setLoading(false);
				return messageHandler(validatedData[i].returnText, 'bg-red-500');
			}
		}

		emailjs
			.sendForm(
				process.env.REACT_APP_EMAILJS_SERVICE_ID,
				process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
				e.target,
				process.env.REACT_APP_EMAILJS_PUBLIC_KEY
			)
			.then(
				() => {
					setLoading(false);
					messageHandler('Email sent successfully!', 'bg-green-500');
					setForm({
						name: '',
						email: '',
						message: '',
					});
				},
				(error) => {
					setLoading(false);
					console.error(error);
					messageHandler(
						'Ahh, something went wrong. Please try again.',
						'bg-red-500'
					);
				}
			);
	};

	return (
		<div className='xl:mt-12 flex lg:flex-row flex-col gap-10 overflow-hidden intersector relative'>
			<div className='flex-[0.75] bg-[rgba(0,0,0,0.7)] p-8 rounded-md border border-slate-900 max-w-[500px]'>
				<SectionHeader subText='Get in touch' headText='Contact.' />
				<form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>Your Name</span>
						<input
							type='text'
							name='name'
							required
							value={form.name}
							onChange={handleChange}
							placeholder='Enter your name'
							className='py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-none font-medium'
						/>
					</label>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>Your email</span>
						<input
							type='text'
							name='email'
							required
							value={form.email}
							onChange={handleChange}
							placeholder='Enter your email'
							title='Please enter a valid email e.g. your@email.xxx'
							className='py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-none font-medium'
						/>
					</label>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>Your Message</span>
						<textarea
							rows={4}
							name='message'
							required
							value={form.message}
							onChange={handleChange}
							placeholder="Let's talk ..."
							className='py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-none font-medium'
						/>
					</label>
					{message.text ? (
						<div className={`${message.color} text-[14px] rounded-md p-3`}>
							<span>{message.text}</span>
						</div>
					) : (
						<SlideAcross
								buttonText={loading ? 'Sending...' : 'Send'}
								value=''
								beforeClass='bg-black'
								buttonClass='flex-1 py-2 min-w-44 border border-purple bg-purple rounded-md text-white border'
								beforeImg={Mail}
								slideSpeed={2000}
								buttonFunction={() => {}}
								disabled={loading}
							/>
					)}
				</form>
			</div>
			<div className='lg:flex-1 xl:h-auto md:h-[550px] h-[350px] relative'>
				{showGuide && (
					<motion.p
						variants={guideVariants}
						animate='visible'
						className='absolute top-3 md:top-10 user-none w-[100%] text-center text-[14px] text-purple'
					>
						Click and rotate
					</motion.p>
				)}
				<EarthCanvas downAction={() => setShowGuide(false)} />
			</div>
		</div>
	);
};

export default SectionWrapper(Contact, 'contact');
