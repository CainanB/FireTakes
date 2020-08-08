import { APIkeys } from './keys.js'

$(()=>{
    // GLOBAL VARIABLES
    var input = document.getElementById('searchField');

    var currentAlbums;
    var currentAlbumOpen;

    

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
        // console.log(data.access_token);
        return data.access_token;
    }

     // FUNCTION TO FETCH TOP 10 ARTIST RESULTS
    const getArtists = async (artist) => {

        const result = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=10&offset=0&include_external=audio `, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + await getToken()}
        });
        
        const data = await result.json();
        // console.log(data.artists.items);
        
        return data.artists.items;

    }
    
    // FETCH TOP ALBUM DATA FROM SPECIFIC ARTIST
    const getSpecificAlbums = async (artistID) => {

        const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=ES&limit=20&offset=0`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + await getToken()}
        });
        
        const albumData = await result.json();
        // console.log(albumData);
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
        $("#albumList").html("");
        $("#reviewBlock").html("");
        $("#albumName").html("");
        $("#albumCover").html("");
        $('#embedPlayer').html("");
        

        
        if(input.value.length >= 3){
            let artists = await getArtists(input.value);
          
            for(let artist of artists){
                $("#nameList").append(`
                <li class="pt-1" id="${artist.id}"><img id="${artist.id}"height="50px" width="50px" src="${artist.images[2].url}"> ${artist.name}</li>`)
                 
            }
        }

    }); // end searchField event listener
    
    $("#nameList").click(async(e)=>{
        $("#albumTracks h2,#albumTracks h3,#albumTracks img").remove();
        input.value= "";
        $("#nameList").html("");
        let albums = await getSpecificAlbums(e.target.id);
        currentAlbums = [...albums];
        let albumListNames = [];

            for(let album of albums){
                    
                    if(albumListNames.includes(album.name)){
                        continue;
                    }
                    albumListNames.push(album.name)
                    $("#albumList").append(`<li class="pt-1" id="${album.id}"><img id="${album.id}"height="50px" src="${album.images[2].url}"> ${album.name}, ${album.artists[0].name}</li>`)
                  
                }
           
                // console.log(album.artists[0].name, album.name);
                
                
            

    });  // end nameList event listener

      // GRABS ARTIST NAME THAT WAS CLICKED AND CALLS getAlbums FUNCTION
      // TO GRAB ALBUMS DATA THEN EXTRACTS ALBUM NAME AND COVER IMAGE
    
    $("#albumList").click(async(e)=>{
        
        $("#albumList").html("");
        $('#albumReviews').html('');
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
        $('#userRev').show();
        $('hr').show();

        

        fetch('/albumSpecificReviews',{
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                albumID : currentAlbumOpen.id,
                
            })
        })
        .then(results => results.json())
        .then(reviews =>{

            // console.log(reviews);

            if(reviews.length <= 0)
            {
                $('#reviewBlock').html(`
                    <div id="noReviews" style="text-align:center;">
                        No reviews yet. Be the first to write one.
                    </div>
                `);
            }
            else
            {
                $('#reviewBlock').append(`

                    <div class="col d-flex justify-content-center">
                        <h1>Submitted Reviews</h1>
                    </div>

                    <div class="row">
                        <div class="col"></div>
                        <div class="col">
                            <hr style="height: 1px;
                            background-color: orangered;
                            border: none;margin-top:0.5rem">
                        </div>
                        <div class="col"></div>
                    </div> 
                `);
            }



            for(let review of reviews){

                $('#noReviews').html('');

                let starHTML = '';

                for(let i = 0; i < review.stars;i++)
                {
                    starHTML += '<span class="one fa fa-star checked"></span>'
                }

                $('#reviewBlock').append(`



                    <div class="row">

                        <div id="userReview" class="col-2 pl-5 ml-2 d-flex justify-content-end">
                            <h5>${review.username}</h5>
                        </div>


                        <div id="stars" class="col-2 pt-1 d-flex justify-content-start">
                            ${starHTML}
                        </div>

                        <div id="reviewText"  class="col  d-flex justify-content-start">
                            <p>${review.reviewText}</p>
                        </div>
                    </div>

                `);

            }

        });

    }); //end of albumList event listener 
    
}); // end of jQuery

