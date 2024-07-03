//유저가 값을 입력한다
//+ 버튼을 클릭하면, 할 일이 추가 된다.
// check 버튼을 누르면 할 일이 끝나면서 중간에 줄이 그어진다.
//1. check 버튼을 클릭하는 순간 true false
//2. true 이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
// delete 버튼을 누르면 할일이 삭제된다.
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴


// input 창에 글자 쓰는 곳 가져오기
let taskInput = document.getElementById("task-input");
// + 버튼 (할일 추가 버튼 가져오기)
let addButton = document.getElementById("add-button");
let taskDashBoard = document.getElementById("task-dashboard");
//B-2 할일 추가 장소 (Array 만듬)
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
    // console.log("clicked");

    //A plan
    // let taskContent = taskInput.value;
    // taskList.push(taskContent);

    //B plan - my idea
    // taskList.push(taskInput.value);

    //3.할일앱 3탄: 객체의 활용해서 추가 정보가 필요할 때

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}
// input에 있는 value를 없에주는 코드. "focus"란 커서가 오게될때란 뜻이다. 여서 function을 그대로 쓴것은 유일하게 이것 하나만 쓸때 가능하답니다.
taskInput.addEventListener("focus", function () {
    taskInput.value = "";
})

function render() {
    let resultHTML = "";

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
                                <div class="task-done">
                                    ${taskList[i].taskContent}
                                </div>                   
                                <div>
                                    <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left rotate-icon"></i></button>
                                    <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash delete-icon"></i></button>
                                </div>
                            </div>`;
        } else {
            //resultHTML = resultHTML +  은 아래와 같은 기능
            resultHTML += 
                `<div class="task">
                    <div>
                        ${taskList[i].taskContent}  
                    </div>                   
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check check-icon"></i></button>
                        <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash delete-icon"></i></button>
                    </div>
                </div>`;
        }
    }




    // taskDashBoard.innerHTML = resultHTML;
    document.getElementById("task-dashboard").innerHTML = resultHTML;
}

function toggleComplete(id) {
    //어떤 아이템을 선택했는지, ID를 부여한다.
    console.log("id:", id); //test done

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            // 현재 값의 반대를 넣어 줄때 !taskList[i].isComplete; 로 코딩한다.
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    console.log("삭제하자", id);


    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            // 현재 값의 반대를 넣어 줄때 !taskList[i].isComplete; 로 코딩한다.
            taskList.splice(i,1)
            break;
        }
    }
    console.log(taskList);
    render();
    
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
