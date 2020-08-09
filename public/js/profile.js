

$(()=>{
    var currentReviewToDeleteID;
    var reviewForms = [];

    // FUNCTION TO CALL WHEN PAGE IS LOADED TO PULL REVIEWS
    // FROM DATABASE AND POPULATE PROFILE PAGE WITH REVIEWS
    const getUserInfo = async () =>{
        $("#userReviewsBlock").html("")
        const reviews = await fetch('/userInfo')
        let userReviews = await reviews.json();
        userReviews.reverse();  // REVERSE THE RESULTS SO THE LATEST REVIEW MADE SHOWS FIRST
        userReviews.forEach((review,i)=>{ // LOOP THROUGH EACH REVIEW AND CREATE HTML ELEMENTS
            let starHTML = '';
            for(let i = 0; i < review.stars;i++)
            {
                starHTML += '<span class="one fa fa-star fa-2x checked"></span>'
            }
            let htmlEl = `
            <div id="${review.id}Container">
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
                <a href="#" id="${review.id}" class="delete edit ml-2 mt-4" style="display:inline-block;"><i class="deleteReviewButton fa fa-trash-o" aria-hidden="true"></i> Delete Review</a>
                <hr style="height: 1px;
                background-color: orangered;
                border: none;margin-top:0.5rem">
                </div>
            `
            $("#userReviewsBlock").append(htmlEl)

            // SAVE A UNIQUE REVIEW EDIT FORM FOR EACH REVIEW AND PUSH TO ARRAY
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









    // CALL TO POPULATE WITH REVIEWS FROM DATABASE
    getUserInfo()

    // CLICK HANDLER FOR EDIT, DELETE, & SUBMIT EDITED REVIEW
    $("#userReviewsBlock").click((e) => {
        e.preventDefault();
        console.log(e.target.classList);
    
        // DELETE ICON WAS CLICKED
        if(e.target.classList.contains("delete") && e.target.classList.contains("edit")){
            e.preventDefault();
            $('#deleteModal').modal('toggle')
            currentReviewToDeleteID = e.target.id;
            console.log(currentReviewToDeleteID );
        
        }else if(e.target.classList.contains("edit")){ // EDIT ICON WAS CLICKED
            e.preventDefault();
           $(`.edit`).hide();
           $(`.delete`).hide();
            console.log(e.target.id);
            for(let form of reviewForms){
                if(form.id == e.target.id){
                    $(`#${e.target.id}currentReviewText`).html(form.html);
                }
            }
        }

        // SUBMIT EDITED REVIEW BUTTON CLICKED
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


    // CLICK HANDLER FOR DELETE REVIEW CONFIRM MODAL
    $('#deleteConfirmButton').click(e =>{
            fetch('/deleteReview',{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    albumID : currentReviewToDeleteID
                })
            })
            .then(results => results.json())
            .then(result => {
                console.log(result) 
                if(result == "success"){
                    console.log("review successfully deleted");
                    //getUserInfo();
                    
                    $(`#${currentReviewToDeleteID}Container`).remove()
                }
                
            })
    })


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


// $("#chooseFile").click(e =>{
//     $("#uploadProfileImageButton").show();
//    console.log($("#files").val()); 
// })
// $("#uploadProfileImageButton").click(e =>{
//     if($("#files").val() == ""){
//         console.log("Please choose a file first");
//     }
// })

$("#files").on('change', function(){
    $('#uploadForm').submit();
});

$("#deleteAccountButton").click(e =>{
    console.log($("#userIDspan").html()); 
    $('#deleteAccountModal').modal('toggle')

})

    $("#deleteAccountConfirmButton").click(e =>{
        fetch('/deleteAccount',{
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                userID : $("#userIDspan").html()
            })
        })
        .then(results => results.json())
        .then(result => {
            console.log(result) 
            if(result == "success"){
                console.log("account successfully deleted");
                window.location.href = "/"
                
                
            }
    })
})




})