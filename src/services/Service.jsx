export const Setting = {
    isOnline: false,
    onlinePath: '',
    offlinePath: 'http://localhost/weebonime/',
    basePath: '/'
}

const request = (url, method, data, formData = false) => {
    const promise = new Promise((resolve, rejected) => {
        let option = {};

        if (method === "POST" || method === "post" || method === "PUT" || method === "put") {
            option.method = method;
            option.body = JSON.stringify(data)
        } else {
            option.method = method;
        }

        if (formData) {
            option.body = data;
        } else {
            option.headers = {
                "Content-Type": "application/json"
            }
        }

        fetch(`${Setting.isOnline ? Setting.onlinePath : Setting.offlinePath}${url}`)
            .then((response) => {
                if (response.ok) {
                    resolve(response.json())
                } else {
                    resolve(response.json())
                }
            }).catch((error) => {
                console.log("is error", error)
                resolve(error.json())
            })
    })

    return promise;
}

const getUser = (data = {}) => {
    let url = 'api/user';
    let method = "GET";
    return request(url, method, data);
}

const loginSubmit = (data = {}) => {
    let url = 'api/user/login';
    let method = "POST";
    return request(url, method, data);
}

const API = {
    getUser,
    loginSubmit
}

export default API;
