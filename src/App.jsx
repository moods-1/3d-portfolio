import { Mixpanel } from './components/Mixpanel';
import {
	About,
	Contact,
	Experience,
	Testimonials,
	Hero,
	Navbar,
	Projects,
} from './components';

const App = () => {
	Mixpanel.track('3D portfolio app accessed.', {
		action: '3D portfolio app accessed.',
	});

	return (
		<div className='relative z-0 black-gradient-v overflow-hidden'>
			<Navbar />
			<Hero />
			<About />
			<Experience />
			<Projects />
			<Testimonials />
			<Contact />
		</div>
	);
};

export default App;
