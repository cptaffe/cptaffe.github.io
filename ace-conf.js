// Save function
var AceConf = function (editor, addr, raddr){
	this.addr = addr;
	this.raddr = raddr;	// relaod address
	this.editor = editor;
	this.origin;
	var self = this;
	
	this.save = function(){
		var md = this.editor.getSession().getValue();
		if (md.localeCompare(this.origin) != 0){
			this.origin = md;
			// Ajax saving
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					console.log("Saved.")
				}
			}
			xmlhttp.open("POST", this.addr, true);
			xmlhttp.send(md);
		}
	};
	
	/*this.backup = function(){
		var md = this.editor.getSession().getValue();
		// Ajax saving
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				console.log("Backed Up.")
			}
		}
		xmlhttp.open("POST", this.addr + '.bak', true);
		xmlhttp.send(md);
	};
	
	// Reload Function
	this.reloadBackup = function(){
		// Ajax saving
		var xmlhttp = new XMLHttpRequest();
		var self = this;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				self.editor.getSession().setValue(xmlhttp.responseText);
				console.log("Backup Reloaded.");
			}
		}
		xmlhttp.open("POST", this.raddr + '.bak.md', true);
		xmlhttp.send();
	};
	*/
	
	// Reload Function
	this.reload = function(){
		// Ajax saving
		var xmlhttp = new XMLHttpRequest();
		var self = this;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				self.editor.getSession().setValue(xmlhttp.responseText);
				console.log("Reloaded.");
			}
		}
		xmlhttp.open("POST", this.raddr+'.md', true);
		xmlhttp.send();
	};
	
	this.init = function(vim){
		// Ace Editor
		//editor.setTheme("ace/theme/monokai");
		//editor.getSession().setMode("ace/mode/javascript");
		this.editor.setTheme("ace/theme/twilight");
		this.editor.getSession().setMode("ace/mode/markdown");
		this.editor.getSession().setUseWrapMode(true);
		this.editor.renderer.setScrollMargin(10, 10, 0, 0) 
		// Add save command
		this.editor.commands.addCommand({
			name: 'saveFile',
			bindKey: {
				win: 'Ctrl-S',
				mac: 'Command-S',
				sender: 'editor|cli'
			},
			exec: function(env, args, request) {
				self.save();	// Custom save function below
			}
		});
		// Add reload command
		this.editor.commands.addCommand({
			name: 'reloadFile',
			bindKey: {
				win: 'Ctrl-R',
				mac: 'Command-R',
				sender: 'editor|cli'
			},
			exec: function(env, args, request) {
				self.reload();	// Custom save function below
			}
		});
		/*
		// Add backup command
		this.editor.commands.addCommand({
			name: 'backupFile',
			bindKey: {
				win: 'Ctrl-B',
				mac: 'Command-B',
				sender: 'editor|cli'
			},
			exec: function(env, args, request) {
				self.backup();	// Custom save function below
			}
		});
		// Add backup command
		this.editor.commands.addCommand({
			name: 'reloadBackupFile',
			bindKey: {
				win: 'Ctrl-Shift-R',
				mac: 'Command-Shift-R',
				sender: 'editor|cli'
			},
			exec: function(env, args, request) {
				self.reloadBackup();	// Custom save function below
			}
		});
		*/
		// Add github VIM keybindings & awesomeness
		if (vim == true){
			this.editor.setKeyboardHandler("ace/keyboard/vim");
		}
		// Add github VIM keybindings & awesomeness
		if (vim == true){
			this.editor.setKeyboardHandler("ace/keyboard/vim");
		}
		//this.editor.focus();

		// Incremental saving
		this.origin = this.editor.getSession().getValue();
		//var self = this;
		//setInterval(function(){self.save();}, 5000);
	};
}