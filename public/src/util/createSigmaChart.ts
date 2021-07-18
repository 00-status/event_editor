import { Sigma } from 'sigma';
import { DirectedGraph } from 'graphology';
import { circular } from 'graphology-layout';

import { Choice, Part } from '../api/fetchEvent';


const createSigmaChart = (parts: Part[], choices: Choice[], clickEvent: Function) => {
    const peopleGraph = new DirectedGraph();

    parts.forEach((part, index) => {
        peopleGraph.addNode(part.id, {
            label: part.title,
            x: Math.random() * (10 - 1) + 1,
            y: 10 + index,
            size: 10,
            color: '#0B7142'
        });
    });

    choices.forEach(choice => {
        if (choice.leadingPartId) {
            peopleGraph.addDirectedEdge(choice.partId, choice.leadingPartId, {
                size: 4,
                color: '#404375',
            });
        }
    });

    circular.assign(peopleGraph);

    const renderer = new Sigma(
        peopleGraph,
        document.getElementById('chart'),
        { defaultEdgeType: "arrow" }
    );

    renderer.setSetting('renderLabels', false);

    renderer.on('clickNode', (event) => {
        clickEvent(event.node);
    })
};

export { createSigmaChart };
