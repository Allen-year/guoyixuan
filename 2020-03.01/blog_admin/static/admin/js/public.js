if ($('#g2_container').length) {
    let url = 'pv.json'

    const sliderDiv = document.createElement('div');
    sliderDiv.id = 'slider';
    const container = document.getElementById('g2_container');
    container.parentNode.appendChild(sliderDiv);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const ds = new DataSet({
                state: {
                    start: new Date(data.start).getTime(),
                    end: new Date(data.end).getTime()
                }
            });
            const dv = ds.createView('origin').source(data.data);
            dv.transform({
                type: 'filter',
                callback: function callback(obj) {
                    const time = new Date(obj.time).getTime();
                    return time >= ds.state.start && time <= ds.state.end;
                }
            });
            const chart = new G2.Chart({
                container: 'g2_container',
                forceFit: true,
                height: 500 - 60,
                padding: [40, 40, 40, 80],
                animate: false
            });
            chart.source(dv, {
                time: {
                    type: 'time',
                    tickCount: 8
                },
                hits: {
                    alias: '访问量(人/天)'
                }
            });
            chart.axis('hits', {
                title: true
            });
            chart.legend({
                custom: true,
                position: 'top',
                items: [
                    { value: '点击量', marker: { symbol: 'circle', fill: 'l(100) 0:#74bcff', radius: 5 } },
                ],
                onClick: ev => {
                    const item = ev.item;
                    const value = item.value;
                    const checked = ev.checked;
                    const geoms = chart.getAllGeoms();
                    for (let i = 0; i < geoms.length; i++) {
                        const geom = geoms[i];
                        if (geom.getYScale().field === value) {
                            if (checked) {
                                geom.show();
                            } else {
                                geom.hide();
                            }
                        }
                    }
                }
            });
            chart.area()
                .position('time*hits')
                .color('l(100) 0:#74bcff')
                .opacity(0.85);
            chart.line().position('time*hits').size(2);
            chart.render();
            chart.interact('slider', {
                container: 'slider',
                onChange(ev) {
                    const { startValue, endValue } = ev;
                    ds.setState('start', startValue);
                    ds.setState('end', endValue);
                }
            });
        });

}

if ($('[data-toggle="popover"]').length) {
    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover'
    })
}

/**
 * ckeditor
 */
if ($('#editor').length) {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            language: 'zh-cn',
            ckfinder: {
                uploadUrl: '/admin/upload'
            }
        })
        .catch(error => {
            console.error(error);
        });
}

if ($('[type="file"]').length) {
    $('[type="file"]').next('label').css('cursor', 'pointer')
    $('[type="file"]').change(function (e) {
        var url = window.URL.createObjectURL(e.target.files[0]);
        $(this).next('label').find('img').attr('src', url)
    })
}

if ($('.dbcedit').length) {
    $('.dbcedit').parent().dblclick(function () {
        $(this).find('.dbcedit').removeAttr('disabled').removeClass('border-0').select()
    })
    $('.dbcedit').blur(function () {
        $(this).attr('disabled', 'disabled').addClass('border-0')
    })
}