
type PartialPart = {
    id: number|null,
    eventId: number,
    title: string,
    description: string
};

type Part = {
    id: number,
    eventId: number,
    title: string,
    description: string
};

type Choice = {
    id: number,
    partId: number,
    title: string,
    leadingPartId: number|null,
    sortOrder: number
};

type NarrativeEvent = {
    parts: Part[],
    choices: Choice[]
};

const fetchEvent = (callback: (response: NarrativeEvent|null) => void): void => {
    const request = new XMLHttpRequest();

    // Send request
    request.open('GET', '/api/1/narrative_events');
    
    request.onreadystatechange = () => {
        if (request.readyState === request.DONE) {
            callback(mapResponse(JSON.parse(request.responseText)));
        }
    };

    request.send();
};

const mapResponse = (response: any): NarrativeEvent => {
    const parts = response.parts;
    const choices = response.choices;

    const mappedParts = parts.map((part) => {
        return {
            id: part.id,
            eventId: part.event_id,
            title: part.title,
            description: part.description
        }
    });

    const mappedChoices = choices.map((choice) => {
        return {
            id: choice.id,
            partId: choice.part_id,
            title: choice.title,
            leadingPartId: choice.leading_part_id,
            sortOrder: choice.sort_order
        };
    });

    return { parts: mappedParts, choices: mappedChoices };
};

export { fetchEvent, NarrativeEvent, PartialPart, Part, Choice };
