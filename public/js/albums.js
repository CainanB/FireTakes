
//const APIkeys = require('../../config/keys')
// import APIkeys from './'
$(()=>{
    


    const clientId = APIkeys.clientId;
    const clientSecret = APIkeys.clientSecret;
    
    
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
    
    const getArtists = async (artist) => {
       
    const result = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=10&offset=0&include_external=audio `, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + await getToken()}
    });
    
    const data = await result.json();
    console.log(data.artists.items);
    
    return data.artists.items
    
    
    }
    
    
    const getAlbums = async (artistID) => {
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=ES&limit=10&offset=0`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + await getToken()}
    });
    
    const albumData = await result.json();
    return albumData.items;
    
    }
    
    
    
    
    
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
