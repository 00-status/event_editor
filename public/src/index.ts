import Vue from 'vue';

import { fetchEvent, NarrativeEvent, Part } from './api/fetchEvent';
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
        updateParts(updatedPart: Part) {
            const parts = this.narrativeEvent.parts;

            const partsToSave = parts.map((part: Part) => {
                if (part.id === updatedPart.id) {
                    return updatedPart;
                }

                return part;
            });
            writePosts(partsToSave);
        }
    }
});

