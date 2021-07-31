import './info-section.css';

const template = `
<div class="info-section">
    <label class="form-label">Title</label>
    <input v-model="currentPart.title" type="text" />
    <label class="form-label">Description</label>
    <textarea class="form-text-area" v-model="currentPart.description" type="test" />
    <div class="choice-list" v-for="choice in currentPart.choices" :key="choice.id">
        <div class="form-group">
            <label class="form-label" >Choice Name</label>
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
    </div>
    <button v-on:click="updateParts">Save</button>
</div>
`;

const InfoSection = {
    template,
    props: {
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
            this.$emit('part-updated', {
                part,
                choices: this.currentPart.choices
            });
        }
    }
};

export { InfoSection };

