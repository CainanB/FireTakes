$(()=>{

    $("#loginButton").click(async(e) => {
        e.preventDefault(); 
        fetch('/login',{
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                username : $('#usernameLogin').val(),
                password: $('#passwordLogin').val()
                
            })
        })
        .then(results => results.json())
        .then(result => {
            // console.log(result) 
            if(result == "success"){
                window.location.href = "/profile"
            }else{
                $('#loginFailMessage').show();
            }
        })
    })

})