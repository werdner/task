const requestURL = 'https://jsonplaceholder.typicode.com/todos';

function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        xhr.send(JSON.stringify(body));
    })
}

const submitBtn = document.querySelector('.submit-form__button');

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    const usersTerm = getUserTerms();
    const userStatus = getStatus();
    const userAge = getAge();
    const userStory = getStory();
    const userTheme = getTheme();
    const userIdea = getIdea();

    if (usersTerm === -1) {
        alert('Необходимо поставить галочку');
    } else {
        const array = [userStatus, userAge, userStory, userTheme, userIdea];

        const data = getData(array)
    
        sendRequest('POST', requestURL, data)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
})

function getData(array) {
    const params = ['Status', 'Age', 'Story', 'Theme', 'Idea'];
    const userData = {};

    for (let i = 0; i < array.length; i++) {
        if (array[i] === -1) {
            alert("Заполните обязательные поля!");
            break;
        } else {
            userData[params[i]] = array[i];
        }
    };

    return userData;
}

function getStatus() {
    const userStatus = document.querySelectorAll('input[name="user-status"');

    for (const status of userStatus) {
        if (status.checked) {
            return status.value;
        }
    }

    return -1;
}

function getAge() {
    const userAge = document.querySelectorAll('input[name="user-age"');

    for (const age of userAge) {
        if (age.checked) {
            return age.value;
        }
    }

    return -1;
}

function getStory() {
    const userStory = document.querySelectorAll('input[name="user-story"');

    for (const story of userStory) {
        if (story.checked) {
            return story.value;
        }
    }

    return -1;
}

function getTheme() {
    const userTheme = document.querySelector('input[name="user-theme"');
    return userTheme.value || -1;
}

function getIdea() {
    const userIdea = document.getElementById('user-idea');
    return userIdea.value || -1;
}

function getUserTerms() {
    const userTerm = document.getElementById('userTerms');
    if (!userTerm.checked) return -1;
}
