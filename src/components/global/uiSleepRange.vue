<template>
    <div class="ui-sleep-time-range-wrap">
        <div class="ui-sleep-time-range">
            <div ref="sleepEl" class="time-range"></div>
            <p class="my-sleep-time"
                :class="{offscreen: !isMain}"
            ><span>오늘 수면 시간은<br><strong class="duration" ref="duration"></strong> 입니다</span></p>
        </div>
        <div v-if="isMain" class="sleep-time-set">
            <div class="input">
                <span class="lb">잠든 시간</span>
                <div class="time-input">
                    <label for="startTime">{{ startLabelVal }}</label>
                    <input id="startTime" type="text" class="start-time" readonly
                        v-model='startTimeVal'
                        @input="timeChange"
                        @focus="openTimeSelect"
                    />
                </div>
            </div>
            <div class="input">
                <span class="lb">일어난 시간</span>
                <div class="time-input">
                    <label for="endTime">{{ endLabelVal }}</label>
                    <input id="endTime" type="text" class="end-time" readonly
                        v-model='endTimeVal'
                        @input="timeChange"
                        @focus="openTimeSelect"
                    />
                </div>
            </div>
        </div>
    </div>
    <div v-if="isDimmed" class="dimmed" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 105;"
        @click="isDimmed = false, closeTimeSelect()"
    ></div>
</template>
<script>
    import * as d3 from 'd3'
    import { ref, onMounted, watch } from 'vue'
    export default {
        props: {
            sleepOptions: { type: [String, Object], default: null },
            isMain: { type: Boolean, default: true }
        },
        emits: ['timeState'],
        setup(props, context) {
            const { emit } = context
            const sleepEl = ref(null)
            const duration = ref(null)
            const startTimeVal = ref(props.sleepOptions.data.start)
            const endTimeVal = ref(props.sleepOptions.data.end)
            const returnStartTimeVal = ref(null)
            const returnEndTimeVal = ref(null)
            const startLabelVal = ref(null)
            const endLabelVal = ref(null)
            const isDimmed = ref(false)
            const isMain = ref(props.isMain)

            const defaults = {
                width: 240,
                height: 240,
                margin: { top: 20, left: 20, bottom: 20, right: 20 },
                offset: 80,
                indicatorWidth: 12,
                accentColor: '#d81b60',
                handleRadius: 14,
                handleStrokeWidth: 2,
                handleStrokeColor: "#ffffff",
                handleIconColor: "#333333",
                handleFillColorStart: "#ffffff",
                handleFillColorEnd: "#d81b60",
                rangeTotal: 24,
                indicatorBackgroundColor: "#d3d3d3"
            }

            const timeSlider = (element, options) => {
                const settings = Object.assign({}, defaults, options);
                let _defaults = defaults;
                let graph = {
                    svg: {},
                    pie: {},
                    arc: {}
                };

                let helper = {
                    settings: {},
                    graphdata: [],
                    calcTimeFromMinutes: function(min, type) {
                        const hours = Math.floor( min / 60)
                        const half = hours > 12 ? hours - 12 : hours
                        const minutes = min % 60
                        return type === 'duration' ? `${hours}시간 ${minutes}분` : `${(half < 10 ? '0' : '')}${half}:${(minutes < 10 ? '0' : '')}${minutes}`
                    },
                    returnCalcTimeFromMinutes: function(min, type) {
                        const hours = Math.floor( min / 60)
                        const minutes = min % 60
                        return `${(hours < 10 ? '0' : '')}${hours}:${(minutes < 10 ? '0' : '')}${minutes}`
                    },
                    calcLabel: function(min) {
                        const hours = Math.floor( min / 60)
                        return hours > 12 ? '오후' : '오전'
                    },
                    calcDuration: function(startAngle, endAngle) {
                        let duration;
                        const angleToSegments = function(angle) {
                            return (angle / 360) * 288;
                        };

                        duration = angleToSegments(endAngle) - angleToSegments(startAngle);
                        if (duration < 0) duration = 288 + duration;
                        
                        return this.calcTimeFromMinutes(duration * 5, 'duration');
                    },
                    createTimeInfoObject: function(data) {
                        const angleToSegments = d3.scaleLinear().range([0,288]).domain([0,360]);            
                        let startAngle, 
                            endAngle,
                            startTimeInfo, 
                            endTimeInfo, 
                            startLabelInfo, 
                            endLabelInfo, 
                            duration;
                        returnStartTimeVal.value = this.returnCalcTimeFromMinutes(angleToSegments(data.aAngle)*5);
                        returnEndTimeVal.value = this.returnCalcTimeFromMinutes(angleToSegments(data.eAngle)*5);
                        startTimeInfo = this.calcTimeFromMinutes(angleToSegments(data.aAngle)*5);
                        endTimeInfo = this.calcTimeFromMinutes(angleToSegments(data.eAngle)*5);
                        startLabelInfo = this.calcLabel(angleToSegments(data.aAngle)*5);
                        endLabelInfo = this.calcLabel(angleToSegments(data.eAngle)*5);
                        duration = this.calcDuration(data.aAngle, data.eAngle);
                        return {
                            start: startTimeInfo, 
                            end: endTimeInfo, 
                            startLabel: startLabelInfo, 
                            endLabel: endLabelInfo, 
                            duration: duration
                        };
                    },
                    calcInitialData: function(initialData) {
                        let start, end, time, value=0, angle=0, minuteSegments=0;
                        const angleToHours = d3.scaleLinear().range([0,360]).domain([0,settings.rangeTotal]);
                        const segmentsToAngle = d3.scaleLinear().range([0,360]).domain([0,288]);
                                    
                        time = initialData.start.split(":");
                        minuteSegments = time[0]*12; 
                        minuteSegments += (time[1]*1)/5;
                        angle = segmentsToAngle(minuteSegments);
                        value = angleToHours.invert(angle);
                        
                        this.graphdata.push({value: value, label:'a', angle: angle});
                        
                        time = initialData.end.split(":");
                        minuteSegments = time[0]*12; 
                        minuteSegments += (time[1]*1)/5;
                        angle = segmentsToAngle(minuteSegments);
                        value = angleToHours.invert(angle);
                
                        this.graphdata.push({value: value, label:'e', angle: angle});
                    },
                    calcUpdateHandleData: function(value) {
                        value=0;
                        let start=null;
                        let end=null;
                        let time=null;
                        let angle=0;
                        let minuteSegments=0;
                        const angleToHours = d3.scaleLinear().range([0,360]).domain([0,settings.rangeTotal]);
                        const segmentsToAngle = d3.scaleLinear().range([0,360]).domain([0,288]);
                                    
                        time = initialData.start.split(":");
                        minuteSegments = time[0]*12; 
                        minuteSegments += (time[1]*1)/5;
                        angle = segmentsToAngle(minuteSegments);
                        value = angleToHours.invert(angle);
                        
                        this.graphdata.push({value: value, label:'a', angle: angle}); 
                        
                        time = initialData.end.split(":");
                        minuteSegments = time[0]*12; 
                        minuteSegments += (time[1]*1)/5;
                        angle = segmentsToAngle(minuteSegments);
                        value = angleToHours.invert(angle);
                
                        this.graphdata.push({value: value, label:'e', angle: angle});
                    },
                    getValueOfDataSet: function(label) {
                        let value = 0;
                        this.graphdata.forEach(function(el,i){
                            if(el.label == label) value = el.value;
                        });
                        return value;
                    },
                    getAngleOfDataSet: function(label) {
                        let angle = 0;
                        this.graphdata.forEach(function(el,i){
                            if(el.label == label) angle = el.angle;
                        });
                        return angle;
                    },
                    getData: function() {
                        return this.graphdata;
                    }
                };

                const init = function() {
                    const _this = this
                    let ringbgrd = null
                    let holder = null
                    let indicatorArc = null
                    let handles = null
                    let dragBehavior = null
                    let a = null
                    let e = null
                    let startAngle = null
                    let endAngle = null             
                    let tmpVal = null; 
                    const angularScale = d3.scaleLinear().range([0,360]).domain([0,settings.rangeTotal])
                    const angleToFiveMinuteScale = d3.scaleLinear().range([0,360]).domain([0,288]);
                    const height = settings.height
                    const width = settings.width
                    const margin = settings.margin      
                    const radius = (Math.min(width, height) - margin.top - margin.bottom)/2
                    const outerRadius =  radius + settings.indicatorWidth/2
                    const innerRadius = outerRadius - settings.indicatorWidth

                    function dragmoveHandles(d, handler, x, y) {
                        const activeHandle = handler.classed('active', true)
                            
                        let newAngle = (Math.atan2( y , x )* 180 / Math.PI)+90
                            
                        if(newAngle<0){
                            newAngle = 360 + newAngle;
                        }
                        
                        newAngle = newAngle-((newAngle * 100) % 125)/100;
                        
                        d.value = angularScale.invert(newAngle);
                        d.angle = newAngle.toFixed(2);
                            
                        if(d.angle != tmpVal) {
                            tmpVal = d.angle;
                            updateHandles(activeHandle);
                            checkHandlesPosition(d.label);
                        }
                    }

                    function updateArc(value, id, label, angle) {
                        const handlerContainer = d3.selectAll('#handles .handlercontainer');
                        let startValue = 0;
                        let endValue = 0;
                        let angleLength = 0;
                        
                        handlerContainer.each(function(d, i) {                      
                                                    
                            if(d.label == "a") {startValue = d.angle; }
                            if(d.label == "e") {endValue = d.angle; }       
                        });

                        if(startValue*1 > endValue*1) {
                            startValue = (startValue*1)-360;
                        }

                        graph.arc = d3.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(outerRadius)
                            .startAngle(function(d){ return startValue*(Math.PI/180); })
                            .endAngle(function(d){ return endValue*(Math.PI/180); });

                        indicatorArc.attr("d", graph.arc);
                    }

                    function drawHandles() {
                        const handlerContainer = handles.selectAll('.handlercontainer').data(helper.getData())
                        const circles = handlerContainer.enter()
                            .append('g')
                                .attr('class', function(d, i) { if(d.label == "a") return 'handlercontainer pm'; else return 'handlercontainer am' })
                                .attr('transform', function(d){
                                    return 'rotate(' + angularScale(d.value) + ') translate(0,' +radius*-1 + ')';
                                })
                                .on("mouseover", function(){
                                    d3.select(this).classed('active',true);
                                })
                                .on("mouseout", function(){
                                    d3.select(this).classed('active',false);
                                })
                                .call(dragBehavior);
                            
                            circles.append('circle')
                                .attr('r', settings.handleRadius)
                                .attr('class', 'handle')                            
                                .attr('stroke', settings.handleStrokeColor)
                                .attr('stroke-width', settings.handleStrokeWidth)
                                .attr('cursor', 'all-scroll')
                                .attr('fill', function(d, i) { if(d.label == "a") return settings.handleFillColorStart; else return settings.handleFillColorEnd })
                                .attr('id', function(d){ return d.label; })                         
                                .on('mouseover', function(){
                                    d3.select(this).classed('active',true);
                                })
                                .on('mouseout', function(){
                                    d3.select(this).classed('active',false);
                                });
                            
                            if(props.isMain) {
                                circles.append('image')
                                .attr('x', -settings.handleRadius/2-6)
                                .attr('y', -settings.handleRadius/2-6)
                                .attr('clip-path', 'url(#circle-clip)')
                                .attr('xlink:href', function(d, i) { 
                                    if(d.label == "a") return '/assets/images/icon-radial-sleep-afternoon.svg'
                                    else return '/assets/images/icon-radial-sleep-morning.svg'
                                })
                                .attr('transform', function(d){
                                    return 'rotate(-' + angularScale(d.value) + ')';
                                })
                            }
                            
                    }
                    
                    const updateHandles = function (handle){
                        handle.attr('transform', function(d,i){
                            updateArc(d.value, i, d.label, d.angle);
                            handles.selectAll('image').attr('transform', function(d){
                                return 'rotate(-' + angularScale(d.value) + ')'
                            })
                            return 'rotate(' + angularScale(d.value) + ') translate(0,' +radius*-1 + ')';
                        });
                    }

                    const checkHandlesPosition = function (labelOfDragedHandle) {
                        const allHandles = handles.selectAll('.handlercontainer');

                        let currentData = {
                            "a": 0,
                            "aAngle": 0,
                            "e": 0,
                            "eAngle": 0
                        }
                        
                        allHandles.each(function (d, i) {
                            currentData[d.label] = d.value;
                            currentData[d.label+"Angle"] = d.angle;
                        });
                        
                        writeTimeInfo(helper.createTimeInfoObject(currentData));
                    }

                    setSettings(_defaults);

                    while (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }
                    
                    helper.calcInitialData(settings.data);
                    a = helper.getValueOfDataSet("a");
                    e = helper.getValueOfDataSet("e");
                    startAngle = helper.getAngleOfDataSet("a");
                    endAngle = helper.getAngleOfDataSet("e");
                                    
                    
                    writeTimeInfo(helper.createTimeInfoObject({a: a, e: e, aAngle: startAngle, eAngle: endAngle}));
                    
                    graph.pie = d3.pie().value(function(d,i){
                        return d.value; 
                    })
                    .sort(null);
                    
                    
                    graph.svg = d3.select(sleepEl.value).append('svg') 
                        .attr('height', settings.height)
                        .attr('width', settings.width)
                        .append('g')                    
                            .attr('id','holder')
                            .attr('transform','translate('+(margin.top)+','+(margin.left)+')');
                        
                        
                    ringbgrd = graph.svg
                        .append('g')
                        .attr('id','ringbgrd').attr('transform','translate('+radius+','+radius+')');
                        
                    ringbgrd.append('circle')
                        .attr('r', radius)                  
                        .attr('class','ringbgrd')
                        .attr('stroke-width', settings.indicatorWidth-2)
                        .attr('stroke', settings.indicatorBackgroundColor)
                        .attr('fill', 'none');

                    
                        
                    holder = graph.svg.append('g').attr('id','arcindicator');
                    
                    if(startAngle*1 > endAngle*1) {
                        startAngle = (startAngle*1)-360;
                    }

                    graph.arc = d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius)
                        .startAngle(function(d){ return startAngle*(Math.PI/180); })
                        .endAngle(function(d){ return endAngle*(Math.PI/180); })
                        
                        
                    indicatorArc = holder.append("g")               
                            .attr("class", "arcindicator")
                            .attr("transform", "translate(" + ((settings.width / 2)-20) + "," + ((settings.height / 2)-20) + ")")
                            .append("path")
                            .attr("fill", function(d, i) { return settings.accentColor; })
                            .attr("d", graph.arc);
                                

                    handles = graph.svg
                        .append('g')
                        .attr('id','handles')
                        .attr('transform','translate('+radius+','+radius+')');
                            
                    dragBehavior = d3.drag()
                        .subject(function(d) { return d; })
                        .on("drag", function(event, d) {
                            dragmoveHandles(d, d3.select(this), event.x, event.y);
                        })
                        .on("end", function(){ 
                            d3.select(this).classed('active',false);
                            //emit('timeState', returnStartTimeVal.value, returnEndTimeVal.value)
                        });
                        
                    drawHandles();
                    
                };

                const writeTimeInfo = function(timeObject) {
                    startTimeVal.value = timeObject.start;
                    endTimeVal.value = timeObject.end;
                    startLabelVal.value = timeObject.startLabel;
                    endLabelVal.value = timeObject.endLabel;
                    duration.value.innerHTML = timeObject.duration;
                };

                const setSettings = function(settings) {
                    helper.settings = settings;
                };

                init();
            }

            const timeChange = () => {
                const newOptions = Object.assign({}, props.sleepOptions, {
                    data: {'start':startTimeVal.value, 'end':endTimeVal.value}
                });
                timeSlider(sleepEl.value, newOptions)
            }
            
            const openTimeSelect = (e) => {
                if(document.querySelector('.time-sel-pop')) document.querySelector('.time-sel-pop').remove()
                isDimmed.value = true
                const timeInput = e.target;
                const timeInputVal = timeInput.value
                const timeLabel = timeInput.previousElementSibling.innerHTML
                const timeSel = timeInput.parentNode;
                const currentTime = (timeLabel === '오후') ? (Number(timeInputVal.substring(0, 2)) + 12) + timeInputVal.substring(2) : timeInputVal

                let timeSelHtml = '';
                timeSelHtml += '<div class="time-sel-pop">';
                timeSelHtml += '<ul>';
                for (let hours = 0; hours <= 23; hours++) {
                    for (let minutes = 0; minutes <= 55; minutes += 5) {
                        const formattedHours = String(hours).padStart(2, '0');
                        const formattedMinutes = String(minutes).padStart(2, '0');
                        const time = formattedHours + ':' + formattedMinutes;
                        (currentTime == time) ? timeSelHtml += '<li class="active"><button type="button">'+ time +'</button></li>' : timeSelHtml += '<li><button type="button">'+ time +'</button></li>';
                    }
                }
                timeSelHtml += '</ul>';
                timeSelHtml += '</div>';
                timeSel.insertAdjacentHTML('beforeend', timeSelHtml);

                const timeSelPop = document.querySelector('.time-sel-pop');
                const tarEl = timeSelPop.querySelector('.active');
                timeSelPop.querySelector('ul').scrollTo({ top: tarEl.offsetTop + (tarEl.offsetHeight/2) - (timeSelPop.offsetHeight/2), behavior: 'smooth' });

                const selectEvt = (e) => {
                    getSiblings(timeSel.parentNode).forEach( i => {
                        const isStart = i.querySelector('input').classList.contains('start-time')

                        const updateTime = (time) => {
                            const half = i.querySelector('label').innerHTML === '오후' ? 12 : 0
                            const twoDigits = Number(time.substring(0, 2)) + half
                            time = twoDigits + time.substring(2)
                            return time;
                        }
                        
                        isStart ? startTimeVal.value = updateTime(startTimeVal.value) : endTimeVal.value = updateTime(endTimeVal.value)
                    });

                    timeInput.classList.contains('start-time') ? startTimeVal.value = e.target.innerHTML : endTimeVal.value = e.target.innerHTML

                    closeTimeSelect()
                    timeChange()
                    //emit('timeState', returnStartTimeVal.value, returnEndTimeVal.value)
                }

                timeSel.querySelectorAll('button').forEach( i => {
                    i.addEventListener('click', selectEvt)
                })
            }

            const closeTimeSelect = () => {
                isDimmed.value = false
                if(document.querySelector('.time-sel-pop')) document.querySelector('.time-sel-pop').remove()
            }

            const getSiblings = function (elem) {
                let siblings = [];
                let sibling = elem.parentNode.firstChild;
                while (sibling) {
                    if (sibling.nodeType === 1 && sibling !== elem) {
                        siblings.push(sibling);
                    }
                    sibling = sibling.nextSibling
                }
                return siblings;
            };

            watch(() => 
                [returnStartTimeVal.value, returnEndTimeVal.value],
                (newVal, oldVal) => {
                    emit('timeState', returnStartTimeVal.value, returnEndTimeVal.value)
                }
            )

            onMounted(() => {
                timeSlider(sleepEl.value, props.sleepOptions)
            });

            return {
                sleepEl,
                duration,
                startTimeVal,
                endTimeVal,
                returnStartTimeVal,
                returnEndTimeVal,
                startLabelVal,
                endLabelVal,
                isDimmed,
                isMain,
                timeChange,
                timeSlider,
                openTimeSelect,
                closeTimeSelect,
                getSiblings
            }
        }
    }
</script>