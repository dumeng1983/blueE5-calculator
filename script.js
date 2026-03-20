// ================== 城市数据库（上海+江苏+浙江+安徽所有地级市）==================
const cityData = {
    "上海": [
        { name: "上海市区", rate: 24 },  // 上海作为一个整体，租金较高
        { name: "崇明区", rate: 20 }
    ],
    "江苏": [
        { name: "南京市", rate: 22 },
        { name: "苏州市", rate: 22 },
        { name: "无锡市", rate: 21 },
        { name: "常州市", rate: 20 },
        { name: "镇江市", rate: 19 },
        { name: "扬州市", rate: 19 },
        { name: "泰州市", rate: 18 },
        { name: "南通市", rate: 19 },
        { name: "盐城市", rate: 17 },
        { name: "淮安市", rate: 17 },
        { name: "宿迁市", rate: 16 },
        { name: "连云港市", rate: 17 },
        { name: "徐州市", rate: 18 }
    ],
    "浙江": [
        { name: "杭州市", rate: 23 },
        { name: "宁波市", rate: 22 },
        { name: "温州市", rate: 20 },
        { name: "嘉兴市", rate: 20 },
        { name: "湖州市", rate: 19 },
        { name: "绍兴市", rate: 20 },
        { name: "金华市", rate: 18 },
        { name: "衢州市", rate: 16 },
        { name: "舟山市", rate: 18 },
        { name: "台州市", rate: 18 },
        { name: "丽水市", rate: 16 }
    ],
    "安徽": [
        { name: "合肥市", rate: 20 },
        { name: "芜湖市", rate: 18 },
        { name: "蚌埠市", rate: 16 },
        { name: "淮南市", rate: 15 },
        { name: "马鞍山市", rate: 17 },
        { name: "淮北市", rate: 15 },
        { name: "铜陵市", rate: 15 },
        { name: "安庆市", rate: 16 },
        { name: "黄山市", rate: 16 },
        { name: "滁州市", rate: 16 },
        { name: "阜阳市", rate: 15 },
        { name: "宿州市", rate: 15 },
        { name: "六安市", rate: 15 },
        { name: "亳州市", rate: 14 },
        { name: "池州市", rate: 15 },
        { name: "宣城市", rate: 15 }
    ]
};

// ================== 获取页面元素 ==================
const provinceSelect = document.getElementById('provinceSelect');
const citySelect = document.getElementById('citySelect');
const idleHoursInput = document.getElementById('idleHours');
const hoursValue = document.getElementById('hoursValue');
const weekendUse = document.getElementById('weekendUse');
const calcBtn = document.getElementById('calcBtn');
const resultCard = document.getElementById('resultCard');
const displayCity = document.getElementById('displayCity');
const monthlyEarning = document.getElementById('monthlyEarning');
const totalEarning = document.getElementById('totalEarning');
const paybackPeriod = document.getElementById('paybackPeriod');
const shareBtn = document.getElementById('shareBtn');

// ================== 初始化城市下拉菜单 ==================
function updateCities() {
    const selectedProvince = provinceSelect.value;
    const cities = cityData[selectedProvince] || [];
    
    // 清空并重新填充城市下拉框
    citySelect.innerHTML = '';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.rate;  // 租金作为value
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// 页面加载时初始化
updateCities();

// 当省份改变时，更新城市列表
provinceSelect.addEventListener('change', updateCities);

// 滑动条实时显示
idleHoursInput.addEventListener('input', function() {
    hoursValue.textContent = this.value;
});

// ================== 计算收益 ==================
calcBtn.addEventListener('click', function() {
    // 1. 获取当前选中的城市名和租金
    const selectedProvince = provinceSelect.value;
    const selectedCity = citySelect.options[citySelect.selectedIndex]?.text || '上海';
    const hourlyRate = parseFloat(citySelect.value); // 城市租金单价
    
    // 2. 获取其他输入
    let hours = parseFloat(idleHoursInput.value);
    const isWeekendUsed = weekendUse.checked;

    // 3. 周末自用调整
    if (isWeekendUsed) {
        hours = hours * 5 / 7;
    }

    // 4. 计算公式
    const guaranteedBase = 800;      // 保底收益
    const shareRate = 0.3;           // 分成比例 30%
    const platformFee = 0.15;        // 平台抽成 15%

    let shareEarning = hours * 30 * hourlyRate * shareRate;
    let shareAfterFee = shareEarning * (1 - platformFee);
    let totalMonthly = Math.round(guaranteedBase + shareAfterFee);
    let total3Year = totalMonthly * 36;

    // 5. 成本回收 (车价12万)
    let payback = Math.round(120000 / totalMonthly);

    // 6. 显示结果
    displayCity.textContent = `${selectedProvince} · ${selectedCity}`;
    monthlyEarning.textContent = '¥' + totalMonthly + '/月';
    totalEarning.textContent = '¥' + total3Year.toLocaleString();
    paybackPeriod.textContent = payback + '个月';

    // 7. 显示卡片
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth' });
});

// ================== 分享海报 ==================
shareBtn.addEventListener('click', function() {
    alert('海报功能正在开发中，你可以先截图保存当前页面 ✨');
});