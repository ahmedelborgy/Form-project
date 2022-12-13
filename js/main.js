//==============welcome page============
// ============= variables         =============
//sleccted getStared btn


//==============sign up page============
// ============= variables sign up page
//selected input element
let inputs=document.querySelectorAll('input');
let [is_userName,is_userEmail,is_userPass,is_userConfPass]=inputs;

// selected creat account button
let btnCreatACcount=document.querySelector('#creatAccount');

//selected input element
let alerts=document.querySelectorAll('.alert');

let [alertName,alertEmail,alertExistEmail,alertPass,alertConfPass]=alerts;


//==========================add event to  creat account button
btnCreatACcount.addEventListener('click',(e)=>{
   
    signUp();
})
//=========== function signUp()==============
//===========selected data of users==========

let usersData=[];
let storageData=localStorage.getItem('allDataUsers');


if(storageData !=null){
    usersData= JSON.parse(storageData);
    
  
}



function signUp(){
   
 
    usersNameValidtion();
    usersEmailValidtion();
    userPasswordValidation();
    // userConfPasswordValidation();

   if(uservaliadition()==true&&isExist()==true){

   
    let singleData={
        pname:is_userName.value,
        pEmail:is_userEmail.value,
        pPass:is_userPass.value,
        pPconfPass:is_userConfPass.value
    }
  
    usersData.push(singleData);
    localStorage.setItem('allDataUsers',JSON.stringify(usersData));
    console.log('all Data true')
    console.log(usersData)
    getData();

    console.log(btnCreatACcount)
    // btnCreatACcount.setAttribute('href','loggedIn.html')
}





}

//============= clearForm  ===================


// ================     uservaliadition  function       ====================
function uservaliadition(){

  let boolValide=usersNameValidtion()&&usersEmailValidtion()&&userPasswordValidation()&&userConfPasswordValidation();
     if(boolValide==true){
//   alertTryMs.classList.replace('d-block','d-none');
     }
  else{
//   alertTryMs.classList.replace('d-none','d-block');
  }
  
    
  return boolValide;
  }





//===================  usersNameValidtion()

function usersNameValidtion(){
   
    let regex=/^[a-zA-Z]{1}[a-zA-Z0-9]{3,15}[a-zA-Z]{1}$/gm
   
   if(regex.test(is_userName.value)){
    is_userName.classList.add('is-valid');
    is_userName.classList.remove('is-invalid');
    alertName.classList.replace('d-block','d-none');
    return true;

   }
   is_userName.classList.remove('is-valid');
   is_userName.classList.add('is-invalid');
    alertName.classList.replace('d-none','d-block')

  
 
 return false;
 
}
//===================  usersEmailValidtion()

function usersEmailValidtion() {
   
    let regex=/[^ ](@)[a-z]{5,15}(.com)$/gm
   
   if(regex.test(is_userEmail.value) ){

  
        is_userEmail.classList.add('is-valid');
        is_userEmail.classList.remove('is-invalid');
        alertEmail.classList.replace('d-block','d-none');
    return true;

   }
   is_userEmail.classList.remove('is-valid');
   is_userEmail.classList.add('is-invalid');
    alertEmail.classList.replace('d-none','d-block')
 return false;
 
}

//===================  userspasswordeValidtion()
function userPasswordValidation(){
    let regex=/^.{8}$/gm;
    if(regex.test(is_userPass.value)){
        is_userPass.classList.add('is-valid');
        is_userPass.classList.remove('is-invalid');
        alertPass.classList.replace('d-block','d-none');

          userConfPasswordValidation();
        return true;
     
       }
       is_userPass.classList.remove('is-valid');
      is_userPass.classList.add('is-invalid');
    alertPass.classList.replace('d-none','d-block')
       
     return false;
    
}

//===================  usersConfpasswordeValidtion()
function userConfPasswordValidation(){
   
    

    if(is_userConfPass.value==is_userPass.value){
       
    
        is_userConfPass.classList.add('is-valid');
        is_userConfPass.classList.remove('is-invalid');
        alertConfPass.classList.replace('d-block','d-none');
        return true;
    
       }
       is_userConfPass.classList.remove('is-valid');
       is_userConfPass.classList.add('is-invalid');
        alertConfPass.classList.replace('d-none','d-block')
       
     return false;
    
}















// =====================   isExist()  function       =========================
function isExist(){
    console.log(usersData);
    let counter=0;
    
    
    usersData.filter((elem)=>{
    
      
    if(is_userEmail.value.toLowerCase()==elem.pEmail.toLowerCase()){
     counter++;
    }
    
    
    });
    
    console.log(counter)
    if(counter===0){
     
        alertExistEmail.classList.replace('d-block','d-none');
      return true;
    }
    else{
        is_userEmail.classList.add('is-invalid');
        is_userEmail.classList.remove('is-valid');
        alertExistEmail.classList.replace('d-none','d-block');
      return false;
    }
    
    
    
    }
    
          
       
        
    
      












// ===============  POST DATA          ======================

async function getData(){
    
    // let api=await fetch(`https://jsonplaceholder.typicode.com/posts`,
    let api=await fetch(`https://goldblv.com/api/hiring/tasks/register`,
{
method:'POST',
body:JSON.stringify({
    
    username:is_userName.value,
    email:is_userEmail.value,
    password:is_userPass.value,
    password_confirmation:is_userConfPass
    

}),
headers:{
    
    'Accept': 'application/json',
      'Content-Type': 'application/json'
}
})

    .then(function(respose){
      return  respose.json()
    })
    .then(function(data){
      let messages=document.querySelectorAll('.messg')
      let [passMessg,confMessg,invalidMessg]=messages
    
      
        console.log(data.message);
        
        
      passMessg.innerHTML=data.errors.password[1];
      passMessg.classList.replace('d-none','d-block')
     confMessg.innerHTML=data.errors.password[0];
      confMessg.classList.replace('d-none','d-block')
     
      invalidMessg.innerHTML=data.message;
      invalidMessg.classList.replace('d-none','d-block');
      is_userPass.classList.add('is-invalid');
      is_userPass.classList.remove('is-valid');
   
      is_userConfPass.classList.add('is-invalid');
      is_userConfPass.classList.remove('is-valid');


    if(data.message !='The given data was invalid.')

    btnCreatACcount.setAttribute('href','loggedIn.html');

    })
    
}




















