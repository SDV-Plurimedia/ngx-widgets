
$().ready(function	()	{

	//scroll to top of the page
	$("#scroll-to-top").click(function()	{
		$("html, body").animate({ scrollTop: 0 }, 600);
		 return false;
	});

	//scrollable sidebar
	// $('.scrollable-sidebar').slimScroll({
	// 	height: '100%',
	// 	size: '0px'
	// });

	//Sidebar menu dropdown
	$('aside li').hover(
       function(){ $(this).addClass('open') },
       function(){ $(this).removeClass('open') }
	)

	//Collapsible Sidebar Menu
	$('.openable > a').click(function(event)	{
		event.preventDefault();
		if(!$('#wrapper').hasClass('sidebar-mini'))	{
			if( $(this).parent().children('.submenu').is(':hidden') ) {
				$(this).parent().siblings().removeClass('open').children('.submenu').slideUp();
				$(this).parent().addClass('open').children('.submenu').slideDown();
			}
			else	{
				$(this).parent().removeClass('open').children('.submenu').slideUp();
			}
		}

		return false;
	});

	$(window).resize(function() {
		if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
			$('#wrapper').addClass('sidebar-mini').addClass('window-resize');
			$('.main-menu').find('.openable').removeClass('open');
			$('.main-menu').find('.submenu').removeAttr('style');
		}
		else if (Modernizr.mq('(min-width: 869px)'))	{
			if($('#wrapper').hasClass('window-resize'))	{
				$('#wrapper').removeClass('sidebar-mini window-resize');
				$('.main-menu').find('.openable').removeClass('open');
				$('.main-menu').find('.submenu').removeAttr('style');
			}
		}
		else	{
			$('#wrapper').removeClass('sidebar-mini window-resize');
			$('.main-menu').find('.openable').removeClass('open');
			$('.main-menu').find('.submenu').removeAttr('style');
		}
	});

	//fixed Sidebar
	$('#fixedSidebar').click(function()	{
		if($(this).prop('checked'))	{
			$('aside').addClass('fixed');
		}
		else	{
			$('aside').removeClass('fixed');
		}
	});

	//Collapse panel
	$('.collapse-toggle').click(function()	{

		$(this).parent().toggleClass('active');

		var parentElm = $(this).parent().parent().parent().parent();

		var targetElm = parentElm.find('.panel-body');

		targetElm.toggleClass('collapse');
	});

	//Hover effect on touch device
	$('.image-wrapper').bind('touchstart', function(e) {
		$('.image-wrapper').removeClass('active');
		$(this).addClass('active');
    });

	//Dropdown menu with hover
	$('.hover-dropdown').hover(
       function(){ $(this).addClass('open') },
       function(){ $(this).removeClass('open') }
	)

});

$(window).load(function() {
	//Stop preloading animation
	Pace.stop();

	// Fade out the overlay div
	$('#overlay').fadeOut(800);

	$('body').removeAttr('class');

	//Enable animation
	$('#wrapper').removeClass('preload');

	//Collapsible Active Menu
	if(!$('#wrapper').hasClass('sidebar-mini'))	{
		$('aside').find('.active.openable').children('.submenu').slideDown();
	}
});

$(window).scroll(function(){

	 var position = $(window).scrollTop();

	 //Display a scroll to top button
	 if(position >= 200)	{
		$('#scroll-to-top').attr('style','bottom:8px;');
	 }
	 else	{
		$('#scroll-to-top').removeAttr('style');
	 }
});
