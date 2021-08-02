import '../components/event-page.css';
import { Part, Choice } from "../api/fetchEvent";
import { InfoSection } from "./InfoSection";
import { PartGraph } from "./PartGraph";
import { NewPartModal } from "./NewPartModal";
import { deleteChoice } from '../api/deleteChoice';

const template = `
<div class="event-page">
    <new-part-modal 
        v-if="showModal"
        v-on:close="showModal=false"
        v-on:save-part="savePartFromModal"
    >
    </new-part-modal>
    <div class="page-title">
        <h1>Event Name</h1>
        <button class="page-title-button" v-on:click="showModal=true">
            Add Part + 
        </button>
    </div>
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
            v-bind:choices="currentChoices"
            v-bind:parts="narrativeEvent.parts"
            v-on:part-updated="saveParts"
            v-on:part-deleted="deletePart"
            v-on:choice-added="addChoice"
            v-on:choice-deleted="deleteChoice"
        >
        </info-section>
    </div>
</div>
`;

const EventPage = {
    template,
    data: () => {
        return {
            currentPartId: null,
            showModal: false,
            currentChoices: []
        };
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

            return { ...currentPart };
        }
    },
    components: {
        'part-graph': PartGraph,
        'info-section': InfoSection,
        'new-part-modal': NewPartModal
    },
    methods: {
        setCurrentPartId: function (partId: number) {
            this.currentPartId = partId;

            const currentChoices = this.narrativeEvent.choices
                .filter((choice: Choice) => {
                return choice.partId == this.currentPartId;
                })
                .map(function (choice: Choice) {
                    return { key: Math.random()*1000, ...choice };
                });

            this.currentChoices = currentChoices;
        },
        savePartFromModal(partialPart: {title: string, description: string}) {
            const eventId = this.currentPart.eventId;

            const partToSave = {
                id: null,
                eventId,
                title: partialPart.title,
                description: partialPart.description
            };

            this.$emit('save-part', partToSave);
        },
        saveParts: function (updatedPart: { part: Part, choices: Array<Choice> }) {
            this.$emit('part-updated', updatedPart);
        },
        deletePart(part: Part) {
            this.$emit('part-deleted', part);
        },
        addChoice(choice) {
            this.currentChoices.push(choice);
        },
        deleteChoice(choiceKey: number) {
            const indexToRemove = this.currentChoices.findIndex((choice) => {
                return choice.key === choiceKey;
            });
            const choiceToDelete = this.currentChoices[indexToRemove];

            if (choiceToDelete.id && choiceToDelete.leadingPartId) {
                deleteChoice(
                    {
                        id: choiceToDelete.id,
                        partId: choiceToDelete.partId,
                        title: choiceToDelete.title,
                        leadingPartId: choiceToDelete.leadingPartId,
                        sortOrder: choiceToDelete.sortOrder
                    }
                );
            }

            this.currentChoices.splice(indexToRemove, 1);
        }
    }
};

export { EventPage };
