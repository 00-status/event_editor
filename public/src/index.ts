import Vue from 'vue';

import { Choice, fetchEvent, NarrativeEvent, Part } from './api/fetchEvent';
import { writePosts } from './api/writePosts';
import { EventPage } from './components/EventPage';

const initialValues: NarrativeEvent = {
    parts: [],
    choices: []
};

new Vue({
    el: '#app',
    data: { narrativeEvent: initialValues },
    components: { 'event-page': EventPage },
    mounted() {
        fetchEvent((response) => {
            this.narrativeEvent = response;
        });
    },
    methods: {
        updateParts(updatedPart: { part: Part, choices: Array<Choice> }) {
            const parts = this.narrativeEvent.parts;

            const partsToSave = parts.map((part: Part) => {
                if (part.id === updatedPart.part.id) {
                    return updatedPart.part;
                }

                return part;
            });

            writePosts(partsToSave, updatedPart.choices);
        }
    }
});

