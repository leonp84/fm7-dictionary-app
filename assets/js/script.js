$( document ).ready(function() {

    document.getElementsByClassName('userInput')[0].addEventListener('keydown', 
    function(event) { if (event.key === 'Enter') { lookup(); } });

    $('#menu-button').on ('click', function() {
        $('.menu').toggle()
    });

    $('#sans-serif').on('click', function() {
        $(document.body).removeClass('serif mono').addClass('sans-serif');
        $('.menu').hide()
        $('#font-type').text('Sans Serif')

    })

    $('#serif').on('click', function() {
        $(document.body).removeClass('sans-serif mono').addClass('serif');
        $('.menu').hide()
        $('#font-type').text('Serif')
 
    })

    $('#mono').on('click', function() {
        $(document.body).removeClass('sans-serif serif').addClass('mono');
        $('.menu').hide()
        $('#font-type').text('Monospace')

    })

    $('#play-icon').hover( function() {
            $(this).attr("src", "../assets/images/icon-play-hover.png");
        }, function() {
            $(this).attr("src", "../assets/images/icon-play.svg");

    });

    $('#toggle-theme').on ('click', function() { 
        $(document.body).toggleClass('dark');
        console.log($('#theme-icon').attr('src'))
        if ($('#theme-icon').attr('src') == 'assets/images/icon-moon.svg') {
                $('#theme-icon').attr('src', 'assets/images/icon-moon-dark.svg') 
            } else {
                $('#theme-icon').attr('src', 'assets/images/icon-moon.svg') 
            }
    });


});


function lookup() {
    if (!document.getElementsByClassName('userInput')[0].value.match(/[A-Za-z0-9]/g)) { 
        $('.userInput').css('outline', '1px solid red');
        $('.empty-box').show()
        $('.userInput').on('keydown', function(event) { 
            if (event.key !== 'Enter') {
                $('.userInput').css('outline', '1px solid #A445ED'); 
                $('.empty-box').hide(); 
            }
        });
    } else {
        userInput = document.getElementsByClassName('userInput')[0].value
        console.log(userInput)
        
    }

    clearFocus();
    return
}

function clearFocus() {
    document.getElementsByClassName('userInput')[0].value = "";
    document.getElementsByClassName('userInput')[0].focus();
}