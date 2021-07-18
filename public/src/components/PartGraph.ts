import { createSigmaChart } from "../util/createSigmaChart";
import './part-graph.css';

const template = `
<div class="part-graph">
    <div id="chart" class="sigma-container"></div>
</div>
`;

const PartGraph = {
    template,
    props: {
        parts: Array,
        choices: Array
    },
    methods: {},
    mounted() {
        if (this.parts && this.parts.length >= 1) {
            const emitNodeClickEvent = (partId: number) => {
                return this.$emit('part-clicked', partId);
            };
            createSigmaChart(this.parts, this.choices, emitNodeClickEvent);
        }
    }
};

export { PartGraph };
