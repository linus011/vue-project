<template>
    <div ref="chartEl" class="ui-bubble-cloud"></div>
    <div class="ui-chart-legend">
        <ul>
            <li v-for="(item, i) of processData(chartData).children" :key="i">
                <i class="bul" :style="`background-color: ${item.color}`"></i>
                <span>{{ item.name }}({{ item.size }})</span>
            </li>
        </ul>
    </div>
    <observer-scroll @triggerIntersected="chartPlay"/>
</template>
<script>
    import * as d3 from 'd3'
    import { ref, onMounted } from 'vue'
    export default {
        props: {
            chartData: { type: [String, Object], default: null }
        },
        setup(props) {

            const chartEl = ref(null)
            let isChart = ref(true)

            const processData = (data) => {
                const obj = data;
                const newDataSet = [];
                for (let prop in obj) {
                    switch(prop) {
                        case '저혈압':
                            newDataSet.push({ name: prop, size: obj[prop], color: '#EB5147'});
                            break
                        case '정상':
                            newDataSet.push({ name: prop, size: obj[prop], color: '#00C378'});
                            break
                        case '고혈압전단계':
                            newDataSet.push({ name: prop, size: obj[prop], color: '#FFAA6D'});
                            break
                        case '고혈압1단계':
                            newDataSet.push({ name: prop, size: obj[prop], color: '#FF9E58'});
                            break
                        case '고혈압2단계':
                            newDataSet.push({ name: prop, size: obj[prop], color: '#FF862F'});
                            break
                    }
                    
                }
                return { children: newDataSet };
            };

            const bubbleChart = (e) => {
                const diameter = chartEl.value.offsetWidth;
                const centre = { x: diameter / 2, y: diameter / 2 };
                let bubbles = null;
                let labels = null;

                const svg = d3
                    .select(chartEl.value)
                    .append('svg')
                    .attr('width', diameter)
                    .attr('height', diameter);

                const bubble = d3
                    .pack()
                    .size([diameter, diameter])
                    .padding(4);

                const root = d3.hierarchy(processData(props.chartData)).sum((d) => d.size);
                const nodes = bubble(root).descendants().filter((d) => !d.children);

                const vis = svg.selectAll('g').data(nodes);

                let elements = vis
                    .enter()
                    .append('g')
                    .attr('transform', (d) => `translate(${centre.x}, ${centre.y})`)
                    .classed('bubble-item', true)
                    .style('opacity', 0)

                bubbles = elements
                    .append('circle')
                    .attr('r', 0)
                    .attr('fill', (d) => d.data.color)

                labels = elements
                    .append('text')
                    .attr('dx', (d) => 0)
                    .attr('fill', '#ffffff')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', 16)
                    .attr('dy', (d) => d.r / ((d.r * 25) / 100))
                    .text((d) => d.data.size);

                elements.transition()
                    .duration(100)
                    .delay((d, i) => i*150)
                    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
                    .style('opacity', 1)
                    .ease(d3.easeCubicOut)
                    .on('end', function () {
                        d3.select(this).select('circle').transition()
                            .duration(600)
                            .attr('r', (d) => d.r)
                    });
            }

            const chartPlay = (e) => {
                if(isChart) {
                    bubbleChart()
                    isChart = false
                }
            }

            onMounted(() => {
            });

            return {
                chartEl,
                isChart,
                processData,
                bubbleChart,
                chartPlay
            }
        }
    }
</script>
