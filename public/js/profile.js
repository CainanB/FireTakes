

$(()=>{



    
    // // make fetch call for user Info

    const getUserInfo = async () =>{
        const reviews = await fetch('/userInfo')
        // console.log(await reviews.json())
        let userReviews = await reviews.json();

        for(let review of userReviews){
            $("#userReviewsBlock").append(`
                 <h1> ${review.albumTitle} </h1>
                 <h3> ${review.aristName} </h3>
                 <div class="row ml-2 mt-2">
                     
                    <a href="/albums"><img class="cover mr-5" src="${review.albumURL}" alt=""></a>
                     <span><a href="#" class="edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Review</a></span>
                    </div>
                <div> ${review.text} </div>
                <div> ${review.stars} Stars </div>
            `)
        }
    }
    getUserInfo()

    //FROM PROFILE.EJS

// <% myreviews.forEach(review => { %>
//     <h1> <%= review.albumTitle %>  </h1>
//     <h3> <%= review.aristName %>  </h3>
//     <div class="row ml-2 mt-2">
//         <!-- link to the albums details on the albums page -->
//        <a href="/albums"><img class="cover mr-5" src=" <%= review.albumURL %>  " alt=""></a>
//         <span><a href="#" class="edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Review</a></span>
//     </div>
//     <div> <%= review.text %>  </div>
//     <div> <%= review.stars %> Stars </div>
// <% }) %>

    // getUserInfo()
    // albumID: "0HKpzK9ZoJ0oVA43E5gewM"
    // albumTitle: "St. Anger"
    // albumURL: "https://i.scdn.co/image/ab67616d00001e02ee5869b2880109918fc47199"
    // aristName: "Metallica"
    // stars: 3
    // text: "not cool"
    
    

})