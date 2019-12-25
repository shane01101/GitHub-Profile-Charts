import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { login, avatar_url } }) => {
	return (
		<div className='card-item'>
			<img src={avatar_url} alt='' className='card-item__img' />
			<h3 className='card-item__text'>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className='card-item__btn btn-dark'>
					More
				</Link>
			</div>
		</div>
	);
};

UserItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserItem;
