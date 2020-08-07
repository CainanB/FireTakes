

$(()=>{
    let allUserReviews = [];
    let currentReview = {};
    let htmlEls = [];
    var reviewForms = [];


    
    // // make fetch call for user Info

    // const getUserInfo = async () =>{
    //     $("#userReviewsBlock").html("")
    //     const reviews = await fetch('/userInfo')
    //     // console.log(await reviews.json())
    //     let userReviews = await reviews.json();
    //     console.log(userReviews);
    //     userReviews.reverse();
    //     for(let review of userReviews){
    //         $("#userReviewsBlock").append(`
    //              <h1> ${review.albumTitle} </h1>
    //              <h3> ${review.aristName} </h3>
    //              <div class="row ml-2 mt-2">
                     
    //                 <a href="/albums"><img class="cover mr-5" src="${review.albumURL}" alt=""></a>
    //                  <span><a href="#" id="${review.id}" class="edit"><i class="editReviewButton fa fa-pencil-square-o" aria-hidden="true"></i> Edit Review</a></span>
    //                  <form id="${review.id}form">
    //                  <input id="${review.id}hiddenInput" type="hidden" name="albumID" value="${review.id}">
    //                  <textarea id="${review.id}editedReviewText" name="editedReviewText">${review.text}</textarea>
    //                  <input class="btn btn-danger editedReviewSubmitButton" type="submit" id="${review.id}">
    //                  </form>
    //                 </div>
    //             <div> ${review.text} </div>
    //             <div> ${review.stars} Stars </div>
    //         `)
    //         $(`#${review.id}form`).hide();
    //         // $(`#${review.id}`).click((e) => {
    //         //     console.log(e.target.id)
    //         // })
            
    //     }
    // }

    const getUserInfo = async () =>{
        $("#userReviewsBlock").html("")
        const reviews = await fetch('/userInfo')
        // console.log(await reviews.json())
        let userReviews = await reviews.json();
        allUserReviews = [...userReviews];
        userReviews.reverse();
        userReviews.forEach((review,i)=>{
            let starHTML = '';
            for(let i = 0; i < review.stars;i++)
            {
                starHTML += '<span class="one fa fa-star fa-2x checked"></span>'
            }
            let htmlEl = `
            <div id="${i}">
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
                        <blockquote id="${review.id}currentReviewText" class="lead blockquote text-left ml-0 mt-0 pt-1 h-100 w-100">
                            ${review.text}
                        </blockquote>
                    </div>
                </div>
                <div id="stars" class="col-2 pt-1 mt-1  ml-0 d-flex justify-content-start">
                    ${starHTML}
                </div>
               
                <a href="#" id="${review.id}" class="edit ml-2 mt-4" style="display:inline-block;"><i class="editReviewButton fa fa-pencil-square-o" aria-hidden="true"></i> Edit Review</a>
                <hr style="height: 1px;
                background-color: orangered;
                border: none;margin-top:0.5rem">
                </div>
            `
            $("#userReviewsBlock").append(htmlEl)
            reviewForms.push({
                id: review.id,
                html: `<form id="${review.id}form">
                <input id="${review.id}hiddenInput" type="hidden" name="albumID" value="${review.id}">
                <textarea id="${review.id}editedReviewText" name="editedReviewText">${review.text}</textarea>
                <input class="btn btn-danger editedReviewSubmitButton" type="submit" id="${review.id}">
                </form>`
            })
            
        });
    }










    getUserInfo()

    $("#userReviewsBlock").click((e) => {
        e.preventDefault();
        console.log(e.target.classList);
        if(e.target.classList.contains("edit")){
            e.preventDefault();
           $(`.edit`).hide();
            console.log(e.target.id);
            for(let form of reviewForms){
                if(form.id == e.target.id){
                    $(`#${e.target.id}currentReviewText`).html(form.html);
                }
            }
        }
        if(e.target.classList.contains("editedReviewSubmitButton")){
            console.log("submit button pressed")
            e.preventDefault(); 
            fetch('/updateReview',{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    albumID : $(`#${e.target.id}hiddenInput`).val(),
                    editedReviewText: $(`#${e.target.id}editedReviewText`).val()
                    
                })
            })
            .then(results => results.json())
            .then(result => {
                console.log(result) 
                if(result == "success"){
                    let newReview = $(`#${e.target.id}editedReviewText`).val()
                    $(`#${e.target.id}currentReviewText`).html(newReview)
                    $(`.edit`).show();
                    //getUserInfo();
                }
                
            })

            

        }
    })// END OF userReviewBlock click listener


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