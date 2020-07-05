var  Component  = React.Component;

class App extends Component{
	constructor(props){
		super(props);
	}
	
	shouldComponentUpdate(){
		return true;
	}
	render(){
		debugger;
		return (
			<div>	
				<PageHeader/> 
				<BookTools />
				<hr/>
				<BookList />
				{this.props.showModal.show ?  <BookForm/> : null}
			</div>
		);
	}
}

class PageHeader extends Component{
	render(){
		return (
			<div>
				<h1>Online Book Management System</h1>
			</div>
		);
	}
}

class PageFooter extends Component{
	render(){
		return (
			<div> 
			</div>
		);
	}
}

class BookTools extends Component{
	render(){
		return (
			<div className='toolsContainer'>
				<button className='addBtn bkBtn' onClick={this.props.handleAddBookClick}>Add Book</button>
				<div className='searchContainer'>
					<label>Search Book: </label>
					<input type='text' value={this.props.searchText} onChange={this.props.handleSerachChange} />
				</div>
			</div>
		);
	}
}

class BookList extends Component{
	render(){
		console.log('bookList '+JSON.stringify(this.props.bookList));
		return (
		<div>
			{this.props.bookList.length>0 ? 						
				<span>
					<h2 className='myBook'><u>My Books </u></h2>
					<span className='bookCnt'>Total Books: {this.props.bookList.length} </span>
				</span>	
			: null}
			
			<div className='booksContainer'>
				{ this.props.bookList.length>0 ? 
					this.props.bookList.map((b)=>{					
						return <Book {...b} key={b.id} />
					})
					
					:
					
					<div className='noBookMsg'>
						No books found. Use "Add Book" button to insert a book in your library
					</div>
				}
			</div>
	</div>
		);
	}	
}

class Book extends Component{
	render(){
		return (
			<div className='indBook' key={this.props.id+'children'} >
				<div className='bookCustomContainer'>
					<button className='editBtn bkBtn' onClick={this.props.handleEditBookClick.bind(null, this.props.id)}>Edit</button>
					<button className='deleteBtn bkBtn' onClick={this.props.handleDeleteBookClick.bind(null, this.props.id)} >Delete</button>
				</div>
				<div className='bookDetails'>
					<div className='bookHeader'>
						<strong className='bookTitle'>{this.props.name}</strong>								
					</div>
					<div className='bookBody'>
						<img src={this.props.image} alt='cover photo' className='coverPhoto'/>
						<div className='bookDesc'>
							{this.props.desc}
						</div>
					</div>
					<hr/>
					<div className='bookFooter'>
						<span><i><label>Author: </label>{this.props.author}</i></span>
						<span>
							<span><label>Count: </label>{this.props.count} </span>
							<span><label>Price: </label>{this.props.price}</span>
						</span>
					
					</div>
				</div>
			</div>
		);
	}
}

class BookForm extends Component{
	render(){
		debugger;
		return (
			<div className='bmodal-container'>
				<div className='bmodal-content'>
				<div className='bmodal-title'>
					<strong className='title-text'>Add / Edit Book </strong>
					<span className='closeSym' onClick={this.props.handleCloseModal}>X</span>
				</div> 
				<div className='bmodal-body'>
					<form onSubmit={this.props.handleFormSubmit}>
						<div className='formBody'>
							<div className='form-input'>
								<label htmlFor='bookName'> Name: </label>
								<input name='name'  type='text' id='bookName' defaultValue={this.props.formData.name}/>
							</div>
							<div className='form-input'>
								<label htmlFor='bookName'> Description: </label>
								<textarea  name='desc' id='bookDesc' defaultValue={this.props.formData.desc}/>
							</div>
							<div className='form-input'>
								<label htmlFor='bookPhoto'>Cover Photo: </label>
								<input name='image' type='file' id='bookPhoto' defaultValue={this.props.formData.img} accept=".png, .jpg, .jpeg"/>
							</div>
							<div className='form-input'>
								<label htmlFor='bookAuthor'>Author: </label>
								<input name='author' type='text' id='bookAuthor' defaultValue={this.props.formData.author}/>
							</div>
							<div  className='form-input'>
								<label htmlFor='bookPrice'>Price: </label>
								<input name='price' type='text' id='bookPrice' defaultValue={this.props.formData.price}/>
							</div>
							<div className='form-input'>
								<label htmlFor='bookCount'>Count: </label>
								<input name='count' type='text' id='bookCount' defaultValue={this.props.formData.count}/> 
							</div>
						</div>
						<hr/>
						<div className='bmodal-footer'>
							<input className='bkBtn' type='submit' value='OK' />
							<button className='bkBtn' onClick={this.props.handleCloseModal}>Cancel</button>
						</div>
						
					</form>
				</div>
				</div>
			</div>
		);
	}	
}