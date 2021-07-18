import { Choice, Part } from "./fetchEvent";
import { writeChoices } from "./writeChoices";

const writePosts = (parts: Part[], choices: Choice[]) => {
    const request = new XMLHttpRequest();

    request.open('POST', '/api/1/parts', true);
    request.setRequestHeader('content-type', 'application/json');
    
    request.onreadystatechange = () => {
        if (request.readyState === request.DONE) {
            writeChoices(choices);
        }
    };

    const blob = new Blob([JSON.stringify(parts, null, 2)], {type : 'application/json'});

    request.send(blob);
}

export { writePosts };
