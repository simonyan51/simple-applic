(function() {
	var login = document.getElementById('login');
	var password = document.getElementById('pass');
	var loginBtn = document.getElementById('loginBtn');
	var danger = document.getElementById('alertDanger');

	danger.style.display = 'none';

	loginBtn.addEventListener('click', function() {
		var req = new XMLHttpRequest();
		req.open('POST', 'https://simple-applic.herokuapp.com`/login', true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		req.onreadystatechange = function() {
		    if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
		        danger.style.display = 'block';
		    }
		}
		req.send(`username=${login.value}&pass=${password.value}`);
	});

	login.addEventListener('keypress', function() {
		danger.style.display = 'none';
	});

	password.addEventListener('keypress', function() {
		danger.style.display = 'none';
	});

})();
