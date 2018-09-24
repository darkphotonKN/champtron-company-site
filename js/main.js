
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
    }
    else {
        serviceMore.classList.remove('active');
        expanded = false;
    }
});
