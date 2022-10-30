console.log('this is working')

document.getElementById('myForm').addEventListener('submit', saveBookmark)



function saveBookmark(e){
    // console.log('it works');

let siteName = document.getElementById('siteName').value;
let siteUrl = document.getElementById('siteUrl').value;
    // console.log(siteName, siteUrl);


let bookmark= {
    name: siteName,
    url: siteUrl
}


if(!validationForm(siteName, siteUrl)){
    return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// storing bookmark in localstorage
// if bookmarks is null
if(localStorage.getItem('bookmarks')===null){

    let bookmarks = [];
//  adding first data
    bookmarks.push(bookmark);
  console.log(bookmarks);
  
//   set to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
else{
    // if data is already in localstorage, then Get data from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
         console.log(bookmarks)
        //  Add bookmark to bookmarks array
    bookmarks.push(bookmark);
//     again re- set back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// clearing the form
document.getElementById("myForm").reset()
 // re-fetch bookmarks
 fatchBookmarks();

e.preventDefault();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// function to delete bookmarks
function deleteBookmark(url){
        // Get bookmarks form localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
   for (let index = 0; index < bookmarks.length; index++) {
    bookmarks.splice(index, 1)
   }

    //     again re- set back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // re-fetch bookmarks
    fatchBookmarks();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


function fatchBookmarks(){
    // get bookmarks form localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    let bookmarksResults = document.getElementById('bookmarksResults')
    
    bookmarksResults.innerHTML = " ";

    bookmarks.forEach((Site)=>{
        let name = Site.name;
        let url = Site.url;
   console.log(name, url)
        bookmarksResults.innerHTML += `<div class="well">
        <h3>${name} <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
        <a onclick="deleteBookmark('${url}')" class="btn btn-danger" >Delete</a>
        </h3>
      </div> `
    })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////

function validationForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('site Name or site Url is empty')
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please use a vaild Url')
        return false;
    }
    return true;
}