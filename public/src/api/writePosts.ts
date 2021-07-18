import { Part } from "./fetchEvent";

const writePosts = (parts: Part[]) => {
    const request = new XMLHttpRequest();

    request.open('POST', '/api/1/parts', true);
    request.setRequestHeader('content-type', 'application/json');
    
    request.onreadystatechange = () => {
        if (request.readyState === request.DONE) {
            window.location.reload(true);
        }
    };

    const blob = new Blob([JSON.stringify(parts, null, 2)], {type : 'application/json'});

    request.send(blob);
}

export { writePosts };
