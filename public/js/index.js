import { APIkeys } from './keys.js'

$(()=>{

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
    const getArtists = async (random) => {

        const result = await fetch(`https://api.spotify.com/v1/search?q=${random}&type=artist&limit=10&offset=0&include_external=audio `, {
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
        // console.log(albumData);
        return albumData.items;
        
    } 


    const generateRandomArtist = (random) => {
        return random;
    }

    const getOneArtist = async () =>{

    }

    const getRandomAlbums = async () => {
        // getOneArtist();
        // pass in a random artist
        // grab 3 random albums
        // grab the cover from each
        // send it to carousel
    }

    getRandomAlbums();

});