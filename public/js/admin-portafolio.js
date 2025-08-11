jQuery(function ($) {
    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });
    let configuration = JSON.stringify({menu:{isOpen:false}});
    configuration = localStorage.getItem('tmp-configuration') || configuration;
    configuration = JSON.parse(configuration);
    $("#close-sidebar").click(function() {
        configuration.menu.isOpen = false;
        localStorage.setItem('tmp-configuration', JSON.stringify(configuration));
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
        configuration.menu.isOpen = true;
        localStorage.setItem('tmp-configuration', JSON.stringify(configuration));
        $(".page-wrapper").addClass("toggled");
    });




});
document.addEventListener("DOMContentLoaded", function (){
    let element_nav = document.querySelector(".page-wrapper");
    if(element_nav){
        let configuration = JSON.stringify({menu:{isOpen:false}});
        configuration = localStorage.getItem('tmp-configuration') || configuration;
        configuration = JSON.parse(configuration);
        if(configuration.menu.isOpen){
            if(!element_nav.classList.contains("toggled")){
                element_nav.classList.add("toggled");
            }
        }else{
            if(element_nav.classList.contains("toggled")){
                element_nav.classList.remove("toggled");
            }

        }
    }
});
