// 요구 사항
// 1 5글자 단어
// 2 6번의 시도 가능
// 3 존재하면 노란색, 위치도 맞으면 초록색으로 표시
// 4 게임 종료 판단 
// 5 상단에 게임 시간 표시

let index = 0;
let attempts = 0;
let timer;
const 정답 = "APPLE";

function appStart() {
    const displayGameOver = () => {
        const div = document.createElement("div");
        div.innerText="게임이 종료됐습니다.";
        div.style="display:flex; justify-content:center; align-items:center; position:absolute; top:50vh; left:95vh; background-color:white; width:200px; height:200px";
        document.body.appendChild(div);
    };

    const nextLine = () => {
        if(attempts === 6) return 게임끝();
        attempts++;
        index = 0;
    };
    
    const 게임끝 = () => {
        window.removeEventListener("keydown",키보드조작);
        displayGameOver();
        clearInterval(timer);
    }

    const 엔터키조작 = () => {
        let 맞은_갯수 = 0;

        // 정답 확인
        for(let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
        
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];

            if(입력한_글자 === 정답_글자) {
                맞은_갯수++;
                block.style.background = "green";
            }
            else if(정답.includes(입력한_글자)) {
                block.style.background = "yellow";
            }
            else {
                block.style.background = "gray";
                block.style.color = "white";
            }
        }
        
        if(맞은_갯수 === 5) 게임끝(); 
        else nextLine();
    };

    const handleBackspace= () => {
        if(index > 0) {
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index-1}']`);    
            preBlock.innerText = "";
        }
        if(index !== 0) index--;
    };

    const 키보드조작 = (e) => {
    
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        
        if (e.key === 'Backspace') handleBackspace();
        else if (index === 5) {
            if(e.key === "Enter") 엔터키조작();
            else return;
        }
        else if(65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key;
            index++;
        }
    };

    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `${분}:${초}`;
        }

        // 주기성
        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown",키보드조작);
}

appStart();