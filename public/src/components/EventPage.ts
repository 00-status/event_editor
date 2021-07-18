import { Part, Choice } from "../api/fetchEvent";
import { InfoSection } from "./InfoSection";
import { PartGraph } from "./PartGraph";
import '../components/event-page.css';

const template = `
<div class="event-page">
    <h1>Event Name</h1>
    <div class="editor-container">
        <part-graph
            v-if="narrativeEvent.parts.length >= 1"
            v-bind:parts="narrativeEvent.parts"
            v-bind:choices="narrativeEvent.choices"
            v-on:part-clicked="setCurrentPartId"
        >
        </part-graph>
        <info-section
            v-if="currentPart"
            v-bind:currentPart="currentPart"
            v-bind:parts="narrativeEvent.parts"
            v-on:part-updated="saveParts"
        >
        </info-section>
    </div>
</div>
`;

const EventPage = {
    template,
    data: () => {
        return { currentPartId: null };
    },
    props: {
        narrativeEvent: { parts: Array, choices: Array }
    },
    computed: {
        currentPart() {
            if (this.narrativeEvent.parts.length === 0) {
                return null;
            }

            if (this.currentPartId === null) {
                this.currentPartId = this.narrativeEvent.parts[0].id;
            }

            const currentPart: Part = this.narrativeEvent.parts.find((part: Part) => {
                return part.id == this.currentPartId;
            });
            if (!currentPart) {
                console.warn("Part " + this.currentPartId + " does not exist!");
                return null;
            }

            const currentChoices = this.narrativeEvent.choices.filter((choice: Choice) => {
                return choice.partId == this.currentPartId;
            });

            return { ...currentPart, choices: currentChoices };
        }
    },
    components: {
        'part-graph': PartGraph,
        'info-section': InfoSection
    },
    methods: {
        setCurrentPartId: function (partId: number) {
            this.currentPartId = partId;
        },
        saveParts: function (updatedPart: { part: Part, choices: Array<Choice> }) {
            this.$emit('part-updated', updatedPart);
        }
    }
};

export { EventPage };
