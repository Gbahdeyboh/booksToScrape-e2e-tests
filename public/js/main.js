//Register a service Worker
document.addEventListener('DOMContentLoaded', registerServiceWorker => {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js')
        .then(serviceWorker => { 
            console.log("service worker registered : ", serviceWorker);
        })
        .catch(err => {
            console.log('Did not register service worker : ', err)
        });
    } 
    else{
        console.log("service Worker does not exists in browser")
    }
});
//Loading Animation
document.addEventListener('DOMContentLoaded', function(){ 
    const loader = document.querySelector('#load'); //Animated text
    const head = document.querySelector('#headContent'); //Animated text body
    //Show animation for four seconds before showing the main page
    //loader.style.display = "none"; 
    //head.style.display = "block";
    
    setTimeout(function(){
        loader.style.display = "none"; //hide animation after four seconds
        head.style.display = "block"; //show the main page
    }, 2000);
    
});
//The side menu displayed on mobile  phones
function showMenu(){ 
    const menu = document.querySelector('#smallScreenMenu'); //menu displayed on mobile phones
    const overlay = document.querySelector('#overlay'); //the page overlay
    overlay.style.display = "block"; //Sjow the page overlay
    menu.style.display = "block"; //show the page menu
}
//The function below closes the menu displayed on mobile phones
function closeMenu(){
    const menu = document.querySelector('#smallScreenMenu'); //menu displayed on mobile phones
    const overlay = document.querySelector('#overlay'); //the page overlay
    menu.style.display = "none"; //hide the menu
    overlay.style.display = "none" //hide the overlay
}
//close mobile phones menu when user selects a section to navigate to in the menu
document.addEventListener('DOMContentLoaded', function(){
    //make sure th DOM has loaded before executing script
    var ro = document.querySelectorAll('.ro'); //Select all navigations as a nodelist
    ro.forEach(close => { //for Each of the selected navigator
       close.addEventListener("click", closeMenu => { //add a click EventListener
              document.querySelector('#smallScreenMenu').style.display = "none"; //close the menu
              document.querySelector('#overlay').style.display = "none"; //close the overlay
            });
        });
    });
//Google Maps
function myMap(){
    // The location of IC mikro Labs
  // var hic = {lat: 7.1257893, lng: 3.3641757};
  // // The map, centered at hic 
  // var map = new google.maps.Map(
  //     document.getElementById('googleMaps'), {zoom: 8, center: hic});
  // // The marker, positioned at hic
  // var marker = new google.maps.Marker({position: hic, map: map});



  var latlng = new google.maps.LatLng(7.1257893, 3.3641757);
  map = new google.maps.Map(document.getElementById('googleMaps'), {
  center: latlng,
  zoom: 12
});
};
/*The glowVision & glowMission functions below shows a glowing animation when the vision and mission 
nav bar are clicked*/
function glowVision(){
    closeBlogContainer() //close the blog container
    vis = document.querySelector('#vis');//vision body
    vis.classList.toggle("glow"); //toggle/add the glow class to the vision body to show animation
    setTimeout(showGlow => {
        vis.style.display = "flex";
    }, 10); //show the animation after 10milli seconds
    setTimeout(removeGlow => {
        vis.classList.remove("glow");
    }, 3000) //Remove the glow class after 3 seconds
}
function glowMission(){
    closeBlogContainer() //close the blog container
    mis = document.querySelector('#mis');//mission body
    mis.classList.toggle("glow");//toggle/add the glow class to the mission body to show animation
    setTimeout(showGlow => {
        mis.style.display = "flex";
    }, 10);//show the animation after 10milli seconds
    setTimeout(removeGlow => {
        mis.classList.remove("glow");
    }, 3000)//Remove the glow class after 3 seconds
}
function donate(){
    // const donateOverlay = document.querySelector('#donationOverlay');
    // const donation = document.querySelector('#donations');
    // const closeImage = document.querySelector('#closeImage');
    // closeImage.style.display = "none";
    // donateOverlay.style.display = "block";
    // donation.style.display = "flex";
    window.open('https://paystack.com/pay/rp318ro0sf');
}
/*
*The function below makes sure a donator inputs a price to be donated before payment is processed,
*Every other input can be left blank just incase the donor wants to be annonymous
*/ 
function validateDonationPrice(){
    const donationPrice = document.querySelector('#donorPrice'); //donated price input field
    if(donationPrice.value == "" || donationPrice.value < 500){ 
        //if no price was inputted or an invalid amount was entered
        alert("Please input a valid amount to donate"); //display error
    }
    else{
        //Proceed to make payment
        let name = document.querySelector('#donorName').value;
        let email = document.querySelector('#donorEmail').value;
        let number = document.querySelector('#donorNumber').value;
        let price = document.querySelector('#donorPrice').value;
        if(name == ""){
            name = "Annonymous";
        }
        if(email == ""){
            email = "Annonymous@email.com";
            console.log("Email is ", email)
        }
        if(number == ""){
            number = "08000000000";
        }
        const API_publicKey = "FLWPUBK-218148dd4eb230b1d60b659141d917ea-X";//Api public key
        function payWithRave(){
            var x = getpaidSetup({
                PBFPubKey: API_publicKey,
                customer_email: email,
                amount: price,
                customer_phone: number,
                currency: "NGN",
                payment_method: "both",
                txref: "rave-123456",
                meta: [{
                    metaname: name,
                    metavalue: "AP1234"
                }],
                onclose: function() {
                    //do something when the close prompt is clicked
                    console.log("Closed");
                },
                callback: function(response) {
                    var txref = response.tx.txRef; // collect flwRef returned and pass to a server page to complete status check.
                    console.log("This is the response returned after a charge", response);
                    const res = response.tx.chargeToken.embed_token;
                    if (
                        response.tx.chargeResponseCode == "00" ||
                        response.tx.chargeResponseCode == "0"
                    ) {
                        //show successsful Transaction prompt
                        console.log("payment was successful");
                        document.querySelector('#donationBody').style.display = none;
                    } else {
                        //show failed payment prompt
                        // redirect to a failure page.
                        console.log("PAyment Failed");
                    }

                    x.close();
                }
            });
        };
        payWithRave(); //make payment
    }
}
//Close the Donation Prompt
function closeDonation(){
    const donation = document.querySelector('#donations');
    const donationOverlay = document.querySelector('#donationOverlay');
    donation.style.display = "none";
    donationOverlay.style.display = "none";
}

function scrollGalleryRight(){
    //This function is used to scroll the gallery images to the right
    var gal = document.querySelector('.gal');
    gal.scrollLeft += 800;  
    console.log("scrolled")
}
function scrollGalleryLeft(){
//This function is used to scroll the gallery images to the left
    var gal = document.querySelector('.gal');
    gal.scrollLeft -= 800;  
    console.log("scrolled")  
}
document.addEventListener('DOMContentLoaded', function(){
    var images = document.querySelectorAll('.galImage')
    images.forEach(img => {
        img.addEventListener('click', function(){
            const overlay = document.querySelector('.galOverlay');
            const imgBody = document.querySelector('.imgLargeBody');
            const selectedImage = document.querySelector('.selectedImage');
            const galSelectedImage = document.querySelector('.galSelectedImage');
            const closeImage = document.querySelector('#closeImage');
            closeImage.style.display = "block";
            overlay.style.display = "flex";
            imgBody.style.display = "flex";
            selectedImage.style.display = "flex";
            galSelectedImage.src = img.src;
            console.log("Clicked : ", img.src);
        });
    });
});
function closeImageOverlay(){
    const overlay = document.querySelector('.galOverlay');
    const imgBody = document.querySelector('.imgLargeBody');
    const selectedImage = document.querySelector('.selectedImage');
    const closeImage = document.querySelector('#closeImage');
    overlay.style.display = "none";
    imgBody.style.display = "none";
    selectedImage.style.display = "none";
    closeImage.style.display = 'none';
}

function closeBlogContainer(){
    const blogContainer = document.querySelector("#blogPage");
    blogContainer.classList.add("closeBlogAnim");
    setTimeout(() => {
        blogContainer.style.display = "none";
        blogContainer.classList.remove("closeBlogAnim");
    }, 500);
}

function displayBlogContainer(){
    closeGalleryContainer();
    const blogContainer =document.querySelector("#blogPage");
    blogContainer.style.display = "block";
}

function displayGalleryContainer(){
    closeBlogContainer();
    const galContainer =document.querySelector("#galPage");
    galContainer.style.display = "block";
}

function closeGalleryContainer(){
    const galContainer = document.querySelector("#galPage");
    galContainer.classList.add("closeBlogAnim");
    setTimeout(() => {
        galContainer.style.display = "none";
        galContainer.classList.remove("closeBlogAnim");
    }, 500);
}

function closeAllContainer(){
    closeGalleryContainer();
    closeBlogContainer();
}

function closeBlogDetail() {
    document.querySelector('#blogDetailContainer').style.display = "none";
    document.querySelector('#closeBlogDetail').style.display = "none";
    document.querySelector('#blogBody').style.display = "flex";
}

function displayNextImage(){
    const imageView = document.querySelector('#galDisplayImage');
    const imageViewSrc = imageView.src;
    const imgN = imageViewSrc.split('/');
    const imageName = imgN.pop();
    let imageIndex = imageName.split('.').shift();
    const imagePath = imgN.join('/');
    if(Number(imageIndex) < 20){
        imageView.src = `${imagePath}/${Number(imageIndex) + 1}.jpg`;  
        console.log(`${imagePath}/${Number(imageIndex) + 1}.jpg`); 
    }
    else{
        imageIndex = 0;
        imageView.src = `${imagePath}/${Number(imageIndex) + 1}.jpg`;  
        console.log(`${imagePath}/${Number(imageIndex) + 1}.jpg`);
    }

}

function displayPrevImage(){
    const imageView = document.querySelector('#galDisplayImage');
    const imageViewSrc = imageView.src;
    const imgN = imageViewSrc.split('/');
    const imageName = imgN.pop();
    let imageIndex = imageName.split('.').shift();
    const imagePath = imgN.join('/');
    if(Number(imageIndex) < 2){
        imageIndex = 21;
        imageView.src = `${imagePath}/${Number(imageIndex) - 1}.jpg`;  
        console.log(`${imagePath}/${Number(imageIndex) - 1}.jpg`); 
    }
    else{
        imageView.src = `${imagePath}/${Number(imageIndex) - 1}.jpg`;  
        console.log(`${imagePath}/${Number(imageIndex) - 1}.jpg`);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const galImage = document.querySelectorAll('.galImageSelect');
    galImage.forEach(image => {
        image.addEventListener('click', () => {
            const imageSrc = image.src;
            const imageView = document.querySelector('#galDisplayImage');
            imageView.src = imageSrc;
        })
    })
});

