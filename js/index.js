$('body').on('click', '.icon', function() {
    var element = $(this).children().last();
    console.log(element);

    element.css('animation', 'ripple 1s ease-out');
    setTimeout(function() {
        element.css('animation', '');
    }, 1000);
});