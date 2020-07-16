var referringPage = document.referrer;

$('.BugForm form').on('submit', function(e){
	e.preventDefault();
	$('.buttonGetBug .mdi-loading').show();
	waitinNotice();


	var text = this;
	console.log(this);

    var formData = new FormData();
    formData.append('queryId', 'setBug');

    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            successSetBug(data);
        },
    });
});

function successSetBug(data) {
        try {
            var jsonData = JSON.parse(data);
            if (typeof jsonData.AuthError !== "undefined") {
                alertMsg(jsonData.AuthError);
                location.reload();
            } else {
                $('.BugForm form').css({'filter' : 'blur(2px)'});
                $('.buttonGetBug .mdi-loading').hide()

            }
        } catch (e) {
            alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
        }
    };



function waitinNotice (){
	$('.thanksForBug').show();
	$('.thanksForBug .lineWait span').addClass('animateWait');
	setTimeout(function(){
		$('.thanksForBug').hide();
		$('.thanksForBug .lineWait span').removeClass('animateWait');
		$('.BugForm form').css({'filter' : ''});
	},2000);
}
console.log( "Вы пришли с страницы: ", referringPage );