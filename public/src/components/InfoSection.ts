import './info-section.css';

const template = `
<div class="info-section">
    <label class="form-label">Title</label>
    <input v-model="part.title" type="text" />
    <label class="form-label">Description</label>
    <textarea class="form-text-area" v-model="part.description" type="test" />
    <div class="choice-list">
        <div v-for="choice in part.choices" :key="choice.id">
            {{ choice.title }}
        </div>
    </div>
    <button class="submit-button" v-on:click="updateParts">Save</button>
</div>
`;

const InfoSection = {
    template,
    props: {
        part: Object
    },
    methods: {
        updateParts() {
            this.$emit('part-updated', {
                id: this.part.id,
                eventId: this.part.eventId,
                title: this.part.title,
                description: this.part.description
            });
        }
    }
};

export { InfoSection };

