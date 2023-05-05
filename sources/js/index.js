
const randomNum = document.getElementById('randomnumber');
const checkNum = document.getElementById('checknumber');
const userInput = document.getElementById('lottery-number');
const form = document.getElementById('form');
const tableCells = document.getElementsByTagName('td');

const reward1 = document.getElementById('1reward');
const reward2 = document.getElementById('2reward');
const reward3 = document.getElementById('3reward');
const reward4 = document.getElementById('4reward');
const reward5 = document.getElementById('5reward');
const reward6 = document.getElementById('6reward');
const reward7 = document.getElementById('7reward');
// create div to display
const result = document.createElement('div');
result.setAttribute('id', 'result');
result.style.backgroundColor = "#fec107";
result.style.borderRadius = ".2rem";
result.style.marginTop = "1rem";
result.style.padding = "1rem";

const data = [];
const intData = [];
randomNum.addEventListener('click', function () {
    data.length = 0;
    intData.length = 0;
    userInput.value = "";
    const oldResult = document.getElementById('result');
    if (oldResult) {
        oldResult.remove();
    }
    // 4 loop 3digit 
    for (let i = 0; i < 4; i++) {
        let randomNumber = Math.floor(Math.random() * 1000).toString()
        data.push(randomNumber);
    }
    // last two number
    let twolastNumber;
    if (data[0] > 100) {
        twolastNumber = data[0].slice(1);
        console.log(twolastNumber)
    } else {
        twolastNumber = data[0];
    }
    data.push(twolastNumber);
    // convert all el in data array to integers
    for (let i = 0; i < data.length; i++) {
        intData.push(parseInt(data[i], 10));
    }
    // add Adjacent reward
    const firstReward = parseInt(intData[0]);
    const minusOne = firstReward - 1;
    const plusOne = firstReward + 1;
    intData.splice(1, 0, minusOne, plusOne);
    for (let i = 0; i < 6; i++) {
        intData[i] = intData[i].toString();
        if (intData[i] < 10) {
            intData[i] = "00" + intData[i];
        } else if (intData[i] < 100) {
            intData[i] = "0" + intData[i];
        }
    }
    reward1.innerHTML = intData[0];
    reward2.innerHTML = intData[1];
    reward3.innerHTML = intData[2];
    reward4.innerHTML = intData[3];
    reward5.innerHTML = intData[4];
    reward6.innerHTML = intData[5];
    reward7.innerHTML = intData[6];
});

checkNum.addEventListener('click', function () {
    const userNumber = userInput.value;
    const oldResult = document.getElementById('result');
    if (oldResult) {
        oldResult.remove();
    }
    if (isNaN(userNumber)) {
        result.textContent = "กรุณาใส่ตัวเลข";
    } else if (userNumber.length < 3) {
        result.textContent = "กรุณาใส่ตัวเลขมากกว่า 3 ตัวเลข อาทิ 000";
    } else {

        if (userNumber == intData[0]) {
            result.textContent = `${userNumber} คุณถูกรางวัลที่ 1 และเลขท้าย 2 ตัว`;
        } else if (userNumber == intData[1] || userNumber == intData[2]) {
            result.textContent = `${userNumber} คุณถูกรางวัลข้างเคียง`;
        } else if (userNumber == intData[3] || userNumber == intData[4] || userNumber == intData[5]) {
            result.textContent = `${userNumber} คุณถูกรางวัลที่ 2`;
        }

    }
    form.parentNode.insertBefore(result, form.nextSibling);
});

