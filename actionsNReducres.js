
const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK = 'EDIT_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const SEARCH_BOOK = 'SEARCH_BOOK';
const MODAL_TOGGLE = 'MODAL_TOGGLE';

var initialState = {
	id : 2,
	bookList : [
		{
			id:1,
			name: 'WINGS OF FIRE',
			desc : 'Wings of Fire: An Autobiography of A P J Abdul Kalam (1999), former President of India. It was written by Dr. Kalam and Arun Tiwari.[1] Kalam examines his early life, effort, hardship, fortitude, luck and chance that eventually led him to lead Indian space research, nuclear and missile programs. Kalam started his career, after graduating from Aerospace engineering at MIT (Chennai), India, at Hindustan Aeronautics Limited and was assigned to build a hovercraft prototype. Later he moved to ISRO and helped establish the Vikram Sarabhai Space Centre and pioneered the first space launch-vehicle program. During the 1990s and early 2000, Kalam moved to the DRDO to lead the Indian nuclear weapons program, with particular successes in thermonuclear weapons development culminating in the operation Smiling Buddha and an ICBM Agni (missile). Kalam died on 27 July 2015, during a speech at Indian Institute of Management in Shillong, Meghalaya.',
			author : 'Dr.A P J Abdul Kalam, Arun Tiwari',
			image : './apjPhoto1.jpg',
			count : '1',
			price : 'Rs.250'
		}
	],
	searchText : '',
	showModal : { show:false, type: '', editId:''}
};

var extractBookData = (e)=>{
	var {name, desc, author, count, image, price} = e.target;
	return {
		name : name.value,
		desc : desc.value, 
		author : author.value, 
		count : count.value, 
		image : image.value,
		price : price.value
	};	
}

const toggleModal = (show, mtype, id)=>{
	return {
		type : MODAL_TOGGLE,
		show,
		mtype,
		id
	};
	
};

const addBook = (e)=>{
	var newBook = extractBookData(e);
	return {
		type : ADD_BOOK,
		data : newBook
	};
}

const editBook = (e, bookId)=>{
	var bookdata = extractBookData(e);
	bookdata.id = bookId;
	return {
		type : EDIT_BOOK,
		bdata : bookdata
	};
}	


const deleteBook = (bookid)=>{
	return {
		type : DELETE_BOOK,
		bookid : bookid
	};
}

const searchBook = (e)=>{
	return {
		type : SEARCH_BOOK, 
		text : e.target.value
	};
	
}

const bookReducer = (state = initialState, action) => {
	switch(action.type){
		case ADD_BOOK : 
			var newBook = action.data; 
			var newState = Object.assign({}, state, {
				bookList : [...state.bookList, {...newBook, id:state.id}],
				showModal : {show:false}
			});			
			newState.id++;
			return newState;
			
		case EDIT_BOOK : 
			var bdata = action.bdata;			
			var newState = Object.assign({}, state, {showModal : {show:false}} );	
			var bookIdx = newState.bookList.findIndex((b) => b.id == bdata.id);
			if(bookIdx == -1){
				alert('can not find the book'); 
				return state;
			} 
			newState.bookList[bookIdx] = bdata;
			return newState; 
			
		case DELETE_BOOK : 
			var bookid = action.bookid;
			return Object.assign({}, state, {
				bookList : state.bookList.filter(b=>b.id != bookid)				
			});
			
		case SEARCH_BOOK : 
			return Object.assign({}, state, {				
				searchText : action.text
			});	
			
		case MODAL_TOGGLE : 
			return Object.assign({}, state,{
				showModal : {show: action.show, type: action.mtype, editId:action.id}
			});
		default : return state;		
	} 	
}

























