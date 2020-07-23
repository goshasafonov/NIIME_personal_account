
var referringPage = document.referrer;

$('.BugForm form').on('submit', function(e){
	e.preventDefault();
	$('.buttonGetBug .mdi-loading').show();
	waitinNotice();

	var HTMLContent = document.querySelector('.ql-editor').innerHTML;
        console.log(HTMLContent);

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
        }
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
                $('.buttonGetBug .mdi-loading').hide();

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











//Settings for Quill text editor
var toolbarOptions = [
        [
            { 'font': [] },
            { 'size': ['small', false, 'large', 'huge'] } // custom dropdown
        ],
                
        ['bold', 'italic', 'underline', 'strike'],
        
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        
        [{ 'header': 1 }, { 'header': 2 },'blockquote', 'code-block'],
        [
            { 'list': 'ordered'}, { 'list': 'bullet' }, 
            { 'indent': '-1'}, { 'indent': '+1' }         // outdent/indent
        ],
        [{ 'direction': 'rtl' }, { 'align': [] }],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': [false, 6, 5, 4, 3, 2, 1] }],

        ['clean']
    ];
    
    var options = 
    {
        debug: '',
        modules: {
          formula: true,
          syntax: true,
          toolbar: toolbarOptions
        },
        placeholder: 'Опишите заявку здесь',
        readOnly: false,
        theme: 'snow'
    };
    
    // Start Quill
    var quill = new Quill('#editor', options);
       
    
    //UNDO REDO
    var span = document.createElement('span');
    span.setAttribute('class', 'ql-formats');
    
    var undo = document.createElement('button');
    undo.setAttribute('type', 'button');
    undo.innerHTML =   
    `<svg style="width:18px;height:18px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" />
    </svg>`;
    undo.addEventListener('click', function(){
        quill.history.undo();
    });
    
    var redo = document.createElement('button');
    redo.setAttribute('type', 'button');
    redo.innerHTML = 
    `<svg style="width:18px;height:18px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z" />
    </svg>`;
    redo.addEventListener('click', function(){
        quill.history.redo();
    });
    
    span.style.float = 'right'
    span.appendChild(undo);
    span.appendChild(redo);
    
    var toolbar = document.querySelector('.ql-toolbar.ql-snow');
    toolbar.appendChild(span);
    
    
    
    
    
    
   