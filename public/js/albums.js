
$(()=>{
    // GLOBAL VARIABLES
    var input = document.getElementById('searchField');

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
        
        return data.artists.items;

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

    return data.albums.items;
    
    }

    const getTracks = async (albumID) => {
    
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + await getToken()}
        });
        
        const data = await result.json();

        return data;
        
    }

    // CALLS getArtists function to find results on every key up after 3 characters

    $('#searchField').keyup(async ()=>{

        $("#nameList").html("");
        
        if(input.value.length >= 3){
            let artists = await getArtists(input.value);

            for(let artist of artists){
            
                $("#nameList").append(`

                    <li class="pt-1" id="${artist.id}"><img id="${artist.id}"height="50px" width="50px" src="${artist.images[2].url}">${artist.name}</li>

                `)
            }
        }

    }); // end searchField event listener
    
    $("#nameList").click(async(e)=>{
        $("#albumTracks h2,#albumTracks h3,#albumTracks img").remove();
        input.value= "";
        $("#nameList").html("");
        let albums = await getSpecificAlbums(e.target.id);
        currentAlbums = albums;

            for(let album of albums){
                console.log(album.artists[0].name, album.name);
                $("#albumList").append(`<li class="pt-1" id="${album.id}"><img id="${album.id}"height="50px" src="${album.images[2].url}">${album.name}, By ${album.artists[0].name}</li>`)
                
            }

    });  // end nameList event listener

      // GRABS ARTIST NAME THAT WAS CLICKED AND CALLS getAlbums FUNCTION
      // TO GRAB ALBUMS DATA THEN EXTRACTS ALBUM NAME AND COVER IMAGE
    
    $("#albumList").click(async(e)=>{
        
        $("#albumList").html("");
        input.value = "";

            
        let albumTracks = await getTracks(e.target.id);

        for(let album of currentAlbums){
            if(album.id == e.target.id){
                currentAlbumOpen = album;
            }
        }

        $('#albumIDinput').val(`${currentAlbumOpen.id}`);
        $('#albumNameinput').val(`${currentAlbumOpen.name}`)
        $('#albumArtinput').val(`${currentAlbumOpen.images[1].url}`)
        $('#artistNameinput').val(`${currentAlbumOpen.artists[0].name}`)

        $('#embedPlayer').html(`

            <iframe id="${currentAlbumOpen.id}"src="https://open.spotify.com/embed/album/${currentAlbumOpen.id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

        `);

        $('#albumCover').html(`<img id="${currentAlbumOpen.id}" src="${currentAlbumOpen.images[1].url}" style="height:280px;width:300px;">`);
        $('#albumName').html(`${currentAlbumOpen.name}`);
        // $('#artistName').html(`${currentAlbumOpen.artistID}`)
        $('#formDiv').show();
        $('#reviewTitle').show();
        

        fetch('/albumSpecificReviews',{
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                albumID : currentAlbumOpen.id,
                
            })
        })
        .then(results => results.json())
        .then(reviews =>{

            console.log(reviews);

            for(let review of reviews){
                $("#albumReviews").append(`

                    <h3>Username: ${review.username}</h3>
                    <p>${review.stars}</p>
                    <p>${review.reviewText}</p>

                `)
            }
        });

    }); //end of albumList event listener 
    
}); // end of jQuery

