module.exports = {
	  apps: [{
		      name: "codless",
		      script: "./index.js",            // or "npm"
		      args: "start",               // if using npm
		      cwd: "/mnt/data/codless",
		      instances: 1,
		      autorestart: true,
		      watch: false,
		      max_memory_restart: "512M",
		      out_file: "/mnt/data/logs/out.log",
		      error_file: "/mnt/data/logs/err.log",
		      log_date_format: "YYYY-MM-DD HH:mm:ss",
		      env: {
			            NODE_ENV: "production"
			          }
		    }]
}

