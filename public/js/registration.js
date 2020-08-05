$(()=>{

    $("#registerButton").click(async(e) => {
        e.preventDefault(); 
        let passw = $('#password').val()
        let passConf = $('#passwordConfirm').val()
        // console.log(passw)
        // console.log(passConf)

        if (passw != passConf) {
            $('#passwordFailMessage').show();
            $('#registerFailMessage').hide();
            // console.log(`${$('#password')}`)
            // $('#password').value = "";
            // $('#passwordConfirm').value = "";
        }
        else {
            fetch('/registration',{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    username : $('#username').val(),
                    password: $('#password').val()
                    
                })
            })
            .then(results => results.json())
            .then(result => {
                // console.log(result) 
                if(result == "success"){
                    $('#exampleModal').modal('toggle');
                }else{
                    $('#registerFailMessage').show();
                    $('#passwordFailMessage').hide();
                }
            })
        }
    })

})