(function () {
    let provId = '11', //省份ID, 默认'11'
        cityId = '1101', //城市ID，默认'1101'
        areaId = '110101'; //城区ID，默认'110101'

    //初始化地址选项
    function initDistrictSele() {
        let o = districtObj;
        for (let key in o) {
            if (key.length > 3) break;
            $('<option></option>').val(o[key].id).text(o[key].name).appendTo('#province');
        }
        reviseDistrictSele(true);
    }

    //修改地址选项
    function reviseDistrictSele(isProvince = false) {
        let o = districtObj;
        let cityIdArr = [];
        let areaIdArr = [];

        if (isProvince) {
            $('#city').empty();
            for (let key in o) {
                if (key.length < 4) continue;
                if (key.length > 4) break;
                if (o[key].parentid === provId) {
                    cityIdArr.push(key);
                }
            }
            cityId = cityIdArr[0];
            cityIdArr.forEach(key => {
                $('<option></option>').val(o[key].id).text(o[key].name).appendTo('#city');
            });
        }
        $('#area').empty();
        for (let key in o) {
            if (key.length < 6) continue;
            if (o[key].parentid === cityId) {
                areaIdArr.push(key);
            }
        }
        areaId = areaIdArr[0];
        areaIdArr.forEach(key => {
            $('<option></option>').val(o[key].id).text(o[key].name).appendTo('#area');
        });
        getSchoolList();
    }

    function getSchoolList() {
        $.get('http://192.168.1.107:8080/index.php?s=/Home/School/getSchooList', {
            province: provId,
            city: cityId,
            area: areaId
        }, function (res) {
            if (res.code === 200) {
                showSchoolList(res.data);
            }
        });
    }

    function showSchoolList(list) {
        if (!list) return showErrTip();
        let s = $('#schoolName').val();
        if (s !== 0) {
            list = list.filter(cur => {
                return cur.schoolname.includes(s)
            });
        }
        if (list.length === 0) return showErrTip();
        $('.err-tip').hide();
        $('.school-list').empty().show();
        list.forEach((cur, i) => {
            $('<li></li>').text(cur.schoolname).attr('data-id', cur.id).appendTo('.school-list');
        });
    }

    function showErrTip() {
        $('.school-list').hide();
        $('.err-tip').show();
    }

    $(window).ready(function () {
        initDistrictSele();
    });

    $('#province').change(function (e) {
        if (provId === this.value) return;
        provId = this.value;
        reviseDistrictSele(true);
    });

    $('#city').change(function (e) {
        if (cityId === this.value) return;
        cityId = this.value;
        reviseDistrictSele();
    });

    $('#city').change(function (e) {
        if (areaId === this.value) return;
        areaId = this.value;
    });

    $('.search-btn').click(function (e) {
        getSchoolList();
    });

    $('.school-list').click(function (e) {
        if (e.target.nodeName !== 'LI') return;
        // 从这里开始点击学校后的操作

        window.close(); //关闭窗口
    });
})();