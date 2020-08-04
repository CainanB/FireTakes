$(()=>{
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
        
    })
})