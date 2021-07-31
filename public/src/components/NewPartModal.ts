import './new-part-modal.css';

const template = `
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body">
                    <h1>Add a Part</h1>
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input v-model="partTitle" type="text"/>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea v-model="partDescription" class="form-text-area"/>
                    </div>
                </div>
                <div class="modal-footer">
                    <div>
                        <button class="button-cancel" v-on:click="$emit('close')">
                            Close
                        </button>
                        <button v-on:click="$emit('save-part', { title: partTitle, description: partDescription })">
                            Add Part
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>
`;

const NewPartModal = {
    data: () => {
        return { partTitle: '', partDescription: '' };
    },
    template
};

export { NewPartModal };
