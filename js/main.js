
// SELECTORS 
const serviceBtn = document.querySelector('.service-btn .button');
const serviceMore = document.querySelector('.services-container');

// GLOBAL VARS
var expanded = false; 


serviceBtn.addEventListener('click', () => {
    console.log("Working");
    if(!expanded) {
        serviceMore.classList.add('active');
        expanded = true;
        serviceBtn.innerHTML = "Close <i class=\"fas fa-arrow-up\"></i>";
    }
    else {
        serviceMore.classList.remove('active');
        expanded = false;
        serviceBtn.innerHTML = "More";
    }
});
