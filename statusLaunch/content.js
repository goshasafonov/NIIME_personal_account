$(function () {
    $('.examplePoppver').popover({
        content: "<div class='card'><h5 class='card-header bg-transparent'>Название карточки</h5><div class='card-body'><p class='card-text'>This card has supporting text below as a natural lead-in to additional content.</p></div><div class='dropdown-divider'></div><ul><li>We can do it</li><li>Every day 24/7</li><li>Greatest UI in the word</li></ul><div class='card-footer'><small class='text-muted'>Last updated 29.05.1996</small></div></div>"
    });
    $('[data-toggle="popover"]').popover();
});
