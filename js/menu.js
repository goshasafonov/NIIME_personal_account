
if (localStorage.getItem("menuToggle") === null) {
    localStorage.setItem("menuToggle", 0);
}

if (localStorage.getItem("menuToggle") == true) {
    $('.navbar-wrap-conteiner').toggleClass('navbar-toggle');
    $('.AppContent-wrapper').toggleClass('AppContent-toggle');
}

$(document).on('click', '.navbar-toggle-btn', function () {
    $('.navbar-wrap-conteiner').toggleClass('navbar-toggle');
    $('.AppContent-wrapper').toggleClass('AppContent-toggle');

    if (localStorage.getItem("menuToggle") == 1) {
        localStorage.setItem("menuToggle", 0);
    } else {
        localStorage.setItem("menuToggle", 1);
    }

});

function logout(link) {
    document.location.href = link;
}
