$(document).on('click', '.navbar-toggle-btn', function () {
    $('.navbar-wrap-conteiner').toggleClass('navbar-toggle');
    $('.AppContent-wrapper').toggleClass('AppContent-toggle');
});
function logout(link) {
    document.location.href =link;
}
