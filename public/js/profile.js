

$(()=>{

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

    const getAlbumInfo = async (albumID) => {
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumID}?market=ES&limit=20&offset=0`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + await getToken()}
        });
        const albumData = await result.json();
        console.log(albumData);
        return albumData;
        }  
})