import React, { useContext, Fragment } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/GithubContext';

const Users = () => {
	const githubContext = useContext(GithubContext);

	const { loading, users } = githubContext;

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div className='search-results'>
				{users.map(user => (
					<UserItem key={user.id} user={user}></UserItem>
				))}
			</div>
		);
	}
};

export default Users;
