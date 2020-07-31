
//const APIkeys = require('../../config/keys')
// import APIkeys from './'
$(()=>{
    // ADD API KEYS OBJECT HERE
    const APIkeys = {
        clientId :'ae832ccdace94d20be0eac537ebc0e65',
        clientSecret : '441260540fa0411ba35e5cd586053bca'
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
    const getAlbums = async (artistID) => {
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=ES&limit=10&offset=0`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + await getToken()}
    });
    
    const albumData = await result.json();
    return albumData.items;
    
    }
    
    
    
    
    // CALLS getArtists function to find results on every key up as long as
    //input is greater than 3 characters
    $('#searchField').keyup(async ()=>{
        $("#nameList").html("");
        $("#artistName").html("");
        $("#imgs").html("");
        $('#albumsInfo').html("");
        
        let input = document.getElementById('searchField');
        let patt = new RegExp(`^${input.value.toUpperCase()}`);
        if(input.value.length >= 3){
            var artists = await getArtists(input.value)
            for (let artist of artists) {
                $("#nameList").append(`<li id="${artist.name}">${artist.name}</li>`)
                 
              } 
        }
        
    
        
        
      });
    
      // GRABS ARTIST NAME THAT WAS CLICKED AND CALLS getAlbums FUNCTION
      // TO GRAB ALBUMS DATA THEN EXTRACTS ALBUM NAME AND COVER IMAGE
     $("#nameList").click(async(e)=>{
        $("#nameList").html("");
         
            let artists = await getArtists(e.target.id);
            let artistName = artists[0].name;
            let artistID = artists[0].id;
            let albums = await getAlbums(artistID);
            console.log(albums);
            // console.log(artists[0].images[0]);
            for(let album of albums){
                $('#albumsInfo').append(`
                <h3>${album.name}</h3>
                <img src="${album.images[1].url}">
                `)
            }
            $('#artistName').append(`<h1>${artistName}</h1>`)
             
            let currentImageURL = artists[0].images[1].url;
                $('#imgs').append(`<img src="${currentImageURL}">`)
            
        
        
     }) 
    
    
    
    })
