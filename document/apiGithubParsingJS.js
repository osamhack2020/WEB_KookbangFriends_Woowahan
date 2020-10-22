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

function getEachRequest(index, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', commitList[index]['url']);
	xhr.setRequestHeader('Authorization', myToken);
	xhr.responseType = "json";
	xhr.onreadystatechange = function() {
		if(xhr.readyState === xhr.DONE) {
			if(xhr.status === 200 || xhr.status === 201) {
				var eachArr = [];
				eachArr[0] = xhr.response['files'].length;
				var sum = 0;
				for(var i = 0; i < xhr.response['files'].length; i++) {
					sum+=xhr.response['files'][i]['changes'];
				}
				eachArr[1] = sum;
				commitHistory[index] = eachArr;
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
		for(var i = 0; i < commitList.length; i++) {
			console.log('커밋' + (commitList.length - i) + ' 변경된 파일 수 : ' + commitHistory[i][0]);
			console.log('변경된 글자 수 : ' + commitHistory[i][1]);
		}
	}
}
