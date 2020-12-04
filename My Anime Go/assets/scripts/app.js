const addAnimeModal=document.querySelector("#add-modal");
const startAddAnimeModal=document.querySelector('header button');
const backdrop=document.getElementById('backdrop');
const cancelAddAnimeModal=addAnimeModal.querySelector('.btn--passive');
const confirmAddAnimeModal=cancelAddAnimeModal.nextElementSibling;
const userInputs=document.querySelectorAll('input');
const entryTextSection=document.querySelector('#entry-text');
const deleteAnimeModal=document.getElementById('delete-modal');
const animes=[];
const idList=[];

const updateUI=()=>{
	if(animes.length===0)
	{
		entryTextSection.style.display='block';
	}
	else
	{
		entryTextSection.style.display='none';
	}
};

const deleteAnimeHandler=(ID)=>{
	toggleBackdrop();
	deleteAnimeModal.classList.add('visible');
	const deleteCancel= deleteAnimeModal.querySelector('.btn--passive');
	let deleteConfirm=deleteAnimeModal.querySelector('.btn--danger');
	//since delete confirm context changes with stacking events. so we store it as variable
	// deleteConfirm.replaceWith(deleteConfirm.cloneNode(true));
	//removeEventListener won't work because it is associated with the bind
	deleteCancel.removeEventListener('click',cancelAnimeDeletion);
	//bind works for this one
	deleteCancel.addEventListener('click',cancelAnimeDeletion);
	deleteConfirm.onclick=deleteAnime.bind(null,ID);


};

const deleteAnime= (animeID)=>{
	let animeindex=0;
	for (const anime of animes){
		if(anime.id===animeID){ 
			break;
		}
		animeindex++;
	}
	animes.splice(animeindex,1);
	const listRoot=document.getElementById('anime-list');
	listRoot.children[animeindex].remove();
	cancelAnimeDeletion();
	console.log("2nd encounter");
	updateUI();
};

const cancelAnimeDeletion=()=>{
	toggleBackdrop();
	deleteAnimeModal.classList.remove('visible');
	console.log("1st encounter");
};

const renderAnimeList=(id,title,imageURL,rating)=>{
	const newAnimesElement=document.createElement('li');
	newAnimesElement.className='anime-element';
	newAnimesElement.innerHTML=`
	<div class='anime-element__image'>
		<img src='${imageURL}' alt='${title}'>
	</div>
	<div class='anime-element__info'>
		<h2>${title}</h2>
		<p>${rating}/5 stars</p>
	</div>
	`;
	newAnimesElement.addEventListener('click',deleteAnimeHandler.bind(null,id));
	const listRoot=document.getElementById('anime-list');
	listRoot.append(newAnimesElement);

};

const closeAnimeModal=()=>{
	addAnimeModal.classList.remove ('visible');
};
const showAnimeModal=()=>{
	addAnimeModal.classList.add('visible');
	toggleBackdrop();
};

const toggleBackdrop=()=>{
	backdrop.classList.toggle('visible');
};

const backdropClickHandler=()=>{
	closeAnimeModal();
	clearUserInputs();
	cancelAnimeDeletion();
};

const clearUserInputs=()=>{
	for (const usrinput of userInputs){
		usrinput.value='';
	}
}
function randomIDGenerator(){
	let x=0;
	const randomID= Math.random();
	for (const id of idList){
		if(randomID==id){
			x++; 
			break;
		}
	}
	if (x==0) {
		idList.push(randomID);
	}
	else {
		randomIDGenerator();
	}
}

const confirmAddAnimeModalHandler=()=>{
	const titleValue=userInputs[0].value;
	const imgURLValue=userInputs[1].value;
	const ratingValue=userInputs[2].value;

	if(titleValue.trim()===''||imgURLValue.trim()===''||ratingValue.trim()===''||+ratingValue<1||+ratingValue>5){
		alert('Please Enter Valid Information');
		return;
	}
	randomIDGenerator();
	const idValue=idList[idList.length-1];
	const newAnimes={
		id:idValue.toString(),
		title:titleValue,
		imageURL:imgURLValue,
		rating:ratingValue
	};
	animes.push(newAnimes);
	closeAnimeModal();
	clearUserInputs();
	renderAnimeList(newAnimes.id,newAnimes.title,newAnimes.imageURL,newAnimes.rating);
	updateUI();
	toggleBackdrop();
};

startAddAnimeModal.addEventListener('click',showAnimeModal);
backdrop.onclick=backdropClickHandler;
cancelAddAnimeModal.onclick=backdropClickHandler;
confirmAddAnimeModal.onclick=confirmAddAnimeModalHandler;