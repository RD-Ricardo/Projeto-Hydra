
const { contextBridge, shell } = require('electron')

contextBridge.exposeInMainWorld(
	'iso',
	{
		doThing: (params) =>{ 
			// shell.openExternal(`https://www.youtube.com/results?search_query=${params}`);
			// shell.beep();
			
		}
	}
)