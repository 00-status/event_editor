import { Choice } from "./fetchEvent";

const deleteChoice = (choice: Choice) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', '/api/1/choice', true);
    request.setRequestHeader('content-type', 'application/json');
    
    request.onreadystatechange = () => {
        if (request.readyState === request.DONE) {
            console.log('choice - ' + choice.id + ' - deleted!');
        }
    };

    const blob = new Blob([JSON.stringify(choice, null, 2)], {type : 'application/json'});

    request.send(blob);
}

export { deleteChoice };