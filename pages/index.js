import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const Home = () => {
	const router = useRouter();
	const { success, canceled } = router.query;

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		//const query = new URLSearchParams(window.location.search);

		if (success !== undefined || canceled !== undefined) {
			if (success) {
				console.log(
					'Order placed! You will receive an email confirmation.'
				);
			}

			if (canceled) {
				console.log(
					'Order canceled -- continue to shop around and checkout when you’re ready.'
				);
			}
		}
	}, [success, canceled]);

	return (
		<div className='container'>
			<div className='main'>
				<form action='/api/checkout_sessions' method='POST'>
					<section>
						<div>
							<Image
								className='image'
								src='https://d1wqzb5bdbcre6.cloudfront.net/28133c12e1d57e6d46df802c54d9bc1d597304f57ee84d21027d2a02e673b2c6/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878536c5232626a524765544648626c46766346593466475a735833526c633352664e32524e54446444596a426b553149795631647354554e69534664304d55464e303043583474576e6a4f'
								alt='Next Course Image'
								width={150}
								height={150}
							/>
							<div className='description'>
								<h3 className='heading'>Best Next.js Course</h3>
								<h5 className='price'>$79.99</h5>
							</div>
						</div>
						<button type='submit' role='link'>
							Checkout
						</button>
					</section>
				</form>
			</div>
		</div>
	);
};

export default Home;
