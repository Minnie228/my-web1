// 密码验证
function checkPassword() {
    let password = document.getElementById("passwordInput").value;
    fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("passwordPrompt").style.display = "none";
            document.getElementById("content").style.display = "block";
            document.body.style.display = "block"; // 显示页面
            loadNotes();
        } else {
            document.getElementById("passwordError").innerText = "密码错误，请重试！";
        }
    });
}

// 背景音乐
function toggleMusic() {
    let audio = document.getElementById("bgMusic");
    if (audio.paused) {
        audio.play();
        document.getElementById("playMusic").innerText = "⏸️ 暂停音乐";
    } else {
        audio.pause();
        document.getElementById("playMusic").innerText = "🎵 播放音乐";
    }
}

// 便签（支持存储与删除）
function saveNote() {
    let note = document.getElementById("noteInput").value.trim();
    if (note === "") {
        alert("内容不能为空！");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("noteInput").value = "";

    loadNotes();
}

function loadNotes() {
    let noteList = document.getElementById("noteList");
    noteList.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        let li = document.createElement("li");
        li.textContent = note;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            deleteNote(index);
        };

        li.appendChild(deleteBtn);
        noteList.appendChild(li);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// 见面倒计时
function startCountdown() {
    let meetDate = new Date(document.getElementById("meetDate").value);
    let today = new Date();
    let diffTime = meetDate - today;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (!document.getElementById("meetDate").value) {
        alert("请选择日期！");
        return;
    }

    localStorage.setItem("meetDate", document.getElementById("meetDate").value);
    document.getElementById("countdown").innerText = "距离见面还有：" + diffDays + "天 💕";
}

function resetCountdown() {
    localStorage.removeItem("meetDate");
    document.getElementById("countdown").innerText = "请设定见面日期";
    document.getElementById("meetDate").value = "";
}

// 初始化
window.onload = function() {
    let savedMeetDate = localStorage.getItem("meetDate");
    if (savedMeetDate) {
        document.getElementById("meetDate").value = savedMeetDate;
        startCountdown();
    }
};
