import React, { Component } from 'react';
import { getMovies } from '../service/fakeMovieService';
import { getGenres } from '../service/fakeGenreService.js';
import Like from '../components/Like';
import Pagination from '../components/pagination';
import { Paginate } from '../helper/paginate';
import SideBar from '../components/sideBar';

class Movies extends Component {
	state = {
		movies: [],
		genre: [],
		pages: 4,
		currentPage: 1,
		selectedGenre: null
	};

	componentDidMount() {
		this.setState({ movies: getMovies(), genre: getGenres() });
	}

	handleSelectedGenre = (item) => {
		console.log(item);
		this.setState({ selectedGenre: item });
	};

	renderDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleCurrentPage = (page) => {
		this.setState({ currentPage: page });
	};

	render() {
		const { length: counts } = this.state.movies;
		const { selectedGenre, movies: allMovies, pages, currentPage } = this.state;

		const filtered =
			selectedGenre
				? allMovies.filter((item) => item.genre._id === selectedGenre._id)
				: allMovies;

		const movies = Paginate(filtered, currentPage, pages);
		if (counts === 0)
			return (
				<div className='m-2'>
					<h1>No Data to display here</h1>
				</div>
			);
		return (
			<div className='row'>
				<div className='col-2 mt-4'>
					<SideBar
						allGenre={this.state.genre}
						handleSelectedGenre={this.handleSelectedGenre}
						selectedGenre={this.state.selectedGenre}
						handleFilter={this.handleFilter}
					/>
				</div>
				<div className='col'>
					<div className='m-2'>
						<p>Showing {filtered.length} movies in the Database</p>
						<table className='table table-striped' id='ttable'>
							<thead className='thead-dark'>
								<tr>
									<th scope='col'>Title</th>
									<th scope='col'>Genre</th>
									<th scope='col'>Stock</th>
									<th scope='col'>Rate</th>
									<th scope='col'>Favorite</th>
									<th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{movies.map((movie) => {
									return (
										<tr key={movie._id}>
											<td>{movie.title}</td>
											<td>{movie.genre.name}</td>
											<td>{movie.numberInStock}</td>
											<td>{movie.dailyRentalRate}</td>
											<td>
												<Like
													onLike={() => this.handleLike(movie)}
													liked={movie.liked}
												/>
											</td>
											<td>
												<button
													className='btn btn-danger btn-small'
													onClick={() => this.renderDelete(movie)}
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<Pagination
							MovieCount={filtered.length}
							pageCount={pages}
							currentPage={currentPage}
							handleCurrentPage={this.handleCurrentPage}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Movies;
