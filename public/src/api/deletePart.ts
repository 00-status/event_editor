import { Part } from "./fetchEvent";

const deletePart = (part: Part) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', '/api/1/part', true);
    request.setRequestHeader('content-type', 'application/json');
    
    request.onreadystatechange = () => {
        if (request.readyState === request.DONE) {
            window.location.reload();
        }
    };

    const blob = new Blob([JSON.stringify(part, null, 2)], {type : 'application/json'});

    request.send(blob);
}

export { deletePart };