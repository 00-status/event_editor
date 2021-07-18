import { Choice } from "./fetchEvent";

const writeChoices = (choices: Choice[]) => {
    const request = new XMLHttpRequest();

    request.open('POST', '/api/1/choices', true);
    request.setRequestHeader('content-type', 'application/json');
    
    request.onreadystatechange = () => {
        if (request.readyState === request.DONE) {
            window.location.reload();
        }
    };

    const blob = new Blob([JSON.stringify(choices, null, 2)], {type : 'application/json'});

    request.send(blob);
}

export { writeChoices };