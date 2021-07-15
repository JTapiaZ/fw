/* Template Name: Zorial - Responsive Bootstrap 4 Landing Page Template
    Author: Themesdesign
    Version: 1.0.0
    Created: Jan 2020
    File Description: Main js file*/

// STICKY
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $(".sticky").addClass("nav-sticky");
    } else {
        $(".sticky").removeClass("nav-sticky");
    }
});

// SmoothLink
$('.nav-item a, .mouse-down a').on('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});

// light/dark mode button
$("#mode").on('click', function(event){
    var currentMode = $(event.currentTarget).attr('mode');
    if(currentMode == "light") {
        $("#app-css").attr('href', 'css/style-dark.css');
        $("#mode").attr('mode', 'dark');
    } else {
        $("#app-css").attr('href', 'css/style.css');
        $("#mode").attr('mode', 'light');
    }
});


//Scrollspy
$(".navbar-nav").scrollspy({
    offset: 70
});

function initScrollspy() {
    $("#navbarCollapse").scrollspy({
        offset: 20
    });
}

// STICKY BUTTON
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $(".nav-btn").addClass("active");
    } else {
        $(".nav-btn").removeClass("active");
    }
});



// owl carousel

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    autoplay:true,
    autoplay:3000,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});

// Contact Form
async function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var comments = document.getElementById("comments").value;
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (name.length < 8) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "¡Debes ingresar tu nombre completo!",
            confirmButtonColor: '#106fde',
            timer: 10500
        })
        return (false);
    } else if (regex.test(email) == false) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "¡Debes ingresar una direccion de correo electronico valida!",
            confirmButtonColor: '#106fde',
            timer: 10500
        })
        return (false);
    } else if (subject.length < 6) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "¡Debes ingresar un numero de celular valido!",
            confirmButtonColor: '#106fde',
            timer: 10500
        })
        return (false);
    } else if (comments.length < 7) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "¡Debes ingresar una descripcion de tu solicitud!",
            confirmButtonColor: '#106fde',
            timer: 10500
        })
        return (false);
    } else {
        await fetch('https://backfw.herokuapp.com/api/sendEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                comments,
            })
        })
        .then(function (result) {
            if (result['ok'] === true) {
                result.text().then(function (data) {
                    Swal.fire({
                        title:'¡Bien!',
                        text:"Gracias por registrarse, pronto nos pondremos en contacto con usted.",
                        icon:'success'
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 4000);
                })
            } else {
                result.text().then(function (data) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: data,
                        timer: 10500
                    })
                })
            }

        })
        .catch(function (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: data,
                timer: 10500
            })
        })
        } 
        
    }







