module.exports = {
  apps: [
    {
      name: "buildspace-os-countdown",
      cwd: __dirname,
      script: "/bin/zsh",
      args: [
        "-lc",
        "pnpm install && pnpm run build && exec caddy file-server --root ./dist --listen :8686",
      ],
      watch: false,
      ignore_watch: ["node_modules"],
      restart_delay: 5000,
      exp_backoff_restart_delay: 100,
      max_restarts: 10,
      min_uptime: 500,
      max_memory_restart: "1G",
      error_file: "logs/app-err.log",
      out_file: "logs/app-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
