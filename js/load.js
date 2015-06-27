$(document).ready(function() {

	// Shows loading gif when loading
	$(window).load(function() {
		$('header').show();
	}, function() {
		$('header').hide();
	});

	// Check for mobile browser (from http://detectmobilebrowser.com)
	window.mobilecheck = function() {
 		var check = false;
  		(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
 		return check;
	}

	// Load content on page load
	var url = "../portfolio/data/all.json";
	function filterGallery(url) {	
		$.getJSON(url, function(response) {
			var statusHTML = '';
			$.each(response, function(index, content) {
				statusHTML += '<a href="#' + index + 
					'" title="' + content.alt + 
					'"><img id="' + index + 
					'" src="' + content.icon + 
					'" alt="' + content.alt +
					'" data-content-icon="' + content.icon +
					'" data-content-image="' + content.image +
					'" data-content-group="' + content.group + 
					'" data-content-context="' + content.context +
					'" data-content-caption="' + content.caption +
					'" data-content-hidden="' + content.hidden + 
					'" data-content-position-top="" class="' + content.gridSize + 
					' icon"></a>';
			});
			$('#gallery').append(statusHTML);

			// Hide icons with 'data-content-hidden' attr of 1
			$('#gallery img').each(function() {
				if ($(this).attr('data-content-hidden') === '1') {
					$(this).hide();
				}
			});

			// If mobile browser undetected, enable hover effects
			if (!window.mobilecheck()) {
				jQuery.fx.interval = 5;
				$('.icon').addClass('hover');
				$('#showcase img').addClass('hover');
				$('#menu-button').addClass('hover');
				$('#menu li').addClass('hover');
				$('#contact-menu a li').addClass('hover');
			}

			// Gallery events
			$('.icon').on('click', function(event) {
				event.preventDefault();
				var toShowcase = '#' + $(this).attr("id");
				var selectedGroup = $(this).attr('data-content-group');
				var refIndex = $(this).attr('id');
				var displayGroupHTML = '<div id="group" class="grid-12"><sub class="caption"><strong>In this series...</strong></sub><div id="series">';

				if ($(this).hasClass('group-accessed')) {
					$(this).removeClass('group-accessed');
				}

				// If clicked icon doesn't have .clicked class, add class and full content after icon
				if (!$(this).hasClass('clicked')) {
					$(this).addClass('clicked');

					// Constructs HTML for sub-icons
					$('#gallery img').each(function() {
						if ($(this).attr('data-content-group') === selectedGroup) {
							displayGroupHTML += '<a href="#arrow" title="' + 
								$(this).attr('alt') + '"><img src="' + 
								$(this).attr('data-content-icon') + '" alt="' + 
								$(this).attr('alt') + '" data-content-image="' +
								$(this).attr('data-content-image') + '" data-content-context="' +
								$(this).attr('data-content-context') + '" data-content-caption="' +
								$(this).attr('data-content-caption') + '" data-content-index="' + 
								$(this).attr('id') + '"class="grid-2 sub-icon"></a>';
						}
					});
					displayGroupHTML += '</div></div>';

					$(toShowcase).after('<img id="arrow" class="grid-1 centered" src="resources/logo/arrow_down.svg">', '<div id="title" class="grid-12"><h3>' + $(this).attr('alt') + '</h3></div><div id="showcase" class="grid-12 centered"><img class="centered" src="' + $(this).attr('data-content-image') + '"></div>' + displayGroupHTML + '<section class="grid-8"><p class="caption">' + $(this).attr('data-content-caption') + '</p></section><section class="grid-4"><p class="context">' + $(this).attr('data-content-context') + '</p></section>');

				// If displayed sub-icons matches icons, remove icons
				$('#gallery > a > img').not($(this)).each(function() {
					if ($(this).attr('data-content-group') === selectedGroup) {
						$(this).addClass('group-accessed');
					} else
					$(this).removeClass('group-accessed');
				});

					// Adds .clicked styling to sub-icon
					$('#group img').each(function() {
						if ($(this).attr('data-content-index') === refIndex) {
							$(this).addClass('sub-icon-clicked');
						}
					});

					// For scrollTop to work: add class to icons after full content
					$('#showcase').parent().nextAll('a').children('.icon').addClass('afterShowcase');
				}

				// Click events for sub-icons
				$('.sub-icon').on('click', function() {
					var refIndex = $(this).attr('data-content-index');
					var newSrc = $(this).attr('data-content-image');
					$('#showcase img').attr('src', newSrc);
					$(this).addClass('sub-icon-clicked');
					$('#series img').not($(this)).removeClass('sub-icon-clicked');
					$('p.caption').html($(this).attr('data-content-caption'));
					$('p.context').html($(this).attr('data-content-context'));
					$('#title h3').html($(this).attr('alt'));
				});

				// If icon after full content was selected, remove class
				if ($(this).hasClass('afterShowcase')) {
					$(this).removeClass('afterShowcase');
				}

				// Removes added content after other .icon not $(this)
				$('#gallery a img:first-child').not(this).each(function() {
					$('#showcase').parent().prevAll('a').children('img').removeClass('afterShowcase');
					$(this).removeClass('clicked');
					$(this).next('#arrow').nextAll().remove();
					$(this).next('#arrow').remove();
				});

				// For scrollTop to work: maintain yPos of icons after #showcase div
				var showcaseHeight = $('#showcase').height();
				$('.afterShowcase').each(function() {
					var newPosition = $(this).attr('data-content-position-top') - showcaseHeight;
					$(this).attr('data-content-position-top', newPosition);
				});

				// Sets top of window to #showcase
				$('html, body').scrollTop($('.clicked').position().top);
			});

			// Hides loader
			$('header').hide();
		});
	}
	filterGallery(url);

	// Menu events
	function collapseMenu() {
		$('#menu').slideUp("fast");
		$('#menu-button').removeClass('selected');
		$('#contact-menu').slideUp('fast');
		// If current page is about
		if($('#about li').hasClass('entered')) {
			$('#about li').addClass('selected');
			$('#portfolio li').removeClass('selected');
			$('#portfolio-menu').slideUp('fast');
		} else {
			$('#portfolio li').addClass('selected');
			$('#portfolio-menu').slideDown('fast');
		}
	}

	// Collapse menu when clicking outside of menu or scroll
	$('div').on('click', collapseMenu);
	$(window).on('scroll', collapseMenu);

	// Menu button events
	$('#menu-button').on('click', function(event) {
		event.preventDefault();
		$(window).on('scroll', collapseMenu);
		$('div').on('click', collapseMenu);
		$('#menu').slideToggle("fast");
		$('#menu-button').toggleClass('selected');
		if($('#about li').hasClass('selected')) {
			$('#portfolio-menu').slideUp('fast');
		}
		$('#contact-menu').slideUp("fast");
		$('#contact li').removeClass('selected');
	});

		// Portfolio button events
		$('#portfolio').on('click', function(event) {
			event.preventDefault();
			$(window).on('scroll', collapseMenu);
			$('div').on('click', collapseMenu);
			$('#portfolio li').toggleClass('selected');
			$('#portfolio').next().slideToggle("fast");
			$('#contact-menu').slideUp("fast");
			$('#contact li').removeClass('selected');
			$('#about li').removeClass('selected');
		});
			// Portfolio sub-menu events
			$('#all-button').on('click', function() {
				$('#about li').removeClass('entered');
				$('header').show();
				$(this).children().addClass('selected');
				$(this).siblings().children().removeClass('selected');
				$('#gallery').children().remove();
				var url = "../portfolio/data/all.json";
				collapseMenu();
				filterGallery(url);
			});
			$('#arch-button').on('click', function() {
				$('#about li').removeClass('entered');
				$('header').show();
				$(this).children().addClass('selected');
				$(this).siblings().children().removeClass('selected');
				$('#gallery').children().remove();
				var url = "../portfolio/data/architecture.json";
				collapseMenu();
				filterGallery(url);
			});
			$('#ixd-button').on('click', function() {
				$('#about li').removeClass('entered');
				$('header').show();
				$(this).children().addClass('selected');
				$(this).siblings().children().removeClass('selected');
				$('#gallery').children().remove();
				var url = "../portfolio/data/ixd.json";
				collapseMenu();
				filterGallery(url);
			});

		// About button events
		$('#about').on('click', function(event) {
			event.preventDefault();
			$(window).off('scroll');
			$('div').off('click');
			$('#about li').addClass('entered').addClass('selected');
			$('#portfolio li').removeClass('selected');
			$('#portfolio-menu li').removeClass('selected');
			$('#menu-button').removeClass('selected');
			$('#menu').slideUp('fast');
			$(this).siblings('ul').slideUp('fast');
			$('#gallery a').remove();
			$('#gallery').load('about.html', function() {
				if (!window.mobilecheck()) {
					jQuery.fx.interval = 5;
					$('#timeline a img').addClass('hover');
				}
			});
		});

		// Contact button events
		$('#contact').on('click', function(event) {
			event.preventDefault();
			$(window).on('scroll', collapseMenu);
			$('div').on('click', collapseMenu);
			$('#contact-menu').slideToggle("fast");
			$('#contact li').toggleClass('selected');
			$('#portfolio li').removeClass('selected');
			$('#portfolio').next().slideUp("fast");
			$('#about li').removeClass('selected');
		});
});