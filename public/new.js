function edureg(){
  var g= document.getElementById('regpopupprogram');
  g.style.display="block";
}
function coursecr(a){
  if(a==0){
    axios.get('/mycourses_list')
    .then(function (response) {
       if(response.data.message!='Exist'){
         var g= document.getElementById('demopopupprogram');
         g.style.display="block";
       }else{
         window.alert(response.data.message);
       }
    })
    .catch(function (error) {
    console.log(error);
    });
  }
  if(a==1){
  var g= document.getElementById('courpopupprogram');
  g.style.display="block";
}else if(a==2){
  var g= document.getElementById('courepopupprogram');
  g.style.display="block";
  axios.get('/mycourses_list')
  .then(function (response) {

    var g='';
    for(i=0;i<response.data.length;i++){
      var g=g+'<div class=\"card\"><div class=\"card-header\" style=\"background:#38a48d;color:white;\">User Enroll: '+response.data[i].user_enroll+'</div><div class=\"card-body\"><h5 class=\"card-title\">'+response.data[i].course_name+'</h5><p class=\"card-text\">Rating:'+response.data[i].course_rating+'</p><a href=\"courses_edit?course_id='+response.data[i].course_id+'\" class=\"login_submit\">View Course</a></div></div><br>';
    }
    var k= document.getElementById('coursesmy');
    k.innerHTML=(g);

  })
  .catch(function (error) {
  console.log(error);
  });
}
}
function closer(){
  var g= document.getElementById('regpopupprogram');
  g.style.display="none";

}
function closera(a){
  var g= document.getElementById(a);
  g.style.display="none";

}
function myaedu(){
    event.preventDefault();
    var first = document.getElementsByName('edu_first_name')[0].value;
    var last = document.getElementsByName('edu_last_name')[0].value;
    var email = document.getElementsByName('edu_email_id')[0].value;
    var cno = document.getElementsByName('edu_contact_no')[0].value;
    var description = document.getElementsByName('edu_description')[0].value;
    axios.post('/educator_register', {
    first: first,
    last: last,
    email: email,
    cno: cno,
    description: description
  })
  .then(function (response) {

       var g= document.getElementById('edu_registerform');
       g.style.display='none';
       var g= document.getElementById('edu_otpform');
       g.style.display='block';

  })
  .catch(function (error) {
    console.log(error);
  });
}
function mybedu(){
    event.preventDefault();
    var otp = document.getElementsByName('otp_da_edu')[0].value;
    axios.post('/educator_register_otp', {
     otp: otp
  })
  .then(function (response) {
        console.log(response.data);
        if(response.data.message=='Invalid Otp'){
          var g= document.getElementById('edu_finalmess');
          g.innerHTML= response.data.message;
        }else{
       var g= document.getElementById('edu_otpform');
       g.style.display='none';
       var g= document.getElementById('edu_finalmess');
       g.innerHTML= response.data.message;
       var g= document.getElementById('edu_upform');
       g.style.display='block';
     }
  })
  .catch(function (error) {
    console.log(error);
  });
}

function mybedulas(){
    event.preventDefault();
    var qualification = document.getElementsByName('edu_qualification')[0].value;
    var experience = document.getElementsByName('edu_experience')[0].value;
    var subject = document.getElementsByName('edu_subject')[0].value;
    var category = document.getElementsByName('category')[0].value;
    var pass = document.getElementsByName('password')[0].value;
    var repass = document.getElementsByName('repassword')[0].value;
    if(pass != "" && pass == repass) {
     if(pass.length < 6) {
       alert("Error: Password must contain at least six characters!");
       return false;
     }
     re = /[0-9]/;
     if(!re.test(pass)) {
       alert("Error: password must contain at least one number (0-9)!");

       return false;
     }
     re = /[a-z]/;
     if(!re.test(pass)) {
       alert("Error: password must contain at least one lowercase letter (a-z)!");
       return false;
     }
     re = /[A-Z]/;
     if(!re.test(pass)) {
       alert("Error: password must contain at least one uppercase letter (A-Z)!");
       return false;
     }
   } else {
     alert("Error: Please check that you've entered and confirmed your password!");
     return false;
   }

    axios.post('/educator_register_final_step', {
     qualification: qualification,
     experience: experience,
     subject: subject,
     category: category,
     password: pass
  })
  .then(function (response) {
        console.log(response.data);
       var g= document.getElementById('edu_upform');
       g.style.display='none';
       var g= document.getElementById('edu_finalmess');
       g.innerHTML= response.data.message;
  })
  .catch(function (error) {
    console.log(error);
  });
}
