var URI ="https://api.github.com/repos/dsvp/WEB_KookbangFriends_Woowahan/commits?page=";
var URI2 = "&per_page=100";
var myToken = "token "

var commitList = [];
var commitHistory = [];

sendRequest(1, checkIsMore);

function sendRequest(pageNum, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', URI + pageNum + URI2);
	xhr.setRequestHeader('Authorization', myToken);
	xhr.responseType = "json";
	xhr.onreadystatechange = function() {
		if(xhr.readyState === xhr.DONE) {
			if(xhr.status === 200 || xhr.status === 201) {
				callback(pageNum, xhr.response, getEachCommit);
			}
			else {
				console.error(xhr.response);
			}
		}
	}
	xhr.send();
}

function checkIsMore(pageNum, paraArr, callback) {
	if(paraArr.length != 0) {
		commitList = commitList.concat(paraArr);
		console.log(commitList);
		sendRequest(pageNum + 1, checkIsMore);
	}
	else{
		callback();
	}
}

function getEachCommit() {
	checkFin = 0;
	for(var i = 0; i < commitList.length; i++) {
		getEachRequest(i, checkFinish);
	}
}

var totalChangeLine = 0;
function getEachRequest(index, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', commitList[index]['url']);
	xhr.setRequestHeader('Authorization', myToken);
	xhr.responseType = "json";
	xhr.onreadystatechange = function() {
		if(xhr.readyState === xhr.DONE) {
			if(xhr.status === 200 || xhr.status === 201) {
				var eachArr = [];
				eachArr[0] = xhr.response['files'].length; //0번째인덱스 : 파일 변경 수
				var sum = 0;
				for(var i = 0; i < xhr.response['files'].length; i++) {
					sum+=xhr.response['files'][i]['changes'];
				}
				eachArr[1] = sum; // 1번째 인덱스 : 변경 줄 수
				eachArr[2] = xhr.response['commit']['author']['date']; // 2번째 인덱스 : 변경 날짜
				commitHistory[index] = {file:eachArr[0], word:eachArr[1], date:new Date(eachArr[2]), line: eachArr[1]};
				callback();
			}
			else {
				console.error(xhr.response);
			}
		}
	}
	xhr.send();
}

var checkFin = 0;
function checkFinish() {
	checkFin++;
	if(checkFin == commitList.length) {
		for(var i = commitList.length - 2; i >= 0; i--) {
			commitHistory[i]['line'] = commitHistory[i]['line'] + commitHistory[i + 1]['line'];
			console.log(commitHistory[i]['line']);
		}
		
		drawGraph();
	}
}
