import React from 'react';

const Pagination = (props) => {
	const { MovieCount, pageCount, currentPage, handleCurrentPage } = props;
	const pages = Math.ceil(MovieCount / pageCount);
	const newPages = Array(pages)
		.fill(1)
		.map((item, index) => item + index);
	return (
		<nav aria-label='Page navigation example' className='mt-2'>
			<ul className='pagination'>
				{newPages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? 'page-item active' : 'page-item'}
					>
						<a onClick={() => handleCurrentPage(page)} className='page-link '>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
