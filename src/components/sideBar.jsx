import React from 'react';

const SideBar = (props) => {
	// const handleClick = (index, item) => {
	// 	props.handleCurrentPage(index);
	// 	props.handleFilter(item._id);
	// };

	const { handleSelectedGenre, allGenre, selectedGenre } = props;
	return (
		<ul className='list-group'>
			{allGenre.map((item) => (
				<li
					onClick={() => handleSelectedGenre(item)}
					key={item._id}
					className={
						item === selectedGenre
							? 'list-group-item active'
							: 'list-group-item'
					}
					style={{ cursor: 'pointer' }}
				>
					{item.name}
				</li>
			))}
		</ul>
	);
};

export default SideBar;
