import toast from "../toast-alerts-handler.js"

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
                toast.success(message)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                toast.error(message)
            }
        } catch (err) {
            console.error(err)
            toast.error("Error")
        }
    }

    $(document).on('click', '#login-btn', function (e) {
        e.preventDefault()

        const loginData = new FormData(document.getElementById('login-form'))
        hanldleAdminLogin(loginData)
    })
})