$(() => {

    // LOGOUT ACTION ON LOGOUT BUTTON


    const handleAdminLogout = async () => {
        try {

            const _res = await fetch('/api/v1/auth/logout', {
                method: 'POST',
            })

            let { success } = await _res.json()

            if (success) {
                window.location.href = '/'
            }
        } catch (err) {
            console.error(err)
        }
    }



    $(document).on('click', '#logout-btn', function (e) {
        e.preventDefault();
        handleAdminLogout()
    });



    // FOR NAVBAR MOBILE MENU

    const mobileMenuBtn = $('.mobile-menu-btn');
    const navLinks = $('.nav-links');
    const navProfile = $('.nav-profile');
    const menuIcon = $('.mobile-menu-btn i');

    // Toggle menu on hamburger click
    mobileMenuBtn.on('click', function (e) {
        e.stopPropagation(); // Prevent click from bubbling to document
        navLinks.toggleClass('active');
        navProfile.toggleClass('active');

        // Toggle hamburger icon between bars and times
        menuIcon.toggleClass('fa-bars fa-times');
    });

    // Close menu when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.navbar').length) {
            navLinks.removeClass('active');
            navProfile.removeClass('active');
            menuIcon.removeClass('fa-times').addClass('fa-bars');
        }
    });

    // Prevent menu close when clicking inside
    $('.nav-links, .nav-profile').on('click', function (e) {

        // e.stopPropagation();
    });
})