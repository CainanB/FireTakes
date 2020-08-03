

// import APIkeys from './'
$(()=>{
    // GLOBAL VARIABLES
    var input = document.getElementById('searchField');
    // var currentArtist;
    var currentAlbums;
    var currentAlbumOpen;

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
     const getArtists = async (artist) => {
       
        const result = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=10&offset=0&include_external=audio `, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + await getToken()}
        });
        
        const data = await result.json();
        console.log(data.artists.items);
        
        return data.artists.items
        
        
        }
    
    // FETCH TOP ALBUM DATA FROM SPECIFIC ARTIST
    const getSpecificAlbums = async (artistID) => {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=ES&limit=20&offset=0`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + await getToken()}
        });
        
        const albumData = await result.json();
        console.log(albumData);
        return albumData.items;
        
        }    


    // FUNCTION TO FETCH TOP 10 ALBUM RESULTS
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
        console.log(data);
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
        $("#albumTracksList").html("");
        
        
        if(input.value.length >= 3){
            let artists = await getArtists(input.value);
            console.log(artists);
            for(let artist of artists){
               
                $("#nameList").append(`<li id="${artist.id}"><img id="${artist.id}"height="50px" width="50px" src="${artist.images[2].url}">${artist.name}</li>`)
                 
            }
        }
       
     
        
    
        
        
      });
    
      $("#nameList").click(async(e)=>{
          $("#albumTracks h2,#albumTracks h3,#albumTracks img").remove();
        input.value= "";
        $("#nameList").html("");
        let albums = await getSpecificAlbums(e.target.id);
        currentAlbums = albums;
        console.log(currentAlbums);
        // console.log(albums);
               for(let album of albums){
                console.log(album.artists[0].name, album.name);
                $("#albumList").append(`<li id="${album.id}"><img id="${album.id}"height="50px" src="${album.images[2].url}">${album.name}, By ${album.artists[0].name}</li>`)
                 
            }
    
                
     }) 

      // GRABS ARTIST NAME THAT WAS CLICKED AND CALLS getAlbums FUNCTION
      // TO GRAB ALBUMS DATA THEN EXTRACTS ALBUM NAME AND COVER IMAGE
     $("#albumList").click(async(e)=>{
        $("#albumList").html("");
        input.value = "";
         //console.log(e.target);
         console.log($(`${e.target.id}`).html()); 
         let albumTracks = await getTracks(e.target.id);
         console.log(albumTracks);

         for(let album of currentAlbums){
             if(album.id == e.target.id){
                 currentAlbumOpen = album;
             }
         }
         console.log(currentAlbumOpen);
         console.log(currentAlbumOpen.id);
         $('#embedPlayer').html(`
         <iframe src="https://open.spotify.com/embed/album/${currentAlbumOpen.id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
         `)

         $(`<h2> ${currentAlbumOpen.name}, Track List</h2><br>`).insertBefore("#albumTracksList")
        
         
         
       
        //  for(let track of albumTracks.items){
        //     if(track.preview_url != null){
        //     $('#albumTracksList').append(`
        //     <audio id="${track.preview_url}playPauseButtonplayer">
        //    <source src="${track.preview_url}" type="audio/mpeg">
        //    </audio>
        //     <li><i id="${track.preview_url}playPauseButton" class="${track.preview_url} fa fa-play-circle" aria-hidden="true"></i>  ${track.name}, ${track.artists[0].name}</li>
        //     `)
        //     }else{
        //        $('#albumTracksList').append(`
        //        <li> ${track.name}, ${track.artists[0].name}</li>
        //        `)
        //     }
        // }
    
         
        
     }) 

    //  $("#albumTracksList").click((e)=>{
    //      console.log(e.target.id);
    //      let musicButton = document.getElementById(`${e.target.id}`)
    //      if(musicButton.classList.contains("fa-play-circle")){
    //         document.getElementById(`${e.target.id}player`).play();
    //         musicButton.classList.remove("fa-play-circle");
    //         musicButton.classList.add("fa-pause");
    //     }else{
    //         document.getElementById(`${e.target.id}player`).pause();
    //         musicButton.classList.remove("fa-pause");
    //         musicButton.classList.add("fa-play-circle");
    //     }

    //  })
    
    
    
    })

