
//const APIkeys = require('../../config/keys')
// import APIkeys from './'
$(()=>{
    // GLOBAL VARIABLES
    var input = document.getElementById('searchField');

    // ADD API KEYS OBJECT HERE
    const APIkeys = {
        clientId :'73189585c28c4d4e93e7db8ec63f156f',
        clientSecret : 'a2e470f4466f4f9889aa510a35e55f12'
    }
    

    const clientId = APIkeys.clientId;
    const clientSecret = APIkeys.clientSecret;
    
    // CREATES SPOTIFY TOKEN FOR API CALLS
    const getToken = async () => {
    
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
    
        const data = await result.json();
        console.log(data.access_token);
        return data.access_token;
    }
    
    // FUNCTION TO FETCH TOP 10 ARTIST RESULTS
    const getAlbums = async (album) => {
       
    const result = await fetch(`https://api.spotify.com/v1/search?q=album%3A${album}&type=album&limit=10&offset=0&include_external=audio`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + await getToken()}
    });
    
    const data = await result.json();
    //console.log(data.albums);
    return data.albums.items;
    //return data.artists.items
    
    
    }

    const getTracks = async (albumID) => {
       
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + await getToken()}
        });
        
        const data = await result.json();
        //console.log(data);
        //return data.albums.items;
        return data
        
        
        }
    
    // FETCH TOP ALBUM DATA FROM SPECIFIC ARTIST
    // const getAlbums = async (artistID) => {
    // const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=ES&limit=10&offset=0`, {
    //     method: 'GET',
    //     headers: { 'Authorization' : 'Bearer ' + await getToken()}
    // });
    
    // const albumData = await result.json();
    // return albumData.items;
    
    // }
    
    
    
    
    // CALLS getArtists function to find results on every key up as long as
    //input is greater than 3 characters
    $('#searchField').keyup(async ()=>{
        $("#nameList").html("");
        $("#artistName").html("");
        $("#imgs").html("");
        $('#albumsInfo').html("");
        $("#albumTracksList").html("");
        $("#albumTracks h2").remove();
        
        if(input.value.length >= 1){
            let albums = await getAlbums(input.value);
            console.log(albums);
            for(let album of albums){
                console.log(album.artists[0].name, album.name);
                $("#nameList").append(`<li id="${album.id}"><img id="${album.id}"height="50px" src="${album.images[2].url}">${album.name}, By ${album.artists[0].name}</li>`)
                 
            }
        }
     
        
    
        
        
      });
    
      // GRABS ARTIST NAME THAT WAS CLICKED AND CALLS getAlbums FUNCTION
      // TO GRAB ALBUMS DATA THEN EXTRACTS ALBUM NAME AND COVER IMAGE
     $("#nameList").click(async(e)=>{
        $("#nameList").html("");
        input.value = "";
         console.log(e.target.id);
         let albumTracks = await getTracks(e.target.id);
         console.log(albumTracks);
         $(`<h2>Tracks</h2>`).insertBefore("#albumTracksList")
         for(let track of albumTracks.items){
             $('#albumTracksList').append(`
             <audio id="${track.preview_url}playPauseButtonplayer">
            <source src="${track.preview_url}" type="audio/mpeg">
            </audio>
             <li><i id="${track.preview_url}playPauseButton" class="${track.preview_url} fa fa-play-circle" aria-hidden="true"></i>  ${track.name}, ${track.artists[0].name}</li>
             `)
         }

            // let artists = await getArtists(e.target.id);
            // let artistName = artists[0].name;
            // let artistID = artists[0].id;
            // let albums = await getAlbums(artistID);
            // console.log(albums);
            // // console.log(artists[0].images[0]);
            // for(let album of albums){
            //     $('#albumsInfo').append(`
            //     <h3>${album.name}</h3>
            //     <img src="${album.images[1].url}">
            //     `)
            // }
            // $('#artistName').append(`<h1>${artistName}</h1>`)
             
            // let currentImageURL = artists[0].images[1].url;
            //     $('#imgs').append(`<img src="${currentImageURL}">`)
            
        
        
     }) 

     $("#albumTracksList").click((e)=>{
         console.log(e.target.id);
         let musicButton = document.getElementById(`${e.target.id}`)
         if(musicButton.classList.contains("fa-play-circle")){
            document.getElementById(`${e.target.id}player`).play();
            musicButton.classList.remove("fa-play-circle");
            musicButton.classList.add("fa-pause");
        }else{
            document.getElementById(`${e.target.id}player`).pause();
            musicButton.classList.remove("fa-pause");
            musicButton.classList.add("fa-play-circle");
        }



        //  $(`#${e.target.id}player`).play();
        // console.log(document.getElementById(`${e.target.id}player`));
         
     })
    
    
    
    })
