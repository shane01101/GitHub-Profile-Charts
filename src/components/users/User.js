import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/GithubContext';
import Chart from 'react-google-charts';

const User = ({ match }) => {
	const githubContext = useContext(GithubContext);

	const {
		getUser,
		loading,
		user,
		repos,
		uniqueLangs,
		getUserLastUpdatedRepos,
		getUserRepoLanguages
	} = githubContext;

	useEffect(() => {
		getUser(match.params.login);
		getUserLastUpdatedRepos(match.params.login);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getUserRepoLanguages(user.login, repos);
		// eslint-disable-next-line
	}, [repos]);

	const formatCharData = arr => {
		let result = [];
		result.push(['Languages', 'Occurences']);

		for (const key in arr) result.push([key, arr[key]]);

		return result;
	};

	const {
		name,
		company,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable
	} = user;

	let langChart = null;

	if (loading) return <Spinner />;

	if (Object.entries(uniqueLangs).length > 0) {
		langChart = (
			<Chart
				width={'500px'}
				height={'300px'}
				chartType='PieChart'
				loader={<Spinner />}
				data={formatCharData(uniqueLangs)}
				options={{
					title: '# of Language Occurences'
				}}
				rootProps={{ 'data-testid': '1' }}
			/>
		);
	}

	return (
		<Fragment>
			<div className='fluid-container col-lg-8 offset-lg-2'>
				<div className='row m-2'>
					<Link to='/' className='btn btn-dark'>
						Back To Search
					</Link>
				</div>
				<div className='fluid-container card'>
					<div className='row mt-4'>
						<div className='col-lg-6 text-center my-1'>
							<img
								src={avatar_url}
								className='rounded-circle center-block'
								alt=''
								style={{ width: '150px' }}
							/>
							<h1>{name}</h1>
							<p className='my-1'>Location: {location}</p>
							<p className='my-1'>
								Hireable:{' '}
								{hireable ? (
									<i className='fas fa-check text-success' />
								) : (
									<i className='fas fa-times-circle text-danger' />
								)}
							</p>
						</div>

						<div className='col-lg-6 text-left'>
							<div>
								{bio && (
									<Fragment>
										<h3>Bio</h3>
										<p>{bio}</p>
									</Fragment>
								)}
								<a
									href={html_url}
									target='_blank'
									rel='noopener noreferrer'
									className='btn btn-dark my-1'
								>
									Visit Github Profile
								</a>
								<p className='row m-0'>
									{login && (
										<Fragment>
											<strong>Username: </strong> {login}
										</Fragment>
									)}
								</p>
								<p className='row m-0'>
									{company && (
										<Fragment>
											<strong>Company: </strong> {company}
										</Fragment>
									)}
								</p>
								<p className='row m-0'>
									{blog && (
										<Fragment>
											<strong>Website: </strong> {blog}
										</Fragment>
									)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='fluid-container card my-2'>
					<div className='row justify-content-md-center align-middle py-2'>
						<div className='badge badge-primary mx-1'>
							Followers: {followers}
						</div>
						<div className='badge badge-success mx-1'>
							Following: {following}
						</div>
						<div className='badge badge-secondary mx-1'>
							Public Repos: {public_repos}
						</div>
						<div className='badge badge-dark mx-1'>
							Public Gists: {public_gists}
						</div>
					</div>
				</div>
			</div>
			<div className='fluid-container col-lg-8 offset-lg-2'>
				<div className='card'>
					<div className='row justify-content-center'>{langChart}</div>
				</div>
			</div>
			;
			<div className='fluid-container col-lg-10 offset-lg-1'>
				<div className='row justify-content-center'>
					<Repos repos={repos} />
				</div>
			</div>
		</Fragment>
	);
};

export default User;