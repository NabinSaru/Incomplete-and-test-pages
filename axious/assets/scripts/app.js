 const listElement=document.querySelector('.posts');
const postTemplate=document.getElementById('single-posts');
const form=document.querySelector('#new-post form');
const fetchButton=document.querySelector('#available-posts button');
const postList=document.querySelector('ul')
// const xhttp = new XMLHttpRequest();
// function sendHTTPRequest(method,url,data=null)
// {
	
// 	const promise =new Promise((resolve,reject)=>{
// 		xhttp.open(method,url);
// 		xhttp.responseType='json';
// 		xhttp.setRequestHeader('Content-Type','application/json');


// 		xhttp.onload=function(){
// 			if(xhttp.status>=200&&xhttp.status<=300)
// 			{
// 				// const listOfPosts= JSON.parse(xhttp.response);
// 				//JSON.stringfy for object to json
// 				resolve(xhttp.response);
// 			}
// 			else
// 			{
// 				reject(new Error('Something Went Wrong'));
// 			}		

// 		};
// 		xhttp.onerror=function(){
// 			reject(new Error('Request not send'));
// 		};
// 		xhttp.send(JSON.stringify(data)); 

// 	});
// 	return promise;
// }
async function createPost(title,content){
	const userId=Math.random();
	const post={
		title:title,
		body:content,
		userId:userId
	};
	const response = await axios.post('https://jsonplaceholder.typicode.com/posts',post);
	//axios identifies the type of file you want to set and set the request header according to it
	//in this post method we dont need to stringfy the post 
	//also if we send the form data it will set it accordingly
	//however it may affect the loading speed for context where internet is very slow like in developing countries so we can use the partial cdn
	
	console.log(response);
}
async function fetchPosts(){
	try {
		const responseData= await axios.get('https://jsonplaceholder.typicode.com/posts');
		const listOfPosts=responseData.data;
		console.log(listOfPosts);

			for(const post of listOfPosts){
				//this is the only place that is guaranteed for availability of posts
				const postEL=document.importNode(postTemplate.content,true);
				postEL.querySelector('h2').textContent=post.title.toUpperCase();
				postEL.querySelector('p').textContent=post.body;
				postEL.querySelector('li').id=post.id;
				listElement.append(postEL);
			}
			// throw (new Error(Server failed));
	} catch(e) {
		alert(e.message);
		console.log('Unable to fetch data. Possible Reason:'+e.response);
	}
}
fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit',event=>{
	event.preventDefault();
	const enteredTitle=event.currentTarget.querySelector('#title').value;
	const enteredContent=event.currentTarget.querySelector('#content').value;
	createPost(enteredTitle,enteredContent);
	form.reset();
});
postList.addEventListener('click', event=>{
	if(event.target.tagName==='BUTTON'){
		const targetId = event.target.closest('li').id;
		axios.delete(`https://jsonplaceholder.typicode.com/posts/${targetId}`);
		const deletingPost = event.target.closest('li');
		deletingPost.remove();
	}
});