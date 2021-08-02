import { deleteChoice } from '../api/deleteChoice';
import './info-section.css';

const template = `
<div class="info-section">
    <div class="part-editor-title">
        <h2>Part Editor</h2>
        <button v-on:click="deletePart" class="button-danger">
            Delete Part
        </button>
    </div>
    <label class="form-label">Title</label>
    <input v-model="currentPart.title" type="text" />
    <label class="form-label">Description</label>
    <textarea class="form-text-area" v-model="currentPart.description" type="test" />
    <div class="choice-list" v-for="choice in choices" :key="choice.id">
        <div class="form-group">
            <label class="form-label">Choice Name</label>
            <input v-model="choice.title" type="text" />
        </div>
        <div class="form-group">
            <label class="form-label">Leads to</label>
            <select v-model="choice.leadingPartId" type="text">
                <option v-for="part in parts" v-bind:value="part.id">
                    {{part.title}}
                </option>
            </select>
        </div>
        <div>
            <button class="button-danger button-sm" v-on:click="$emit('choice-deleted', choice.key)">Delete</button>
        </div>
    </div>
    <button class="button-neutral" v-on:click="addChoice">Add Choice</button>
    <button class="part-editor-save" v-on:click="updateParts">Save</button>
</div>
`;

const InfoSection = {
    template,
    props: {
        choices: Array,
        currentPart: Object,
        parts: Array
    },
    methods: {
        updateParts() {
            const part = {
                id: this.currentPart.id,
                eventId: this.currentPart.eventId,
                title: this.currentPart.title,
                description: this.currentPart.description
            };
            const choices = this.choices.filter(choice => choice.title && choice.leadingPartId);

            this.$emit('part-updated', {
                part,
                choices: choices
            });
        },
        deletePart() {
            const part = {
                id: this.currentPart.id,
                eventId: this.currentPart.eventId,
                title: this.currentPart.title,
                description: this.currentPart.description
            };

            this.$emit('part-deleted', part);
        },
        addChoice() {
            this.$emit('choice-added', {
                id: null,
                key: Math.random()*1000,
                partId: this.currentPart.id,
                title: '',
                leadingPartId: null,
                sortOrder: 0
            });
        }
    }
};

export { InfoSection };

