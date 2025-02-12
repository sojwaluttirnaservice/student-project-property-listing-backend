$(() => {



    const hanldleAdminLogin = async (_loginData) => {
        try {

            let url = '/api/v1/auth/login';

            const _res = await fetch(url, {
                method: 'POST',
                body: _loginData
            })

            const { success, message } = await _res.json()

            if (success) {
                alert(message);
                window.location.reload()
            } else {
                alert(message)
            }

        } catch (err) {
            console.error(err)

        }
    }

    $(document).on('click', '#login-btn', function (e) {
        e.preventDefault()
        const loginData = new FormData(document.getElementById('login-form'))
        hanldleAdminLogin(loginData)
    })
})