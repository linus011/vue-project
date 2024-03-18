<template>
    <div class="g-content"></div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
    setup() {

        const createBoard = () => {
            let htmlBoard = (data) => {
                let html = '<div class="g-board-panel">'
                html += '<div class="panel-head">'
                html += '<div class="g-target">'
                html += '<ul class="swiper-wrapper">'
                html += '</ul>'
                html += '</div>'
                html += '<span class="g_status">'
                html +=
                    '<span class="num total">본수 : <strong class="num"></strong></span>'
                html +=
                    '<span class="num working">진행본수 : <strong class="num"></strong></span>'
                html +=
                    '<span class="num cp_num">완료본수 : <strong class="num"></strong></span>'
                html +=
                    '<span class="g_status_box"> <span class="bar"></span><span class="ing">진행률 : <strong class="num"></strong>%</span></span>'
                html += '</span>'
                html += '</div>'
                html += '<div class="g-alert-btn-set">'
                html += '</div>'
                html += '<div class="g-board">'
                html += '<table>'
                html += '<caption>메뉴별 코딩리스트</caption>'
                html += '<colgroup>'
                html += '<col style="width:50px">'
                html += '<col style="width:110px">'
                html += '<col style="width:90px">'
                html += '<col class="d1" style="width:100px">'
                html += '<col class="d2" style="width:100px">'
                html += '<col class="d3" style="width:100px">'
                html += '<col class="d4" style="width:100px">'
                html += '<col style="width:auto">'
                html += '<col style="width:80px">'
                html += '<col style="width:100px">'
                html += '<col style="width:100px">'
                html += '<col style="width:80px">'
                html += '<col style="width:100px">'
                html += '</colgroup>'
                html += '<thead>'
                html += '<tr>'
                html += '<th scope="col">No</th>'
                html += '<th scope="col" class="id">화면id</th>'
                html += '<th scope="col" class="type">화면타입</th>'
                html += '<th scope="col" class="deps d1">1Depth'
                html += '<th scope="col" class="deps d2">2Depth'
                html += '<th scope="col" class="deps d3">3Depth'
                html += '<th scope="col" class="deps d4">4Depth'
                html += '<th scope="col" class="name">화면명</th>'
                html += '<th scope="col" class="worker">'
                html += '<select>'
                html += '<option value="">작업자</option>'
                html += '</select>'
                html += '</th>'
                html += '<th scope="col" class="c_date">'
                html += '<select>'
                html += '<option value="">작업일</option>'
                html += '</select>'
                html += '</th>'
                html += '<th scope="col" class="m_date">'
                html += '<select>'
                html += '<option value="">수정일</option>'
                html += '</select>'
                html += '</th>'
                html += '<th scope="col" class="complete">상태</th>'
                html += '<th scope="col" class="etc">비고</th>'
                html += '</tr>'
                html += '</thead>'
                html += '<tbody>'
                html += data
                html += '</tbody>'
                html += '</table>'
                html += '</div>'
                html += '</div>'
                document.querySelector('.g-content').insertAdjacentHTML('beforeend', html)
            }
            const htmlTbody = function (data) {
                var $data = data
                var tbodyHtml = ''
                var idx = 1
                var urlLink = ''
                var createTr = function (obj) {
                    var trHtml = ''
                    if (obj.directory !== undefined && obj.directory !== '') {
                    urlLink = obj.directory
                    } else {
                    obj.state
                        ? (trHtml += '<tr class="' + obj.state + '">')
                        : (trHtml += '<tr>')
                    trHtml += '<td class="no">' + idx + '</td>'
                    idx += 1
                    if (obj.id) {
                        if (obj.link) {
                        trHtml += '<td class="id">' + obj.id + '</td>'
                        } else {
                        trHtml +=
                            '<td class="id"><a href="' +
                            urlLink +
                            '/' +
                            obj.id +
                            '.html" target="_blank">' +
                            obj.id +
                            '</a></td>'
                        }
                    } else {
                        trHtml += '<td class="id"></td>'
                    }
                    if (obj.type) {
                        trHtml += '<td class="type"><span>' + obj.type + '</span></td>'
                    } else {
                        trHtml += '<td class="type"><span>본창</span></td>'
                    }
                    if (obj.depth1) {
                        trHtml += '<td class="depth1">' + obj.depth1 + '</td>'
                    } else {
                        trHtml += '<td class="depth1"></td>'
                    }
                    if (obj.depth2) {
                        trHtml += '<td class="depth2">' + obj.depth2 + '</td>'
                    } else {
                        trHtml += '<td class="depth2"></td>'
                    }
                    if (obj.depth3) {
                        trHtml += '<td class="depth3">' + obj.depth3 + '</td>'
                    } else {
                        trHtml += '<td class="depth3"></td>'
                    }
                    if (obj.depth4) {
                        trHtml += '<td class="depth4">' + obj.depth4 + '</td>'
                    } else {
                        trHtml += '<td class="depth4"></td>'
                    }
                    if (obj.name) {
                        trHtml += '<td class="name">' + obj.name + '</td>'
                    } else {
                        trHtml += '<td class="name"></td>'
                    }
                    if (obj.worker) {
                        trHtml += '<td class="worker">' + obj.worker + '</td>'
                    } else {
                        trHtml += '<td class="worker"></td>'
                    }
                    if (obj.workdate) {
                        trHtml += '<td class="c_date">' + obj.workdate + '</td>'
                    } else {
                        trHtml += '<td class="c_date"></td>'
                    }
                    if (obj.change) {
                        trHtml += '<td class="m_date">' + obj.change + '</td>'
                    } else {
                        trHtml += '<td class="m_date"></td>'
                    }
                    if (obj.complete && obj.state == undefined) {
                        trHtml +=
                        '<td class="complete"><span class="done">' +
                        obj.complete +
                        '</span></td>'
                    } else if (obj.state === 'del') {
                        trHtml +=
                        '<td class="complete"><span class="del">삭제</span></td>'
                    } else if (obj.state === 'hold') {
                        trHtml +=
                        '<td class="complete"><span class="hold">보류</span></td>'
                    } else if (obj.workdate) {
                        trHtml +=
                        '<td class="complete"><span class="ing">검수중</span></td>'
                    } else {
                        trHtml += '<td class="complete"><span>대기중</span></td>'
                    }
                    if (obj.etc) {
                        var remark = ''
                        obj.etc.forEach((item) => {
                        if (item.indexOf('디자인확인') != -1) {
                            remark += '<li class="design">' + item + '</li>'
                        } else if (item.indexOf('기획확인') != -1) {
                            remark += '<li class="plan">' + item + '</li>'
                        } else {
                            remark += '<li>' + item + '</li>'
                        }
                        })
                        trHtml +=
                        '<td class="etc"><ul class="remark">' +
                        remark +
                        '</ul><a href="' +
                        urlLink +
                        '/' +
                        obj.id +
                        '.html" class="btn_hover" target="_blank">' +
                        obj.id +
                        '</a></td>'
                    } else {
                        trHtml +=
                        '<td class="etc"><a href="' +
                        urlLink +
                        '/' +
                        obj.id +
                        '.html" class="btn_hover" target="_blank">' +
                        obj.id +
                        '</a></td>'
                    }
                    }
                    trHtml += '</tr>'
                    return trHtml
                }
                $data.forEach((item) => {
                    tbodyHtml += createTr(item)
                })
                return tbodyHtml
            }
            let LoadCount = 0
            let $dataHtml = ''
            let $json = '/src/assets/guide/json/workList.json'
            if ($json !== undefined) {
                ajax_get($json, function (data) {
                    if (data.length) $dataHtml = htmlTbody(data)
                    LoadCount += 1
                    htmlBoard($dataHtml)
                })
            }
            function ajax_get(url, callback) {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        let data
                        try {
                            data = JSON.parse(xmlhttp.responseText);
                        } catch(err) {
                            console.log(err.message + " in " + xmlhttp.responseText);
                            return;
                        }
                        callback(data);
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
        }

        watchEffect(() => {
            createBoard()
        })

        return {
            
        }
    }
}
</script>