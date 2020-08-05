

$(()=>{



    
    // // make fetch call for user Info

    const getUserInfo = async () =>{
        const reviews = await fetch('/userInfo')
        // console.log(await reviews.json())
        let userReviews = await reviews.json();

        for(let review of userReviews){

            let starHTML = '';

            for(let i = 0; i < review.stars;i++)
            {
                starHTML += '<span class="one fa fa-star fa-2x checked"></span>'
            }

            $("#userReviewsBlock").append(`

                <div class="row">
                    <h1 class="ml-2"> ${review.albumTitle} </h1>
                </div>

                <div class="row ml-2">
                    <h3> ${review.aristName} </h3>
                </div>

                 <div class="row ml-2 mt-2">
                    
                    <div class="col-xl-3 mt-1 pl-0 pr-0">
                        <a href="/albums"><img class="cover mr-5" src="${review.albumURL}" height="200" width="200" alt=""></a>
                    </div>
                    <div class="col-xl-8 ml-xl-3 mt-1 pl-0 d-flex justify-content-start">
                        <blockquote class="lead blockquote text-left ml-0 mt-0 pt-1 h-100 w-100">
                            ${review.text} 
                        </blockquote>
                    </div>


                </div>

                <div id="stars" class="col-2 pt-1 mt-1  ml-0 d-flex justify-content-start">
                    ${starHTML}
                </div>

                <a href="#" class="edit ml-2 mt-4" style="display:inline-block;"><i class="fa fa-pencil-square-o" aria-hidden="true""></i> Edit Review</a>

                <hr style="height: 1px;
                background-color: orangered;
                border: none;margin-top:0.5rem">
            `)
        }
    }

    getUserInfo();

})